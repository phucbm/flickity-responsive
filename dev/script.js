import "@viivue/atomic-css";
import 'honcau';

// private style
import './style.scss';

// source script
import {FlickityResponsive} from "@/_index";

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

/**
 * Lib usage
 */
// init with vanilla JS
const carousel = new FlickityResponsive('.carousel', {
    pageDots: false,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                prevNextButtons: false,
                pageDots: true,
            }
        }
    ]
});

// init with jQuery
if(typeof jQuery !== 'undefined'){
    jQuery('.carousel-2').flickityResponsive({
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    destroy: true
                }
            }
        ]
    });
}

// custom arrows
const carouselArrows = new FlickityResponsive('.carousel-arrows', {
    prevNextButtons: false,
    indicatorCurrent: document.querySelector('#current'),
    indicatorTotal: document.querySelector('#total'),
    prevArrow: document.querySelector('#prev'),
    nextArrow: jQuery('#next'),
    cellAlign: 'center',
    contain: true
});