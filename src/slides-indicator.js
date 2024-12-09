import {getElement} from "./utils";

export function initSlidesIndicator(flkty, options){
    const isZeroPad = options.indicatorZeroPad === true;
    const total = getElement(options.indicatorTotal);
    const current = getElement(options.indicatorCurrent);
    const totalSlides = flkty.slides.length;

    // total
    if(total){
        total.innerText = isZeroPad ? getNumber(totalSlides) : totalSlides;
    }

    // current
    if(current){
        let index = flkty.selectedIndex;
        current.innerText = isZeroPad ? getNumber(index + 1) : index + 1;

        flkty.on('change', (index) => {
            const selectedNumber = flkty.selectedIndex + 1;
            current.innerText = isZeroPad ? selectedNumber.toString().padStart(2, '0') : selectedNumber;
        });
    }
}

function getNumber(number = 0){
    return number.toString().padStart(2, '0');
}