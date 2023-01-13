/**!
 * Flickity Responsive v2.0.3
 * @author phucbm
 * @homepage https://github.com/phucbm/flickity-responsive
 * @license MIT 2023
 */var t={d:(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{M:()=>m,D:()=>w});
/**!
 * Match Media Screen v0.0.3
 * @author phucbm
 * @homepage https://github.com/phucbm/match-media-screen
 * @license MIT 2022
 */
var n={d:(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},r={};function o(t,e=!0){const n=[...t];return e?n.sort(((t,e)=>t.breakpoint<e.breakpoint?1:-1)):n.sort(((t,e)=>t.breakpoint>e.breakpoint?1:-1)),n}function i(t,e=150){let n;return(...r)=>{clearTimeout(n),n=setTimeout((()=>{t.apply(this,r)}),e)}}n.d(r,{o:()=>s});class s{constructor(t){if(this.dev=!0===t.dev,this.object=t.object||void 0,this.object){if(this.onMatched=t.onMatched,this.onUpdate=t.onUpdate,window.addEventListener("resize",i((()=>{"function"==typeof this.onUpdate&&this.onUpdate(this.currentObject)}),this.debounce)),!this.object.responsive)return this.currentObject={type:"no-responsive",lastBreakpoint:void 0,breakpoint:-1,object:this.mergeObject(-1,this.object)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject),this.dev&&console.warn("Property object must have responsive array."),!1;this.isInherit=void 0===t.isInherit||t.isInherit,this.debounce=t.debounce||100,this.currentObject={breakpoint:void 0,object:{}},this.object.responsive=o(this.object.responsive),this.match(),window.addEventListener("resize",i((()=>this.match()),this.debounce))}else console.error("Property object:{} must be provided.")}match(){let t=!1;for(let e=0;e<this.object.responsive.length;e++){const n=this.object.responsive[e];if(t=matchMedia(this.getQuery(e)).matches,t){this.currentObject.breakpoint!==n.breakpoint&&(this.currentObject={type:"responsive",lastBreakpoint:this.currentObject.breakpoint,breakpoint:n.breakpoint,object:this.mergeObject(n.breakpoint,n.settings)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject));break}}t||-1===this.currentObject.breakpoint||(this.currentObject={type:"default",lastBreakpoint:this.currentObject.breakpoint,breakpoint:-1,object:this.mergeObject(-1,this.object)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject))}getQuery(t){let e=`screen and (max-width:${this.object.responsive[t].breakpoint}px)`;const n=this.object.responsive[t+1];return n&&(e+=` and (min-width:${n.breakpoint+1}px)`),e}mergeObject(t,e){let n={...e};if(this.isInherit&&-1!==t){const e=o(this.object.responsive,!1);for(let r=0;r<e.length;r++)e[r].breakpoint>t&&(n={...e[r].settings,...n})}return n={...this.object,...n},delete n.responsive,n}}var c=r.o;function a(t){let e={};if(!function(t){try{return JSON.parse(t)&&!!t}catch(t){return!1}}(t))return e;e=JSON.parse(t);for(const[t,n]of Object.entries(e))"false"===n&&(e[t]=!1),"true"===n&&(e[t]=!0);return e}function d(t){return e=t,"undefined"!=typeof jQuery&&e instanceof jQuery?t.get()[0]:t;var e}function u(t,e){if(e.isInfinite)return;const n=e.customArrows.prevArrow.el,r=e.customArrows.nextArrow.el,o=function(t){const{selectedIndex:e,slides:n}=t;return 0===e?0:e===n.length-1?1:-1}(t);0===o?(n.setAttribute("disabled","disabled"),r.removeAttribute("disabled")):1===o?(r.setAttribute("disabled","disabled"),n.removeAttribute("disabled")):(n.removeAttribute("disabled"),r.removeAttribute("disabled"))}function h(t,e){const n=!0===e.indicatorZeroPad,r=d(e.indicatorTotal),o=d(e.indicatorCurrent),i=t.cells.length;if(r&&(r.innerText=n?l(i):i),o){let e=t.selectedIndex;o.innerText=n?l(e+1):e+1,t.on("change",(t=>{o.innerText=n?(t+1).toString().padStart(2,"0"):t+1}))}}function l(t=0){return t.toString().padStart(2,"0")}function p(t,e){let n=Flickity.data(t);const r=void 0!==n;if(r&&n.destroy(),e.destroy)r&&n.destroy();else{if(e.wrapAround)if(n)e.wrapAround=v(n);else{const n=document.querySelector(t);e.wrapAround=v(!1,n)}n=new Flickity(t,e),e.isInfinite=e.hasOwnProperty("wrapAround")&&e.wrapAround,function(t,e){const n={prevArrow:{func:()=>t.previous()},nextArrow:{func:()=>t.next()}};let r=!1;Object.entries(n).forEach((([o,i])=>{if(!e.hasOwnProperty(o))return;const s=d(e[o]);"object"==typeof s&&(s.addEventListener("click",(()=>i.func())),n[o].el=s,t.element.classList.add(`has-custom-${o}`),r=!0)})),e.customArrows=n,r&&(u(t,e),t.on("change",(()=>u(t,e))))}(n,e),h(n,e),n.resize()}}function b(t,e){if(!0!==e.responsiveNavigation)return;const n=[t.pageDots?t.pageDots.holder:void 0,t.prevButton?t.prevButton.element:void 0,t.nextButton?t.nextButton.element:void 0,e.customArrows?e.customArrows.prevArrow.el:void 0,e.customArrows?e.customArrows.nextArrow.el:void 0],r=t.slideableWidth>t.size.innerWidth;n.forEach((t=>{t&&"object"==typeof t&&(r?(t.classList.remove(e._class.buttonFreeze),t.style.display=""):(t.classList.add(e._class.buttonFreeze),t.style.display="none"))}))}function f(t,e,n){return"undefined"==typeof Flickity?(console.warn("Flickity is undefined!"),!1):(new c({object:e,onMatched:e=>p(t,{...n,...e.object}),onUpdate:e=>function(t,e){let n=Flickity.data(t);n&&(b(n,e),e.wrapAround&&(n.options.wrapAround=v(n)))}(t,{...n,...e.object})}),function(t,e){let n=Flickity.data(t);n&&(e.object?.wrapAround&&(e.object.wrapAround=v(n)),b(n,e),h(n,e))}(t,{...n,object:e}),!0)}function v(t,e=null){if(t){const e=t.cells.reduce(((t,e)=>t+e.size.width),0);return Math.round(t.size.width)>Math.round(e)}const n=[...e.children].reduce(((t,e)=>t+e.getBoundingClientRect().width),0);return Math.round(e.getBoundingClientRect().width)>Math.round(n)}const y="data-flickity-responsive",j={contain:!0,destroy:!1,prevArrow:void 0,nextArrow:void 0,responsiveNavigation:!0,indicatorZeroPad:!1,indicatorCurrent:void 0,indicatorTotal:void 0,_class:{buttonFreeze:"flickity-button-freeze"}};class w{constructor(t,e){if(f(t,e,j))return this.flickity=Flickity.data(t),this.flickity}}var k;"undefined"!=typeof jQuery&&((k=jQuery).fn.flickityResponsive=function(t){k(this).get().forEach((e=>new w(e,t)))}),document.querySelectorAll(`[${y}]`).forEach((t=>{const e=a(t.getAttribute(y));new w(t,e)}));class m{constructor(t,e){new w(t,e)}}"undefined"!=typeof jQuery&&function(t){t.fn.flickityExtend=function(e){t(this).get().forEach((t=>new w(t,e)))}}(jQuery);var A=e.M,g=e.D;export{A as FlickityExtend,g as FlickityResponsive};