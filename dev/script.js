// public styles
import '../public/style/fonts.css';

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
document.title = `[DEV] ${title} - ${packageInfo.description}`;
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