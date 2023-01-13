# Flickity Responsive

[![release](https://badgen.net/github/release/phucbm/flickity-responsive/)](https://github.com/phucbm/flickity-responsive/releases/latest)
[![minified](https://badgen.net/badge/minified/4KB/cyan)](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/phucbm/flickity-responsive/badge?style=rounded)](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)
[![npm weekly download](https://badgen.net/npm/dm/flickity-responsive)](https://www.npmjs.com/package/flickity-responsive)
[![license](https://badgen.net/github/license/phucbm/flickity-responsive/)](https://github.com/phucbm/flickity-responsive/blob/main/LICENSE)

> A vanilla JS plugin that adds `responsive` option for Flickity. And more extendable settings, see [#docs](#docs)

## Introduction

> At the time of this plugin was made, Flickity does not officially offer any way to update the options on various
> screen-sizes.

Read more about the issue here 👉 https://github.com/metafizzy/flickity/issues/233

So, I create a plugin that brings `responsive` to Flickity, just like the
way [Slick](https://kenwheeler.github.io/slick/) works.

## Getting started

Add the script to your project in this order 👇

- jQuery (optional)
- Flickity
- `flickity-responsive`

### NPM Package

Install NPM package

```shell
npm i flickity-responsive
```

Import

```js
import {FlickityResponsive} from "flickity-responsive";
```

### Download

👉 Self hosted - [Download the latest release](https://github.com/phucbm/flickity-responsive/releases/latest)

```html

<script src="./flickity-responsive.min.js"></script>
```

👉 CDN Hosted - [jsDelivr](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)

```html

<script src="https://cdn.jsdelivr.net/gh/phucbm/flickity-responsive@2.0.3/flickity-responsive.min.js"></script>
```

## Usage

Just change the name, all other options stay the same.

- `new Flickity()` => `new FlickityResponsive()`.
- `$('.carousel').flickity()` => `$('.carousel').flickityResponsive()`.

```js
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
$('.carousel').flickityResponsive({
    responsive: [
        {
            breakpoint: 768,
            settings: {
                destroy: true
            }
        }
    ]
});
```

### Init with HTML

Use data attribute to init Flickity Responsive, just exactly like Flickity.

```html

<div data-flickity-responsive='{ "cellAlign": "left", "contain": true }'>
    <div class="carousel-cell"></div>
    <div class="carousel-cell"></div>
    <div class="carousel-cell"></div>
</div>
```

> ⚠️ Options set in HTML must be valid JSON.

## Docs

```js
const carousel = new FlickityResponsive('.carousel', {
    contain: true, // default in Flickity Responsive

    // Extended options
    destroy: false, // destroy flickity
    prevArrow: undefined, // DOM element, jQuery element
    nextArrow: undefined, // DOM element, jQuery element
    responsiveNavigation: true, // Hide navigation elements if the slider is not slide-able

    // indicator
    indicatorZeroPad: false,
    indicatorCurrent: undefined,
    indicatorTotal: undefined,
});
```

## FYI

This plugin respects Flickity's API and use `matchMedia()` to know when to destroy and re-initialize the
carousel.

> **⚠️ Important note**: the `breakpoint` property is using CSS `max-width` logic. For instance, when you
> set `breakpoint:480`, that means responsive settings will be applied when the viewport is `<=480px` (while Slick
> is `<480px`). Let's be cleared 💎

## Deployment

### Dev server

Run dev server

```shell
npm run dev
```

### Generate production files

Before generate UMD and module version:

1. Update version in `package.json`
2. Update version in `README.md`

```shell
# Generate prod files
npm run prod

# Publish package
npm publish
```

### Build sites

Build production site

```shell
# Netlify build
npm run build
```
