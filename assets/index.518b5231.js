var se=Object.defineProperty;var te=Object.getOwnPropertySymbols;var ie=Object.prototype.hasOwnProperty,le=Object.prototype.propertyIsEnumerable;var ne=(_,g,h)=>g in _?se(_,g,{enumerable:!0,configurable:!0,writable:!0,value:h}):_[g]=h,X=(_,g)=>{for(var h in g||(g={}))ie.call(g,h)&&ne(_,h,g[h]);if(te)for(var h of te(g))le.call(g,h)&&ne(_,h,g[h]);return _};var ue=(_,g,h)=>new Promise((k,C)=>{var S=$=>{try{b(h.next($))}catch(m){C(m)}},M=$=>{try{b(h.throw($))}catch(m){C(m)}},b=$=>$.done?k($.value):Promise.resolve($.value).then(S,M);b((h=h.apply(_,g)).next())});import{T as ce,B as de,g as fe}from"./list.1afa2ab6.js";import{_ as he}from"./BasicForm.5a3a95d8.js";import{u as me}from"./useForm.9cc67148.js";import{b2 as pe,v as re,x as _e,d as $e,f as ge,r as z,u as ve,b as oe,o as be,c as ye,w as F,a as v,j as W,k as ee,l as Fe,N as De,p as we,m as Me,ai as Se,q as Be,a9 as ke,b0 as Ee,A as Ce}from"./index.1ba1d443.js";import{P as Te}from"./PlusOutlined.8ce6f4bf.js";import"./sortable.esm.9144dc9e.js";import"./useDesignSetting.b54fdde5.js";import"./propTypes.63aa8567.js";import"./componentSetting.df76d574.js";import"./index.esm.f1daf582.js";var ae={exports:{}};(function(_,g){(function(h,k){_.exports=k()})(pe,function(){var h=1e3,k=6e4,C=36e5,S="millisecond",M="second",b="minute",$="hour",m="day",N="week",w="month",V="quarter",B="year",T="date",R="Invalid Date",J=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,Z=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,G={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(o){var n=["th","st","nd","rd"],e=o%100;return"["+o+(n[(e-20)%10]||n[e]||n[0])+"]"}},H=function(o,n,e){var u=String(o);return!u||u.length>=n?o:""+Array(n+1-u.length).join(e)+o},K={s:H,z:function(o){var n=-o.utcOffset(),e=Math.abs(n),u=Math.floor(e/60),t=e%60;return(n<=0?"+":"-")+H(u,2,"0")+":"+H(t,2,"0")},m:function o(n,e){if(n.date()<e.date())return-o(e,n);var u=12*(e.year()-n.year())+(e.month()-n.month()),t=n.clone().add(u,w),r=e-t<0,a=n.clone().add(u+(r?-1:1),w);return+(-(u+(e-t)/(r?t-a:a-t))||0)},a:function(o){return o<0?Math.ceil(o)||0:Math.floor(o)},p:function(o){return{M:w,y:B,w:N,d:m,D:T,h:$,m:b,s:M,ms:S,Q:V}[o]||String(o||"").toLowerCase().replace(/s$/,"")},u:function(o){return o===void 0}},s="en",c={};c[s]=G;var x=function(o){return o instanceof Y},U=function o(n,e,u){var t;if(!n)return s;if(typeof n=="string"){var r=n.toLowerCase();c[r]&&(t=r),e&&(c[r]=e,t=r);var a=n.split("-");if(!t&&a.length>1)return o(a[0])}else{var l=n.name;c[l]=n,t=l}return!u&&t&&(s=t),t||!u&&s},d=function(o,n){if(x(o))return o.clone();var e=typeof n=="object"?n:{};return e.date=o,e.args=arguments,new Y(e)},i=K;i.l=U,i.i=x,i.w=function(o,n){return d(o,{locale:n.$L,utc:n.$u,x:n.$x,$offset:n.$offset})};var Y=function(){function o(e){this.$L=U(e.locale,null,!0),this.parse(e)}var n=o.prototype;return n.parse=function(e){this.$d=function(u){var t=u.date,r=u.utc;if(t===null)return new Date(NaN);if(i.u(t))return new Date;if(t instanceof Date)return new Date(t);if(typeof t=="string"&&!/Z$/i.test(t)){var a=t.match(J);if(a){var l=a[2]-1||0,p=(a[7]||"0").substring(0,3);return r?new Date(Date.UTC(a[1],l,a[3]||1,a[4]||0,a[5]||0,a[6]||0,p)):new Date(a[1],l,a[3]||1,a[4]||0,a[5]||0,a[6]||0,p)}}return new Date(t)}(e),this.$x=e.x||{},this.init()},n.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},n.$utils=function(){return i},n.isValid=function(){return this.$d.toString()!==R},n.isSame=function(e,u){var t=d(e);return this.startOf(u)<=t&&t<=this.endOf(u)},n.isAfter=function(e,u){return d(e)<this.startOf(u)},n.isBefore=function(e,u){return this.endOf(u)<d(e)},n.$g=function(e,u,t){return i.u(e)?this[u]:this.set(t,e)},n.unix=function(){return Math.floor(this.valueOf()/1e3)},n.valueOf=function(){return this.$d.getTime()},n.startOf=function(e,u){var t=this,r=!!i.u(u)||u,a=i.p(e),l=function(P,D){var O=i.w(t.$u?Date.UTC(t.$y,D,P):new Date(t.$y,D,P),t);return r?O:O.endOf(m)},p=function(P,D){return i.w(t.toDate()[P].apply(t.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(D)),t)},f=this.$W,y=this.$M,A=this.$D,E="set"+(this.$u?"UTC":"");switch(a){case B:return r?l(1,0):l(31,11);case w:return r?l(1,y):l(0,y+1);case N:var I=this.$locale().weekStart||0,L=(f<I?f+7:f)-I;return l(r?A-L:A+(6-L),y);case m:case T:return p(E+"Hours",0);case $:return p(E+"Minutes",1);case b:return p(E+"Seconds",2);case M:return p(E+"Milliseconds",3);default:return this.clone()}},n.endOf=function(e){return this.startOf(e,!1)},n.$set=function(e,u){var t,r=i.p(e),a="set"+(this.$u?"UTC":""),l=(t={},t[m]=a+"Date",t[T]=a+"Date",t[w]=a+"Month",t[B]=a+"FullYear",t[$]=a+"Hours",t[b]=a+"Minutes",t[M]=a+"Seconds",t[S]=a+"Milliseconds",t)[r],p=r===m?this.$D+(u-this.$W):u;if(r===w||r===B){var f=this.clone().set(T,1);f.$d[l](p),f.init(),this.$d=f.set(T,Math.min(this.$D,f.daysInMonth())).$d}else l&&this.$d[l](p);return this.init(),this},n.set=function(e,u){return this.clone().$set(e,u)},n.get=function(e){return this[i.p(e)]()},n.add=function(e,u){var t,r=this;e=Number(e);var a=i.p(u),l=function(y){var A=d(r);return i.w(A.date(A.date()+Math.round(y*e)),r)};if(a===w)return this.set(w,this.$M+e);if(a===B)return this.set(B,this.$y+e);if(a===m)return l(1);if(a===N)return l(7);var p=(t={},t[b]=k,t[$]=C,t[M]=h,t)[a]||1,f=this.$d.getTime()+e*p;return i.w(f,this)},n.subtract=function(e,u){return this.add(-1*e,u)},n.format=function(e){var u=this,t=this.$locale();if(!this.isValid())return t.invalidDate||R;var r=e||"YYYY-MM-DDTHH:mm:ssZ",a=i.z(this),l=this.$H,p=this.$m,f=this.$M,y=t.weekdays,A=t.months,E=function(D,O,Q,q){return D&&(D[O]||D(u,r))||Q[O].slice(0,q)},I=function(D){return i.s(l%12||12,D,"0")},L=t.meridiem||function(D,O,Q){var q=D<12?"AM":"PM";return Q?q.toLowerCase():q},P={YY:String(this.$y).slice(-2),YYYY:this.$y,M:f+1,MM:i.s(f+1,2,"0"),MMM:E(t.monthsShort,f,A,3),MMMM:E(A,f),D:this.$D,DD:i.s(this.$D,2,"0"),d:String(this.$W),dd:E(t.weekdaysMin,this.$W,y,2),ddd:E(t.weekdaysShort,this.$W,y,3),dddd:y[this.$W],H:String(l),HH:i.s(l,2,"0"),h:I(1),hh:I(2),a:L(l,p,!0),A:L(l,p,!1),m:String(p),mm:i.s(p,2,"0"),s:String(this.$s),ss:i.s(this.$s,2,"0"),SSS:i.s(this.$ms,3,"0"),Z:a};return r.replace(Z,function(D,O){return O||P[D]||a.replace(":","")})},n.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},n.diff=function(e,u,t){var r,a=i.p(u),l=d(e),p=(l.utcOffset()-this.utcOffset())*k,f=this-l,y=i.m(this,l);return y=(r={},r[B]=y/12,r[w]=y,r[V]=y/3,r[N]=(f-p)/6048e5,r[m]=(f-p)/864e5,r[$]=f/C,r[b]=f/k,r[M]=f/h,r)[a]||f,t?y:i.a(y)},n.daysInMonth=function(){return this.endOf(w).$D},n.$locale=function(){return c[this.$L]},n.locale=function(e,u){if(!e)return this.$L;var t=this.clone(),r=U(e,u,!0);return r&&(t.$L=r),t},n.clone=function(){return i.w(this.$d,this)},n.toDate=function(){return new Date(this.valueOf())},n.toJSON=function(){return this.isValid()?this.toISOString():null},n.toISOString=function(){return this.$d.toISOString()},n.toString=function(){return this.$d.toUTCString()},o}(),j=Y.prototype;return d.prototype=j,[["$ms",S],["$s",M],["$m",b],["$H",$],["$W",m],["$M",w],["$y",B],["$D",T]].forEach(function(o){j[o[1]]=function(n){return this.$g(n,o[0],o[1])}}),d.extend=function(o,n){return o.$i||(o(n,Y,d),o.$i=!0),d},d.locale=U,d.isDayjs=x,d.unix=function(o){return d(1e3*o)},d.en=c[s],d.Ls=c,d.p={},d})})(ae);var Ae=ae.exports;const Oe="YYYY-MM-DD ";function xe(_,g=Oe){return Ae(_).format(g)}const Ne=[{title:"id",key:"id",width:100},{title:"\u540D\u79F0",key:"name",width:100},{title:"\u5934\u50CF",key:"avatar",width:100,render(_){return re(_e,{size:48,src:_.avatar})}},{title:"\u5730\u5740",key:"address",auth:["basic_list"],ifShow:_=>!0,width:150},{title:"\u5F00\u59CB\u65E5\u671F",key:"beginTime",width:160},{title:"\u7ED3\u675F\u65E5\u671F",key:"endTime",width:160,render(_){return xe(_.endTime)}},{title:"\u521B\u5EFA\u65F6\u95F4",key:"date",width:100}],ze=$e({__name:"index",setup(_){const g={name:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u540D\u79F0"},address:{required:!0,trigger:["blur","input"],message:"\u8BF7\u8F93\u5165\u5730\u5740"},date:{type:"number",required:!0,trigger:["blur","change"],message:"\u8BF7\u9009\u62E9\u65E5\u671F"}},h=[{field:"name",labelMessage:"\u8FD9\u662F\u4E00\u4E2A\u63D0\u793A",component:"NInput",label:"\u59D3\u540D",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u59D3\u540D",onInput:s=>{console.log(s)}},rules:[{required:!0,message:"\u8BF7\u8F93\u5165\u59D3\u540D",trigger:["blur"]}]},{field:"mobile",component:"NInputNumber",label:"\u624B\u673A",componentProps:{placeholder:"\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801",showButton:!1,onInput:s=>{console.log(s)}}},{field:"type",component:"NSelect",label:"\u7C7B\u578B",componentProps:{placeholder:"\u8BF7\u9009\u62E9\u7C7B\u578B",options:[{label:"\u8212\u9002\u6027",value:1},{label:"\u7ECF\u6D4E\u6027",value:2}],onUpdateValue:s=>{console.log(s)}}},{field:"makeDate",component:"NDatePicker",label:"\u9884\u7EA6\u65F6\u95F4",defaultValue:118313526e4,componentProps:{type:"date",clearable:!0,onUpdateValue:s=>{console.log(s)}}},{field:"makeTime",component:"NTimePicker",label:"\u505C\u7559\u65F6\u95F4",componentProps:{clearable:!0,onUpdateValue:s=>{console.log(s)}}},{field:"status",label:"\u72B6\u6001",slot:"statusSlot"},{field:"makeProject",component:"NCheckbox",label:"\u9884\u7EA6\u9879\u76EE",componentProps:{placeholder:"\u8BF7\u9009\u62E9\u9884\u7EA6\u9879\u76EE",options:[{label:"\u79CD\u7259",value:1},{label:"\u8865\u7259",value:2},{label:"\u6839\u7BA1",value:3}],onUpdateChecked:s=>{console.log(s)}}},{field:"makeSource",component:"NRadioGroup",label:"\u6765\u6E90",componentProps:{options:[{label:"\u7F51\u4E0A",value:1},{label:"\u95E8\u5E97",value:2}],onUpdateChecked:s=>{console.log(s)}}}],k=ge(),C=z(null),S=ve(),M=z(),b=z(!1),$=z(!1),m=oe({name:"",address:"",date:null}),N=oe({width:220,title:"\u64CD\u4F5C",key:"action",fixed:"right",render(s){return re(ce,{style:"button",actions:[{label:"\u5220\u9664",icon:"ic:outline-delete-outline",onClick:G.bind(null,s),ifShow:()=>!0,auth:["basic_list"]},{label:"\u7F16\u8F91",onClick:Z.bind(null,s),ifShow:()=>!0,auth:["basic_list"]}],dropDownActions:[{label:"\u542F\u7528",key:"enabled",ifShow:()=>!0},{label:"\u7981\u7528",key:"disabled",ifShow:()=>!0}],select:c=>{S.info(`\u60A8\u70B9\u51FB\u4E86\uFF0C${c} \u6309\u94AE`)}})}}),[w,{}]=me({gridProps:{cols:"1 s:1 m:2 l:3 xl:4 2xl:4"},labelWidth:80,schemas:h});function V(){b.value=!0}const B=s=>ue(this,null,function*(){return yield fe(X(X({},m),s))});function T(s){console.log(s)}function R(){M.value.reload()}function J(s){s.preventDefault(),$.value=!0,C.value.validate(c=>{c?S.error("\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F"):(S.success("\u65B0\u5EFA\u6210\u529F"),setTimeout(()=>{b.value=!1,R()})),$.value=!1})}function Z(s){console.log("\u70B9\u51FB\u4E86\u7F16\u8F91",s),k.push({name:"basic-info",params:{id:s.id}})}function G(s){console.log("\u70B9\u51FB\u4E86\u5220\u9664",s),S.info("\u70B9\u51FB\u4E86\u5220\u9664")}function H(s){console.log(s),R()}function K(s){console.log(s)}return(s,c)=>{const x=Fe,U=De,d=we,i=Me,Y=Se,j=Be,o=ke,n=Ee,e=Ce;return be(),ye(e,{bordered:!1,class:"proCard"},{default:F(()=>[v(W(he),{onRegister:W(w),onSubmit:H,onReset:K},{statusSlot:F(({model:u,field:t})=>[v(x,{value:u[t],"onUpdate:value":r=>u[t]=r},null,8,["value","onUpdate:value"])]),_:1},8,["onRegister"]),v(W(de),{columns:W(Ne),request:B,"row-key":u=>u.id,ref_key:"actionRef",ref:M,actionColumn:N,"onUpdate:checkedRowKeys":T,"scroll-x":1e3},{tableTitle:F(()=>[v(d,{type:"primary",onClick:V},{icon:F(()=>[v(U,null,{default:F(()=>[v(W(Te))]),_:1})]),default:F(()=>[ee(" \u65B0\u5EFA ")]),_:1})]),_:1},8,["columns","row-key","actionColumn"]),v(n,{show:b.value,"onUpdate:show":c[4]||(c[4]=u=>b.value=u),"show-icon":!1,preset:"dialog",title:"\u65B0\u5EFA"},{action:F(()=>[v(o,null,{default:F(()=>[v(d,{onClick:c[3]||(c[3]=()=>b.value=!1)},{default:F(()=>[ee("\u53D6\u6D88")]),_:1}),v(d,{type:"info",loading:$.value,onClick:J},{default:F(()=>[ee("\u786E\u5B9A")]),_:1},8,["loading"])]),_:1})]),default:F(()=>[v(j,{model:m,rules:g,ref_key:"formRef",ref:C,"label-placement":"left","label-width":80,class:"py-4"},{default:F(()=>[v(i,{label:"\u540D\u79F0",path:"name"},{default:F(()=>[v(x,{placeholder:"\u8BF7\u8F93\u5165\u540D\u79F0",value:m.name,"onUpdate:value":c[0]||(c[0]=u=>m.name=u)},null,8,["value"])]),_:1}),v(i,{label:"\u5730\u5740",path:"address"},{default:F(()=>[v(x,{type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u5730\u5740",value:m.address,"onUpdate:value":c[1]||(c[1]=u=>m.address=u)},null,8,["value"])]),_:1}),v(i,{label:"\u65E5\u671F",path:"date"},{default:F(()=>[v(Y,{type:"datetime",placeholder:"\u8BF7\u9009\u62E9\u65E5\u671F",value:m.date,"onUpdate:value":c[2]||(c[2]=u=>m.date=u)},null,8,["value"])]),_:1})]),_:1},8,["model"])]),_:1},8,["show"])]),_:1})}}});export{ze as default};