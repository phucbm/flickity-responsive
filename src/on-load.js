import {initSlidesIndicator} from "./slides-indicator";
import {responsiveNavigation} from "./responsive-navigation";
import {validateWrapAround} from "./helpers";
import {initForceMove} from "./force-move";

export function onLoad(el, options){
    let flkty = Flickity.data(el);
    if(!flkty) return;

    if(options.object?.wrapAround){
        options.object.wrapAround = validateWrapAround(flkty);
    }

    // responsive navigation
    responsiveNavigation(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);

    // one item per slide
    initForceMove(flkty, options);
}