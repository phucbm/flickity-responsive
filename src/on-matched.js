export function onMatched(el, options){
    // get instance
    let customFlickity = Flickity.data(el);

    // destroy if instance is found
    if(typeof customFlickity !== 'undefined') customFlickity.destroy();

    /** Custom script **/
    // init new instance
    customFlickity = new Flickity(el, options);

    /** update flickity **/
    // resize
    customFlickity.resize();
}