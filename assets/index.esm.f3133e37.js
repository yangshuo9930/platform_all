import{aM as f,ay as d,a1 as p,aN as T,r as y,j as c}from"./index.8636d9bb.js";const h=typeof window!="undefined",x=t=>typeof t=="function",D=t=>typeof t=="number",g=(t,e,n)=>Math.min(n,Math.max(e,t)),C=()=>{};function l(t,e){function n(...i){t(()=>e.apply(this,i),{fn:e,thisArg:this,args:i})}return n}function F(t){let e;return i=>{const u=c(t);if(e&&clearTimeout(e),u<=0)return i();e=setTimeout(i,u)}}function w(t,e=!0){let n=0,i;const u=()=>{i&&(clearTimeout(i),i=void 0)};return o=>{const s=c(t),a=Date.now()-n;if(u(),s<=0)return n=Date.now(),o();a>s?(n=Date.now(),o()):e&&(i=setTimeout(()=>{u(),o()},s))}}function N(t){return t}function O(t,e=!0){f()?d(t):e?t():p(t)}function b(t){f()&&T(t)}function U(t,e=200){return l(F(e),t)}function j(t,e=200,n=!0){return l(w(e,n),t)}function v(t,e,n={}){const{immediate:i=!0}=n,u=y(!1);let r=null;function o(){r&&(clearTimeout(r),r=null)}function s(){u.value=!1,o()}function a(...m){o(),u.value=!0,r=setTimeout(()=>{u.value=!1,r=null,t(...m)},c(e))}return i&&(u.value=!0,h&&a()),b(s),{isPending:u,start:a,stop:s}}export{b as a,N as b,x as c,D as d,v as e,g as f,j as g,h as i,C as n,O as t,U as u};
