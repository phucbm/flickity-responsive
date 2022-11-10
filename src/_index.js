import {MatchMediaScreen} from "match-media-screen";

/**
 * Init Flickity Responsive
 * @param el
 * @param options
 */
const init = (el, options) => {
    new MatchMediaScreen({
        object: options,
        onMatched: (data) => {
            // skip if Flickity is undefined
            if(typeof Flickity === 'undefined'){
                console.warn('Flickity is undefined!');
                return;
            }

            // get instance
            let customFlickity = Flickity.data(el);

            // destroy if instance is found
            if(typeof customFlickity !== 'undefined') customFlickity.destroy();

            // init new instance
            customFlickity = new Flickity(el, data.object);

            // resize
            customFlickity.resize();
        }
    });
}


/**
 * Public class
 * keep this class public to support legacy versions
 */
export class FlickityResponsive{
    constructor(el, options){
        init(el, options);
    }
}


/**
 * jQuery plugin
 */
if(typeof jQuery !== 'undefined'){
    (function($){
        $.fn.flickityResponsive = function(options){
            $(this).get().forEach(el => init(el, options));
        }
    })(jQuery);
}