/**
 * Debounce (ignore all, run the last)
 * https://www.freecodecamp.org/news/javascript-debounce-example/
 * @param func
 * @param timeout
 * @returns {(function(...[*]): void)|*}
 */
export function debounce(func, timeout = 150){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, args);
        }, timeout);
    };
}

/**
 * Is jQuery element
 * @param element : HTMLElement
 * @returns {boolean}
 */
export function isjQueryElement(element){
    return typeof jQuery !== 'undefined' && element instanceof jQuery;
}