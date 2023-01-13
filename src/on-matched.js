import {initCustomArrows} from "./custom-arrows";
import {initSlidesIndicator} from "./slides-indicator";
import {hasWrapAround} from "@/helpers";

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
    if(options.wrapAround){
        if(!flkty){
            const wrapper = document.querySelector(el);
            options.wrapAround = hasWrapAround(false, wrapper);

        }else{
            options.wrapAround = hasWrapAround(flkty);
        }
    }

    // init new instance
    flkty = new Flickity(el, options);

    /** After Init **/
    options.isInfinite = options.hasOwnProperty('wrapAround') && options.wrapAround;

    // custom arrows
    initCustomArrows(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);

    // resize
    flkty.resize();
}