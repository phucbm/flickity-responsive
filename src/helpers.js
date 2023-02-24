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
    onLoad(el, {...flickityOptions, ...object});

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
 * Get adjusted begin index, adjusted end index and selected cell index
 * @param flkty
 */
export const getPosition = (flkty) => {
    let totalWidth = 0;
    let slidesToShow = 0;
    for(let i = 0; i < flkty.cells.length; i++){
        if(totalWidth + flkty.cells[i].size.width > flkty.size.width){
            break;
        }
        totalWidth += flkty.cells[i].size.width;
        slidesToShow++;
    }
    const maxItems = flkty.cells.length;
    const adjustedEndIndex = maxItems - Math.floor(slidesToShow / 2);
    const adjustedBeginIndex = Math.floor(slidesToShow / 2) + 1;
    const selectedCellIndex = flkty.cells.findIndex(c => c.element.classList.contains('is-selected'));

    return {
        adjustedBeginIndex: adjustedBeginIndex - 1,
        adjustedEndIndex: adjustedEndIndex - 1,
        selectedCellIndex
    };
};