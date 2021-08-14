# Flickity responsive v1.0.0

A jQuery plugin that adds `responsive` option for Flickity.

## Introduce

> At the time of this plugin was made, Flickity does not officially offer any way to update the options on various screensizes.

You will need to write more code using `matchMedia()` to have that. 

Read more here 👉 https://github.com/metafizzy/flickity/issues/233

So, I create an jQuery plugin that brings `responsive` to Flickity, just like the way [Slick](https://kenwheeler.github.io/slick/) works.

You can also test this out on CodePen 👉 https://codepen.io/phucbui/pen/ExmJVZa

## Install

Add `flickity-responsive.js` to your scripts, in this order 👇

- jQuery
- Flickity
- `flickity-responsive.js`

### Download

Directly from Github

[⬇️ flickity-responsive.js](https://raw.githubusercontent.com/phucbm/flickity-responsive/master/flickity-responsive.js)

or

### CDN [![](https://data.jsdelivr.com/v1/package/gh/phucbm/flickity-responsive/badge)](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)

```html
<script src="https://cdn.jsdelivr.net/gh/phucbm/flickity-responsive@master/flickity-responsive.js"></script>
```

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

## FYI

This plugin uses Flickity's API and `matchMedia()` with some logics to decide when to destroy and re-initialize the carousel.

> **⚠️ Important note**: the `breakpoint` property is using CSS `max-width` logic. For instance, when you set `breakpoint:480`, that means responsive settings will be applied when the viewport is `<=480px` (while Slick is `<480px`). Let's be cleared 💎
