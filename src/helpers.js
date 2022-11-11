import {MatchMediaScreen} from "match-media-screen";

/**
 * Init Flickity Responsive
 * @param el
 * @param object
 * @param flickityOptions
 */
export function init(el, object, flickityOptions){
    // skip if Flickity is undefined
    if(typeof Flickity === 'undefined'){
        console.warn('Flickity is undefined!');
        return false;
    }

    new MatchMediaScreen({
        object,
        onMatched: (data) => {
            // get instance
            let customFlickity = Flickity.data(el);

            // destroy if instance is found
            if(typeof customFlickity !== 'undefined') customFlickity.destroy();

            /** Custom script **/
            const options = getProcessedOptions({...flickityOptions, ...data.object,});

            // init new instance
            customFlickity = new Flickity(el, options);

            /** update flickity **/
            // resize
            customFlickity.resize();
        }
    });

    return true;
}


/**
 * Get processed options
 * @param options
 * @returns {*}
 */
export function getProcessedOptions(options){


    return options;
}