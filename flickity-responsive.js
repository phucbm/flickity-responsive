/*!
 * Flickity responsive v2.0.0
 * https://github.com/phucbm/flickity-responsive
 */
class FlickityResponsive{
    constructor(el, options){
        jQuery(el).flickityResponsive(options);

        return Flickity.data(el);
    }
}

(function($){
    $.fn.flickityResponsive = function(options){
        const $carousel = $(this);
        if(!$carousel.length){
            console.warn(`Init flickity on undefined element`);
            return;
        }

        // responsive
        new ResponsiveObject({
            object: options,
            onMatched: (data) => {
                if(typeof $carousel.flickity === 'undefined'){
                    console.warn('Flickity is undefined!');
                    return;
                }

                /**
                 * Validate options
                 */
                /** Option `destroy` **/
                const isDestroy = typeof data.object.destroy === 'undefined' ? false : data.object.destroy;
                if(isDestroy && $carousel.data('flickity') !== undefined){
                    $carousel.flickity('destroy');
                }
                if(isDestroy) return;

                /** Option `lazyLoadNumber`: add lazyload by default **/
                // prefer `lazyLoadNumber`, then default property if any, then `true` if empty
                data.object.lazyLoad = data.object.lazyLoadNumber || data.object.lazyLoad || true;
                data.object.bgLazyLoad = data.object.lazyLoadNumber || data.object.bgLazyLoad || true;

                /** Option `prevNextButtons` and `pageDots` **/
                // hide arrow/dots if there is only one slide
                if(data.object.prevNextButtons === true && $carousel.children().length <= 1){
                    data.object.prevNextButtons = false;
                }
                if(data.object.pageDots === true && $carousel.children().length <= 1){
                    data.object.pageDots = false;
                }

                /** Option `prevArrow` and `nextArrow` **/
                let hasPrevArrow = data.object.hasOwnProperty('prevArrow');
                let hasNextArrow = data.object.hasOwnProperty('nextArrow');

                /** Option `asNavFor` **/
                let hasNav = typeof data.object.asNavFor !== 'undefined';
                let $nav;
                if(hasNav){
                    $nav = $(data.object.asNavFor);
                    $nav.addClass('has-nav-sync');
                }

                /** Option `indicatorCurrent` and `indicatorTotal` **/
                const isZeroPad = data.object.hasOwnProperty('indicatorZeroPad') ? data.object.indicatorZeroPad : true;
                const hasIndicatorCurrent = data.object.hasOwnProperty('indicatorCurrent') && data.object.indicatorCurrent.length;
                const hasIndicatorTotal = data.object.hasOwnProperty('indicatorTotal') && data.object.indicatorTotal.length;

                /** Option `autoPlay` **/
                const isAutoPlay = data.object.hasOwnProperty('autoPlay') && data.object.autoPlay;
                const autoPlayInViewport = typeof data.object.autoPlayInViewport === 'undefined' ? true : data.object.autoPlayInViewport;

                // default dragging motion
                data.object.dragThreshold = data.object.dragThreshold || 5;
                data.object.friction = data.object.friction || 0.28;
                data.object.selectedAttraction = data.object.selectedAttraction || 0.025;

                // default groupCells
                data.object.groupCells = data.object.groupCells || '100%';

                /**
                 * Manipulate Flickity
                 */
                const isInfinite = data.object.hasOwnProperty('wrapAround') && data.object.wrapAround;

                // if already have flickity init
                if($carousel.data('flickity') !== undefined){
                    // destroy before re-init
                    $carousel.flickity('destroy');
                }

                // then init flickity
                $carousel.flickity(data.object);

                // and resize
                $carousel.flickity('resize');

                // update total slide
                const totalSlides = Flickity.data($carousel[0]).slides.length;
                if(hasIndicatorTotal){
                    data.object.indicatorTotal.text(isZeroPad ? totalSlides.toString().padStart(2, '0') : totalSlides);
                }

                /** Hide arrows and dots if there is just one single slide **/
                if(totalSlides === 1){
                    $carousel.addClass('navigation-disabled');

                    // custom arrows
                    if(hasPrevArrow && hasNextArrow){
                        hasNextArrow = false;
                        hasPrevArrow = false;
                        data.object.prevArrow.addClass('flickity-button-freeze');
                        data.object.nextArrow.addClass('flickity-button-freeze');
                    }

                    // default arrows & dots
                    $carousel.find('.flickity-prev-next-button, .flickity-page-dots').addClass('flickity-button-freeze');
                }

                // on change
                $carousel.on('change.flickity', function(event, index){
                    // sync nav
                    if(hasNav){
                        //$nav.flickity('selectCell', index);
                    }

                    // update indicator
                    if(hasIndicatorCurrent){
                        const currentSlide = isZeroPad ? (index + 1).toString().padStart(2, '0') : index + 1;
                        data.object.indicatorCurrent.text(currentSlide);
                    }
                });


                /** Control autoplay: only play when carousel is in viewport **/
                if(isAutoPlay && autoPlayInViewport){
                    if(typeof ScrollSnooper !== 'undefined'){
                        $carousel.flickity('pausePlayer');
                        ScrollSnooper.create({
                            trigger: $carousel,
                            onEnter: data => {
                                // resume
                                $carousel.flickity('unpausePlayer')
                            },
                            onLeave: data => {
                                // pause
                                $carousel.flickity('pausePlayer')
                            }
                        });
                    }else{
                        console.warn('Require ScrollSnooper!');
                    }
                }


                // custom arrows
                if(hasPrevArrow && hasNextArrow){
                    $carousel.addClass('has-custom-arrows');

                    data.object.prevArrow.on('click', () => $carousel.flickity('previous'));
                    data.object.nextArrow.on('click', () => $carousel.flickity('next'));

                    const updateArrowsStatus = (index = 0) => {
                        // no disabled if is wrapAround (infinite)
                        if(isInfinite) return;

                        if(index === 0){
                            // first slide
                            data.object.prevArrow.attr('disabled', 'disabled');
                            data.object.nextArrow.removeAttr("disabled");
                        }else if(index === totalSlides - 1){
                            // last slide
                            data.object.prevArrow.removeAttr("disabled");
                            data.object.nextArrow.attr('disabled', 'disabled');
                        }else{
                            // middles
                            data.object.prevArrow.removeAttr("disabled");
                            data.object.nextArrow.removeAttr("disabled");
                        }
                    }

                    updateArrowsStatus();
                    $carousel.on('change.flickity', function(event, index){
                        updateArrowsStatus(index);
                    });
                }
            }
        })
    }
})(jQuery);


/**
 * Responsive Object v1.0.1
 */
class ResponsiveObject{
    constructor(config){
        this.object = config.object || undefined;
        if(!this.object) return;

        // callbacks
        this.onMatched = config.onMatched || function(){
        };
        this.onUpdate = config.onUpdate || function(){
        };

        // exit if there is no responsive object
        if(!this.object.responsive){
            // update
            this.currentObject = {
                type: 'no-responsive',
                lastBreakpoint: undefined,
                breakpoint: -1,
                object: this.mergeObject(-1, this.object)
            };

            // callback onMatched
            if(typeof this.onMatched === 'function'){
                this.onMatched(this.currentObject);
            }
            return false;
        }

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