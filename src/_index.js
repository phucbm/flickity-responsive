import {init} from "./helpers";
import {getJSONObjectFromString} from "./utils";

const _attr = {
    init: 'data-flickity-responsive'
};

// override flickity default options
const defaultFlickityOptions = {
    contain: true,
    destroy: false,
    prevArrow: undefined,
    nextArrow: undefined,
    responsiveNavigation: true,

    // indicator
    indicatorZeroPad: false,
    indicatorCurrent: undefined,
    indicatorTotal: undefined,

    // extra features
    forceMove: true,

    _class: {
        buttonFreeze: 'flickity-button-freeze',
        isForceMove: 'is-force-move',
    }
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
document.querySelectorAll(`[${_attr.init}]`).forEach(el => {
    const options = getJSONObjectFromString(el.getAttribute(_attr.init));
    new FlickityResponsive(el, options);
});


/**
 * Support legacy namespace
 */
export class FlickityExtend{
    constructor(el, options){
        new FlickityResponsive(el, options);
    }
}

if(typeof jQuery !== 'undefined'){
    (function($){
        $.fn.flickityExtend = function(options){
            $(this).get().forEach(el => new FlickityResponsive(el, options));
        }
    })(jQuery);
}