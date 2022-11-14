import {init} from "./helpers";
import {getJSONObjectFromString} from "@/utils";

const attr = {
    init: 'data-flickity-responsive'
};

// override flickity default options
const defaultFlickityOptions = {
    contain: true,
    destroy: false,
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
            $(this).get().forEach(el => new FlickityResponsive(el, options));
        }
    })(jQuery);
}


/**
 * Init with HTML
 */
document.querySelectorAll(`[${attr.init}]`).forEach(el => {
    const options = getJSONObjectFromString(el.getAttribute(attr.init));
    new FlickityResponsive(el, options);
});