# Flickity Responsive

[![npm version](https://badgen.net/npm/v/flickity-responsive?icon=npm)](https://www.npmjs.com/package/flickity-responsive)
[![npm downloads](https://badgen.net/npm/dm/flickity-responsive?icon=npm)](https://www.npmjs.com/package/flickity-responsive)
[![jsdelivr hits](https://badgen.net/jsdelivr/hits/gh/phucbm/flickity-responsive?icon=jsdelivr)](https://www.jsdelivr.com/package/gh/phucbm/flickity-responsive)
[![GitHub release](https://badgen.net/jsdelivr/rank/npm/flickity-responsive?icon=jsdelivr)](https://github.com/phucbm/flickity-responsive/releases)
[![Netlify Status](https://api.netlify.com/api/v1/badges/9f75e2e8-1ebf-4aa7-83f0-c4fb4942df2e/deploy-status)](https://app.netlify.com/sites/flickity/deploys)
[![license](https://badgen.net/github/license/phucbm/flickity-responsive?icon=github)](https://github.com/phucbm/flickity-responsive/blob/main/LICENSE)
[![Made in Vietnam](https://raw.githubusercontent.com/webuild-community/badge/master/svg/made.svg)](https://webuild.community)

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

<script src="https://cdn.jsdelivr.net/gh/phucbm/flickity-responsive@2.1.5/flickity-responsive.min.js"></script>
```

## Usage

Just change the name, all other options stay the same.

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

Visit https://flickity.netlify.app for examples.

```js
const carousel = new FlickityResponsive('.carousel', {
    contain: true, // default in Flickity Responsive

    // Extra features 👇

    // destroy
    destroy: false,

    // custom arrows
    prevArrow: undefined, // DOM element, jQuery element
    nextArrow: undefined, // DOM element, jQuery element

    // indicator numbers
    indicatorCurrent: undefined, // current slides, DOM element, jQuery element
    indicatorTotal: undefined, // total slides, DOM element, jQuery element

    // hide navigation elements if the slider is not slide-able
    responsiveNavigation: true,

    // indicator
    indicatorZeroPad: false,
    indicatorCurrent: undefined,
    indicatorTotal: undefined,

    // force move
    forceMove: true, // make sure that every time an arrows clicked, the carousel will move

    // aria hidden focus
    ariaHiddenFocus: true, // Add tabindex="-1" to all elements with or inside aria-hidden="true"
    ariaHiddenFocusSelector: `[aria-hidden="true"] a, [aria-hidden="true"] button`,
});
```

## FYI

This plugin respects Flickity's API and use `matchMedia()` to know when to destroy and re-initialize the
carousel.

> **⚠️ Important note**: the `breakpoint` property is using CSS `max-width` logic. For instance, when you
> set `breakpoint:480`, that means responsive settings will be applied when the viewport is `<=480px` (while Slick
> is `<480px`). Let's be cleared 💎

## Deployment

Before release, update version in `package.json` and `README.md`.

```shell
# Run dev server
npm run dev

# Generate prod files
npm run prod

# Publish package
npm publish

# build
npm run build
```

## License

[MIT License](https://github.com/phucbm/flickity-responsive/blob/master/LICENSE)

Copyright (c) 2021-2025 Phuc Bui

> Please leave a star ⭐️ to support my work. Thank you!
