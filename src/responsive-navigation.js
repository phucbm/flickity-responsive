/**
 * Hide navigation elements if the slider is not slide-able
 * @param flkty
 * @param options
 */
export function responsiveNavigation(flkty, options){
    if(options.responsiveNavigation !== true) return;

    const elements = [];
    if(flkty.pageDots) elements.push(flkty.pageDots.holder);
    if(flkty.prevButton) elements.push(flkty.prevButton.element);
    if(flkty.nextButton) elements.push(flkty.nextButton.element);
    if(flkty.options.hasCustomArrow){
        elements.push(...flkty.options.customArrows.prevArrow.el);
        elements.push(...flkty.options.customArrows.nextArrow.el);
    }

    const slideableWidth = Math.round(flkty.slideableWidth);
    const innerWidth = Math.round(flkty.size.innerWidth);
    const isSlideable = slideableWidth > innerWidth;

    // loop through the elements and hide them if the slider is not slide-able
    elements.forEach(el => {
        if(!el || typeof el !== 'object') return;
        if(isSlideable){
            el.classList.remove(options._class.isFreeze);
            el.style.display = '';
        }else{
            el.classList.add(options._class.isFreeze);
            el.style.display = 'none';
        }
    });


    // add class to the element if the slider is not slide-able
    if(isSlideable){
        // remove class from the element
        flkty.element.classList.remove(options._class.isCannotSlide);
    }else{
        // add class from the element
        flkty.element.classList.add(options._class.isCannotSlide);
    }

    // draggable
    flkty.options.draggable = isSlideable;
    flkty.updateDraggable();
}