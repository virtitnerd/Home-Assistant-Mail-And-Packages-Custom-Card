function e(e,t,i,s){var r,n=arguments.length,o=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(e,t,i,s);else for(var a=e.length-1;a>=0;a--)(r=e[a])&&(o=(n<3?r(o):n>3?r(t,i,o):r(t,i))||o);return n>3&&o&&Object.defineProperty(t,i,o),o}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=window,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),r=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&r.set(t,e))}return e}toString(){return this.cssText}};const o=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var l;const c=window,d=c.trustedTypes,h=d?d.emptyScript:"",p=c.reactiveElementPolyfillSupport,u={toAttribute(e,t){switch(t){case Boolean:e=e?h:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},m=(e,t)=>t!==e&&(t==t||e==e),g={attribute:!0,type:String,converter:u,reflect:!1,hasChanged:m},_="finalized";let v=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var t;this.finalize(),(null!==(t=this.h)&&void 0!==t?t:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((t,i)=>{const s=this._$Ep(i,t);void 0!==s&&(this._$Ev.set(s,i),e.push(s))}),e}static createProperty(e,t=g){if(t.state&&(t.attribute=!1),this.finalize(),this.elementProperties.set(e,t),!t.noAccessor&&!this.prototype.hasOwnProperty(e)){const i="symbol"==typeof e?Symbol():"__"+e,s=this.getPropertyDescriptor(e,i,t);void 0!==s&&Object.defineProperty(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){return{get(){return this[t]},set(s){const r=this[e];this[t]=s,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||g}static finalize(){if(this.hasOwnProperty(_))return!1;this[_]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),void 0!==e.h&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,t=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of t)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Ep(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(e=this.constructor.h)||void 0===e||e.forEach(e=>e(this))}addController(e){var t,i;(null!==(t=this._$ES)&&void 0!==t?t:this._$ES=[]).push(e),void 0!==this.renderRoot&&this.isConnected&&(null===(i=e.hostConnected)||void 0===i||i.call(e))}removeController(e){var t;null===(t=this._$ES)||void 0===t||t.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,t)=>{this.hasOwnProperty(t)&&(this._$Ei.set(t,this[t]),delete this[t])})}createRenderRoot(){var e;const s=null!==(e=this.shadowRoot)&&void 0!==e?e:this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{i?e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):s.forEach(i=>{const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=i.cssText,e.appendChild(s)})})(s,this.constructor.elementStyles),s}connectedCallback(){var e;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostConnected)||void 0===t?void 0:t.call(e)})}enableUpdating(e){}disconnectedCallback(){var e;null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostDisconnected)||void 0===t?void 0:t.call(e)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EO(e,t,i=g){var s;const r=this.constructor._$Ep(e,i);if(void 0!==r&&!0===i.reflect){const n=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:u).toAttribute(t,i.type);this._$El=e,null==n?this.removeAttribute(r):this.setAttribute(r,n),this._$El=null}}_$AK(e,t){var i;const s=this.constructor,r=s._$Ev.get(e);if(void 0!==r&&this._$El!==r){const e=s.getPropertyOptions(r),n="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==(null===(i=e.converter)||void 0===i?void 0:i.fromAttribute)?e.converter:u;this._$El=r,this[r]=n.fromAttribute(t,e.type),this._$El=null}}requestUpdate(e,t,i){let s=!0;void 0!==e&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||m)(this[e],t)?(this._$AL.has(e)||this._$AL.set(e,t),!0===i.reflect&&this._$El!==e&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(e,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((e,t)=>this[t]=e),this._$Ei=void 0);let t=!1;const i=this._$AL;try{t=this.shouldUpdate(i),t?(this.willUpdate(i),null===(e=this._$ES)||void 0===e||e.forEach(e=>{var t;return null===(t=e.hostUpdate)||void 0===t?void 0:t.call(e)}),this.update(i)):this._$Ek()}catch(e){throw t=!1,this._$Ek(),e}t&&this._$AE(i)}willUpdate(e){}_$AE(e){var t;null===(t=this._$ES)||void 0===t||t.forEach(e=>{var t;return null===(t=e.hostUpdated)||void 0===t?void 0:t.call(e)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){void 0!==this._$EC&&(this._$EC.forEach((e,t)=>this._$EO(t,this[t],e)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var y;v[_]=!0,v.elementProperties=new Map,v.elementStyles=[],v.shadowRootOptions={mode:"open"},null==p||p({ReactiveElement:v}),(null!==(l=c.reactiveElementVersions)&&void 0!==l?l:c.reactiveElementVersions=[]).push("1.6.3");const f=window,$=f.trustedTypes,w=$?$.createPolicy("lit-html",{createHTML:e=>e}):void 0,b="$lit$",k=`lit$${(Math.random()+"").slice(9)}$`,A="?"+k,x=`<${A}>`,S=document,E=()=>S.createComment(""),C=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,U="[ \t\n\f\r]",H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,z=/>/g,M=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),T=/'/g,I=/"/g,O=/^(?:script|style|textarea|title)$/i,R=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),N=Symbol.for("lit-noChange"),L=Symbol.for("lit-nothing"),D=new WeakMap,j=S.createTreeWalker(S,129,null,!1);function B(e,t){if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==w?w.createHTML(t):t}const K=(e,t)=>{const i=e.length-1,s=[];let r,n=2===t?"<svg>":"",o=H;for(let t=0;t<i;t++){const i=e[t];let a,l,c=-1,d=0;for(;d<i.length&&(o.lastIndex=d,l=o.exec(i),null!==l);)d=o.lastIndex,o===H?"!--"===l[1]?o=q:void 0!==l[1]?o=z:void 0!==l[2]?(O.test(l[2])&&(r=RegExp("</"+l[2],"g")),o=M):void 0!==l[3]&&(o=M):o===M?">"===l[0]?(o=null!=r?r:H,c=-1):void 0===l[1]?c=-2:(c=o.lastIndex-l[2].length,a=l[1],o=void 0===l[3]?M:'"'===l[3]?I:T):o===I||o===T?o=M:o===q||o===z?o=H:(o=M,r=void 0);const h=o===M&&e[t+1].startsWith("/>")?" ":"";n+=o===H?i+x:c>=0?(s.push(a),i.slice(0,c)+b+i.slice(c)+k+h):i+k+(-2===c?(s.push(void 0),t):h)}return[B(e,n+(e[i]||"<?>")+(2===t?"</svg>":"")),s]};class V{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let r=0,n=0;const o=e.length-1,a=this.parts,[l,c]=K(e,t);if(this.el=V.createElement(l,i),j.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(s=j.nextNode())&&a.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const e=[];for(const t of s.getAttributeNames())if(t.endsWith(b)||t.startsWith(k)){const i=c[n++];if(e.push(t),void 0!==i){const e=s.getAttribute(i.toLowerCase()+b).split(k),t=/([.?@])?(.*)/.exec(i);a.push({type:1,index:r,name:t[2],strings:e,ctor:"."===t[1]?Z:"?"===t[1]?X:"@"===t[1]?Y:J})}else a.push({type:6,index:r})}for(const t of e)s.removeAttribute(t)}if(O.test(s.tagName)){const e=s.textContent.split(k),t=e.length-1;if(t>0){s.textContent=$?$.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],E()),j.nextNode(),a.push({type:2,index:++r});s.append(e[t],E())}}}else if(8===s.nodeType)if(s.data===A)a.push({type:2,index:r});else{let e=-1;for(;-1!==(e=s.data.indexOf(k,e+1));)a.push({type:7,index:r}),e+=k.length-1}r++}}static createElement(e,t){const i=S.createElement("template");return i.innerHTML=e,i}}function W(e,t,i=e,s){var r,n,o,a;if(t===N)return t;let l=void 0!==s?null===(r=i._$Co)||void 0===r?void 0:r[s]:i._$Cl;const c=C(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(n=null==l?void 0:l._$AO)||void 0===n||n.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,i,s)),void 0!==s?(null!==(o=(a=i)._$Co)&&void 0!==o?o:a._$Co=[])[s]=l:i._$Cl=l),void 0!==l&&(t=W(e,l._$AS(e,t.values),l,s)),t}class F{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var t;const{el:{content:i},parts:s}=this._$AD,r=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:S).importNode(i,!0);j.currentNode=r;let n=j.nextNode(),o=0,a=0,l=s[0];for(;void 0!==l;){if(o===l.index){let t;2===l.type?t=new G(n,n.nextSibling,this,e):1===l.type?t=new l.ctor(n,l.name,l.strings,this,e):6===l.type&&(t=new ee(n,this,e)),this._$AV.push(t),l=s[++a]}o!==(null==l?void 0:l.index)&&(n=j.nextNode(),o++)}return j.currentNode=S,r}v(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class G{constructor(e,t,i,s){var r;this.type=2,this._$AH=L,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cp=null===(r=null==s?void 0:s.isConnected)||void 0===r||r}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===(null==e?void 0:e.nodeType)&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=W(this,e,t),C(e)?e===L||null==e||""===e?(this._$AH!==L&&this._$AR(),this._$AH=L):e!==this._$AH&&e!==N&&this._(e):void 0!==e._$litType$?this.g(e):void 0!==e.nodeType?this.$(e):(e=>P(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==L&&C(this._$AH)?this._$AA.nextSibling.data=e:this.$(S.createTextNode(e)),this._$AH=e}g(e){var t;const{values:i,_$litType$:s}=e,r="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=V.createElement(B(s.h,s.h[0]),this.options)),s);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===r)this._$AH.v(i);else{const e=new F(r,this),t=e.u(this.options);e.v(i),this.$(t),this._$AH=e}}_$AC(e){let t=D.get(e.strings);return void 0===t&&D.set(e.strings,t=new V(e)),t}T(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const r of e)s===t.length?t.push(i=new G(this.k(E()),this.k(E()),this,this.options)):i=t[s],i._$AI(r),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cp=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class J{constructor(e,t,i,s,r){this.type=1,this._$AH=L,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=L}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,i,s){const r=this.strings;let n=!1;if(void 0===r)e=W(this,e,t,0),n=!C(e)||e!==this._$AH&&e!==N,n&&(this._$AH=e);else{const s=e;let o,a;for(e=r[0],o=0;o<r.length-1;o++)a=W(this,s[i+o],t,o),a===N&&(a=this._$AH[o]),n||(n=!C(a)||a!==this._$AH[o]),a===L?e=L:e!==L&&(e+=(null!=a?a:"")+r[o+1]),this._$AH[o]=a}n&&!s&&this.j(e)}j(e){e===L?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class Z extends J{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===L?void 0:e}}const Q=$?$.emptyScript:"";class X extends J{constructor(){super(...arguments),this.type=4}j(e){e&&e!==L?this.element.setAttribute(this.name,Q):this.element.removeAttribute(this.name)}}class Y extends J{constructor(e,t,i,s,r){super(e,t,i,s,r),this.type=5}_$AI(e,t=this){var i;if((e=null!==(i=W(this,e,t,0))&&void 0!==i?i:L)===N)return;const s=this._$AH,r=e===L&&s!==L||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,n=e!==L&&(s===L||r);r&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==i?i:this.element,e):this._$AH.handleEvent(e)}}class ee{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){W(this,e)}}const te=f.litHtmlPolyfillSupport;null==te||te(V,G),(null!==(y=f.litHtmlVersions)&&void 0!==y?y:f.litHtmlVersions=[]).push("2.8.0");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var ie,se;class re extends v{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,t;const i=super.createRenderRoot();return null!==(e=(t=this.renderOptions).renderBefore)&&void 0!==e||(t.renderBefore=i.firstChild),i}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{var s,r;const n=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:t;let o=n._$litPart$;if(void 0===o){const e=null!==(r=null==i?void 0:i.renderBefore)&&void 0!==r?r:null;n._$litPart$=o=new G(t.insertBefore(E(),e),e,void 0,null!=i?i:{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),null===(e=this._$Do)||void 0===e||e.setConnected(!1)}render(){return N}}re.finalized=!0,re._$litElement$=!0,null===(ie=globalThis.litElementHydrateSupport)||void 0===ie||ie.call(globalThis,{LitElement:re});const ne=globalThis.litElementPolyfillSupport;null==ne||ne({LitElement:re}),(null!==(se=globalThis.litElementVersions)&&void 0!==se?se:globalThis.litElementVersions=[]).push("3.3.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const oe=e=>t=>"function"==typeof t?((e,t)=>(customElements.define(e,t),t))(e,t):((e,t)=>{const{kind:i,elements:s}=t;return{kind:i,elements:s,finisher(t){customElements.define(e,t)}}})(e,t),ae=(e,t)=>"method"===t.kind&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(i){i.createProperty(t.key,e)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){"function"==typeof t.initializer&&(this[t.key]=t.initializer.call(this))},finisher(i){i.createProperty(t.key,e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function le(e){return(t,i)=>void 0!==i?((e,t,i)=>{t.constructor.createProperty(i,e)})(e,t,i):ae(e,t)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function ce(e){return le({...e,state:!0})}
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var de,he,pe;null===(de=window.HTMLSlotElement)||void 0===de||de.prototype.assignedElements,function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(he||(he={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(pe||(pe={}));var ue=function(e,t,i,s){s=s||{},i=null==i?{}:i;var r=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return r.detail=i,e.dispatchEvent(r),r};const me="0.0.0-dev",ge="/hacsfiles/Home-Assistant-Mail-And-Packages-Custom-Card",_e={key:"mail",configKey:"entity_mail",label:"Mail"},ve={key:"packages",configKey:"entity_packages",label:"Packages"},ye={key:"delivering",configKey:"entity_delivering",label:"Out for Delivery"},fe={key:"delivered",configKey:"entity_delivered",label:"Delivered"},$e={key:"exception",configKey:"entity_exception",label:"Exception"},we=[{key:"usps",name:"USPS",image:"img/square_usps.png",exceptionImage:"img/square_usps_exception.png",url:"https://informeddelivery.usps.com/",sensors:[_e,ve,ye,fe,$e],hasCamera:!0},{key:"ups",name:"UPS",image:"img/square_ups.png",exceptionImage:"img/square_ups_exception.png",url:"https://wwwapps.ups.com/mcdp",sensors:[ve,ye,fe,$e],hasCamera:!0},{key:"fedex",name:"FedEx",image:"img/square_fedex.png",url:"https://www.fedex.com/en-us/tracking.html",sensors:[ve,ye,fe],hasCamera:!0},{key:"amazon",name:"Amazon",image:"img/square_amazon.png",exceptionImage:"img/square_amazon_exception.png",hubImage:"img/square_amazon-hub.png",sensors:[ve,fe,$e,{key:"hub",configKey:"entity_hub",label:"Hub Locker"},{key:"otp",configKey:"entity_otp",label:"OTP Code"}],hasCamera:!0},{key:"capost",name:"Canada Post",image:"img/square_canada-post.png",url:"https://www.canadapost-postescanada.ca",sensors:[_e,ve,ye,fe]},{key:"dhl",name:"DHL",image:"img/square_dhl.png",url:"https://www.dhl.com",sensors:[ve,ye,fe]},{key:"hermes",name:"Hermes",image:"img/square_hermes-packages.png",url:"https://www.myhermes.co.uk",sensors:[ve,ye,fe]},{key:"royal",name:"Royal Mail",image:"img/square_royal-mail.png",url:"https://www.royalmail.com",sensors:[ve,ye,fe]},{key:"auspost",name:"Australia Post",image:"img/square_auspost.png",url:"https://auspost.com.au",sensors:[ve,ye,fe]},{key:"evri",name:"Evri",image:"img/square_evri.png",url:"https://www.evri.com",sensors:[ve,ye,fe]},{key:"gls",name:"GLS",image:"img/square_gls.png",url:"https://gls-group.eu",sensors:[ve,ye,fe]},{key:"dhl_parcel_nl",name:"DHL Parcel NL",image:"img/square_dhl_parcel_nl.png",url:"https://www.dhlparcel.nl",sensors:[ve,ye,fe]},{key:"inpost_pl",name:"InPost.pl",image:"img/square_inpost_pl.png",url:"https://inpost.pl",sensors:[ve,ye,fe]},{key:"dpd_com_pl",name:"DPD Poland",image:"img/square_dpd_com_pl.png",url:"https://tracktrace.dpd.com.pl",sensors:[ve,ye,fe]},{key:"dpd",name:"DPD",image:"img/square_dpd.png",url:"https://www.dpd.com",sensors:[ve,ye,fe]},{key:"dpd_nl",name:"DPD Netherlands",image:"img/square_dpd_nl.png",url:"https://www.dpd.nl",sensors:[ve,ye,fe]},{key:"post_nl",name:"PostNL",image:"img/square_post_nl.png",exceptionImage:"img/square_post_nl_exception.png",url:"https://www.postnl.nl",sensors:[ve,ye,fe,$e]},{key:"post_de",name:"Deutsche Post",image:"img/square_post_de.png",url:"https://www.deutschepost.de",sensors:[ve,ye]},{key:"post_at",name:"Post Austria",image:"img/square_post_at.png",url:"https://www.post.at",sensors:[ve,ye,fe]},{key:"bolcom",name:"bol.com",image:"img/square_bolcom.png",url:"https://www.bol.com",sensors:[ve,ye,fe]},{key:"walmart",name:"Walmart",image:"img/square_walmart.png",exceptionImage:"img/square_walmart_exception.png",url:"https://www.walmart.com",sensors:[ye,fe,$e],hasCamera:!0},{key:"purolator",name:"Purolator",image:"img/square_purolator.png",url:"https://www.purolator.com",sensors:[ve,ye,fe]},{key:"intelcom",name:"Intelcom",image:"img/square_intelcom.png",url:"https://www.intelcom.ca",sensors:[ve,ye,fe]},{key:"bonshaw_distribution_network",name:"Bonshaw",image:"img/square_bonshaw_distribution_network.png",sensors:[ve,ye,fe]},{key:"poczta_polska",name:"Poczta Polska",image:"img/square_poczta_polska.png",url:"http://emonitoring.poczta-polska.pl",sensors:[ve,ye]},{key:"buildinglink",name:"BuildingLink",image:"img/square_buildinglink.png",sensors:[fe]},{key:"rewe_lieferservice",name:"Rewe Lieferservice",image:"img/square_rewe_lieferservice.png",url:"https://www.rewe.de/service/lieferservice",sensors:[ve,ye,fe]}];var be={name:"Mail and Packages Custom Card",version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error",last_check:"Last Check",in_transit:"In Transit",delivered:"Delivered"},ke={common:be},Ae={name:"Mail and Packages Custom Card",version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel",show_error:"Vis feil",last_check:"Sist sjekket",in_transit:"Under transport",delivered:"Levert"},xe={common:Ae};const Se={en:Object.freeze({__proto__:null,common:be,default:ke}),nb:Object.freeze({__proto__:null,common:Ae,default:xe})};function Ee(e,t="",i=""){const s=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=e.split(".").reduce((e,t)=>e[t],Se[s])}catch(t){r=e.split(".").reduce((e,t)=>e[t],Se.en)}return void 0===r&&(r=e.split(".").reduce((e,t)=>e[t],Se.en)),""!==t&&""!==i&&(r=r.replace(t,i)),r}let Ce=class extends re{constructor(){super(...arguments),this._openSections=new Set(["general"])}setConfig(e){this._config=e}_setTopLevel(e,t){if(!this._config)return;const i={...this._config};t?i[e]=t:delete i[e],this._config=i,ue(this,"config-changed",{config:this._config})}_setCarrierEntity(e,t,i){if(!this._config)return;const s={...this._config.carriers||{}},r={...s[e]||{}};i?r[t]=i:delete r[t],0===Object.keys(r).length?delete s[e]:s[e]=r,this._config={...this._config,carriers:s},ue(this,"config-changed",{config:this._config})}_setCarrierBoolean(e,t,i){if(!this._config)return;const s={...this._config.carriers||{}},r={...s[e]||{}};i?r[t]=!0:delete r[t],s[e]=r,this._config={...this._config,carriers:s},ue(this,"config-changed",{config:this._config})}_toggleSection(e){const t=new Set(this._openSections);t.has(e)?t.delete(e):t.add(e),this._openSections=t}_renderSection(e,t,i){const s=this._openSections.has(e);return R`
      <div class="section">
        <div class="section-header" @click=${()=>this._toggleSection(e)}>
          <span class="section-title">${t}</span>
          <ha-icon icon=${s?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${s?R`<div class="section-body">${i}</div>`:""}
      </div>
    `}_entityPicker(e,t,i,s){return R`
      <ha-selector
        .hass=${this.hass}
        .selector=${{entity:{domain:i[0]}}}
        .value=${null!=t?t:""}
        .label=${e}
        @value-changed=${e=>{var t;return s(null!==(t=e.detail.value)&&void 0!==t?t:"")}}
      ></ha-selector>
    `}_textField(e,t,i){return R`
      <ha-textfield
        .label=${e}
        .value=${t||""}
        @change=${e=>i(e.target.value)}
      ></ha-textfield>
    `}_renderCarrierBody(e){var t,i,s;const r=(null===(i=null===(t=this._config)||void 0===t?void 0:t.carriers)||void 0===i?void 0:i[e.key])||{},n=e.sensors.map(t=>this._entityPicker(t.label,r[t.configKey],["sensor"],i=>this._setCarrierEntity(e.key,t.configKey,i))),o=e.hasCamera?this._entityPicker("Camera",r.entity_camera,["camera"],t=>this._setCarrierEntity(e.key,"entity_camera",t)):R``,a=e.sensors.some(e=>"entity_delivered"===e.configKey),l=e.hasCamera&&r.entity_camera&&a&&"usps"!==e.key?R`
            <ha-formfield label="Only show camera when delivered count > 0">
              <ha-switch
                .checked=${null!==(s=r.camera_only_when_delivered)&&void 0!==s&&s}
                @change=${t=>this._setCarrierBoolean(e.key,"camera_only_when_delivered",t.target.checked)}
              ></ha-switch>
            </ha-formfield>
          `:R``,c="amazon"===e.key?this._textField("Amazon URL (optional)",r.amazon_url,t=>this._setCarrierEntity(e.key,"amazon_url",t)):R``;return R` ${n} ${o} ${l} ${c} `}render(){if(!this.hass||!this._config)return R``;const e=this._config;return R`
      <div class="card-config">
        <p class="version-info">${Ee("common.name")} v${me}</p>

        ${this._renderSection("general","General",R`
            ${this._textField("Card Name",e.name,e=>this._setTopLevel("name",e))}
            ${this._entityPicker("Mail Updated Entity (sensor.mail_updated)",e.entity_mail_updated,["sensor"],e=>this._setTopLevel("entity_mail_updated",e))}
          `)}
        ${this._renderSection("summary","Summary Sensors",R`
            ${this._entityPicker("Packages In Transit",e.entity_packages_in_transit,["sensor"],e=>this._setTopLevel("entity_packages_in_transit",e))}
            ${this._entityPicker("Packages Delivered",e.entity_packages_delivered,["sensor"],e=>this._setTopLevel("entity_packages_delivered",e))}
            ${this._entityPicker("Delivery Message (optional text sensor)",e.entity_delivery_message,["sensor"],e=>this._setTopLevel("entity_delivery_message",e))}
          `)}

        <div class="section-group-label">Carriers</div>

        ${we.map(e=>this._renderSection(`carrier_${e.key}`,e.name,this._renderCarrierBody(e)))}
      </div>
    `}static get styles(){return o`
      .card-config {
        padding: 4px 0;
      }

      .version-info {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        margin: 0 0 12px;
        padding: 0 4px;
      }

      .section {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 4px;
        margin-bottom: 8px;
        overflow: hidden;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
        background: var(--secondary-background-color);
        user-select: none;
      }

      .section-header:hover {
        background: var(--table-row-background-color, var(--secondary-background-color));
      }

      .section-title {
        font-size: 0.9rem;
        font-weight: 500;
      }

      .section-body {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 12px;
        background: var(--card-background-color);
      }

      .section-group-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        padding: 8px 4px 4px;
      }

      ha-entity-picker,
      ha-textfield {
        display: block;
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        padding: 4px 0;
      }
    `}};e([le({attribute:!1})],Ce.prototype,"hass",void 0),e([ce()],Ce.prototype,"_config",void 0),e([ce()],Ce.prototype,"_openSections",void 0),Ce=e([oe("mailandpackages-card-editor")],Ce),console.info(`%c  MAIL AND PACKAGES CARD \n%c  ${Ee("common.version")} ${me}    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"mailandpackages-card",name:"Mail and Packages Card",preview:!0,description:"A custom companion card for the Mail and Packages integration."});const Pe=`${ge}/img/square_delivery.png`;let Ue=class extends re{static async getConfigElement(){return document.createElement("mailandpackages-card-editor")}static getStubConfig(){return{name:"Mail and Packages",carriers:{}}}setConfig(e){if(!e)throw new Error(Ee("common.invalid_configuration"));e.test_gui&&function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config={name:"Mail and Packages",...e}}shouldUpdate(e){return!!this.config&&(e.has("config")||e.has("hass"))}render(){if(this.config.show_warning)return this._showWarning(Ee("common.show_warning"));const e=this.config.entity_mail_updated?this.hass.states[this.config.entity_mail_updated]:void 0,t=this.config.entity_packages_in_transit?this.hass.states[this.config.entity_packages_in_transit]:void 0,i=this.config.entity_packages_delivered?this.hass.states[this.config.entity_packages_delivered]:void 0,s=this.config.entity_delivery_message?this.hass.states[this.config.entity_delivery_message]:void 0,r=this.config.carriers||{};return R`
      <ha-card class="mail-and-packages" tabindex="0">
        ${this._renderHeader(e)} ${this._renderSummary(t,i)}
        ${s?R`<p class="delivery-message">${s.state}</p>`:""}
        <div class="carriers">${we.map(e=>this._renderCarrier(e,r[e.key]))}</div>
      </ha-card>
    `}_renderHeader(e){let t="";if((null==e?void 0:e.state)&&"unavailable"!==e.state&&"unknown"!==e.state)try{t=new Date(e.state).toLocaleString()}catch{t=e.state}return R`
      <div class="card-header-area">
        ${this.config.name?R`<div class="card-title">${this.config.name}</div>`:""}
        ${t?R`<div class="last-updated">${Ee("common.last_check")}: ${t}</div>`:""}
      </div>
    `}_renderSummary(e,t){return e||t?R`
      <div class="summary-row">
        ${e?R`
              <div class="summary-badge" title="${Ee("common.in_transit")}">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${ge}/img/square_in-transit.png"
                    alt="${Ee("common.in_transit")}"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${e.state}</span>
                </div>
                <span class="badge-label">${Ee("common.in_transit")}</span>
              </div>
            `:""}
        ${t?R`
              <div class="summary-badge" title="${Ee("common.delivered")}">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${ge}/img/square_delivery.png"
                    alt="${Ee("common.delivered")}"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${t.state}</span>
                </div>
                <span class="badge-label">${Ee("common.delivered")}</span>
              </div>
            `:""}
      </div>
    `:R``}_renderCarrier(e,t){var i,s,r;if(!t)return R``;const n=e.sensors.filter(e=>t[e.configKey]),o=t.entity_camera?this.hass.states[t.entity_camera]:void 0,a=null===(i=null==o?void 0:o.attributes)||void 0===i?void 0:i.entity_picture,l=t.entity_delivered?parseInt(null!==(r=null===(s=this.hass.states[t.entity_delivered])||void 0===s?void 0:s.state)&&void 0!==r?r:"0",10):0,c=!!a&&(!t.camera_only_when_delivered||l>0);if(0===n.length&&!c)return R``;const d="amazon"===e.key&&t.amazon_url?t.amazon_url:e.url;return R`
      <div class="carrier-section">
        <div class="carrier-header">
          ${d?R`<a class="carrier-name" href="${d}" target="_blank" rel="noopener noreferrer"
                >${e.name}</a
              >`:R`<span class="carrier-name">${e.name}</span>`}
        </div>
        ${c?R`
              <img
                class="delivery-camera"
                src="${a}&interval=30"
                alt="${e.name} delivery camera"
                @click=${()=>this._showMoreInfo(t.entity_camera)}
              />
            `:""}
        <div class="carrier-sensors">
          ${n.map(i=>this._renderSensorBadge(e,i,t))}
        </div>
      </div>
    `}_renderSensorBadge(e,t,i){const s=i[t.configKey];if(!s)return R``;const r=this.hass.states[s];if(!r)return R``;const n=function(e,t){return"exception"===t&&e.exceptionImage?e.exceptionImage:"hub"===t&&e.hubImage?e.hubImage:e.image}(e,t.key),o=`${ge}/${n}`;return R`
      <div class="sensor-badge" title="${t.label}: ${r.state}">
        <div class="badge-icon-wrap">
          <img class="badge-img" src="${o}" alt="${e.name} ${t.label}" @error=${this._onImgError} />
          <span class="badge-count">${r.state}</span>
        </div>
        <span class="badge-label">${t.label}</span>
      </div>
    `}_showMoreInfo(e){ue(this,"hass-more-info",{entityId:e})}_onImgError(e){const t=e.target;t.src.endsWith(Pe)||(t.src=Pe)}_showWarning(e){return R`<hui-warning>${e}</hui-warning>`}static get styles(){return o`
      .mail-and-packages {
        padding: 0;
      }

      /* ── Header ── */
      .card-header-area {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 12px 16px 8px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .card-title {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .last-updated {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }

      /* ── Summary row ── */
      .summary-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 24px;
        padding: 12px 16px 4px;
      }

      /* ── Delivery message ── */
      .delivery-message {
        margin: 0;
        padding: 6px 16px 10px;
        font-size: 0.875rem;
        color: var(--secondary-text-color);
      }

      /* ── Carriers container ── */
      .carriers {
        padding: 0 0 8px;
      }

      /* ── Carrier section ── */
      .carrier-section {
        padding: 10px 16px 4px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .carrier-header {
        margin-bottom: 8px;
      }

      .carrier-name {
        font-size: 0.78rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        text-decoration: none;
      }

      a.carrier-name:hover {
        color: var(--primary-color);
      }

      /* ── Camera ── */
      .delivery-camera {
        width: 100%;
        height: auto;
        border-radius: 4px;
        margin-bottom: 8px;
        cursor: pointer;
        display: block;
      }

      /* ── Sensor badges row ── */
      .carrier-sensors {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 12px;
        padding: 4px 0 8px;
      }

      /* ── Individual badge ── */
      .sensor-badge,
      .summary-badge {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: default;
      }

      .badge-icon-wrap {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
      }

      .badge-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        object-fit: cover;
        display: block;
      }

      .badge-count {
        position: absolute;
        bottom: -4px;
        right: -6px;
        background-color: var(--card-background-color, var(--secondary-background-color));
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        border-radius: 10px;
        font-size: 0.65rem;
        font-weight: 600;
        min-width: 1.15rem;
        height: 1.15rem;
        line-height: 1.15rem;
        text-align: center;
        padding: 0 3px;
        color: var(--primary-text-color);
        box-sizing: border-box;
      }

      .badge-label {
        font-size: 0.6rem;
        color: var(--secondary-text-color);
        margin-top: 6px;
        text-align: center;
        max-width: 4.5rem;
        white-space: normal;
        word-break: break-word;
        line-height: 1.2;
      }

      /* ── Footer version ── */
      .footer {
        padding: 4px 16px 8px;
        text-align: right;
        font-size: 0.65rem;
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
    `}};e([le({attribute:!1})],Ue.prototype,"hass",void 0),e([ce()],Ue.prototype,"config",void 0),Ue=e([oe("mailandpackages-card")],Ue);export{Ue as MailandpackagesCard};
