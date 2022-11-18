import {getElement} from "./utils";

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
 * Get is-selected position
 * return 0 - first index
 * return 1 - last index
 * return -1 - not first/last index
 * @param flkty
 * @return number
 */
function getIsSelectedPosition(flkty){
    const {cells} = flkty;
    if(cells[0].element.classList.contains('is-selected')) return 0;
    if(cells.slice(-1)[0].element.classList.contains('is-selected')) return 1;
    return -1;
}

/**
 * Update disable status
 * @param flkty
 * @param options
 */
function updateCustomArrowsDisableStatus(flkty, options){
    // no disabled status if is wrapAround (infinite)
    if(options.isInfinite) return;
    const prevArrow = options.customArrows.prevArrow.el;
    const nextArrow = options.customArrows.nextArrow.el;

    const index = getIsSelectedPosition(flkty);

    if(index === 0){
        // disable prev button
        prevArrow.setAttribute('disabled', 'disabled');
        nextArrow.removeAttribute('disabled');
    }else if(index === 1){
        // disable next prev button
        nextArrow.setAttribute('disabled', 'disabled');
        prevArrow.removeAttribute('disabled');
    }else{
        // remove disable
        prevArrow.removeAttribute('disabled');
        nextArrow.removeAttribute('disabled');
    }
}