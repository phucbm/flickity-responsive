# Flickity responsive

A jQuery plugin that adds `responsive` option for Flickity.

## Install

Add `flickity-responsive.js` to your scripts, in this order 👇

- jQuery
- Flickity
- `flickity-responsive.js`

### Download

- [flickity-responsive.js](https://github.com/phucbm/flickity-responsive/flickity-responsive.js)

### CDN

Updating.

## Usage

Use `$('.carousel').flickityResponsive()` to initialize your carousel.

```js
// init flickity responsive
$('.carousel').flickityResponsive({
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
```