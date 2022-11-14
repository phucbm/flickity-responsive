import {initCustomArrows} from "./custom-arrows";
import {responsiveNavigation} from "./responsive-navigation";

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

    /** After Init **/
    options.isInfinite = options.hasOwnProperty('wrapAround') && options.wrapAround;

    // custom arrows
    initCustomArrows(flkty, options);

    // responsive navigation
    responsiveNavigation(flkty, options);

    // resize
    flkty.resize();
}