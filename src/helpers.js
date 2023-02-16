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
 * Validate wrapAround option
 * Compare value between the total item width and viewport width
 * @param flickity
 * @param wrapper
 * @returns boolean
 */
export function validateWrapAround(flickity){
    const totalCellWidth = flickity.cells.reduce((acc, cell) => acc + cell.size.width, 0);
    return Math.round(flickity.size.width) > Math.round(totalCellWidth);
}


/**
 * Get begin, end and cellSelected position
 * Compare value between the total item width and viewport width
 * @param flkty
 */
export const getPosition = (flkty) => {
    let totalWidth = 0;
    let count = 0;
    for(let i = 0; i < flkty.cells.length; i++){
        if(totalWidth + flkty.cells[i].size.width > flkty.size.width){
            break;
        }
        totalWidth += flkty.cells[i].size.width;
        count++;
    }
    const maxItems = flkty.cells.length;
    const endPosition = maxItems - Math.floor(count / 2);
    const beginPosition = Math.floor(count / 2) + 1;
    const cellPosition = flkty.cells.findIndex(c => c.element.classList.contains('is-selected'));

    return {
        begin: beginPosition - 1,
        end: endPosition - 1,
        cellPosition
    };
};