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

    // merge options
    const options = {...flickityOptions, ...object};

    // init match media
    new MatchMediaScreen({
        object,

        // breakpoint found
        onMatched: data => onMatched(el, {...options, ...data.object}),

        // window resize with debounce
        onUpdate: data => onResize(el, {...options, ...data.object})
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
 * Get slide position
 * return 0 - first slide
 * return 1 - last index
 * return -1 - not first/last position
 * @param flkty
 * @return number
 */
export function getSelectedSlidePosition(flkty){
    const {selectedIndex, slides} = flkty;
    if(selectedIndex === 0) return 0;
    if(selectedIndex === slides.length - 1) return 1;
    return -1;
}