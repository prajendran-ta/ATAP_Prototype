"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[5873],{17076:(e,a,t)=>{t.d(a,{A:()=>B});var r=t(74848),i=t(96540),n=t(94439),d=t(17426);const l=new Map;var s=t(44669);const o=s.A.div`
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px 0;
  min-height: 0;
`,c=s.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,p=s.A.div`
  border: 1px solid ${n.Tj.cloud_40};
  border-radius: 6px;
  display: flex;
  flex-direction: column;
`,u=s.A.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${n.Tj.cloud_10};
  border-bottom: 1px solid ${n.Tj.cloud_20};
`,f=s.A.button`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 auto;
  min-width: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 14px;
  font-weight: 500;
  color: ${n.Tj.cloud_100};
`,x=s.A.span`
  font-size: 12px;
  font-weight: 400;
  color: ${n.Tj.cloud_80};
`,g=s.A.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
`,m=s.A.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${n.Tj.cloud_80};
`,h=s.A.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 16px;
`,j=s.A.div`
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  min-height: 36px;
  padding: 6px 10px;
  border-bottom: 1px solid ${n.Tj.cloud_30};

  /* DF table row hover = cloud_20 (#f2f2f2), fills the full row. */
  &:hover {
    background: ${n.Tj.cloud_20};
  }

  &:last-of-type {
    border-bottom: none;
  }
`,b=s.A.div`
  display: grid;
  grid-template-columns: 16px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 6px 10px;
  background: ${n.Tj.cloud_0};
  border-bottom: 1px solid ${n.Tj.cloud_30};
  font-size: 14px;
  font-weight: 500;
  color: ${n.Tj.cloud_100};
`,v=s.A.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
  min-width: 0;
`,y=s.A.span`
  font-size: 14px;
  color: ${n.Tj.cloud_100};
`,w=s.A.span`
  font-size: 12px;
  color: ${n.Tj.cloud_80};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`,C=s.A.span`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({color:e})=>e};
`,S=s.A.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: ${n.Tj.cloud_70};

  &:hover:not(:disabled) {
    background: ${n.Tj.cloud_20};
    color: ${n.Tj.crimson_60};
  }
`,_=s.A.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`,A=s.A.div`
  flex: 1 1 auto;
  min-width: 0;
`,I=s.A.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid ${n.Tj.cloud_30};
`,$=s.A.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`,T=s.A.div`
  flex: 1 1 auto;
`,k=s.A.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px 24px;
  background: ${n.Tj.cloud_0};
  border-top: 1px solid ${n.Tj.cloud_40};
`,D=s.A.div`
  color: ${n.Tj.cloud_70};
  font-size: 14px;
  padding: 16px 0;
`,N=s.A.span`
  display: inline-flex;
  align-items: center;
  flex: 0 0 auto;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.2;
  padding: 2px 8px;
  border-radius: 9999px;
  background: ${n.Tj.sky_60};
  color: ${n.Tj.cloud_0};
  border: none;
`,L=(0,s.A)(p)`
  border-left: 3px solid ${n.Tj.sky_60};
`,M=(0,s.A)(j)`
  background: ${n.Tj.sky_10};
  box-shadow: inset 3px 0 0 ${n.Tj.sky_60};

  &:hover {
    background: ${n.Tj.sky_20};
  }
