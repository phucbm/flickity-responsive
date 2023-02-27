import {initCustomArrows} from "./custom-arrows";
import {initSlidesIndicator} from "./slides-indicator";
import {validateWrapAround} from "./helpers";
import {isValidAutoAdjustSlidePosition, updateSlidePosition} from "./auto-adjust-slide-position";

export function onMatched(el, options){
    // get instance
    let flkty = Flickity.data(el);
    const hasInitialized = typeof flkty !== 'undefined';

    // destroy if instance is found
    if(hasInitialized) flkty.destroy();

    // option: destroy
    if(options.destroy){
        if(hasInitialized) flkty.destroy();
        return;
    }

    /** Before Init **/
    // confirm default flickity options
    options.autoAdjustPosition = isValidAutoAdjustSlidePosition(options);

    // check the wrapAround
    if(options.wrapAround){
        const isWrapAround = validateWrapAround(flkty);
        flkty.options.wrapAround = isWrapAround;
        options.wrapAround = isWrapAround;
    }

    /** Init **/
    // init new instance
    flkty = new Flickity(el, options);

    /** After Init **/
    options.isInfinite = options.hasOwnProperty('wrapAround') && flkty.options.wrapAround;

    // slide position
    updateSlidePosition(flkty);

    // custom arrows
    initCustomArrows(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);

    // resize
    flkty.resize();
}