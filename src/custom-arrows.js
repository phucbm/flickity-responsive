import {getElement} from "./utils";
import {getPosition} from "./helpers";

/**
 * Init custom arrows
 * Option: prevArrow | DOM, jQuery
 * Option: nextArrow | DOM, jQuery
 * @param flkty
 * @param options
 */
export function initCustomArrows(flkty, options){
    const customArrows = {
        prevArrow: {
            func: () => flkty.previous()
        },
        nextArrow: {
            func: () => flkty.next()
        }
    };
    let hasCustomArrow = false;

    Object.entries(customArrows).forEach(([type, arrow]) => {
        // skip if no option assigned
        if(!options.hasOwnProperty(type)) return;

        const arrowInput = options[type];
        const arrowButton = getElement(arrowInput);

        // skip if not a object type
        if(typeof arrowButton !== 'object') return;

        // assign event
        arrowButton.addEventListener('click', () => arrow.func());

        // save button
        customArrows[type].el = arrowButton;

        // add class
        flkty.element.classList.add(`has-custom-${type}`);
        hasCustomArrow = true;
    });

    // save custom arrows
    options.customArrows = customArrows;

    // update disable status
    if(hasCustomArrow){
        updateCustomArrowsDisableStatus(flkty, options);
        flkty.on('change', () => updateCustomArrowsDisableStatus(flkty, options));
    }
}

/**
 * Get slide position
 * return 0 - first slide
 * return 1 - last index
 * return -1 - not first/last position
 * @param flkty
 * @return number
 */
function getSlidePosition(flkty){
    const {selectedIndex, slides} = flkty;
    if(selectedIndex === 0) return 0;
    if(selectedIndex === slides.length - 1) return 1;
    return -1;
}

/**
 * Update disable status
 * @param flkty
 * @param options
 */
export function updateCustomArrowsDisableStatus(flkty, options){
    let adjustedBeginIndex = -1, adjustedEndIndex = -1, selectedCellIndex = -1;
    if(options.autoAdjustPosition){
        ({adjustedBeginIndex, adjustedEndIndex, selectedCellIndex} = getPosition(flkty));
    }

    if(selectedCellIndex < adjustedBeginIndex){
        flkty.select(adjustedBeginIndex);
    }
    if(selectedCellIndex > adjustedEndIndex){
        flkty.select(adjustedEndIndex);
    }

    // no disabled status if is wrapAround (infinite)
    if(options.isInfinite) return;
    const prevArrow = options.customArrows.prevArrow.el;
    const nextArrow = options.customArrows.nextArrow.el;

    const slidePosition = getSlidePosition(flkty);

    if(slidePosition === 0 || (selectedCellIndex === adjustedBeginIndex && selectedCellIndex !== -1)){
        // disable prev button
        prevArrow.setAttribute('disabled', 'disabled');
        nextArrow.removeAttribute('disabled');
    }else if(slidePosition === 1 || (selectedCellIndex === adjustedEndIndex && selectedCellIndex !== -1)){
        // disable next prev button
        nextArrow.setAttribute('disabled', 'disabled');
        prevArrow.removeAttribute('disabled');
    }else{
        // remove disable
        prevArrow.removeAttribute('disabled');
        nextArrow.removeAttribute('disabled');
    }
}