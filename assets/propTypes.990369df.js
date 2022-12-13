import{aJ as x,J as M,K as V,aK as k,aL as z,d as C,c as S,a as j,o as N}from"./index.7b77388a.js";function F(t,r,e,n){if(!x(t))return t;r=M(r,t);for(var i=-1,o=r.length,l=o-1,s=t;s!=null&&++i<o;){var a=V(r[i]),u=e;if(a==="__proto__"||a==="constructor"||a==="prototype")return t;if(i!=l){var d=s[a];u=n?n(d,a,s):void 0,u===void 0&&(u=x(d)?d:k(r[i+1])?[]:{})}z(s,a,u),s=s[a]}return t}function Ot(t,r,e){return t==null?t:F(t,r,e)}const I={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 1024 1024"},J=j("path",{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2L227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z",fill:"currentColor"},null,-1);var mt=C({name:"DownOutlined",render:function(r,e){return N(),S("svg",I,[J])}});const Y={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 1024 1024"},K=j("path",{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372s372 166.6 372 372s-166.6 372-372 372z",fill:"currentColor"},null,-1),Q=j("path",{d:"M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7c-21.2 8.1-39.2 22.3-52.1 40.9c-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0 1 30.9-44.8c59-22.7 97.1-74.7 97.1-132.5c.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1 0 80 0a40 40 0 1 0-80 0z",fill:"currentColor"},null,-1);var _t=C({name:"QuestionCircleOutlined",render:function(r,e){return N(),S("svg",Y,[K,Q])}});/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */function T(t){return Object.prototype.toString.call(t)==="[object Object]"}function R(t){var r,e;return T(t)===!1?!1:(r=t.constructor,r===void 0?!0:(e=r.prototype,!(T(e)===!1||e.hasOwnProperty("isPrototypeOf")===!1)))}function O(){return O=Object.assign?Object.assign.bind():function(t){for(var r=1;r<arguments.length;r++){var e=arguments[r];for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])}return t},O.apply(this,arguments)}function q(t,r){if(t==null)return{};var e,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r.indexOf(e=o[n])>=0||(i[e]=t[e]);return i}const G={silent:!1,logLevel:"warn"},H=["validator"],A=Object.prototype,D=A.toString,U=A.hasOwnProperty,L=/^\s*function (\w+)/;function $(t){var r;const e=(r=t==null?void 0:t.type)!==null&&r!==void 0?r:t;if(e){const n=e.toString().match(L);return n?n[1]:""}return""}const y=R,W=t=>t;let c=W;const h=(t,r)=>U.call(t,r),X=Number.isInteger||function(t){return typeof t=="number"&&isFinite(t)&&Math.floor(t)===t},g=Array.isArray||function(t){return D.call(t)==="[object Array]"},b=t=>D.call(t)==="[object Function]",m=t=>y(t)&&h(t,"_vueTypes_name"),B=t=>y(t)&&(h(t,"type")||["_vueTypes_name","validator","default","required"].some(r=>h(t,r)));function w(t,r){return Object.defineProperty(t.bind(r),"__original",{value:t})}function v(t,r,e=!1){let n,i=!0,o="";n=y(t)?t:{type:t};const l=m(n)?n._vueTypes_name+" - ":"";if(B(n)&&n.type!==null){if(n.type===void 0||n.type===!0||!n.required&&r===void 0)return i;g(n.type)?(i=n.type.some(s=>v(s,r,!0)===!0),o=n.type.map(s=>$(s)).join(" or ")):(o=$(n),i=o==="Array"?g(r):o==="Object"?y(r):o==="String"||o==="Number"||o==="Boolean"||o==="Function"?function(s){if(s==null)return"";const a=s.constructor.toString().match(L);return a?a[1]:""}(r)===o:r instanceof n.type)}if(!i){const s=`${l}value "${r}" should be of type "${o}"`;return e===!1?(c(s),!1):s}if(h(n,"validator")&&b(n.validator)){const s=c,a=[];if(c=u=>{a.push(u)},i=n.validator(r),c=s,!i){const u=(a.length>1?"* ":"")+a.join(`
* `);return a.length=0,e===!1?(c(u),i):u}}return i}function f(t,r){const e=Object.defineProperties(r,{_vueTypes_name:{value:t,writable:!0},isRequired:{get(){return this.required=!0,this}},def:{value(i){return i===void 0?(h(this,"default")&&delete this.default,this):b(i)||v(this,i,!0)===!0?(this.default=g(i)?()=>[...i]:y(i)?()=>Object.assign({},i):i,this):(c(`${this._vueTypes_name} - invalid default value: "${i}"`),this)}}}),{validator:n}=e;return b(n)&&(e.validator=w(n,e)),e}function p(t,r){const e=f(t,r);return Object.defineProperty(e,"validate",{value(n){return b(this.validator)&&c(`${this._vueTypes_name} - calling .validate() will overwrite the current custom validator function. Validator info:
${JSON.stringify(this)}`),this.validator=w(n,this),this}})}function P(t,r,e){const n=function(a){const u={};return Object.getOwnPropertyNames(a).forEach(d=>{u[d]=Object.getOwnPropertyDescriptor(a,d)}),Object.defineProperties({},u)}(r);if(n._vueTypes_name=t,!y(e))return n;const{validator:i}=e,o=q(e,H);if(b(i)){let{validator:a}=n;a&&(a=(s=(l=a).__original)!==null&&s!==void 0?s:l),n.validator=w(a?function(u){return a.call(this,u)&&i.call(this,u)}:i,n)}var l,s;return Object.assign(n,o)}function _(t){return t.replace(/^(?!\s*$)/gm,"  ")}const Z=()=>p("any",{}),tt=()=>p("function",{type:Function}),et=()=>p("boolean",{type:Boolean}),rt=()=>p("string",{type:String}),nt=()=>p("number",{type:Number}),it=()=>p("array",{type:Array}),ot=()=>p("object",{type:Object}),at=()=>f("integer",{type:Number,validator:t=>X(t)}),st=()=>f("symbol",{validator:t=>typeof t=="symbol"});function ut(t,r="custom validation failed"){if(typeof t!="function")throw new TypeError("[VueTypes error]: You must provide a function as argument");return f(t.name||"<<anonymous function>>",{type:null,validator(e){const n=t(e);return n||c(`${this._vueTypes_name} - ${r}`),n}})}function lt(t){if(!g(t))throw new TypeError("[VueTypes error]: You must provide an array as argument.");const r=`oneOf - value should be one of "${t.join('", "')}".`,e=t.reduce((n,i)=>{if(i!=null){const o=i.constructor;n.indexOf(o)===-1&&n.push(o)}return n},[]);return f("oneOf",{type:e.length>0?e:void 0,validator(n){const i=t.indexOf(n)!==-1;return i||c(r),i}})}function ct(t){if(!g(t))throw new TypeError("[VueTypes error]: You must provide an array as argument");let r=!1,e=[];for(let i=0;i<t.length;i+=1){const o=t[i];if(B(o)){if(m(o)&&o._vueTypes_name==="oneOf"&&o.type){e=e.concat(o.type);continue}if(b(o.validator)&&(r=!0),o.type===!0||!o.type){c('oneOfType - invalid usage of "true" or "null" as types.');continue}e=e.concat(o.type)}else e.push(o)}e=e.filter((i,o)=>e.indexOf(i)===o);const n=e.length>0?e:null;return f("oneOfType",r?{type:n,validator(i){const o=[],l=t.some(s=>{const a=v(m(s)&&s._vueTypes_name==="oneOf"?s.type||null:s,i,!0);return typeof a=="string"&&o.push(a),a===!0});return l||c(`oneOfType - provided value does not match any of the ${o.length} passed-in validators:
${_(o.join(`
`))}`),l}}:{type:n})}function ft(t){return f("arrayOf",{type:Array,validator(r){let e="";const n=r.every(i=>(e=v(t,i,!0),e===!0));return n||c(`arrayOf - value validation error:
${_(e)}`),n}})}function dt(t){return f("instanceOf",{type:t})}function pt(t){return f("objectOf",{type:Object,validator(r){let e="";const n=Object.keys(r).every(i=>(e=v(t,r[i],!0),e===!0));return n||c(`objectOf - value validation error:
${_(e)}`),n}})}function yt(t){const r=Object.keys(t),e=r.filter(i=>{var o;return!((o=t[i])===null||o===void 0||!o.required)}),n=f("shape",{type:Object,validator(i){if(!y(i))return!1;const o=Object.keys(i);if(e.length>0&&e.some(l=>o.indexOf(l)===-1)){const l=e.filter(s=>o.indexOf(s)===-1);return c(l.length===1?`shape - required property "${l[0]}" is not defined.`:`shape - required properties "${l.join('", "')}" are not defined.`),!1}return o.every(l=>{if(r.indexOf(l)===-1)return this._vueTypes_isLoose===!0||(c(`shape - shape definition does not include a "${l}" property. Allowed keys: "${r.join('", "')}".`),!1);const s=v(t[l],i[l],!0);return typeof s=="string"&&c(`shape - "${l}" property validation error:
 ${_(s)}`),s===!0})}});return Object.defineProperty(n,"_vueTypes_isLoose",{writable:!0,value:!1}),Object.defineProperty(n,"loose",{get(){return this._vueTypes_isLoose=!0,this}}),n}const vt=["name","validate","getter"],ht=(()=>{var t;return(t=class{static get any(){return Z()}static get func(){return tt().def(this.defaults.func)}static get bool(){return et().def(this.defaults.bool)}static get string(){return rt().def(this.defaults.string)}static get number(){return nt().def(this.defaults.number)}static get array(){return it().def(this.defaults.array)}static get object(){return ot().def(this.defaults.object)}static get integer(){return at().def(this.defaults.integer)}static get symbol(){return st()}static get nullable(){return{type:null}}static extend(r){if(g(r))return r.forEach(a=>this.extend(a)),this;const{name:e,validate:n=!1,getter:i=!1}=r,o=q(r,vt);if(h(this,e))throw new TypeError(`[VueTypes error]: Type "${e}" already defined`);const{type:l}=o;if(m(l))return delete o.type,Object.defineProperty(this,e,i?{get:()=>P(e,l,o)}:{value(...a){const u=P(e,l,o);return u.validator&&(u.validator=u.validator.bind(u,...a)),u}});let s;return s=i?{get(){const a=Object.assign({},o);return n?p(e,a):f(e,a)},enumerable:!0}:{value(...a){const u=Object.assign({},o);let d;return d=n?p(e,u):f(e,u),u.validator&&(d.validator=u.validator.bind(d,...a)),d},enumerable:!0},Object.defineProperty(this,e,s)}}).defaults={},t.sensibleDefaults=void 0,t.config=G,t.custom=ut,t.oneOf=lt,t.instanceOf=dt,t.oneOfType=ct,t.arrayOf=ft,t.objectOf=pt,t.shape=yt,t.utils={validate:(r,e)=>v(e,r,!0)===!0,toType:(r,e,n=!1)=>n?p(r,e):f(r,e)},t})();function E(t={func:()=>{},bool:!0,string:"",number:0,array:()=>[],object:()=>({}),integer:0}){var r;return(r=class extends ht{static get sensibleDefaults(){return O({},this.defaults)}static set sensibleDefaults(e){this.defaults=e!==!1?O({},e!==!0?e:t):{}}}).defaults=O({},t),r}class jt extends E(){}const gt=E({func:void 0,bool:void 0,string:void 0,number:void 0,object:void 0,integer:void 0});gt.extend([{name:"style",getter:!0,type:[String,Object],default:void 0},{name:"VNodeChild",getter:!0,type:void 0}]);export{mt as D,_t as Q,gt as p,Ot as s};