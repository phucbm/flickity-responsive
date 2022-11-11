import {MatchMediaScreen} from "match-media-screen";

/**
 * Init Flickity Responsive
 * @param el
 * @param options
 */
const init = (el, options) => {
    // skip if Flickity is undefined
    if(typeof Flickity === 'undefined'){
        console.warn('Flickity is undefined!');
        return false;
    }

    new MatchMediaScreen({
        object: options,
        onMatched: (data) => {
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

    return true;
}


/**
 * Public class
 * keep this class public to support legacy versions
 */
export class FlickityResponsive{
    constructor(el, options){
        const isInit = init(el, options);

        // return Flickity instance if init successfully
        if(isInit) return Flickity.data(el);
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