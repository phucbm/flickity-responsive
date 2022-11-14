/**
 * Hide navigation elements if the slider is not slide-able
 * @param flkty
 * @param options
 */
export function responsiveNavigation(flkty, options){
    if(options.responsiveNavigation !== true) return;

    const pageDotsHolder = flkty.pageDots ? flkty.pageDots.holder : flkty.pageDots;
    const prevButton = flkty.prevButton ? flkty.prevButton.element : flkty.prevButton;
    const nextButton = flkty.nextButton ? flkty.nextButton.element : flkty.nextButton;
    const elements = [
        pageDotsHolder, prevButton, nextButton,
        options.customArrows.prevArrow.el,
        options.customArrows.nextArrow.el
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