import {responsiveNavigation} from "./responsive-navigation";
import {getPosition, validateWrapAround} from "./helpers";

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

    if(flkty.options.autoAdjustPosition){
        // select begin position
        const {adjustedBeginIndex} = getPosition(flkty);
        flkty.select(adjustedBeginIndex);
    }
}