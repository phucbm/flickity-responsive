import {initSlidesIndicator} from "./slides-indicator";
import {responsiveNavigation} from "./responsive-navigation";
import {hasWrapAround} from "@/helpers";

export function onLoad(el, options){
    let flkty = Flickity.data(el);
    if(!flkty) return;

    if(options.object?.wrapAround)
        options.object.wrapAround = hasWrapAround(flkty);

    // responsive navigation
    responsiveNavigation(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);
}