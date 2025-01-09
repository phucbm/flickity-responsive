/**
 * Hide navigation elements if the slider is not slide-able
 * @param flkty
 * @param options
 */
export function responsiveNavigation(flkty, options){
    if(options.responsiveNavigation !== true) return;

    const elements = [
        flkty.pageDots ? flkty.pageDots.holder : undefined,
        flkty.prevButton ? flkty.prevButton.element : undefined,
        flkty.nextButton ? flkty.nextButton.element : undefined,
        flkty.options.customArrows ? flkty.options.customArrows.prevArrow.el : undefined,
        flkty.options.customArrows ? flkty.options.customArrows.nextArrow.el : undefined
    ];

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
}