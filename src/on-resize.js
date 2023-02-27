import {responsiveNavigation} from "./responsive-navigation";
import {validateWrapAround} from "./helpers";
import {updateSlidePosition} from "./auto-adjust-slide-position";

export function onResize(el, options){
    let flkty = Flickity.data(el);
    if(!flkty) return;

    // responsive navigation
    responsiveNavigation(flkty, options);

    // check the wrapAround
    if(options.wrapAround){
        const isWrapAround = validateWrapAround(flkty);
        flkty.options.wrapAround = isWrapAround;
        options.wrapAround = isWrapAround;
    }

    // slide position
    updateSlidePosition(flkty);
}