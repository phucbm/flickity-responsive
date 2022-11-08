import {MatchMediaScreen} from "match-media-screen";

/**
 * Public class
 * keep this class public to support legacy versions
 */
export class FlickityResponsive{
    constructor(el, options){
        new MatchMediaScreen({
            object: options,
            onMatched: (data) => {
                if(typeof Flickity !== "undefined"){
                    const flkty = Flickity.data(el);
                    console.log(flkty);
                }
                // if(typeof $carousel.flickity !== undefined){
                //     // if already have flickity init
                //     if($carousel.data('flickity') !== undefined){
                //         // destroy
                //         $carousel.flickity('destroy');
                //     }
                //
                //     // then init flickity
                //     $carousel.flickity(data.object);
                //
                //     // and resize
                //     $carousel.flickity('resize');
                // }else{
                //     console.warn('Flickity is undefined!');
                // }
            }
        });

    }
}