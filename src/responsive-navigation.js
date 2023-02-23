/**
 * Hide navigation elements if the slider is not slide-able
 * @param flkty
 * @param options
 */
import {isjQueryElement} from "@/utils";

export function responsiveNavigation(flkty, options){
    if(options.responsiveNavigation !== true) return;

    const elements = [
        flkty.pageDots ? flkty.pageDots.holder : undefined,
        options.prevArrow ?? undefined,
        options.nextArrow ?? undefined,
        options.indicatorCurrent ?? undefined,
        options.indicatorTotal ?? undefined,

        // Property from old code, should to check it again because I don't know what's this purpose?
        flkty.prevButton ? flkty.prevButton.element : undefined,
        flkty.nextButton ? flkty.nextButton.element : undefined,
        options.customArrows ? options.customArrows.prevArrow.el : undefined,
        options.customArrows ? options.customArrows.nextArrow.el : undefined
    ];

    const isSlideable = flkty.slideableWidth > flkty.size.innerWidth;

    elements.forEach(el => {
        if(!el || typeof el !== 'object') return;

        // jQuery element
        if(isjQueryElement(el)){
            el = el[0];
        }

        if(isSlideable){
            el.classList.remove(options._class.buttonFreeze);
            el.style.display = '';
        }else{
            el.classList.add(options._class.buttonFreeze);
            el.style.display = 'none';
        }
    });
}