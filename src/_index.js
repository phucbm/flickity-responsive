import {uniqueId} from "./utils";


/**
 * Private class
 */
class Wellii{
    constructor(options){
        this.id = uniqueId();
        this.options = {
            el: undefined,
            ...options
        };

        this.options.el.innerHTML = 'Hello!';
    }
}


/**
 * Private class Controller
 * This class will hold instances of the library's objects
 */
class Controller{
    constructor(){
        this.instances = [];
    }

    add(instance){
        this.instances.push(instance);
    }

    get(id){
        return this.instances.filter(instance => instance.id === id)[0];
    }
}


/**
 * Public library data
 * access via window.WelliiController
 */
window.WelliiController = new Controller();


/**
 * Public library object
 * access via window.Wellii
 */
window.Wellii = {
    // init new instances
    init: (options = {}) => {
        const selector = options.selector || '[data-wellii]';

        // init with selector
        document.querySelectorAll(selector).forEach(el => {
            window.WelliiController.add(new Wellii({el, ...options}));
        });
    },
    // Get instance object by ID
    get: id => window.WelliiController.get(id)
};

window.Wellii.init();