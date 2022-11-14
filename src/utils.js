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

/**
 * Check if value is an empty string
 * @param value
 * @returns {boolean}
 */
export function isEmptyString(value){
    return typeof value === 'string' && value.length === 0;
}

/**
 * Is JSON string
 * https://stackoverflow.com/a/32278428/6453822
 * @param string
 * @returns {any|boolean}
 */
export function isJSON(string){
    try{
        return (JSON.parse(string) && !!string);
    }catch(e){
        return false;
    }
}


/**
 * Get JSON object from string
 * @param string
 * @returns {{}|*|{}}
 */
export function getJSONObjectFromString(string){
    let options = {};
    if(!isJSON(string)) return options;

    options = JSON.parse(string);

    // convert boolean string to real boolean
    for(const [key, value] of Object.entries(options)){
        if(value === "false") options[key] = false;
        if(value === "true") options[key] = true;
    }

    return options;
}


/**
 * Get DOM node from jQuery|DOM
 * @param el
 * @returns {*}
 */
export function getElement(el){
    return isjQueryElement(el) ? el.get()[0] : el;
}