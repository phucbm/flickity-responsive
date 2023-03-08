/**
 * When set groupCell:1 and use arrows to navigate,
 * some first and last items have delay while the carousel is stand still.
 * This option will make sure that every time an arrows click, the carousel will move.
 */
export function initForceMove(flkty, options){
    if(options.forceMove !== true) return;
    flkty.element.classList.add(options._class.isForceMove);

    let currentSlide = flkty.selectedSlide;

    flkty.on('change', () => {
        const nextSlide = flkty.selectedSlide;

        // get slide status
        const slideStatus = getSlideStatus(currentSlide, nextSlide);

        // nothing change
        if(slideStatus === 0) return;

        // get new slide index
        let newIndex = getSlideIndex(flkty.slides, nextSlide, slideStatus === 1);
        if(nextSlide.target === currentSlide.target){
            newIndex += slideStatus;
        }

        // update current slide
        currentSlide = flkty.selectedSlide;

        // select the new index
        flkty.select(newIndex);
    });
}


/**
 * Get the index of the last slide that has the same target (slide's position, defined by Flickity)
 * */
const getSlideIndex = (slides, slide, isForward = true) => {
    if(isForward) return slides.findLastIndex(s => s.target === slide.target);
    return slides.findIndex(s => s.target === slide.target);
};


/**
 * Get the slide status
 * return 1 -> forward
 * return -1 -> backward
 * return 0 -> nothing change
 * @return {number}
 * */
const getSlideStatus = (currentSlide, newSlide) => {
    if(newSlide.x > currentSlide.x) return 1;
    if(newSlide.x < currentSlide.x) return -1;
    return 0;
};