/**
 * When set groupCell:1 and use arrows to navigate,
 * some first and last items have delay while the carousel is stand still.
 * This option will make sure that every time an arrows click, the carousel will move.
 */
export function initOnePerSlide(flkty, options){
    let currentSlide = flkty.selectedSlide;

    flkty.on('change', () => {
        const nextSlide = flkty.selectedSlide;

        // get slide status
        const slideStatus = getSlideStatus(currentSlide, nextSlide);

        if(slideStatus === 0) return;

        // forward
        let result;
        if(slideStatus === 1){
            result = getTheSameLastItem(flkty.slides, nextSlide);

            // current slide is the same target as next slide => return the next index
            if(nextSlide.target === currentSlide.target){
                result += 1;
            }
        }else{
            result = getTheSameLastItem(flkty.slides, nextSlide, false);

            // current slide is the same target as next slide => return the previous index
            if(nextSlide.target === currentSlide.target){
                result -= 1;
            }
        }

        // update current slide
        currentSlide = flkty.selectedSlide;

        // select the new index
        flkty.select(result);
    });
}


/**
 * Get the same last item
 * */
const getTheSameLastItem = (slides, slide, isForward = true) => {
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