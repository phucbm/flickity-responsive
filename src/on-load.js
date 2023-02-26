import {initSlidesIndicator} from "./slides-indicator";
import {responsiveNavigation} from "./responsive-navigation";
import {initCustomArrows} from "./custom-arrows";

export function onLoad(el, options){
    let flkty = Flickity.data(el);
    if(!flkty) return;

    // responsive navigation
    responsiveNavigation(flkty, options);

    // custom arrows
    initCustomArrows(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);
}