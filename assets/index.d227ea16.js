var W=Object.defineProperty;var w=Object.getOwnPropertySymbols;var H=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var y=(a,l,u)=>l in a?W(a,l,{enumerable:!0,configurable:!0,writable:!0,value:u}):a[l]=u,F=(a,l)=>{for(var u in l||(l={}))H.call(l,u)&&y(a,u,l[u]);if(w)for(var u of w(l))J.call(l,u)&&y(a,u,l[u]);return a};var C=(a,l,u)=>new Promise((b,p)=>{var d=i=>{try{c(u.next(i))}catch(s){p(s)}},f=i=>{try{c(u.throw(i))}catch(s){p(s)}},c=i=>i.done?b(i.value):Promise.resolve(i.value).then(d,f);c((u=u.apply(a,l)).next())});import{T as Q,B as X,g as Y}from"./list.60a70b55.js";import{_ as Z}from"./BasicForm.a315e392.js";import{u as ee}from"./useForm.176cbc11.js";import{v as A,x as ue,d as oe,f as te,r as m,u as le,b as D,o as ne,c as ae,w as t,a as o,j as _,k as v,l as se,N as re,p as ie,m as ce,ai as de,q as pe,a9 as me,b0 as _e,A as fe}from"./index.8636d9bb.js";import{P as Fe}from"./PlusOutlined.5df2e6b4.js";import"./sortable.esm.9144dc9e.js";import"./useDesignSetting.26fbd73f.js";import"./propTypes.8695915b.js";import"./componentSetting.df76d574.js";import"./index.esm.f3133e37.js";const be=[{title:"id",key:"id",width:100},{title:"\u540D\u79F0",key:"name",width:100},{title:"\u5934\u50CF",key:"avatar",width:100,render(a){return A(ue,{size:48,src:a.avatar})}},{title:"\u5730\u5740",key:"address",auth:["basic_list"],ifShow:a=>!0,width:150},{title:"\u5F00\u59CB\u65E5\u671F",key:"beginTime",width:160},{title:"\u7ED3\u675F\u65E5\u671F",key:"endTime",width:160},{title:"\u521B\u5EFA\u65F6\u95F4",key:"date",width:100}],Pe=oe({__name:"index",setup(a){const l={name:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u540D\u79F0"},address:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u5730\u5740"},date:{type:"number",required:!0,trigger:["blur","change"],message:"\u8BF7\u9009\u62E9\u65E5\u671F"}},u=[{field:"name",labelMessage:"\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A",component:"NInput",label:"\u59D3\u540D",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",onInput:e=>{console.log(e)}},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:["blur"]}]},{field:"mobile",component:"NInputNumber",label:"\u624B\u673A",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",showButton:!1,onInput:e=>{console.log(e)}}},{field:"type",component:"NSelect",label:"\u7C7B\u578B",componentProps:{placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B",options:[{label:"\u8212\u9002\u6027",value:1},{label:"\u7ECF\u6D4E\u6027",value:2}],onUpdateValue:e=>{console.log(e)}}},{field:"makeDate",component:"NDatePicker",label:"\u9884\u7EA6\u65F6\u95F4",defaultValue:118313526e4,componentProps:{type:"date",clearable:!0,onUpdateValue:e=>{console.log(e)}}},{field:"makeTime",component:"NTimePicker",label:"\u505C\u7559\u65F6\u95F4",componentProps:{clearable:!0,onUpdateValue:e=>{console.log(e)}}},{field:"status",label:"\u72B6\u6001",slot:"statusSlot"},{field:"makeProject",component:"NCheckbox",label:"\u9884\u7EA6\u9879\u76EE",componentProps:{placeholder:"\u8BF7\u9009\u62E9\u9884\u7EA6\u9879\u76EE",options:[{label:"\u79CD\u7259",value:1},{label:"\u8865\u7259",value:2},{label:"\u6839\u7BA1",value:3}],onUpdateChecked:e=>{console.log(e)}}},{field:"makeSource",component:"NRadioGroup",label:"\u6765\u6E90",componentProps:{options:[{label:"\u7F51\u4E0A",value:1},{label:"\u95E8\u5E97",value:2}],onUpdateChecked:e=>{console.log(e)}}}],b=te(),p=m(null),d=le(),f=m(),c=m(!1),i=m(!1),s=D({name:"",address:"",date:null}),P=m({pageSize:5,name:"xiaoMa"}),T=D({width:220,title:"\u64CD\u4F5C",key:"action",fixed:"right",render(e){return A(Q,{style:"button",actions:[{label:"\u5220\u9664",icon:"ic:outline-delete-outline",onClick:V.bind(null,e),ifShow:()=>!0,auth:["basic_list"]},{label:"\u7F16\u8F91",onClick:q.bind(null,e),ifShow:()=>!0,auth:["basic_list"]}],dropDownActions:[{label:"\u542F\u7528",key:"enabled",ifShow:()=>!0},{label:"\u7981\u7528",key:"disabled",ifShow:()=>!0}],select:n=>{d.info(`\u60A8\u70B9\u51FB\u4E86\uFF0C${n} \u6309\u94AE`)}})}}),[x,{}]=ee({gridProps:{cols:"1 s:1 m:2 l:3 xl:4 2xl:4"},labelWidth:80,schemas:u});function N(){c.value=!0}const R=e=>C(this,null,function*(){return yield Y(F(F(F({},s),P.value),e))});function S(e){console.log(e)}function E(){f.value.reload()}function U(e){e.preventDefault(),i.value=!0,p.value.validate(n=>{n?d.error("\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F"):(d.success("\u65B0\u5EFA\u6210\u529F"),setTimeout(()=>{c.value=!1,E()})),i.value=!1})}function q(e){console.log("\u70B9\u51FB\u4E86\u7F16\u8F91",e),b.push({name:"basic-info",params:{id:e.id}})}function V(e){console.log("\u70B9\u51FB\u4E86\u5220\u9664",e),d.info("\u70B9\u51FB\u4E86\u5220\u9664")}function I(e){console.log(e),E()}function M(e){console.log(e)}return(e,n)=>{const g=se,j=re,B=ie,h=ce,z=de,L=pe,$=me,G=_e,K=fe;return ne(),ae(K,{bordered:!1,class:"proCard"},{default:t(()=>[o(_(Z),{onRegister:_(x),onSubmit:I,onReset:M},{statusSlot:t(({model:r,field:k})=>[o(g,{value:r[k],"onUpdate:value":O=>r[k]=O},null,8,["value","onUpdate:value"])]),_:1},8,["onRegister"]),o(_(X),{columns:_(be),request:R,"row-key":r=>r.id,ref_key:"actionRef",ref:f,actionColumn:T,"onUpdate:checkedRowKeys":S,"scroll-x":1090},{tableTitle:t(()=>[o(B,{type:"primary",onClick:N},{icon:t(()=>[o(j,null,{default:t(()=>[o(_(Fe))]),_:1})]),default:t(()=>[v(" \u65B0\u5EFA ")]),_:1})]),_:1},8,["columns","row-key","actionColumn"]),o(G,{show:c.value,"onUpdate:show":n[4]||(n[4]=r=>c.value=r),"show-icon":!1,preset:"dialog",title:"\u65B0\u5EFA"},{action:t(()=>[o($,null,{default:t(()=>[o(B,{onClick:n[3]||(n[3]=()=>c.value=!1)},{default:t(()=>[v("\u53D6\u6D88")]),_:1}),o(B,{type:"info",loading:i.value,onClick:U},{default:t(()=>[v("\u786E\u5B9A")]),_:1},8,["loading"])]),_:1})]),default:t(()=>[o(L,{model:s,rules:l,ref_key:"formRef",ref:p,"label-placement":"left","label-width":80,class:"py-4"},{default:t(()=>[o(h,{label:"\u540D\u79F0",path:"name"},{default:t(()=>[o(g,{placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0",value:s.name,"onUpdate:value":n[0]||(n[0]=r=>s.name=r)},null,8,["value"])]),_:1}),o(h,{label:"\u5730\u5740",path:"address"},{default:t(()=>[o(g,{type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u5730\u5740",value:s.address,"onUpdate:value":n[1]||(n[1]=r=>s.address=r)},null,8,["value"])]),_:1}),o(h,{label:"\u65E5\u671F",path:"date"},{default:t(()=>[o(z,{type:"datetime",placeholder:"\u8BF7\u9009\u62E9\u65E5\u671F",value:s.date,"onUpdate:value":n[2]||(n[2]=r=>s.date=r)},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show"])]),_:1})}}});export{Pe as default};
