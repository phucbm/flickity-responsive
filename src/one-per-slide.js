/**
 * When set groupCell:1 and use arrows to navigate,
 * some first and last items have delay while the carousel is stand still.
 * This option will make sure that every time an arrows click, the carousel will move.
 */
export function initOnePerSlide(flkty, options){
    let x, selectedIndex;
    const lastX = flkty.slides[flkty.slides.length - 1].target;
    const updateLastValues = () => {
        x = flkty.x;
        selectedIndex = flkty.selectedIndex;

        console.log('update', x, selectedIndex)


        // check for the next to last slide
        const isNextToLastSlide = Math.ceil(Math.abs(x)) === Math.ceil(lastX);
        if(isNextToLastSlide){
            // move to next slide
            flkty.next();
        }

        console.groupEnd();
    }
    updateLastValues();

    flkty.on('settle', index => {
        // timeout to avoid transition override
        setTimeout(() => {
            console.group('settle', flkty.selectedIndex)
            console.log('x', flkty.x, 'prev x', x, 'lastX', lastX)

            // slide moves => update and do nothing
            if(flkty.x !== x){
                console.log('slide moves => update and do nothing')
                updateLastValues();
                return;
            }

            // check direction
            if(flkty.selectedIndex > selectedIndex){
                // forward
                flkty.next();
            }else{
                // backward
                flkty.previous();
            }

            updateLastValues();
        }, 50);
    });
}