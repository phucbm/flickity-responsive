/**
 * ARIA hidden element must not be focusable or contain focusable elements
 * @description Add tabindex="-1" to all elements with or inside aria-hidden="true"
 * https://dequeuniversity.com/rules/axe/4.10/aria-hidden-focus
 */
export function initAriaHiddenFocus(flkty, options){
    if(!options.ariaHiddenFocus) return;

    flkty.element.querySelectorAll(options.ariaHiddenFocusSelector).forEach(el => {
        el.setAttribute('tabindex', '-1');

        el.classList.add('is-focus-disabled');
    });
}