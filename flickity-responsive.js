/**
 * Flickity responsive v1.0.0
 * https://github.com/phucbm/flickity-responsive
 */

(function($){
    $.fn.flickityResponsive = function(options){
        const $carousel = $(this);
        const methods = {};

        // update carousel options base on breakpoint
        methods.updateCarousel = (breakpoint) => {
            currentBreakpoint = breakpoint.breakpoint;

            // merge new options
            const newOptions = $.extend({...options}, breakpoint.settings);

            // init flickity
            methods.initCarousel(newOptions);
        }

        // find settings that matched the breakpoint
        methods.matchingBreakpoint = () => {
            let hasMatch = false;

            for(let i = 0; i < options.responsive.length; i++){
                const breakpoint = options.responsive[i];

                // get query
                let query = `screen and (max-width:${breakpoint.breakpoint}px)`;

                // set the min breakpoint if any
                const nextBreakpoint = options.responsive[i + 1];
                if(typeof nextBreakpoint !== 'undefined'){
                    query += ` and (min-width:${nextBreakpoint.breakpoint + 1}px)`
                }

                // match query
                hasMatch = matchMedia(query).matches;
                if(hasMatch){
                    if(currentBreakpoint !== breakpoint.breakpoint){
                        // matched new breakpoint
                        methods.updateCarousel(breakpoint);
                        break;
                    }
                    break;
                }
            }

            // if no matching
            if(!hasMatch && currentBreakpoint !== 'all'){
                // reset breakpoint to all
                methods.updateCarousel({breakpoint: 'all', settings: {}});
            }
        }

        // init carousel
        methods.initCarousel = (options) => {
            if(typeof options !== 'object') return;

            // hide arrow if there is only one slide
            if(options.prevNextButtons && $carousel.children().length <= 1){
                options.prevNextButtons = false;
            }

            if(typeof $carousel.flickity !== undefined){
                // if already have flickity init
                if($carousel.data('flickity') !== undefined){
                    // destroy
                    $carousel.flickity('destroy');
                }

                // then init flickity
                $carousel.flickity(options);

                // and resize
                $carousel.flickity('resize');
            }else{
                console.warn('Flickity is undefined!');
            }
        };

        // only init once if no responsive data found
        if(typeof options.responsive === "undefined"){
            methods.initCarousel(options);
            return;
        }

        // indicate
        let currentBreakpoint = undefined;
        $carousel.addClass('flickity-extended');

        // sort breakpoints
        options.responsive.sort((a, b) => a.breakpoint < b.breakpoint && 1 || -1);

        // matching on resize
        window.addEventListener('resize', methods.matchingBreakpoint);

        // matching on load
        methods.matchingBreakpoint();
    }
})(jQuery);