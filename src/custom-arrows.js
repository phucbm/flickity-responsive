import {getElement} from "./utils";
import {getSelectedSlidePosition} from "./helpers";
import {getAdjustedSlidePosition} from "./auto-adjust-slide-position";

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
 * Update disable status
 * @param flkty
 * @param options
 */
export function updateCustomArrowsDisableStatus(flkty, options){
    // no disabled status if is wrapAround (infinite)
    if(options.isInfinite) return;

    // find new slide index to adjust active slide position
    // use unusual values as initial values
    let adjustedBeginIndex = -1, adjustedEndIndex = -2, selectedCellIndex = -3;
    if(options.autoAdjustPosition){
        ({adjustedBeginIndex, adjustedEndIndex, selectedCellIndex} = getAdjustedSlidePosition(flkty));

        // move to new active slide
        if(selectedCellIndex < adjustedBeginIndex){
            flkty.select(adjustedBeginIndex);
        }
        if(selectedCellIndex > adjustedEndIndex){
            flkty.select(adjustedEndIndex);
        }
    }


    const prevArrow = options.customArrows.prevArrow.el;
    const nextArrow = options.customArrows.nextArrow.el;
    const slidePosition = getSelectedSlidePosition(flkty);

    if(slidePosition === 0 || selectedCellIndex === adjustedBeginIndex){
        // disable prev button
        prevArrow.setAttribute('disabled', 'disabled');
        nextArrow.removeAttribute('disabled');
    }else if(slidePosition === 1 || selectedCellIndex === adjustedEndIndex){
        // disable next prev button
        nextArrow.setAttribute('disabled', 'disabled');
        prevArrow.removeAttribute('disabled');
    }else{
        // remove disable
        prevArrow.removeAttribute('disabled');
        nextArrow.removeAttribute('disabled');
    }
}