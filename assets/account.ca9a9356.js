import g from"./BasicSetting.135480c8.js";import k from"./SafetySetting.03972791.js";import{_ as v,d as C,r as l,o as s,h as r,a,w as e,aF as F,aC as h,c as p,av as i,A as x,aS as A,aT as T,a8 as S,k as d,au as m,cY as b}from"./index.1ba1d443.js";const w=C({__name:"account",setup(z){const B=[{name:"\u57FA\u672C\u8BBE\u7F6E",desc:"\u4E2A\u4EBA\u8D26\u6237\u4FE1\u606F\u8BBE\u7F6E",key:1},{name:"\u5B89\u5168\u8BBE\u7F6E",desc:"\u5BC6\u7801\uFF0C\u90AE\u7BB1\u7B49\u8BBE\u7F6E",key:2}],t=l(1),o=l("\u57FA\u672C\u8BBE\u7F6E");function f(u){t.value=u.key,o.value=u.name}return(u,N)=>{const y=b,_=x,c=A,E=T;return s(),r("div",null,[a(E,{"x-gap":24},{default:e(()=>[a(c,{span:"6"},{default:e(()=>[a(_,{bordered:!1,size:"small",class:"proCard"},{default:e(()=>[(s(),r(F,null,h(B,n=>a(y,{class:S(["thing-cell",{"thing-cell-on":t.value===n.key}]),key:n.key,onClick:V=>f(n)},{header:e(()=>[d(m(n.name),1)]),description:e(()=>[d(m(n.desc),1)]),_:2},1032,["class","onClick"])),64))]),_:1})]),_:1}),a(c,{span:"18"},{default:e(()=>[a(_,{bordered:!1,size:"small",title:o.value,class:"proCard"},{default:e(()=>[t.value===1?(s(),p(g,{key:0})):i("",!0),t.value===2?(s(),p(k,{key:1})):i("",!0)]),_:1},8,["title"])]),_:1})]),_:1})])}}});var I=v(w,[["__scopeId","data-v-0997312e"]]);export{I as default};