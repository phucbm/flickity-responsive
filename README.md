# Flickity Responsive

[![release](https://badgen.net/github/release/phucbm/flickity-responsive/)](https://github.com/phucbm/flickity-responsive/releases/latest)
[![minified](https://badgen.net/badge/minified/4KB/cyan)](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)
[![jsdelivr](https://data.jsdelivr.com/v1/package/gh/phucbm/flickity-responsive/badge?style=rounded)](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)
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

<script src="https://cdn.jsdelivr.net/gh/phucbm/flickity-responsive@2.0.0-alpha/flickity-responsive.min.js"></script>
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
```

## Docs

```js
const carousel = new FlickityResponsive('.carousel', {
    contain: true, // default in Flickity Responsive
    destroy: false, // destroy flickity
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

Generate UMD and module version

```shell
npm run prod
```

### Build sites

Build production site

```shell
npm run build
```
