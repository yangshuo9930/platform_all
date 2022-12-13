var w=Object.defineProperty,N=Object.defineProperties;var O=Object.getOwnPropertyDescriptors;var h=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,U=Object.prototype.propertyIsEnumerable;var A=(u,e,o)=>e in u?w(u,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):u[e]=o,D=(u,e)=>{for(var o in e||(e={}))S.call(e,o)&&A(u,o,e[o]);if(h)for(var o of h(e))U.call(e,o)&&A(u,o,e[o]);return u},M=(u,e)=>N(u,O(e));var k=(u,e,o)=>new Promise((c,F)=>{var p=a=>{try{t(o.next(a))}catch(s){F(s)}},r=a=>{try{t(o.throw(a))}catch(s){F(s)}},t=a=>a.done?c(a.value):Promise.resolve(a.value).then(p,r);t((o=o.apply(u,e)).next())});import{_ as v,u as R}from"./useModal.863ba91f.js";import{_ as P}from"./BasicForm.a315e392.js";import{u as V}from"./useForm.176cbc11.js";import{_ as $,d as I,r as L,u as x,b as T,a6 as G,o as j,h as q,i as B,a as l,w as n,k as i,A as z,a$ as W,ab as H,p as J,a9 as K,l as Q}from"./index.8636d9bb.js";import"./index.esm.f3133e37.js";import"./propTypes.8695915b.js";const X=[{field:"name",component:"NInput",label:"\u59D3\u540D",labelMessage:"\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A",giProps:{span:1},componentProps:{placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",onInput:u=>{console.log(u)}},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:["blur"]}]},{field:"mobile",component:"NInputNumber",label:"\u624B\u673A",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",showButton:!1,onInput:u=>{console.log(u)}}},{field:"type",component:"NSelect",label:"\u7C7B\u578B",giProps:{},componentProps:{placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B",options:[{label:"\u8212\u9002\u6027",value:1},{label:"\u7ECF\u6D4E\u6027",value:2}],onUpdateValue:u=>{console.log(u)}}},{field:"makeDate",component:"NDatePicker",label:"\u9884\u7EA6\u65F6\u95F4",giProps:{},defaultValue:118313526e4,componentProps:{type:"date",clearable:!0,onUpdateValue:u=>{console.log(u)}}},{field:"makeTime",component:"NTimePicker",label:"\u505C\u7559\u65F6\u95F4",giProps:{},componentProps:{clearable:!0,onUpdateValue:u=>{console.log(u)}}},{field:"makeProject",component:"NCheckbox",label:"\u9884\u7EA6\u9879\u76EE",giProps:{},componentProps:{placeholder:"\u8BF7\u9009\u62E9\u9884\u7EA6\u9879\u76EE",options:[{label:"\u79CD\u7259",value:1},{label:"\u8865\u7259",value:2},{label:"\u6839\u7BA1",value:3}],onUpdateChecked:u=>{console.log(u)}}},{field:"makeSource",component:"NRadioGroup",label:"\u6765\u6E90",giProps:{},componentProps:{options:[{label:"\u7F51\u4E0A",value:1},{label:"\u95E8\u5E97",value:2}],onUpdateChecked:u=>{console.log(u)}}},{field:"status",label:"\u72B6\u6001",giProps:{},slot:"statusSlot"}],Y=I({components:{basicModal:v,BasicForm:P},setup(){const u=L(null),e=x(),[o,{openModal:c,closeModal:F,setSubLoading:p}]=R({title:"\u65B0\u589E\u9884\u7EA6"}),[r,{openModal:t,closeModal:a,setSubLoading:s}]=R({title:"\u786E\u8BA4\u5BF9\u8BDD\u6846",showIcon:!0,type:"warning",closable:!1,maskClosable:!0}),[d,{submit:E}]=V({gridProps:{cols:1},labelWidth:120,layout:"horizontal",submitButtonText:"\u63D0\u4EA4\u9884\u7EA6",showActionButtonGroup:!1,schemas:X}),g=T({formValue:{name:"\u5C0F\u9A6C\u54E5"}});function _(){return k(this,null,function*(){(yield E())?(F(),e.success("\u63D0\u4EA4\u6210\u529F")):(e.error("\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F"),p(!1))})}function m(){a(),s(!1)}function C(){t()}function f(){c()}function y(b){console.log(b)}return M(D({},G(g)),{modalRef:u,register:d,modalRegister:o,lightModalRegister:r,handleReset:y,showModal:f,okModal:_,lightOkModal:m,showLightModal:C})}}),Z={class:"n-layout-page-header"},uu=B("br",null,null,-1),eu=B("p",{class:"text-gray-500",style:{"padding-left":"35px"}},"\u4E00\u4E9B\u5BF9\u8BDD\u6846\u5185\u5BB9",-1);function ou(u,e,o,c,F,p){const r=z,t=W,a=H,s=J,d=K,E=Q,g=P,_=v;return j(),q("div",null,[B("div",Z,[l(r,{bordered:!1,title:"\u6A21\u6001\u6846"},{default:n(()=>[i(" \u6A21\u6001\u6846\uFF0C\u7528\u4E8E\u5411\u7528\u6237\u6536\u96C6\u6216\u5C55\u793A\u4FE1\u606F\uFF0CModal \u91C7\u7528 Dialog \u9884\u8BBE\uFF0C\u6269\u5C55\u62D6\u62FD\u6548\u679C "),uu,i(" \u4EE5\u4E0B\u662F useModal \u65B9\u5F0F\uFF0Cref\u65B9\u5F0F\uFF0C\u4E5F\u652F\u6301\uFF0C\u4F7F\u7528\u65B9\u5F0F\u548C\u5176\u4ED6\u7EC4\u4EF6\u4E00\u81F4\uFF0C\u5982\uFF1AmodalRef.value.closeModal() ")]),_:1})]),l(r,{bordered:!1,class:"proCard mt-4"},{default:n(()=>[l(t,{title:"Modal\u5D4C\u5957Form",type:"info"},{default:n(()=>[i(" \u4F7F\u7528 useModal \u8FDB\u884C\u5F39\u7A97\u5C55\u793A\u548C\u64CD\u4F5C\uFF0C\u5E76\u6F14\u793A\u4E86\u5728Modal\u5185\u548CForm\u7EC4\u4EF6\uFF0C\u7EC4\u5408\u4F7F\u7528\u65B9\u6CD5 ")]),_:1}),l(a),l(d,null,{default:n(()=>[l(s,{type:"primary",onClick:u.showModal},{default:n(()=>[i("\u6253\u5F00Modal\u5D4C\u5957Form\u4F8B\u5B50")]),_:1},8,["onClick"])]),_:1}),l(a),l(t,{title:"\u4E2A\u6027\u5316\u8F7B\u91CF\u7EA7",type:"info"},{default:n(()=>[i(" \u4F7F\u7528 useModal \u8FDB\u884C\u5F39\u7A97\u5C55\u793A\u548C\u64CD\u4F5C\uFF0C\u81EA\u5B9A\u4E49\u914D\u7F6E\uFF0C\u5B9E\u73B0\u8F7B\u91CF\u7EA7\u6548\u679C\uFF0C\u66F4\u591A\u914D\u7F6E\uFF0C\u8BF7\u53C2\u8003\u6587\u6863 ")]),_:1}),l(a),l(d,null,{default:n(()=>[l(s,{type:"primary",onClick:u.showLightModal},{default:n(()=>[i("\u8F7B\u91CF\u7EA7\u786E\u8BA4")]),_:1},8,["onClick"])]),_:1}),l(a),l(t,{title:"\u63D0\u793A",type:"info"},{default:n(()=>[i(" \u7EC4\u4EF6\u66B4\u9732\u4E86\uFF0CsetProps \u65B9\u6CD5\uFF0C\u7528\u4E8E\u4FEE\u6539\u7EC4\u4EF6\u5185\u90E8 Props\uFF0C\u6BD4\u5982\u6807\u9898\uFF0C\u7B49\uFF0C\u5177\u4F53\u53C2\u8003UI\u6846\u67B6\u6587\u6863\uFF0CDialogReactive Properties ")]),_:1})]),_:1}),l(_,{onRegister:u.modalRegister,ref:"modalRef",class:"basicModal",onOnOk:u.okModal},{default:n(()=>[l(g,{onRegister:u.register,onReset:u.handleReset,class:"basicForm"},{statusSlot:n(({model:m,field:C})=>[l(E,{value:m[C],"onUpdate:value":f=>m[C]=f},null,8,["value","onUpdate:value"])]),_:1},8,["onRegister","onReset"])]),_:1},8,["onRegister","onOnOk"]),l(_,{onRegister:u.lightModalRegister,class:"basicModalLight",ref:"modalRef",onOnOk:u.lightOkModal},{default:n(()=>[eu]),_:1},8,["onRegister","onOnOk"])])}var Fu=$(Y,[["render",ou]]);export{Fu as default};
