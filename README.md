# Flickity v2.2.2 - Extend v2.0.0

https://flickity.metafizzy.co/

## Getting started

### 1. Enqueue

```php
wp_enqueue_style( 'flickity-extend' );
wp_enqueue_script( 'flickity-extend' );
```

### 2. Init

```html

<div class="carousel">
    <div class="carousel-item">1</div>
    <div class="carousel-item">2</div>
</div>
```

```js
// VanillaJS
new FlickityResponsive(document.querySelector('.your-carousel'), {
    // options
    cellAlign: 'left',
    contain: true
});

// jQuery
$('.carousel').flickityResponsive({
    // options
    cellAlign: 'left',
    contain: true
});
```

### 3. CSS

Set width for the slide-item using CSS.

```css
.carousel-item {width:33.33%;}
```

Details at 👉 https://flickity.metafizzy.co/

## Custom options

| Option | Type | Default | Description |
| ------ | ------ | ------ | ------ |
| responsive | array | `[]` | responsive array |
| destroy | boolean | `false` | destroy carousel |
| lazyLoadNumber | int/boolean | `true` | adjacent slides to be loaded first |
| prevArrow | jQuery element | `undefined` | prev arrow |
| nextArrow | jQuery element | `undefined` | next arrow |
| indicatorCurrent | jQuery element | `undefined` | update text with the current slide on change |
| indicatorTotal | jQuery element | `undefined` | update text with total slide on init |
| indicatorZeroPad | boolean | `true` | zero pad for indicator (ex: 01, 02) |
| autoPlayInViewport | boolean | `true` | only run autoplay when carousel is in viewport using ScrollSnooper |

## Features

### Responsive

Flickity's layouts are handled entirely by CSS. Hence, there is no JS options to responsive the options 🤯. Check the
issue [here](https://github.com/metafizzy/flickity/issues/233).

To update options on vary breakpoints, use `$.fn.flickityResponsive()` to init and add property `responsive` just like
what
we do with Slick 😍

```js
$('.carousel').flickityResponsive({
    // Flickity options
    cellAlign: 'left',
    contain: true,

    // Extended option
    responsive: [
        {
            breakpoint: 767,
            settings: {
                // Flickity options
                contain: false,
                groupCells: '65%',
            }
        },
        {
            breakpoint: 480,
            settings: {
                // Flickity options
                contain: false,
                groupCells: '80%'
            }
        }
    ]
});
```

`$.fn.flickityResponsive()` comes with the Flickity vendor by default.

> **⚠️ Important note**: the `breakpoint` property is using CSS `max-width` logic. For instance, when you
> set `breakpoint:480`, that means responsive settings will be applied when the viewport is `<=480px` (while Slick
> is `<480px`). Let's be cleared 💎

### Destroy

Use custom property `destroy` to destroy or init slider at a given breakpoint.

```js
$slider.flickityResponsive({
    destroy: true, // destroy slider
    responsive: [
        {
            breakpoint: 1023,
            settings: {
                destroy: false, // init slider
            }
        }
    ]
});
```

### Lazyload

Lazyload for both `<img>` and `background-image` will be enabled by default.

To set adjacent slides to be loaded first, use custom property `lazyLoadNumber`

```js
$slider.flickityResponsive({
    lazyLoadNumber: 2
});
```

To use the original properties, simply remove `lazyLoadNumber`
and add Flickity properties.

```js
$slider.flickityResponsive({
    lazyLoad: 2,
    bgLazyLoad: 2
});
```

> 💡 Use [ev_get_lazyload_background_image()](https://github.com/viivue/eevee/blob/master/helper/functions.php#L182) to
> quickly get html that support lazyload.

### Custom arrows

```js
$slider.flickityResponsive({
    prevArrow: $wrapper.find('.flickity-button.previous'),
    nextArrow: $wrapper.find('.flickity-button.next')
});
```

### Indicator

```js
$slider.flickityResponsive({
    indicatorCurrent: $wrapper.find('[data-current-slide]'),
    indicatorTotal: $wrapper.find('[data-total-slide]')
});
```

## Changelog

### [1.9.5] - 2022-09-26

- Return Flickity instance after init

### [1.9.4] - 2022-09-07

- Add CSS for Position relative button
- Remove Flickity Lazyload Icon

### [1.9.3] - 2022-06-02

- Support init by VanillaJS

### [1.9.2] - 2022-03-11

- Remove `flickity-extended-hybrid-layout`
- Remove focus box-shadow
- Add `flickity-button-visible-hover`
- Add `--flkt-opacity`

### [1.9.1] - 2021-10-28

- Check when init undefined element

### [1.9] - 2021-10-18

- Hide arrows and dots if there is just one single slide
- Autoplay only run when carousel is in viewport using ScrollSnooper
- Default dragging motion
- Default `groupCells:'100%'`

### [1.8] - 2021-10-08

- Add option `indicatorCurrent`, `indicatorTotal` and `indicatorZeroPad`

### [1.7] - 2021-10-07

- Add option `prevArrow` and `nextArrow`
- Fix click through bug on disabled buttons

### [1.6] - 2021-10-04

- Fix bug: add sync when `asNavFor` is enabled

### [1.5] - 2021-09-27

- Fix bug when `responsive` property is not defined.

### [1.4] - 2021-09-24

- Add `lazyLoadNumber` property
- Refactor Flickity Responsive

### [1.3] - 2021-09-10

- Add option `destroy` to destroy slider at any breakpoint.

### [1.2] - 2021-08-17

- Load `bg-lazyload` by default
- Add default CSS for buttons
- Fix bug `flickity-fade`: use CSS important to override Flickity's JS transition

### [1.1] - 2021-08-12

- Add `flickity-fade` support inside `flickity-extend`
- Add hybrid mobile layout
- Hide arrow if there is only one item

### [1.0] - 2021-08-10

- Add `$.fn.flickityResponsive()` for option's responsiveness.