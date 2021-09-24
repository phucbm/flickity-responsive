/**
 * Flickity responsive v1.1.0
 * https://github.com/phucbm/flickity-responsive
 */

(function($){
    $.fn.flickityResponsive = function(options){
        const $carousel = $(this);
        new ResponsiveObject({
            object: options,
            onMatched: (data) => {
                if(typeof $carousel.flickity !== undefined){
                    // if already have flickity init
                    if($carousel.data('flickity') !== undefined){
                        // destroy
                        $carousel.flickity('destroy');
                    }

                    // then init flickity
                    $carousel.flickity(data.object);

                    // and resize
                    $carousel.flickity('resize');
                }else{
                    console.warn('Flickity is undefined!');
                }
            }
        })
    }
})(jQuery);


/**
 * Responsive Object v1.0.0
 * https://github.com/phucbm/js-gist/blob/main/responsive-object.js
 */
class ResponsiveObject{
    constructor(config){
        this.object = config.object || undefined;
        if(!this.object || !this.object.responsive) return false;

        // callbacks
        this.onMatched = config.onMatched || function(){
        };
        this.onUpdate = config.onUpdate || function(){
        };

        // if the current object don't have this key, search from the closest breakpoint above
        this.isInherit = typeof config.isInherit === 'undefined' ? true : config.isInherit;

        /** Current object bases on responsive data **/
        this.currentObject = {breakpoint: undefined, object: {}};

        /** Sort responsive breakpoints from big to small **/
        this.object.responsive = this.getSortedArray(this.object.responsive);

        /** Matching **/
        this.match();
        window.addEventListener('resize', () => {
            this.match();
        });
    }

    match(){
        let isMatched = false;

        // loop through all breakpoints
        for(let i = 0; i < this.object.responsive.length; i++){
            const breakpointData = this.object.responsive[i];

            // match query
            isMatched = matchMedia(this.getQuery(i)).matches;

            // if matched
            if(isMatched){
                // and is a new breakpoint
                if(this.currentObject.breakpoint !== breakpointData.breakpoint){
                    // update
                    this.currentObject = {
                        type: 'responsive',
                        lastBreakpoint: this.currentObject.breakpoint,
                        breakpoint: breakpointData.breakpoint,
                        object: this.mergeObject(breakpointData.breakpoint, breakpointData.settings)
                    };

                    // callback onMatched
                    if(typeof this.onMatched === 'function'){
                        this.onMatched(this.currentObject);
                    }
                }

                // stop looping once matched
                break;
            }
        }

        // if no matching
        if(!isMatched && this.currentObject.breakpoint !== -1){
            // update
            this.currentObject = {
                type: 'default',
                lastBreakpoint: this.currentObject.breakpoint,
                breakpoint: -1,
                object: this.mergeObject(-1, this.object)
            };

            // callback onMatched
            if(typeof this.onMatched === 'function'){
                this.onMatched(this.currentObject);
            }
        }

        // callback onUpdate
        if(typeof this.onUpdate === 'function'){
            this.onUpdate(this.currentObject);
        }
    }

    // get query string from breakpoint
    getQuery(breakpointIndex){
        const breakpoint = this.object.responsive[breakpointIndex].breakpoint;

        let query = `screen and (max-width:${breakpoint}px)`;

        // set the min breakpoint if any
        const nextBreakpoint = this.object.responsive[breakpointIndex + 1];
        if(nextBreakpoint){
            query += ` and (min-width:${nextBreakpoint.breakpoint + 1}px)`
        }

        return query;
    }

    getSortedArray(array, isASC = true){
        const newArray = [...array];

        if(isASC){
            newArray.sort((a, b) => a.breakpoint < b.breakpoint && 1 || -1);
        }else{
            newArray.sort((a, b) => a.breakpoint > b.breakpoint && 1 || -1);
        }

        return newArray;
    }

    mergeObject(breakpoint, newObject){
        // clone new object
        let object = {...newObject};

        // if is inherit, check for previous breakpoint
        if(this.isInherit && breakpoint !== -1){
            const reversedBreakpoints = this.getSortedArray(this.object.responsive, false);

            for(let i = 0; i < reversedBreakpoints.length; i++){
                // only check for bigger breakpoint
                if(reversedBreakpoints[i].breakpoint > breakpoint){
                    object = {...reversedBreakpoints[i].settings, ...object};
                }
            }
        }

        // merge with default object
        object = {...this.object, ...object};

        // remove responsive property
        delete object.responsive;

        return object;
    }
}