`,H="__own__:";function O(e){return"green"===e?"Confirmed":"red"===e?"Not confirmed after 48h":"Awaiting backend confirmation"}function E({offerIds:e,readOnly:a=!1,baselineIds:t,onRemove:d,idHeader:l,detailHeader:s}){const[o,c]=(0,i.useState)(1),p=(0,i.useRef)(e.length);(0,i.useEffect)(()=>{e.length>p.current&&c(1),p.current=e.length},[e.length]);const u=Math.max(1,Math.ceil(e.length/10)),f=Math.min(o,u),x=10*(f-1),g=e.slice(x,x+10);return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(b,{children:[(0,r.jsx)("span",{"aria-hidden":!0}),(0,r.jsxs)("span",{children:[l," · ",s]}),(0,r.jsx)("span",{"aria-hidden":!0})]}),g.map(e=>{const i=!t.has(e.id),l=i?M:j;return(0,r.jsxs)(l,{children:[(0,r.jsx)(C,{color:(s=e.status,"green"===s?n.Tj.forest_60:"red"===s?n.Tj.crimson_60:n.Tj.cloud_50),title:O(e.status)}),(0,r.jsxs)(v,{children:[(0,r.jsxs)(y,{children:[e.idLabel,i&&(0,r.jsx)(N,{style:{marginLeft:8},children:"New"})]}),(0,r.jsx)(w,{children:e.detail})]}),!a&&(0,r.jsx)(S,{type:"button","aria-label":`Remove ${e.idLabel}`,onClick:()=>d(e.id),children:(0,r.jsx)(n.In,{name:"trashCan",width:14,height:14})})]},e.id);var s}),e.length>10&&(0,r.jsx)(n.dK,{current:f,pageSize:10,total:e.length,showTotal:(e,[a,t])=>`${a}–${t} of ${e} offer IDs`,onChange:e=>c(e)})]})}function P({id:e,options:a,addLabel:t,onAdd:d}){const l="__select_all__",[s,o]=(0,i.useState)([]),[c,p]=(0,i.useState)(""),u=(0,i.useMemo)(()=>{const e=c.trim().toLowerCase();return e?a.filter(a=>a.label.toLowerCase().includes(e)):a},[c,a]),f=(0,i.useMemo)(()=>{const e=c.trim(),t=a.some(a=>a.label.toLowerCase().includes(e.toLowerCase())),r=e&&!t?[{label:`Add "${e}" (comma-separate for multiple)`,value:`${H}${e}`}]:[];return[...u.length>0?[{label:e?`Select all ${u.length} matching "${e}"`:"Select all",value:l}]:[],...r,...a]},[c,a,u]);return(0,r.jsxs)("div",{style:{display:"flex",gap:8,alignItems:"flex-end"},children:[(0,r.jsx)("div",{style:{flex:1,minWidth:0},children:(0,r.jsx)(n.l6,{id:e,label:t,mode:"multiple",showSearch:!0,placeholder:"Select from available, or type IDs (comma-separated) to add",options:f,value:s,onChange:e=>{var a;(a=e).includes(l)?o(e=>Array.from(new Set([...e,...u.map(e=>e.value)]))):o(a.filter(e=>e!==l))},onSearch:p,searchBy:"label",notFoundContent:"Type to add an Offer ID"})}),(0,r.jsx)(n.$n,{htmlType:"button",size:"small",disabled:0===s.length,onClick:()=>{d(s),o([]),p("")},children:"Add"})]})}const B=function({open:e,campaign:a,readOnly:t=!1,onClose:s}){const[j,b]=(0,i.useState)([]),[v,y]=(0,i.useState)([]),[w,M]=(0,i.useState)(new Set),[O,B]=(0,i.useState)(new Set),[z,F]=(0,i.useState)(!1),[R,Y]=(0,i.useState)(""),[W,q]=(0,i.useState)(""),[Z,J]=(0,i.useState)({groupIds:new Set,offerIds:new Set}),[K,U]=(0,i.useState)(!1);(0,i.useEffect)(()=>{if(e&&a){const e=function(e,a){if(!l.has(e)){const t=["Summer Special","Valentine's Day Promo","Black Friday Deal","Easter Getaway","Spring Escape","Christmas Offer","New Year Stay","Autumn Retreat","Weekend Flash Sale","Halloween Special","Back to School Offer","Labor Day Deal","Early Summer Promo","Winter Wonderland","Mother's Day Treat","Father's Day Offer"],r=Array.from({length:500},(e,r)=>(e=>{const r=String(5e4+e),i=`${t[e%t.length]} ${r}`;return"CM360"===a?{id:`CR-${r}`,idLabel:`CR-${r}`,detail:i,status:"green"}:{id:`AD-${r}`,idLabel:`AD-${r}`,detail:i,status:"green"}})(r+1)),i=["green","green","green","grey","green","red"];let n=0;const d=["Summer Sale – 20% off","Free breakfast included","Stay 3 nights, pay 2","Early bird – book 60 days ahead","Member exclusive rate","Last-minute deal","Family package","Spa & wellness offer","Weekend getaway","Advance purchase 10% off","Flexible rate","Non-refundable saver","Honeymoon special","Long-stay discount","City break bundle","All-inclusive offer","Resort credit $50","Kids stay free","Suite upgrade offer","Loyalty bonus points"].map((e,a)=>{const t=Array.from({length:20},(e,t)=>({...r[n++],status:i[(a+t)%i.length]}));return{id:`og-${a+1}`,text:e,offerIds:t}}),s=new Set(d.flatMap(e=>e.offerIds.map(e=>e.id)));l.set(e,{groups:d,available:r.filter(e=>!s.has(e.id))})}return l.get(e)}(a.id,a.platform);b(e.groups.map(e=>({...e,offerIds:[...e.offerIds]}))),y([...e.available]),M(new Set),B(new Set),F(!1),Y(""),q(""),U(!1),J({groupIds:new Set(e.groups.map(e=>e.id)),offerIds:new Set(e.groups.flatMap(e=>e.offerIds.map(e=>e.id)))})}},[e,a]),(0,i.useEffect)(()=>{const e=W.trim().toLowerCase();if(!e)return void M(new Set);const a=j.filter(a=>a.text.toLowerCase().includes(e)||a.offerIds.some(a=>a.idLabel.toLowerCase().includes(e)||a.detail.toLowerCase().includes(e))).map(e=>e.id);M(new Set(a))},[W]);const G=(0,i.useMemo)(()=>new Set(j.flatMap(e=>e.offerIds.map(e=>e.id))),[j]),V=function(e){switch(e){case"SA360":return{idHeader:"Ad ID",detailHeader:"Ad URL",addLabel:"Add Ad IDs"};case"CM360":return{idHeader:"Creative ID",detailHeader:"Creatives",addLabel:"Add Creative IDs"};case"Meta":return{idHeader:"Ad ID",detailHeader:"Ad Name",addLabel:"Add Ad IDs"};default:return{idHeader:"Offer ID",detailHeader:"Detail",addLabel:"Add Offer IDs"}}}(a?.platform),X=(e,a)=>b(t=>t.map(t=>t.id===e?{...t,offerIds:t.offerIds.filter(e=>e.id!==a)}:t)),Q=W.trim().toLowerCase(),ee=(0,i.useMemo)(()=>{let e=j;if(Q){e=[];for(const a of j){const t=a.text.toLowerCase().includes(Q),r=a.offerIds.filter(e=>e.idLabel.toLowerCase().includes(Q)||e.detail.toLowerCase().includes(Q));t?e.push(a):r.length>0&&e.push({...a,offerIds:r})}}const a=e=>!Z.groupIds.has(e.id);return[...e].sort((e,t)=>Number(a(t))-Number(a(e))||e.text.localeCompare(t.text))},[j,Q,Z]),ae=a?`Offers — ${a.externalCampaignName}`:"Offers",te=R.trim().length>=1&&R.trim().length<=255;return(0,r.jsxs)(n._s,{id:"offers-drawer",title:ae,placement:"right",width:"820px",onClose:s,open:e,destroyOnClose:!0,styles:{body:{padding:0,display:"flex",flexDirection:"column"},header:{background:"transparent"}},children:[(0,r.jsxs)(o,{children:[(0,r.jsxs)(c,{children:[(0,r.jsxs)("div",{children:[(0,r.jsxs)(n.EY.H5,{id:"offers-drawer_ttl",children:["Offers (",j.length,")"]}),(0,r.jsxs)(n.EY.nB,{id:"offers-drawer_idtype-txt",style:{color:n.Tj.cloud_80,fontSize:12},children:["Offer IDs for this campaign: ",V.idHeader," (",V.detailHeader,")"]})]}),!t&&(0,r.jsx)(n.$n,{id:"offers-drawer_add-text-btn",variant:"outlined",size:"small",onClick:()=>F(!0),children:"Add Offer text"})]}),(0,r.jsx)(d.A.Search,{id:"offers-drawer_search-inp",placeholder:"Search offers by text, Offer ID, or name/URL",allowClear:!0,value:W,onChange:e=>q(e.target.value)}),z&&(0,r.jsxs)($,{children:[(0,r.jsx)(T,{children:(0,r.jsx)(n.pd,{id:"offers-drawer_new-text-inp",label:"New Offer text",required:!0,placeholder:"Offer text (1–255 characters)",value:R,onChange:e=>Y(e.target.value),errorMessage:R.length>0&&!te?"Offer text must be 1–255 characters":void 0})}),(0,r.jsx)(n.$n,{id:"offers-drawer_create-text-btn",htmlType:"button",onClick:()=>{const e=R.trim();if(e.length<1||e.length>255)return;const a=`og-new-${Date.now()}`;b(t=>[{id:a,text:e,offerIds:[]},...t]),M(e=>new Set(e).add(a)),F(!1),Y("")},disabled:!te,children:"Add"}),(0,r.jsx)(n.$n,{id:"offers-drawer_cancel-text-btn",variant:"outlined",htmlType:"button",onClick:()=>{F(!1),Y("")},children:"Cancel"})]}),0===j.length&&!z&&(0,r.jsx)(D,{children:"No offers yet. Use “Add Offer text” to create one."}),j.length>0&&0===ee.length&&(0,r.jsx)(D,{children:"No offers match your search."}),ee.map(e=>{const a=w.has(e.id),i=v.filter(e=>!G.has(e.id)).map(e=>({label:`${e.idLabel} · ${e.detail}`,value:e.id})),d=0===i.length,l=!Z.groupIds.has(e.id),s=l?L:p;return(0,r.jsxs)(s,{children:[(0,r.jsxs)(u,{children:[(0,r.jsxs)(f,{type:"button",onClick:()=>{return a=e.id,M(e=>{const t=new Set(e);return t.has(a)?t.delete(a):t.add(a),t});var a},children:[(0,r.jsx)(n.In,{name:a?"chevronDown":"chevronRight",width:12,height:12}),(0,r.jsx)("span",{children:e.text}),(0,r.jsxs)(x,{children:["· ",e.offerIds.length," offer",1===e.offerIds.length?"":"s"]}),l&&(0,r.jsx)(N,{id:`offers-drawer_new-group-${e.id}`,children:"New"})]}),(()=>{const a={green:0,grey:0,red:0};return e.offerIds.forEach(e=>a[e.status]+=1),(0,r.jsxs)(g,{children:[a.green>0&&(0,r.jsxs)(m,{title:"Confirmed",children:[(0,r.jsx)(C,{color:n.Tj.forest_60})," ",a.green]}),a.grey>0&&(0,r.jsxs)(m,{title:"Awaiting backend confirmation",children:[(0,r.jsx)(C,{color:n.Tj.cloud_50})," ",a.grey]}),a.red>0&&(0,r.jsxs)(m,{title:"Needs attention",children:[(0,r.jsx)(C,{color:n.Tj.crimson_60})," ",a.red]})]})})(),!t&&(0,r.jsx)(S,{type:"button","aria-label":`Delete offer text "${e.text}"`,onClick:()=>{return a=e.id,b(e=>e.filter(e=>e.id!==a));var a},children:(0,r.jsx)(n.In,{name:"trashCan",width:16,height:16})})]}),a&&(0,r.jsx)(h,{children:(()=>{const a=e.offerIds.filter(e=>!Z.offerIds.has(e.id)),l=e.offerIds.length,s=O.has(e.id),o=!!Q||s,c=o?e.offerIds:a;return(0,r.jsxs)(r.Fragment,{children:[!t&&(0,r.jsx)(_,{children:(0,r.jsx)(A,{children:d?(0,r.jsxs)(D,{children:["No ",V.idHeader,"s available to map — all are already mapped."]}):(0,r.jsx)(P,{id:`offers-drawer_add-ids-${e.id}`,options:i,addLabel:V.addLabel,onAdd:a=>((e,a)=>{a.length&&b(t=>t.map(t=>{if(t.id!==e)return t;const r=a.flatMap(e=>{if(e.startsWith(H))return e.slice(8).split(",").map(e=>e.trim()).filter(Boolean).map(e=>({id:e,idLabel:e,detail:"Manually added",status:"grey"}));const a=v.find(a=>a.id===e);return[a?{...a,status:"green"}:{id:e,idLabel:e,detail:"",status:"green"}]}),i=new Set(t.offerIds.map(e=>e.id)),n=r.filter(e=>!i.has(e.id));return{...t,offerIds:[...n,...t.offerIds]}}))})(e.id,a)})})}),!o&&a.length>0&&(0,r.jsx)(E,{offerIds:a,readOnly:t,baselineIds:Z.offerIds,onRemove:a=>X(e.id,a),idHeader:V.idHeader,detailHeader:V.detailHeader}),!Q&&l>0&&(0,r.jsx)(I,{children:(0,r.jsx)(n.$n,{id:`offers-drawer_view-mapped-${e.id}`,variant:"outlined",size:"small",onClick:()=>{return a=e.id,B(e=>{const t=new Set(e);return t.has(a)?t.delete(a):t.add(a),t});var a},children:s?"Hide mapped offers":`View mapped offers (${l})`})}),o&&(c.length>0?(0,r.jsx)(E,{offerIds:c,readOnly:t,baselineIds:Z.offerIds,onRemove:a=>X(e.id,a),idHeader:V.idHeader,detailHeader:V.detailHeader}):(0,r.jsxs)(D,{children:["No ",V.idHeader,"s to show."]})),t&&0===l&&(0,r.jsxs)(D,{children:["No ",V.idHeader,"s yet."]})]})})()})]},e.id)})]}),(0,r.jsxs)(k,{children:[(0,r.jsx)(n.$n,{htmlType:"button",id:"offers-drawer_cancel-btn",variant:"outlined",onClick:s,children:t?"Close":"Cancel"}),!t&&(0,r.jsx)(n.$n,{htmlType:"button",id:"offers-drawer_save-btn",onClick:()=>{(()=>{const e=new Set(j.map(e=>e.id)),a=new Set(j.flatMap(e=>e.offerIds.map(e=>e.id)));for(const a of Z.groupIds)if(!e.has(a))return!0;for(const e of Z.offerIds)if(!a.has(e))return!0;return!1})()?U(!0):s()},children:"Save"})]}),(0,r.jsx)(n.aF,{idPrefix:"offers-save",title:"Save changes",open:K,okText:"Save",cancelText:"Cancel",onCancel:()=>U(!1),onOk:()=>{U(!1),s()},children:"Your changes include deleting offers or Offer IDs. Saving will remove them. Continue?"})]})}},56723:(e,a,t)=>{t.d(a,{JK:()=>p,NP:()=>s,RF:()=>f,Zp:()=>d,at:()=>g,hC:()=>o,i8:()=>x,i_:()=>u,n1:()=>l,tb:()=>m,v2:()=>c,zj:()=>n});var r=t(44669),i=t(94439);const n=r.A.div`
  flex: 1 1 auto;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 24px 16px;
