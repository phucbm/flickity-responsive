import {MatchMediaScreen} from "match-media-screen";
import {onMatched} from "./on-matched";
import {onResize} from "./on-resize";
import {onLoad} from "./on-load";
import {mergeObject} from "@/utils";

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

    const options = {...flickityOptions, ...object};

    new MatchMediaScreen({
        object,

        // breakpoint found
        onMatched: (data) => onMatched(el, mergeObject(options, data.object)),

        // window resize with debounce
        onUpdate: (data) => onResize(el, mergeObject(options, data.object))
    });


    // on load
    onLoad(el, options);

    return true;
}


/**
 * Validate wrapAround option
 * Compare value between the total item width and viewport width
 * @param flickity
 * @returns boolean
 */
export function validateWrapAround(flickity){
    const totalCellWidth = flickity.cells.reduce((acc, cell) => acc + cell.size.width, 0);
    return Math.round(flickity.size.width) < Math.round(totalCellWidth);
}


/**
 * Get selected slide index
 * @param flickity
 * @returns {*}
 */
export function getSelectedSlideIndex(flickity){
    return flickity.slides.findIndex(x => x.x === flickity.selectedSlide.x);
}