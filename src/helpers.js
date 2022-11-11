import {MatchMediaScreen} from "match-media-screen";
import {onMatched} from "./on-matched";

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
        onMatched: (data) => onMatched(el, {...flickityOptions, ...data.object})
    });

    return true;
}