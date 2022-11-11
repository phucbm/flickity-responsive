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

    /** Custom script **/
    // init new instance
    customFlickity = new Flickity(el, options);

    /** update flickity **/
    // resize
    customFlickity.resize();
}