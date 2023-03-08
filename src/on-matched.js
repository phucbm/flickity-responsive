import {initCustomArrows} from "./custom-arrows";
import {initSlidesIndicator} from "./slides-indicator";
import {validateWrapAround} from "./helpers";
import {initForceMove} from "./force-move";

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

    /** Init **/
    // init new instance
    flkty = new Flickity(el, options);

    // check the wrapAround
    if(options.wrapAround){
        flkty.options.wrapAround = validateWrapAround(flkty);
    }

    /** After Init **/
    options.isInfinite = options.hasOwnProperty('wrapAround') && flkty.options.wrapAround;

    // custom arrows
    initCustomArrows(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);

    // one item per slide
    initForceMove(flkty, options);

    // resize
    flkty.resize();
}