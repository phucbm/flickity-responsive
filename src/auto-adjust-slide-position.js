/**
 * Auto adjust slide position
 * to avoid meaningless click of prev/next button on the first and last slides
 * only work if: cellAlign=center, pageDots=false, groupCells=1
 */


export function updateSlidePosition(flkty){
    if(flkty.options.autoAdjustPosition){
        // select begin position
        const {adjustedBeginIndex} = getAdjustedSlidePosition(flkty);
        flkty.select(adjustedBeginIndex);
    }
}

export function isValidAutoAdjustSlidePosition(options){
    const allowAdjustPosition = options.groupCells === 1 && options.cellAlign === 'center' && !options.pageDots;
    return options.autoAdjustPosition && allowAdjustPosition;
}

/**
 * Get adjusted begin index, adjusted end index and selected cell index
 * @param flkty
 */
export const getAdjustedSlidePosition = (flkty) => {
    let totalWidth = 0;
    let slidesToShow = 0;
    for(let i = 0; i < flkty.cells.length; i++){
        if(totalWidth + flkty.cells[i].size.width > flkty.size.width){
            break;
        }
        totalWidth += flkty.cells[i].size.width;
        slidesToShow++;
    }
    const maxItems = flkty.cells.length;
    const adjustedEndIndex = maxItems - Math.floor(slidesToShow / 2);
    const adjustedBeginIndex = Math.floor(slidesToShow / 2) + 1;
    const selectedCellIndex = flkty.cells.findIndex(c => c.element.classList.contains('is-selected'));

    return {
        adjustedBeginIndex: adjustedBeginIndex - 1,
        adjustedEndIndex: adjustedEndIndex - 1,
        selectedCellIndex
    };
};