import {MatchMediaScreen} from "match-media-screen";
import {onMatched} from "./on-matched";
import {onResize} from "./on-resize";
import {onLoad} from "./on-load";
import {isjQueryElement} from "@/utils";

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
 * Validate wrapAround option
 * Compare value between the total item width and viewport width
 * @param flickity
 * @param wrapper
 * @returns boolean
 */
export function validateWrapAround(flickity, wrapper = null){
    if(flickity){
        const totalCellWidth = flickity.cells.reduce((acc, cell) => acc + cell.size.width, 0);
        return Math.round(flickity.size.width) > Math.round(totalCellWidth);
    }

    const totalCellWidth = [...wrapper.children].reduce((acc, node) => acc + node.getBoundingClientRect().width, 0);
    return Math.round(wrapper.getBoundingClientRect().width) > Math.round(totalCellWidth);
}