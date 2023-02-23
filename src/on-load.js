import {initSlidesIndicator} from "./slides-indicator";
import {responsiveNavigation} from "./responsive-navigation";

export function onLoad(el, options){
    let flkty = Flickity.data(el);
    if(!flkty) return;

    // responsive navigation
    responsiveNavigation(flkty, options);

    // slides indicator
    initSlidesIndicator(flkty, options);
}