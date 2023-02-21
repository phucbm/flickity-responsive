import {responsiveNavigation} from "./responsive-navigation";
import {getPosition, validateWrapAround} from "./helpers";

export function onResize(el, options){
    let flkty = Flickity.data(el);
    if(!flkty) return;

    // responsive navigation
    responsiveNavigation(flkty, options);

    // check the wrapAround
    if(options.wrapAround){
        flkty.options.wrapAround = validateWrapAround(flkty);
    }

    if(flkty.options.autoAdjustPosition){
        // select begin position
        const {adjustedBeginIndex} = getPosition(flkty);
        flkty.select(adjustedBeginIndex);
    }
}