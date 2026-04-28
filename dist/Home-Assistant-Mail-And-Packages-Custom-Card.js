function e(e,t,s,i){var r,n=arguments.length,a=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(e,t,s,i);else for(var o=e.length-1;o>=0;o--)(r=e[o])&&(a=(n<3?r(a):n>3?r(t,s,a):r(t,s))||a);return n>3&&a&&Object.defineProperty(t,s,a),a}"function"==typeof SuppressedError&&SuppressedError;
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),r=new WeakMap;let n=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=r.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(t,e))}return e}toString(){return this.cssText}};const a=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new n(s,e,i)},o=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:c,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:p,getPrototypeOf:m}=Object,g=globalThis,u=g.trustedTypes,_=u?u.emptyScript:"",$=g.reactiveElementPolyfillSupport,y=(e,t)=>e,f={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},v=(e,t)=>!c(e,t),b={attribute:!0,type:String,converter:f,reflect:!1,useDefault:!1,hasChanged:v};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let w=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=b){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&l(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:r}=d(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);r?.call(this,t),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??b}static _$Ei(){if(this.hasOwnProperty(y("elementProperties")))return;const e=m(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(y("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(y("properties"))){const e=this.properties,t=[...h(e),...p(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(o(e))}else void 0!==e&&t.push(o(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),r=t.litNonce;void 0!==r&&i.setAttribute("nonce",r),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:f).toAttribute(t,s.type);this._$Em=e,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:f;this._$Em=i;const n=r.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,s,i=!1,r){if(void 0!==e){const n=this.constructor;if(!1===i&&(r=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??v)(r,t)||s.useDefault&&s.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:r},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==r||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};w.elementStyles=[],w.shadowRootOptions={mode:"open"},w[y("elementProperties")]=new Map,w[y("finalized")]=new Map,$?.({ReactiveElement:w}),(g.reactiveElementVersions??=[]).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const A=globalThis,x=e=>e,k=A.trustedTypes,S=k?k.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,P="?"+C,M=`<${P}>`,H=document,T=()=>H.createComment(""),N=e=>null===e||"object"!=typeof e&&"function"!=typeof e,I=Array.isArray,U="[ \t\n\f\r]",O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,q=/-->/g,z=/>/g,R=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),D=/'/g,L=/"/g,j=/^(?:script|style|textarea|title)$/i,B=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),V=new WeakMap,K=H.createTreeWalker(H,129);function F(e,t){if(!I(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}let Z=class e{constructor({strings:t,_$litType$:s},i){let r;this.parts=[];let n=0,a=0;const o=t.length-1,c=this.parts,[l,d]=((e,t)=>{const s=e.length-1,i=[];let r,n=2===t?"<svg>":3===t?"<math>":"",a=O;for(let t=0;t<s;t++){const s=e[t];let o,c,l=-1,d=0;for(;d<s.length&&(a.lastIndex=d,c=a.exec(s),null!==c);)d=a.lastIndex,a===O?"!--"===c[1]?a=q:void 0!==c[1]?a=z:void 0!==c[2]?(j.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=R):void 0!==c[3]&&(a=R):a===R?">"===c[0]?(a=r??O,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?R:'"'===c[3]?L:D):a===L||a===D?a=R:a===q||a===z?a=O:(a=R,r=void 0);const h=a===R&&e[t+1].startsWith("/>")?" ":"";n+=a===O?s+M:l>=0?(i.push(o),s.slice(0,l)+E+s.slice(l)+C+h):s+C+(-2===l?t:h)}return[F(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]})(t,s);if(this.el=e.createElement(l,i),K.currentNode=this.el.content,2===s||3===s){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(r=K.nextNode())&&c.length<o;){if(1===r.nodeType){if(r.hasAttributes())for(const e of r.getAttributeNames())if(e.endsWith(E)){const t=d[a++],s=r.getAttribute(e).split(C),i=/([.?@])?(.*)/.exec(t);c.push({type:1,index:n,name:i[2],strings:s,ctor:"."===i[1]?Y:"?"===i[1]?ee:"@"===i[1]?te:X}),r.removeAttribute(e)}else e.startsWith(C)&&(c.push({type:6,index:n}),r.removeAttribute(e));if(j.test(r.tagName)){const e=r.textContent.split(C),t=e.length-1;if(t>0){r.textContent=k?k.emptyScript:"";for(let s=0;s<t;s++)r.append(e[s],T()),K.nextNode(),c.push({type:2,index:++n});r.append(e[t],T())}}}else if(8===r.nodeType)if(r.data===P)c.push({type:2,index:n});else{let e=-1;for(;-1!==(e=r.data.indexOf(C,e+1));)c.push({type:7,index:n}),e+=C.length-1}n++}}static createElement(e,t){const s=H.createElement("template");return s.innerHTML=e,s}};function G(e,t,s=e,i){if(t===B)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=N(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=G(e,r._$AS(e,t.values),r,i)),t}let J=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??H).importNode(t,!0);K.currentNode=i;let r=K.nextNode(),n=0,a=0,o=s[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new Q(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new se(r,this,e)),this._$AV.push(t),o=s[++a]}n!==o?.index&&(r=K.nextNode(),n++)}return K.currentNode=H,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}},Q=class e{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=G(this,e,t),N(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==B&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>I(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&N(this._$AH)?this._$AA.nextSibling.data=e:this.T(H.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Z.createElement(F(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new J(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=V.get(e.strings);return void 0===t&&V.set(e.strings,t=new Z(e)),t}k(t){I(this._$AH)||(this._$AH=[],this._$AR());const s=this._$AH;let i,r=0;for(const n of t)r===s.length?s.push(i=new e(this.O(T()),this.O(T()),this,this.options)):i=s[r],i._$AI(n),r++;r<s.length&&(this._$AR(i&&i._$AB.nextSibling,r),s.length=r)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=x(e).nextSibling;x(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}},X=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(void 0===r)e=G(this,e,t,0),n=!N(e)||e!==this._$AH&&e!==B,n&&(this._$AH=e);else{const i=e;let a,o;for(e=r[0],a=0;a<r.length-1;a++)o=G(this,i[s+a],t,a),o===B&&(o=this._$AH[a]),n||=!N(o)||o!==this._$AH[a],o===W?e=W:e!==W&&(e+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},Y=class extends X{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}},ee=class extends X{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}},te=class extends X{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=G(this,e,t,0)??W)===B)return;const s=this._$AH,i=e===W&&s!==W||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},se=class{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){G(this,e)}};const ie=A.litHtmlPolyfillSupport;ie?.(Z,Q),(A.litHtmlVersions??=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const re=globalThis,ne=e=>e,ae=re.trustedTypes,oe=ae?ae.createPolicy("lit-html",{createHTML:e=>e}):void 0,ce="$lit$",le=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+le,he=`<${de}>`,pe=document,me=()=>pe.createComment(""),ge=e=>null===e||"object"!=typeof e&&"function"!=typeof e,ue=Array.isArray,_e="[ \t\n\f\r]",$e=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ye=/-->/g,fe=/>/g,ve=RegExp(`>|${_e}(?:([^\\s"'>=/]+)(${_e}*=${_e}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),be=/'/g,we=/"/g,Ae=/^(?:script|style|textarea|title)$/i,xe=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),ke=Symbol.for("lit-noChange"),Se=Symbol.for("lit-nothing"),Ee=new WeakMap,Ce=pe.createTreeWalker(pe,129);function Pe(e,t){if(!ue(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==oe?oe.createHTML(t):t}const Me=(e,t)=>{const s=e.length-1,i=[];let r,n=2===t?"<svg>":3===t?"<math>":"",a=$e;for(let t=0;t<s;t++){const s=e[t];let o,c,l=-1,d=0;for(;d<s.length&&(a.lastIndex=d,c=a.exec(s),null!==c);)d=a.lastIndex,a===$e?"!--"===c[1]?a=ye:void 0!==c[1]?a=fe:void 0!==c[2]?(Ae.test(c[2])&&(r=RegExp("</"+c[2],"g")),a=ve):void 0!==c[3]&&(a=ve):a===ve?">"===c[0]?(a=r??$e,l=-1):void 0===c[1]?l=-2:(l=a.lastIndex-c[2].length,o=c[1],a=void 0===c[3]?ve:'"'===c[3]?we:be):a===we||a===be?a=ve:a===ye||a===fe?a=$e:(a=ve,r=void 0);const h=a===ve&&e[t+1].startsWith("/>")?" ":"";n+=a===$e?s+he:l>=0?(i.push(o),s.slice(0,l)+ce+s.slice(l)+le+h):s+le+(-2===l?t:h)}return[Pe(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class He{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let r=0,n=0;const a=e.length-1,o=this.parts,[c,l]=Me(e,t);if(this.el=He.createElement(c,s),Ce.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=Ce.nextNode())&&o.length<a;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(ce)){const t=l[n++],s=i.getAttribute(e).split(le),a=/([.?@])?(.*)/.exec(t);o.push({type:1,index:r,name:a[2],strings:s,ctor:"."===a[1]?Oe:"?"===a[1]?qe:"@"===a[1]?ze:Ue}),i.removeAttribute(e)}else e.startsWith(le)&&(o.push({type:6,index:r}),i.removeAttribute(e));if(Ae.test(i.tagName)){const e=i.textContent.split(le),t=e.length-1;if(t>0){i.textContent=ae?ae.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],me()),Ce.nextNode(),o.push({type:2,index:++r});i.append(e[t],me())}}}else if(8===i.nodeType)if(i.data===de)o.push({type:2,index:r});else{let e=-1;for(;-1!==(e=i.data.indexOf(le,e+1));)o.push({type:7,index:r}),e+=le.length-1}r++}}static createElement(e,t){const s=pe.createElement("template");return s.innerHTML=e,s}}function Te(e,t,s=e,i){if(t===ke)return t;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const n=ge(t)?void 0:t._$litDirective$;return r?.constructor!==n&&(r?._$AO?.(!1),void 0===n?r=void 0:(r=new n(e),r._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(t=Te(e,r._$AS(e,t.values),r,i)),t}class Ne{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??pe).importNode(t,!0);Ce.currentNode=i;let r=Ce.nextNode(),n=0,a=0,o=s[0];for(;void 0!==o;){if(n===o.index){let t;2===o.type?t=new Ie(r,r.nextSibling,this,e):1===o.type?t=new o.ctor(r,o.name,o.strings,this,e):6===o.type&&(t=new Re(r,this,e)),this._$AV.push(t),o=s[++a]}n!==o?.index&&(r=Ce.nextNode(),n++)}return Ce.currentNode=pe,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Ie{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=Se,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Te(this,e,t),ge(e)?e===Se||null==e||""===e?(this._$AH!==Se&&this._$AR(),this._$AH=Se):e!==this._$AH&&e!==ke&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>ue(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Se&&ge(this._$AH)?this._$AA.nextSibling.data=e:this.T(pe.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=He.createElement(Pe(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new Ne(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=Ee.get(e.strings);return void 0===t&&Ee.set(e.strings,t=new He(e)),t}k(e){ue(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const r of e)i===t.length?t.push(s=new Ie(this.O(me()),this.O(me()),this,this.options)):s=t[i],s._$AI(r),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=ne(e).nextSibling;ne(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Ue{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,r){this.type=1,this._$AH=Se,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=Se}_$AI(e,t=this,s,i){const r=this.strings;let n=!1;if(void 0===r)e=Te(this,e,t,0),n=!ge(e)||e!==this._$AH&&e!==ke,n&&(this._$AH=e);else{const i=e;let a,o;for(e=r[0],a=0;a<r.length-1;a++)o=Te(this,i[s+a],t,a),o===ke&&(o=this._$AH[a]),n||=!ge(o)||o!==this._$AH[a],o===Se?e=Se:e!==Se&&(e+=(o??"")+r[a+1]),this._$AH[a]=o}n&&!i&&this.j(e)}j(e){e===Se?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Oe extends Ue{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Se?void 0:e}}class qe extends Ue{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Se)}}class ze extends Ue{constructor(e,t,s,i,r){super(e,t,s,i,r),this.type=5}_$AI(e,t=this){if((e=Te(this,e,t,0)??Se)===ke)return;const s=this._$AH,i=e===Se&&s!==Se||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,r=e!==Se&&(s===Se||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class Re{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Te(this,e)}}const De=re.litHtmlPolyfillSupport;De?.(He,Ie),(re.litHtmlVersions??=[]).push("3.3.2");const Le=globalThis;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class je extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let r=i._$litPart$;if(void 0===r){const e=s?.renderBefore??null;i._$litPart$=r=new Ie(t.insertBefore(me(),e),e,void 0,s??{})}return r._$AI(e),r})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return ke}}je._$litElement$=!0,je.finalized=!0,Le.litElementHydrateSupport?.({LitElement:je});const Be=Le.litElementPolyfillSupport;Be?.({LitElement:je}),(Le.litElementVersions??=[]).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const We=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},Ve={attribute:!0,type:String,converter:f,reflect:!1,hasChanged:v},Ke=(e=Ve,t,s)=>{const{kind:i,metadata:r}=s;let n=globalThis.litPropertyMetadata.get(r);if(void 0===n&&globalThis.litPropertyMetadata.set(r,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const r=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,r,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];t.call(this,s),this.requestUpdate(i,r,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Fe(e){return(t,s)=>"object"==typeof s?Ke(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ze(e){return Fe({...e,state:!0,attribute:!1})}var Ge,Je;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(Ge||(Ge={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(Je||(Je={}));var Qe=function(e,t,s,i){i=i||{},s=null==s?{}:s;var r=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return r.detail=s,e.dispatchEvent(r),r};const Xe="0.0.0-dev",Ye="/hacsfiles/Home-Assistant-Mail-And-Packages-Custom-Card",et={key:"mail",configKey:"entity_mail",label:"Mail"},tt={key:"packages",configKey:"entity_packages",label:"Packages"},st={key:"delivering",configKey:"entity_delivering",label:"Out for Delivery"},it={key:"delivered",configKey:"entity_delivered",label:"Delivered"},rt={key:"exception",configKey:"entity_exception",label:"Exception"},nt=[{key:"usps",name:"USPS",image:"img/square_usps.png",exceptionImage:"img/square_usps_exception.png",url:"https://informeddelivery.usps.com/",sensors:[et,tt,st,it,rt],hasCamera:!0},{key:"ups",name:"UPS",image:"img/square_ups.png",exceptionImage:"img/square_ups_exception.png",url:"https://www.ups.com/us/en/track/ups-my-choice",sensors:[tt,st,it,rt],hasCamera:!0},{key:"fedex",name:"FedEx",image:"img/square_fedex.png",url:"https://www.fedex.com/en-us/tracking.html",sensors:[tt,st,it],hasCamera:!0},{key:"amazon",name:"Amazon",image:"img/square_amazon.png",exceptionImage:"img/square_amazon_exception.png",hubImage:"img/square_amazon-hub.png",sensors:[tt,it,rt,{key:"hub",configKey:"entity_hub",label:"Hub Locker"},{key:"otp",configKey:"entity_otp",label:"OTP Code"}],hasCamera:!0},{key:"capost",name:"Canada Post",image:"img/square_canada-post.png",url:"https://www.canadapost-postescanada.ca",sensors:[et,tt,st,it]},{key:"dhl",name:"DHL",image:"img/square_dhl.png",url:"https://www.dhl.com",sensors:[tt,st,it]},{key:"hermes",name:"Hermes",image:"img/square_hermes-packages.png",url:"https://www.myhermes.co.uk",sensors:[tt,st,it]},{key:"royal",name:"Royal Mail",image:"img/square_royal-mail.png",url:"https://www.royalmail.com",sensors:[tt,st,it]},{key:"auspost",name:"Australia Post",image:"img/square_australia-post.png",url:"https://auspost.com.au",sensors:[tt,st,it]},{key:"evri",name:"Evri",image:"img/square_evri.png",url:"https://www.evri.com",sensors:[tt,st,it]},{key:"gls",name:"GLS",image:"img/square_gls.png",url:"https://gls-group.eu",sensors:[tt,st,it]},{key:"dhl_parcel_nl",name:"DHL Parcel NL",image:"img/square_dhl_parcel_nl.png",url:"https://www.dhlparcel.nl",sensors:[tt,st,it]},{key:"inpost_pl",name:"InPost.pl",image:"img/square_inpost.png",url:"https://inpost.pl",sensors:[tt,st,it]},{key:"dpd_com_pl",name:"DPD Poland",image:"img/square_dpd.png",url:"https://tracktrace.dpd.com.pl",sensors:[tt,st,it]},{key:"dpd",name:"DPD",image:"img/square_dpd.png",url:"https://www.dpd.com",sensors:[tt,st,it]},{key:"dpd_nl",name:"DPD Netherlands",image:"img/square_dpd.png",url:"https://www.dpd.nl",sensors:[tt,st,it]},{key:"post_nl",name:"PostNL",image:"img/square_post_nl.png",exceptionImage:"img/square_post_nl_exception.png",url:"https://www.postnl.nl",sensors:[tt,st,it,rt]},{key:"post_de",name:"Deutsche Post",image:"img/square_post_de.png",url:"https://www.deutschepost.de",sensors:[tt,st]},{key:"post_at",name:"Post Austria",image:"img/square_post_at.png",url:"https://www.post.at",sensors:[tt,st,it]},{key:"bolcom",name:"bol.com",image:"img/square_bolcom.png",url:"https://www.bol.com",sensors:[tt,st,it]},{key:"walmart",name:"Walmart",image:"img/square_walmart.png",exceptionImage:"img/square_walmart_exception.png",url:"https://www.walmart.com",sensors:[st,it,rt],hasCamera:!0},{key:"purolator",name:"Purolator",image:"img/square_purolator.png",url:"https://www.purolator.com",sensors:[tt,st,it]},{key:"intelcom",name:"Intelcom",image:"img/square_intelcom.png",url:"https://www.intelcom.ca",sensors:[tt,st,it]},{key:"bonshaw_distribution_network",name:"Bonshaw",image:"img/square_bonshaw_distribution_network.png",sensors:[tt,st,it]},{key:"poczta_polska",name:"Poczta Polska",image:"img/square_poczta-polska.png",url:"http://emonitoring.poczta-polska.pl",sensors:[tt,st]},{key:"buildinglink",name:"BuildingLink",image:"img/square_buildinglink.png",sensors:[it]},{key:"rewe_lieferservice",name:"Rewe Lieferservice",image:"img/square_rewe_lieferservice.png",url:"https://www.rewe.de/service/lieferservice",sensors:[tt,st,it]}];var at={name:"Mail and Packages Custom Card",version:"Version",invalid_configuration:"Invalid configuration",show_warning:"Show Warning",show_error:"Show Error",last_check:"Last Check",in_transit:"In Transit",delivered:"Delivered"},ot={common:at},ct={name:"Mail and Packages Custom Card",version:"Versjon",invalid_configuration:"Ikke gyldig konfiguration",show_warning:"Vis advarsel",show_error:"Vis feil",last_check:"Sist sjekket",in_transit:"Under transport",delivered:"Levert"},lt={common:ct};const dt={en:Object.freeze({__proto__:null,common:at,default:ot}),nb:Object.freeze({__proto__:null,common:ct,default:lt})};function ht(e,t="",s=""){const i=(localStorage.getItem("selectedLanguage")||"en").replace(/['"]+/g,"").replace("-","_");let r;try{r=e.split(".").reduce((e,t)=>e[t],dt[i])}catch(t){r=e.split(".").reduce((e,t)=>e[t],dt.en)}return void 0===r&&(r=e.split(".").reduce((e,t)=>e[t],dt.en)),""!==t&&""!==s&&(r=r.replace(t,s)),r}let pt=class extends je{constructor(){super(...arguments),this._openSections=new Set(["general"])}setConfig(e){this._config=e}_setTopLevel(e,t){if(!this._config)return;const s={...this._config};t?s[e]=t:delete s[e],this._config=s,Qe(this,"config-changed",{config:this._config})}_setCarrierEntity(e,t,s){if(!this._config)return;const i={...this._config.carriers||{}},r={...i[e]||{}};s?r[t]=s:delete r[t],0===Object.keys(r).length?delete i[e]:i[e]=r,this._config={...this._config,carriers:i},Qe(this,"config-changed",{config:this._config})}_setCarrierBoolean(e,t,s){if(!this._config)return;const i={...this._config.carriers||{}},r={...i[e]||{}};s?r[t]=!0:delete r[t],i[e]=r,this._config={...this._config,carriers:i},Qe(this,"config-changed",{config:this._config})}_toggleSection(e){const t=new Set(this._openSections);t.has(e)?t.delete(e):t.add(e),this._openSections=t}_renderSection(e,t,s){const i=this._openSections.has(e);return xe`
      <div class="section">
        <div class="section-header" @click=${()=>this._toggleSection(e)}>
          <span class="section-title">${t}</span>
          <ha-icon icon=${i?"mdi:chevron-up":"mdi:chevron-down"}></ha-icon>
        </div>
        ${i?xe`<div class="section-body">${s}</div>`:""}
      </div>
    `}_entityPicker(e,t,s,i){return xe`
      <div class="entity-row">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{domain:s[0]}}}
          .value=${t??""}
          .label=${e}
          @value-changed=${e=>i(e.detail.value??"")}
        ></ha-selector>
        ${t?xe`<button class="clear-btn" @click=${()=>i("")} title="Remove entity">×</button>`:""}
      </div>
    `}_textField(e,t,s){return xe`
      <ha-textfield
        .label=${e}
        .value=${t||""}
        @change=${e=>s(e.target.value)}
      ></ha-textfield>
    `}_renderCarrierBody(e){const t=this._config?.carriers?.[e.key]||{},s=e.sensors.map(s=>this._entityPicker(s.label,t[s.configKey],["sensor"],t=>this._setCarrierEntity(e.key,s.configKey,t))),i=e.hasCamera?this._entityPicker("Camera",t.entity_camera,["camera"],t=>this._setCarrierEntity(e.key,"entity_camera",t)):xe``,r=e.sensors.some(e=>"entity_delivered"===e.configKey),n=e.hasCamera&&t.entity_camera&&r&&"usps"!==e.key?xe`
            <ha-formfield label="Only show camera when delivered count > 0">
              <ha-switch
                .checked=${t.camera_only_when_delivered??!1}
                @change=${t=>this._setCarrierBoolean(e.key,"camera_only_when_delivered",t.target.checked)}
              ></ha-switch>
            </ha-formfield>
          `:xe``,a="amazon"===e.key?this._textField("Amazon URL (optional)",t.amazon_url,t=>this._setCarrierEntity(e.key,"amazon_url",t)):xe``;return xe` ${s} ${i} ${n} ${a} `}render(){if(!this.hass||!this._config)return xe``;const e=this._config;return xe`
      <div class="card-config">
        <p class="version-info">${ht("common.name")} v${Xe}</p>

        ${this._renderSection("general","General",xe`
            ${this._textField("Card Name",e.name,e=>this._setTopLevel("name",e))}
            ${this._entityPicker("Mail Updated Entity (sensor.mail_updated)",e.entity_mail_updated,["sensor"],e=>this._setTopLevel("entity_mail_updated",e))}
          `)}
        ${this._renderSection("summary","Summary Sensors",xe`
            ${this._entityPicker("Packages In Transit",e.entity_packages_in_transit,["sensor"],e=>this._setTopLevel("entity_packages_in_transit",e))}
            ${this._entityPicker("Packages Delivered",e.entity_packages_delivered,["sensor"],e=>this._setTopLevel("entity_packages_delivered",e))}
            ${this._entityPicker("Delivery Message (optional text sensor)",e.entity_delivery_message,["sensor"],e=>this._setTopLevel("entity_delivery_message",e))}
          `)}

        <div class="section-group-label">Carriers</div>

        ${nt.map(e=>this._renderSection(`carrier_${e.key}`,e.name,this._renderCarrierBody(e)))}
      </div>
    `}static get styles(){return a`
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

      ha-textfield {
        display: block;
        width: 100%;
      }

      .entity-row {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .entity-row ha-selector {
        flex: 1;
        min-width: 0;
      }

      .clear-btn {
        flex-shrink: 0;
        background: none;
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 50%;
        color: var(--secondary-text-color);
        cursor: pointer;
        font-size: 1rem;
        line-height: 1;
        width: 1.75rem;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
      }

      .clear-btn:hover {
        background: var(--error-color, #db4437);
        border-color: var(--error-color, #db4437);
        color: white;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        padding: 4px 0;
      }
    `}};e([Fe({attribute:!1})],pt.prototype,"hass",void 0),e([Ze()],pt.prototype,"_config",void 0),e([Ze()],pt.prototype,"_openSections",void 0),pt=e([We("mailandpackages-card-editor")],pt);const mt=`${Ye}/img/square_delivery.png`;window.customCards=window.customCards||[],window.customCards.some(e=>"mailandpackages-compact-card"===e.type)||window.customCards.push({type:"mailandpackages-compact-card",name:"Mail and Packages (Compact)",preview:!0,description:"Minimalist view: mail count, per-carrier package totals, aggregate in-transit and delivered."});let gt=class extends je{static async getConfigElement(){return document.createElement("mailandpackages-card-editor")}static getStubConfig(){return{name:"Mail Summary",carriers:{}}}setConfig(e){if(!e)throw new Error(ht("common.invalid_configuration"));this.config={name:"Mail Summary",...e}}shouldUpdate(e){return!!this.config&&(e.has("config")||e.has("hass"))}render(){const e=this.config,t=this.hass.states,s=e.entity_mail_updated?t[e.entity_mail_updated]:void 0,i=e.entity_packages_in_transit?t[e.entity_packages_in_transit]:void 0,r=e.entity_packages_delivered?t[e.entity_packages_delivered]:void 0,n=e.entity_delivery_message?t[e.entity_delivery_message]:void 0,a=e.carriers||{},o=a.usps?.entity_mail,c=o?t[o]:void 0,l=[];for(const e of nt){const s=a[e.key];if(s){if(s.entity_mail&&"usps"!==e.key){const e=t[s.entity_mail];e&&l.push({image:`${Ye}/img/square_mail.png`,label:"Mail",count:e.state,entityId:s.entity_mail})}if(s.entity_packages){const i=t[s.entity_packages];i&&l.push({image:`${Ye}/${e.image}`,label:e.name,count:i.state,entityId:s.entity_packages})}}}const d=a.usps,h=d?.entity_camera?t[d.entity_camera]:void 0,p=h?.attributes?.entity_picture;let m="";if(s?.state&&"unavailable"!==s.state&&"unknown"!==s.state)try{m=new Date(s.state).toLocaleString()}catch{m=s.state}return xe`
      <ha-card class="compact-card" tabindex="0">
        ${e.name?xe`<div class="compact-title">${e.name}</div>`:""}
        ${i||r||c?xe`
              <div class="compact-summary">
                ${c?xe`
                      <span class="summary-item">
                        <img
                          class="row-icon"
                          src="${Ye}/img/square_mail.png"
                          alt="Mail"
                          @error=${this._onImgError}
                        />
                        Mail:&nbsp;<strong>${c.state}</strong>
                      </span>
                    `:""}
                ${i?xe`
                      <span class="summary-item">
                        <img
                          class="row-icon"
                          src="${Ye}/img/square_in-transit.png"
                          alt="In Transit"
                          @error=${this._onImgError}
                        />
                        In Transit:&nbsp;<strong>${i.state}</strong>
                      </span>
                    `:""}
                ${r?xe`
                      <span class="summary-item">
                        <img
                          class="row-icon"
                          src="${Ye}/img/square_delivery.png"
                          alt="Delivered"
                          @error=${this._onImgError}
                        />
                        Delivered:&nbsp;<strong>${r.state}</strong>
                      </span>
                    `:""}
              </div>
            `:""}
        ${n?xe`<div class="compact-message">${n.state}</div>`:""}
        ${l.length>0?xe`
              <div class="compact-carriers">
                ${l.map(e=>xe`
                    <span class="carrier-item" title="${e.label}: ${e.count}">
                      <img class="row-icon" src="${e.image}" alt="${e.label}" @error=${this._onImgError} />
                      ${e.label}:&nbsp;<strong>${e.count}</strong>
                    </span>
                  `)}
              </div>
            `:""}
        ${p?xe`
              <img
                class="compact-camera"
                src="${p}&interval=30"
                alt="USPS Informed Delivery"
                @click=${()=>Qe(this,"hass-more-info",{entityId:d.entity_camera})}
              />
            `:""}

        <div class="compact-footer">
          V&nbsp;${Xe}${m?xe`&nbsp;&nbsp;Checked:&nbsp;${m}`:""}
        </div>
      </ha-card>
    `}_onImgError(e){const t=e.target;t.src.endsWith(mt)||(t.src=mt)}static get styles(){return a`
      .compact-card {
        padding: 0;
        font-size: 0.9rem;
      }

      /* ── Title ── */
      .compact-title {
        font-size: 1.6rem;
        font-weight: 400;
        padding: 12px 16px 6px;
        color: var(--primary-text-color);
      }

      /* ── Summary row ── */
      .compact-summary {
        text-align: center;
        padding: 8px 16px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      /* ── Delivery message ── */
      .compact-message {
        padding: 4px 16px 6px;
        font-size: 0.9rem;
        color: var(--primary-text-color);
        line-height: 1.4;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      /* ── Carrier row ── */
      .compact-carriers {
        text-align: center;
        padding: 8px 16px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      /* ── Shared inline item (summary + carrier) ── */
      .summary-item,
      .carrier-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 1rem;
        color: var(--primary-text-color);
        white-space: nowrap;
        margin: 4px 8px;
      }

      .row-icon {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
      }

      /* ── USPS camera ── */
      .compact-camera {
        display: block;
        width: calc(100% - 32px);
        height: auto;
        margin: 6px 16px 0;
        border: 2px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        border-radius: 4px;
        cursor: pointer;
      }

      /* ── Footer ── */
      .compact-footer {
        padding: 6px 16px 8px;
        font-size: 0.8rem;
        color: var(--secondary-text-color);
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        margin-top: 8px;
      }
    `}};e([Fe({attribute:!1})],gt.prototype,"hass",void 0),e([Ze()],gt.prototype,"config",void 0),gt=e([We("mailandpackages-compact-card")],gt),console.info(`%c  MAIL AND PACKAGES CARD \n%c  ${ht("common.version")} ${Xe}    `,"color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"mailandpackages-card",name:"Mail and Packages Card",preview:!0,description:"A custom companion card for the Mail and Packages integration."});const ut=`${Ye}/img/square_delivery.png`;let _t=class extends je{static async getConfigElement(){return document.createElement("mailandpackages-card-editor")}static getStubConfig(){return{name:"Mail and Packages",carriers:{}}}setConfig(e){if(!e)throw new Error(ht("common.invalid_configuration"));e.test_gui&&function(){var e=document.querySelector("home-assistant");if(e=(e=(e=(e=(e=(e=(e=(e=e&&e.shadowRoot)&&e.querySelector("home-assistant-main"))&&e.shadowRoot)&&e.querySelector("app-drawer-layout partial-panel-resolver"))&&e.shadowRoot||e)&&e.querySelector("ha-panel-lovelace"))&&e.shadowRoot)&&e.querySelector("hui-root")){var t=e.lovelace;return t.current_view=e.___curView,t}return null}().setEditMode(!0),this.config={name:"Mail and Packages",...e}}shouldUpdate(e){return!!this.config&&(e.has("config")||e.has("hass"))}render(){if(this.config.show_warning)return this._showWarning(ht("common.show_warning"));const e=this.config.entity_mail_updated?this.hass.states[this.config.entity_mail_updated]:void 0,t=this.config.entity_packages_in_transit?this.hass.states[this.config.entity_packages_in_transit]:void 0,s=this.config.entity_packages_delivered?this.hass.states[this.config.entity_packages_delivered]:void 0,i=this.config.entity_delivery_message?this.hass.states[this.config.entity_delivery_message]:void 0,r=this.config.carriers||{},n=r.usps?.entity_mail,a=n?this.hass.states[n]:void 0;return xe`
      <ha-card class="mail-and-packages" tabindex="0">
        ${this._renderHeader(e)} ${this._renderSummary(t,s,a)}
        ${i?xe`<p class="delivery-message">${i.state}</p>`:""}
        <div class="carriers">${nt.map(e=>this._renderCarrier(e,r[e.key]))}</div>
      </ha-card>
    `}_renderHeader(e){let t="";if(e?.state&&"unavailable"!==e.state&&"unknown"!==e.state)try{t=new Date(e.state).toLocaleString()}catch{t=e.state}return xe`
      <div class="card-header-area">
        ${this.config.name?xe`<div class="card-title">${this.config.name}</div>`:""}
        ${t?xe`<div class="last-updated">${ht("common.last_check")}: ${t}</div>`:""}
      </div>
    `}_renderSummary(e,t,s){return e||t||s?xe`
      <div class="summary-row">
        ${s?xe`
              <div class="summary-badge" title="Mail">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${Ye}/img/square_mail.png"
                    alt="Mail"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${s.state}</span>
                </div>
                <span class="badge-label">Mail</span>
              </div>
            `:""}
        ${e?xe`
              <div class="summary-badge" title="${ht("common.in_transit")}">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${Ye}/img/square_in-transit.png"
                    alt="${ht("common.in_transit")}"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${e.state}</span>
                </div>
                <span class="badge-label">${ht("common.in_transit")}</span>
              </div>
            `:""}
        ${t?xe`
              <div class="summary-badge" title="${ht("common.delivered")}">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${Ye}/img/square_delivery.png"
                    alt="${ht("common.delivered")}"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${t.state}</span>
                </div>
                <span class="badge-label">${ht("common.delivered")}</span>
              </div>
            `:""}
      </div>
    `:xe``}_renderCarrier(e,t){if(!t)return xe``;const s=e.sensors.filter(s=>t[s.configKey]&&!("usps"===e.key&&"mail"===s.key)),i=t.entity_camera?this.hass.states[t.entity_camera]:void 0,r=i?.attributes?.entity_picture,n=t.entity_delivered?parseInt(this.hass.states[t.entity_delivered]?.state??"0",10):0,a="usps"!==e.key&&!0===i?.attributes?.is_generic,o=!!r&&!a&&(!t.camera_only_when_delivered||n>0);if(0===s.length&&!o)return xe``;const c="amazon"===e.key&&t.amazon_url?t.amazon_url:e.url;return xe`
      <div class="carrier-section">
        <div class="carrier-header">
          ${c?xe`<a class="carrier-name" href="${c}" target="_blank" rel="noopener noreferrer"
                >${e.name}</a
              >`:xe`<span class="carrier-name">${e.name}</span>`}
        </div>
        ${o?xe`
              <img
                class="delivery-camera"
                src="${r}&interval=30"
                alt="${e.name} delivery camera"
                @click=${()=>this._showMoreInfo(t.entity_camera)}
              />
            `:""}
        <div class="carrier-sensors">
          ${s.map(s=>this._renderSensorBadge(e,s,t))}
        </div>
      </div>
    `}_renderSensorBadge(e,t,s){const i=s[t.configKey];if(!i)return xe``;const r=this.hass.states[i];if(!r)return xe``;const n=function(e,t){return"exception"===t&&e.exceptionImage?e.exceptionImage:"hub"===t&&e.hubImage?e.hubImage:e.image}(e,t.key),a=`${Ye}/${n}`;return xe`
      <div class="sensor-badge" title="${t.label}: ${r.state}">
        <div class="badge-icon-wrap">
          <img class="badge-img" src="${a}" alt="${e.name} ${t.label}" @error=${this._onImgError} />
          <span class="badge-count">${r.state}</span>
        </div>
        <span class="badge-label">${t.label}</span>
      </div>
    `}_showMoreInfo(e){Qe(this,"hass-more-info",{entityId:e})}_onImgError(e){const t=e.target;t.src.endsWith(ut)||(t.src=ut)}_showWarning(e){return xe`<hui-warning>${e}</hui-warning>`}static get styles(){return a`
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
        font-size: 1.4rem;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .last-updated {
        font-size: 0.8rem;
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
        font-size: 0.85rem;
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
    `}};e([Fe({attribute:!1})],_t.prototype,"hass",void 0),e([Ze()],_t.prototype,"config",void 0),_t=e([We("mailandpackages-card")],_t);export{_t as MailandpackagesCard};
