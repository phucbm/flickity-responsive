import {init} from "./helpers";

// override flickity default options
const defaultFlickityOptions = {
    contain: true
};


/**
 * Public class
 * keep this class public to support legacy versions
 */
export class FlickityResponsive{
    constructor(el, options){
        const isInit = init(el, options, defaultFlickityOptions);
        if(!isInit) return undefined;

        // get instance
        this.flickity = Flickity.data(el);

        return this.flickity;
    }
}


/**
 * jQuery plugin
 */
if(typeof jQuery !== 'undefined'){
    (function($){
        $.fn.flickityResponsive = function(options){
            $(this).get().forEach(el => init(el, options, defaultFlickityOptions));
        }
    })(jQuery);
}