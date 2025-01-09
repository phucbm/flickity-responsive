import {getElements} from "./utils";

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
            func: () => flkty.previous(),
            el: []
        },
        nextArrow: {
            func: () => flkty.next(),
            el: []
        }
    };
    let hasCustomArrow = false;

    Object.entries(customArrows).forEach(([type, arrow]) => {
        // skip if no option assigned
        if(!options.hasOwnProperty(type)) return;

        const arrowInput = options[type];
        if(!arrowInput) return;
        const arrowButtons = getElements(arrowInput);

        // skip if not an object type
        if(!arrowButtons || typeof arrowButtons !== 'object') return;

        // check if all items in the array are not undefined
        if(Array.isArray(arrowButtons) && arrowButtons.every(el => el === undefined)) return;

        // assign event
        arrowButtons.forEach(el => {
            if(el) el.addEventListener('click', () => arrow.func());
        });

        // save button
        customArrows[type].el = arrowButtons;

        // add class
        flkty.element.classList.add(`has-custom-${type}`);
        hasCustomArrow = true;
    });

    // save custom arrows
    flkty.options.customArrows = customArrows;
    flkty.options.hasCustomArrow = hasCustomArrow;

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
    // no disabled status if is wrapAround (infinite)
    if(options.isInfinite) return;
    const prevArrows = flkty.options.customArrows.prevArrow.el;
    const nextArrows = flkty.options.customArrows.nextArrow.el;

    const slidePosition = getSlidePosition(flkty);

    const setDisabled = (els, isDisabled) => {
        if(isDisabled){
            els.forEach(el => el?.setAttribute('disabled', 'disabled'));
        }else{
            els.forEach(el => el?.removeAttribute('disabled'));
        }
    };

    if(slidePosition === 0){
        // disable prev button
        setDisabled(prevArrows, true);
        setDisabled(nextArrows, false);
    }else if(slidePosition === 1){
        // disable next prev button
        setDisabled(prevArrows, false);
        setDisabled(nextArrows, true);
    }else{
        // remove disable
        setDisabled(nextArrows, false);
        setDisabled(prevArrows, false);
    }
}