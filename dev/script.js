// public styles
import '../public/style/fonts.css';

// private style
import './style.scss';

// source script
import '@/_index';
import {FlickityResponsive} from "@/_index";

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `[DEV] ${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

/**
 * Lib usage
 */
// init with vanilla JS
new FlickityResponsive('.carousel', {
    cellAlign: "left",
    contain: true,
    freeScroll: true,
    responsive: [
        {
            breakpoint: 748,
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

// init with jQuery
if(typeof jQuery !== 'undefined'){
    jQuery('.carousel-2').flickityResponsive({
        cellAlign: "left",
        contain: true,
        freeScroll: true,
        responsive: [
            {
                breakpoint: 748,
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
}