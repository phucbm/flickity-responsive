jQuery(document).ready(function($){
    /**
     * Setup HTML
     */
    $('body').append('<div class="carousel"></div>');


    /**
     * Setup Flickity
     */
    const slideCount = 10;
    const $carousel = $(".carousel");

    // create slides
    for(let i = 0; i < slideCount; i++){
        const imageURL = `https://picsum.photos/1920?random=${i}`;
        $carousel.append(
            `<div class="slide" style="background-image:url(${imageURL})"><div></div></div>`
        );
    }

    // init flickity responsive
    $carousel.flickityResponsive({
        cellAlign: "left",
        contain: true,
        freeScroll: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    wrapAround: true,
                    cellAlign: "center",
                    freeScroll: false,
                    prevNextButtons: false,
                    pageDots: false
                }
            }
        ]
    });
});