`,d=r.A.div`
  border: 1px solid ${i.Tj.cloud_40};
  border-radius: 6px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,l=r.A.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`,s=r.A.span`
  font-size: 12px;
  color: ${i.Tj.cloud_80};
`,o=r.A.div`
  font-size: 14px;
  color: ${i.Tj.cloud_100};
  background: ${i.Tj.cloud_20};
  border: 1px solid ${i.Tj.cloud_30};
  border-radius: 4px;
  padding: 6px 10px;
  min-height: 32px;
  display: flex;
  align-items: center;
`,c=r.A.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`,p=r.A.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 12px;
`,u=r.A.div`
  grid-column: 1 / -1;
`,f=r.A.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`,x=r.A.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border: 1px solid ${i.Tj.cloud_40};
  background: ${i.Tj.cloud_0};
  border-radius: 4px;
  cursor: pointer;
  color: ${i.Tj.sky_60};

  &:hover {
    background: ${i.Tj.cloud_20};
  }
`,g=r.A.p`
  font-size: 12px;
  color: ${i.Tj.cloud_80};
  margin: 0;
`,m=r.A.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 12px 24px;
  background: ${i.Tj.cloud_0};
  border-top: 1px solid ${i.Tj.cloud_40};
`},63161:(e,a,t)=>{t.d(a,{Hz:()=>p,IT:()=>u,UX:()=>s});var r=t(88218),i=t(59536);const n={custom1:"",custom2:"",custom3:""},d="mediahub.advertiser-reporting.v1";function l(){if("undefined"==typeof localStorage)return{};try{return JSON.parse(localStorage.getItem(d)??"{}")}catch{return localStorage.removeItem(d),{}}}function s(e){const a=l();return{...n,...a[String(e??"")]??{}}}const o={...Object.fromEntries(i.TE.map(e=>[e.bpid,{...e.reporting}])),"BP-2850":{custom1:"Market",custom2:"",custom3:""},"BP-64517":{custom1:"Region",custom2:"Campaign Objective",custom3:"Fiscal Year"},"BP-64518":{custom1:"Region",custom2:"Property Cluster",custom3:""},"BP-51546":{custom1:"Market",custom2:"Booking Window",custom3:""},"BP-9074305":{custom1:"Market",custom2:"Campaign Objective",custom3:""},"BP-9113259":{custom1:"Region",custom2:"",custom3:""},[r.gz.bpid]:{...r.pA},"BP-9104332":{custom1:"Market",custom2:"Booking Window",custom3:"Fiscal Year"}};let c=!1;function p(){if(c||"undefined"==typeof localStorage)return;c=!0;const e=l();let a=!1;for(const[t,r]of Object.entries(o))t in e||(e[t]=r,a=!0);a&&localStorage.setItem(d,JSON.stringify(e))}function u(e,a){if("undefined"==typeof localStorage)return;const t=l();t[String(e??"")]=a,localStorage.setItem(d,JSON.stringify(t))}},79474:(e,a,t)=>{t.d(a,{A:()=>u,C:()=>c});var r=t(74848),i=t(96540),n=t(94439),d=t(95144),l=t(75575),s=t(63161),o=t(56723);const c={advertiser:"Advertiser Mapping",campaign:"Campaign Mapping",invoice:"Invoice Mapping",offers:"Offers Mapping",oba:"OBA Mapping"};function p({label:e,value:a}){return(0,r.jsxs)(o.n1,{children:[(0,r.jsx)(o.NP,{children:e}),(0,r.jsx)(o.hC,{children:a})]})}const u=function({open:e,mappingType:a,campaign:t,onClose:u,onSave:f,onDelete:x,readOnly:g=!1}){const m=a?c[a]:"Mapping",h=(0,n.hN)(),[j,b]=(0,i.useState)(void 0),[v,y]=(0,i.useState)(void 0),[w,C]=(0,i.useState)(void 0),[S,_]=(0,i.useState)(void 0),[A,I]=(0,i.useState)(""),[$,T]=(0,i.useState)(""),[k,D]=(0,i.useState)(""),[N,L]=(0,i.useState)(""),[M,H]=(0,i.useState)(void 0),[O,E]=(0,i.useState)(""),[P,B]=(0,i.useState)(!1);(0,i.useEffect)(()=>{if(e&&t){(0,s.Hz)(),b((0,l.vD)(t)?void 0:t.advertiserBid||void 0),B(!1);const e=t.prefill,a=l.S$.includes(t.platform);y(e?.tactic),C(a?"Metasearch":e?.subType),_(a?"EN":e?.language),I(e?.custom1??""),T(e?.custom2??""),D(e?.custom3??""),L(""),H(void 0),E("")}},[e,t]);const z=!!t&&l.S$.includes(t.platform),F=!!t&&l.SF.includes(t.platform),R=!!t&&(0,l.vD)(t),Y=(0,i.useMemo)(()=>{if(R&&t?.candidateBpids){const e=new Set(t.candidateBpids);return l.i2.filter(a=>e.has(a.value))}return l.i2},[R,t]),W=(0,i.useMemo)(()=>{if(!t)return"-";const e=[(0,l.jj)(j)||t.advertiserName,v,w,S,A,$,k].filter(Boolean);return e.length?e.join("_"):"-"},[t,j,v,w,S,A,$,k]),q=(0,i.useMemo)(()=>{const e=(0,s.UX)(j);return{custom1:e.custom1.trim()||"Custom 1",custom2:e.custom2.trim()||"Custom 2",custom3:e.custom3.trim()||"Custom 3"}},[j]),Z=!(!t||!a||"offers"!==a&&"invoice"!==a&&"oba"!==a&&("advertiser"===a?!j:!j||!(F?M&&O.trim().length>0:z?v&&N.trim().length>0:v&&w&&S))),J="campaign"===a,K="advertiser"===a,U=J&&!R&&"mapped"===t?.advertiserMapping;return(0,r.jsxs)(n._s,{id:"mapping-drawer",title:m,placement:"right",width:"640px",onClose:u,open:e,destroyOnClose:!0,styles:{body:{padding:0,display:"flex",flexDirection:"column"}},children:[(0,r.jsx)(o.zj,{children:t&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.Zp,{children:[(0,r.jsx)(n.EY.H5,{id:"mapping-drawer_external-ttl",children:"External Advertiser Settings"}),(()=>{const e=(0,l._z)(t.platform);return e?(0,r.jsxs)(o.v2,{children:[(0,r.jsx)(p,{label:"Platform",value:(0,l.G8)(t.platform)}),(0,r.jsx)(p,{label:"Reporting Platform",value:e})]}):(0,r.jsx)(p,{label:"Platform",value:(0,l.G8)(t.platform)})})(),K?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.v2,{children:[(0,r.jsx)(p,{label:"External ID",value:t.externalAdvertiserId}),(0,r.jsx)(p,{label:"External Advertiser Name",value:t.externalAdvertiserName})]}),(0,r.jsx)(p,{label:"Campaign Name (ID)",value:"-"===t.externalCampaignId?"-":`${t.externalCampaignName} (${t.externalCampaignId})`})]}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(o.v2,{children:[(0,r.jsx)(p,{label:"External Advertiser Name",value:t.externalAdvertiserName}),(0,r.jsx)(p,{label:"External Advertiser ID",value:t.externalAdvertiserId})]}),(0,r.jsxs)(o.v2,{children:[(0,r.jsx)(p,{label:"External Campaign Name",value:"-"===t.externalCampaignName?"-":t.externalCampaignName}),(0,r.jsx)(p,{label:"External Campaign ID",value:"-"===t.externalCampaignId?"-":t.externalCampaignId})]})]})]}),(K||J)&&(0,r.jsxs)(o.Zp,{children:[(0,r.jsx)(n.EY.H5,{id:"mapping-drawer_advertiser-ttl",children:"Advertiser Settings"}),U?(0,r.jsx)(p,{label:"Advertiser (BPID)",value:t.advertiserBid?`${t.advertiserName} (${t.advertiserBid})`:"-"}):(0,r.jsx)(n.l6,{id:"mapping-drawer_bpid-sel",label:"Advertiser (BPID)",required:!0,showSearch:!0,placeholder:R?"Pick one of the mapped advertisers":"Advertiser Name",options:Y,value:j,disabled:g,status:P?"error":void 0,errorMessage:P?"Select an advertiser (BPID)":void 0,helperMessage:R?"This external advertiser is mapped to multiple ATAP advertisers — pick the one this campaign belongs to.":void 0,onChange:e=>{b(e),B(!1)}})]}),J&&z&&(0,r.jsxs)(o.Zp,{children:[(0,r.jsx)(n.EY.H5,{id:"mapping-drawer_campaign-settings-ttl",children:"Campaign Settings"}),(0,r.jsx)(n.pd,{id:"mapping-drawer_paid-search-id-inp",label:"Paid Search ID",required:!0,placeholder:"Enter the Paid Search ID",disabled:g,value:N,onChange:e=>L(e.target.value)})]}),J&&F&&(0,r.jsxs)(o.Zp,{children:[(0,r.jsx)(n.EY.H5,{id:"mapping-drawer_campaign-settings-ttl",children:"Campaign Settings"}),(0,r.jsx)(n.l6,{id:"mapping-drawer_wihp-campaign-sel",label:"WIHP Campaign Name",required:!0,showSearch:!0,placeholder:"-",options:l.yR,disabled:g,value:M,onChange:e=>H(e)}),(0,r.jsxs)(o.n1,{children:[(0,r.jsx)(o.NP,{children:"Paid Search IDs *"}),(0,r.jsx)(d.A,{id:"mapping-drawer_paid-search-ids-txt",placeholder:"-",rows:4,disabled:g,value:O,onChange:e=>E(e.target.value)})]})]}),J&&!F&&(0,r.jsxs)(o.Zp,{children:[(0,r.jsx)(n.EY.H5,{id:"mapping-drawer_additional-ttl",children:"Additional Settings"}),z?(0,r.jsxs)(o.JK,{children:[(0,r.jsx)(n.l6,{id:"mapping-drawer_derby-tactic-sel",label:"Tactic",required:!0,placeholder:"Select a tactic",options:l.jN,disabled:g,value:v,onChange:e=>y(e)}),(0,r.jsx)(p,{label:"Sub-Type",value:w??"-"}),(0,r.jsx)(p,{label:"Language",value:S??"-"})]}):(0,r.jsxs)(o.JK,{children:[(0,r.jsx)(n.l6,{id:"mapping-drawer_tactic-sel",label:"Tactic",required:!0,placeholder:"-",options:l.rF,disabled:g,value:v,onChange:e=>y(e)}),(0,r.jsx)(n.l6,{id:"mapping-drawer_subtype-sel",label:"Sub-Type",required:!0,placeholder:"-",options:l.fZ,disabled:g,value:w,onChange:e=>C(e)}),(0,r.jsx)(n.l6,{id:"mapping-drawer_language-sel",label:"Language",required:!0,placeholder:"-",options:l.Po,disabled:g,value:S,onChange:e=>_(e)})]}),(0,r.jsxs)(o.JK,{children:[(0,r.jsx)(n.pd,{id:"mapping-drawer_custom1-inp",label:q.custom1,placeholder:"-",disabled:g,value:A,onChange:e=>I(e.target.value)}),(0,r.jsx)(n.pd,{id:"mapping-drawer_custom2-inp",label:q.custom2,placeholder:"-",disabled:g,value:$,onChange:e=>T(e.target.value)}),(0,r.jsx)(n.pd,{id:"mapping-drawer_custom3-inp",label:q.custom3,placeholder:"-",disabled:g,value:k,onChange:e=>D(e.target.value)})]}),(0,r.jsxs)(o.RF,{children:[(0,r.jsx)(o.i_,{style:{flex:1},children:(0,r.jsx)(p,{label:"Campaign Name",value:W})}),(0,r.jsx)(o.i8,{type:"button","aria-label":"Copy campaign name",onClick:()=>{navigator.clipboard&&"-"!==W?navigator.clipboard.writeText(W).then(()=>h.success("Campaign name copied to clipboard.")).catch(()=>h.error("Could not copy the campaign name.")):h.error("Nothing to copy yet — complete the mapping first.")},children:(0,r.jsx)(n.In,{name:"copy",width:16,height:16})})]})]}),("invoice"===a||"offers"===a||"oba"===a)&&(0,r.jsxs)(o.Zp,{children:[(0,r.jsxs)(n.EY.H5,{id:"mapping-drawer_placeholder-ttl",children:[m," Settings"]}),(0,r.jsxs)(o.at,{children:["The ",m.toLowerCase()," form will be built later. This confirms the entry point opens the correct mapping type."]})]})]})}),(0,r.jsxs)(o.tb,{style:{justifyContent:"space-between"},children:[(0,r.jsx)("span",{children:!g&&x&&(0,r.jsx)(n.$n,{htmlType:"button",id:"mapping-drawer_delete-btn",variant:"outlined",color:"danger",onClick:x,children:"Delete mapping"})}),(0,r.jsxs)("span",{style:{display:"flex",gap:16},children:[(0,r.jsx)(n.$n,{onClick:u,htmlType:"button",id:"mapping-drawer_cancel-btn",variant:"outlined",children:g?"Close":"Cancel"}),!g&&(0,r.jsx)(n.$n,{htmlType:"button",id:"mapping-drawer_save-btn",onClick:()=>{t&&a?"advertiser"!==a&&"campaign"!==a||j?f({mappingType:a,campaignId:t.id,bpid:"advertiser"===a||"campaign"===a?j:void 0}):B(!0):u()},disabled:!Z,children:"Save"})]})]})]})}}}]);