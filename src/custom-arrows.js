import {isjQueryElement} from "./utils";

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
        const arrowButton = isjQueryElement(arrowInput) ? arrowInput.get()[0] : arrowInput;

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
    if(hasCustomArrow) updateCustomArrowsDisableStatus(flkty, options);
    flkty.on('change', () => updateCustomArrowsDisableStatus(flkty, options));
}


/**
 * Update disable status
 * @param flkty
 * @param options
 */
function updateCustomArrowsDisableStatus(flkty, options){
    // no disabled status if is wrapAround (infinite)
    if(options.isInfinite) return;
    const index = flkty.selectedIndex;
    const prevArrow = options.customArrows.prevArrow.el;
    const nextArrow = options.customArrows.nextArrow.el;

    if(index === 0){
        // disable prev button
        prevArrow.setAttribute('disabled', 'disabled');
        nextArrow.removeAttribute('disabled');
    }else if(index === flkty.cells.length - 1){
        // disable next prev button
        nextArrow.setAttribute('disabled', 'disabled');
        prevArrow.removeAttribute('disabled');
    }else{
        // remove disable
        prevArrow.removeAttribute('disabled');
        nextArrow.removeAttribute('disabled');
    }
}