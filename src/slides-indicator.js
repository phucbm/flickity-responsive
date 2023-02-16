import {getElement} from "./utils";
import {getPosition} from "@/helpers";
import {updateCustomArrowsDisableStatus} from "./custom-arrows";

export function initSlidesIndicator(flkty, options){
    const isZeroPad = options.indicatorZeroPad === true;
    const total = getElement(options.indicatorTotal);
    const current = getElement(options.indicatorCurrent);
    const totalSlides = flkty.cells.length;

    // total
    if(total){
        total.innerText = isZeroPad ? getNumber(totalSlides) : totalSlides;
    }

    // current
    if(current){
        let index = flkty.selectedIndex;
        current.innerText = isZeroPad ? getNumber(index + 1) : index + 1;

        flkty.on('change', (index) => {
            if(options.autoAdjustPosition){
                const {selectedCellIndex} = getPosition(flkty);
                index = selectedCellIndex;
                updateCustomArrowsDisableStatus(flkty, options);
            }
            current.innerText = isZeroPad ? (index + 1).toString().padStart(2, '0') : index + 1;
        });
    }
}

function getNumber(number = 0){
    return number.toString().padStart(2, '0');
}