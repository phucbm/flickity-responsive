import {initCustomArrows} from "./custom-arrows";

export function onMatched(el, options){
    // get instance
    let customFlickity = Flickity.data(el);
    const hasInitialized = typeof customFlickity !== 'undefined';

    // destroy if instance is found
    if(hasInitialized) customFlickity.destroy();

    // option: destroy
    if(options.destroy){
        if(hasInitialized) customFlickity.destroy();
        return;
    }

    /** Before Init **/

    /** Init **/
    // init new instance
    customFlickity = new Flickity(el, options);

    /** After Init **/
    options.isInfinite = options.hasOwnProperty('wrapAround') && options.wrapAround;

    // custom arrows
    initCustomArrows(customFlickity, options);

    // resize
    customFlickity.resize();
}