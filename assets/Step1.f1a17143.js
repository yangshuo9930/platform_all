import{d as y,r as m,u as b,o as x,c as A,w as a,a as u,i as _,k as C,ag as h,m as q,l as U,cK as w,p as k,a9 as N,q as T}from"./index.8636d9bb.js";const S=_("span",{class:"text-gray-400"},"\uFFE5",-1),V={style:{"margin-left":"80px"}},j=y({__name:"Step1",emits:["nextStep"],setup(L,{emit:r}){const i=[{label:"NaiveUiAdmin@163.com",value:1},{label:"NaiveUiAdmin@qq.com",value:2}],d=[{label:"\u5FAE\u4FE1",value:1},{label:"\u652F\u4ED8\u5B9D",value:2}],s=m(null),v=b(),e=m({accountType:1,myAccount:null,account:"xioama@qq.com",money:"1980",name:"Ah jung"}),B={name:{required:!0,message:"\u8BF7\u8F93\u5165\u6536\u6B3E\u4EBA\u59D3\u540D",trigger:"blur"},account:{required:!0,message:"\u8BF7\u8F93\u5165\u6536\u6B3E\u8D26\u6237",trigger:"blur"},money:{required:!0,message:"\u8BF7\u8F93\u5165\u8F6C\u8D26\u91D1\u989D",trigger:"blur"},myAccount:{required:!0,type:"number",message:"\u8BF7\u9009\u62E9\u4ED8\u6B3E\u8D26\u6237",trigger:"change"}};function f(){s.value.validate(c=>{c?v.error("\u9A8C\u8BC1\u5931\u8D25\uFF0C\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F"):r("nextStep")})}return(c,n)=>{const p=h,l=q,o=U,g=w,F=k,D=N,E=T;return x(),A(E,{"label-width":90,model:e.value,rules:B,"label-placement":"left",ref_key:"form1Ref",ref:s,style:{"max-width":"500px",margin:"40px auto 0 80px"}},{default:a(()=>[u(l,{label:"\u4ED8\u6B3E\u8D26\u6237",path:"myAccount"},{default:a(()=>[u(p,{placeholder:"\u8BF7\u9009\u62E9\u4ED8\u6B3E\u8D26\u6237",options:i,value:e.value.myAccount,"onUpdate:value":n[0]||(n[0]=t=>e.value.myAccount=t)},null,8,["value"])]),_:1}),u(l,{label:"\u6536\u6B3E\u8D26\u6237",path:"account"},{default:a(()=>[u(g,null,{default:a(()=>[u(p,{placeholder:"\u8BF7\u9009\u62E9",options:d,style:{width:"20%"},value:e.value.accountType,"onUpdate:value":n[1]||(n[1]=t=>e.value.accountType=t)},null,8,["value"]),u(o,{placeholder:"\u8BF7\u8F93\u5165\u6536\u6B3E\u8D26\u6237",style:{width:"80%"},value:e.value.account,"onUpdate:value":n[2]||(n[2]=t=>e.value.account=t)},null,8,["value"])]),_:1})]),_:1}),u(l,{label:"\u6536\u6B3E\u4EBA\u59D3\u540D",path:"name"},{default:a(()=>[u(o,{placeholder:"\u8BF7\u8F93\u5165\u6536\u6B3E\u4EBA\u59D3\u540D",value:e.value.name,"onUpdate:value":n[3]||(n[3]=t=>e.value.name=t)},null,8,["value"])]),_:1}),u(l,{label:"\u8F6C\u8D26\u91D1\u989D",path:"money"},{default:a(()=>[u(o,{placeholder:"\u8BF7\u8F93\u5165\u8F6C\u8D26\u91D1\u989D",value:e.value.money,"onUpdate:value":n[4]||(n[4]=t=>e.value.money=t)},{prefix:a(()=>[S]),_:1},8,["value"])]),_:1}),_("div",V,[u(D,null,{default:a(()=>[u(F,{type:"primary",onClick:f},{default:a(()=>[C("\u4E0B\u4E00\u6B65")]),_:1})]),_:1})])]),_:1},8,["model"])}}});export{j as default};
