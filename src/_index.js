import {init} from "./helpers";
import {getJSONObjectFromString} from "./utils";

export const _attr = {
    init: 'data-flickity-responsive',
    indicatorCurrent: 'data-indicator-current',
    indicatorTotal: 'data-indicator-total',
    prevArrow: 'data-prev-arrow',
    nextArrow: 'data-next-arrow',
};

// override flickity default options
const defaultFlickityOptions = {
    contain: true,
    destroy: false,
    prevArrow: `[${_attr.prevArrow}]`,
    nextArrow: `[${_attr.nextArrow}]`,
    responsiveNavigation: true,

    // indicator
    indicatorZeroPad: false,
    indicatorCurrent: `[${_attr.indicatorCurrent}]`,
    indicatorTotal: `[${_attr.indicatorTotal}]`,

    // extra features
    forceMove: true,
    ariaHiddenFocus: true,

    _class: {
        isFreeze: 'is-freeze', // for navigation buttons (prev, next, custom arrows, dots)
        isForceMove: 'is-force-move',
        isCannotSlide: 'is-cannot-slide'
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