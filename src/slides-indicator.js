import {getElements} from "./utils";

export function initSlidesIndicator(flkty, options){
    const isZeroPad = options.indicatorZeroPad === true;
    let total = getElements(options.indicatorTotal);
    let current = getElements(options.indicatorCurrent);
    const totalSlides = flkty.slides.length;

    // total
    if(total){
        total.forEach(el => el.innerText = isZeroPad ? getNumber(totalSlides) : totalSlides);
    }

    // current
    if(current){
        let index = flkty.selectedIndex;
        current.forEach(el => el.innerText = isZeroPad ? getNumber(index + 1) : index + 1);

        flkty.on('change', (index) => {
            const selectedNumber = flkty.selectedIndex + 1;
            current.forEach(el => el.innerText = isZeroPad ? getNumber(selectedNumber) : selectedNumber);
        });
    }
}

function getNumber(number = 0){
    return number.toString().padStart(2, '0');
}