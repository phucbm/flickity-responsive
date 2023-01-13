import {MatchMediaScreen} from "match-media-screen";
import {onMatched} from "./on-matched";
import {onResize} from "./on-resize";
import {onLoad} from "./on-load";

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

        // breakpoint found
        onMatched: data => onMatched(el, {...flickityOptions, ...data.object}),

        // window resize with debounce
        onUpdate: data => onResize(el, {...flickityOptions, ...data.object})
    });


    // on load
    onLoad(el, {...flickityOptions, object});

    return true;
}


/**
 * Has wrap-around options
 * @param flickity
 * @param wrapper
 * @returns boolean
 */
export function hasWrapAround(flickity, wrapper){
    if(flickity) return Math.round(flickity.size.width) > Math.round(flickity.cells.reduce((acc, cell) => acc + cell.size.width, 0));

    const totalWidth = Math.round([...wrapper.children].reduce((acc, node) => acc + node.getBoundingClientRect().width, 0));
    return Math.round(wrapper.getBoundingClientRect().width) > totalWidth;
}