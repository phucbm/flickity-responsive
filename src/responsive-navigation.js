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

    const isSlideable = flkty.slideableWidth > flkty.size.innerWidth;

    elements.forEach(el => {
        if(!el || typeof el !== 'object') return;
        if(isSlideable){
            el.classList.remove(options._class.buttonFreeze);
            el.style.display = '';
        }else{
            el.classList.add(options._class.buttonFreeze);
            el.style.display = 'none';
        }
    });
}