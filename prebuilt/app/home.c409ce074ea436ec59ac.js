"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[7962],{37167:(e,n,t)=>{t.r(n),t.d(n,{default:()=>Cn});var r=t(74848),i=t(96540),a=t(34899),o=t(40372),s=t(45448),l=t(94439),d=t(44669);const c=d.A.div`
  margin: 10px 0;
`,p=d.A.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  margin: 10px 0;
`,h=({title:e,children:n,style:t,titleStyle:i,link:a})=>(0,r.jsxs)(c,{style:t,children:[(0,r.jsxs)(p,{children:[(0,r.jsx)(l.EY.H5,{children:e}),a?.enabled&&a.url&&a.title&&(0,r.jsx)(l.N_,{id:"home-notifications-link",href:a.url,children:a.title})]}),n]}),g=(0,d.A)("div")`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, auto);
  align-items: start;
`,u=d.A.article`
  background: ${l.Tj.cloud_0};
  border: 1px solid ${l.Tj.cloud_30};
  border-radius: 8px;
  padding: 16px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition:
    box-shadow 0.15s ease,
    border-color 0.15s ease;
  cursor: default;

  &:hover,
  &:focus-within {
    border-color: ${l.Tj.sky_60};
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  }
`,x=d.A.header`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
`,m=d.A.div`
  display: grid;
  gap: 10px;

  p {
    margin: 0;
    color: ${l.Tj.cloud_80};
    font-size: 13px;
    line-height: 1.4;
  }
`,j=({Title:e,Content:n,onClick:t,className:i})=>(0,r.jsxs)(u,{className:i,onClick:t,role:"group",tabIndex:0,children:[(0,r.jsx)(x,{children:(0,r.jsx)(e,{})}),(0,r.jsx)(m,{children:(0,r.jsx)(n,{})})]}),v=d.A.div`
  display: flex;
  align-items: center;
  gap: 8px;
`,b=d.A.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: ${l.Tj.cloud_20};
  border-radius: 4px;
`,f=({icon:e,text:n})=>(0,r.jsxs)(v,{children:[(0,r.jsx)(b,{children:e}),(0,r.jsx)(l.EY.H5,{children:n})]});var k=t(46942),y=t.n(k),C=t(12533),w=t(16928);const P=e=>e?"function"==typeof e?e():e:null;var $=t(23723),A=t(40682),T=t(62279),M=t(62977),S=t(80427),_=t(25905),O=t(99077),I=t(95201),z=t(20791),Y=t(13950),F=t(37358),N=t(14277);const B=e=>{const{componentCls:n,popoverColor:t,titleMinWidth:r,fontWeightStrong:i,innerPadding:a,boxShadowSecondary:o,colorTextHeading:s,borderRadiusLG:l,zIndexPopup:d,titleMarginBottom:c,colorBgElevated:p,popoverBg:h,titleBorderBottom:g,innerContentPadding:u,titlePadding:x}=e;return[{[n]:Object.assign(Object.assign({},(0,_.dF)(e)),{position:"absolute",top:0,left:{_skip_check_:!0,value:0},zIndex:d,fontWeight:"normal",whiteSpace:"normal",textAlign:"start",cursor:"auto",userSelect:"text","--valid-offset-x":"var(--arrow-offset-horizontal, var(--arrow-x))",transformOrigin:["var(--valid-offset-x, 50%)","var(--arrow-y, 50%)"].join(" "),"--antd-arrow-background-color":p,width:"max-content",maxWidth:"100vw","&-rtl":{direction:"rtl"},"&-hidden":{display:"none"},[`${n}-content`]:{position:"relative"},[`${n}-inner`]:{backgroundColor:h,backgroundClip:"padding-box",borderRadius:l,boxShadow:o,padding:a},[`${n}-title`]:{minWidth:r,marginBottom:c,color:s,fontWeight:i,borderBottom:g,padding:x},[`${n}-inner-content`]:{color:t,padding:u}})},(0,I.Ay)(e,"var(--antd-arrow-background-color)"),{[`${n}-pure`]:{position:"relative",maxWidth:"none",margin:e.sizePopupArrow,display:"inline-block",[`${n}-content`]:{display:"inline-block"}}}]},E=e=>{const{componentCls:n}=e;return{[n]:Y.s.map(t=>{const r=e[`${t}6`];return{[`&${n}-${t}`]:{"--antd-arrow-background-color":r,[`${n}-inner`]:{backgroundColor:r},[`${n}-arrow`]:{background:"transparent"}}}})}},L=(0,F.OF)("Popover",e=>{const{colorBgElevated:n,colorText:t}=e,r=(0,N.oX)(e,{popoverBg:n,popoverColor:t});return[B(r),E(r),(0,O.aB)(r,"zoom-big")]},e=>{const{lineWidth:n,controlHeight:t,fontHeight:r,padding:i,wireframe:a,zIndexPopupBase:o,borderRadiusLG:s,marginXS:l,lineType:d,colorSplit:c,paddingSM:p}=e,h=t-r,g=h/2,u=h/2-n,x=i;return Object.assign(Object.assign(Object.assign({titleMinWidth:177,zIndexPopup:o+30},(0,z.n)(e)),(0,I.Ke)({contentRadius:s,limitVerticalRadius:!0})),{innerPadding:a?0:12,titleMarginBottom:a?0:l,titlePadding:a?`${g}px ${x}px ${u}px`:0,titleBorderBottom:a?`${n}px ${d} ${c}`:"none",innerContentPadding:a?`${p}px ${x}px`:0})},{resetStyle:!1,deprecatedTokens:[["width","titleMinWidth"],["minWidth","titleMinWidth"]]});const W=({title:e,content:n,prefixCls:t})=>e||n?i.createElement(i.Fragment,null,e&&i.createElement("div",{className:`${t}-title`},e),n&&i.createElement("div",{className:`${t}-inner-content`},n)):null,R=e=>{const{hashId:n,prefixCls:t,className:r,style:a,placement:o="top",title:s,content:l,children:d}=e,c=P(s),p=P(l),h=y()(n,t,`${t}-pure`,`${t}-placement-${o}`,r);return i.createElement("div",{className:h,style:a},i.createElement("div",{className:`${t}-arrow`}),i.createElement(S.z,Object.assign({},e,{className:n,prefixCls:t}),d||i.createElement(W,{prefixCls:t,title:c,content:p})))};const D=i.forwardRef((e,n)=>{var t,r;const{prefixCls:a,title:o,content:s,overlayClassName:l,placement:d="top",trigger:c="hover",children:p,mouseEnterDelay:h=.1,mouseLeaveDelay:g=.1,onOpenChange:u,overlayStyle:x={},styles:m,classNames:j}=e,v=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]])}return t}(e,["prefixCls","title","content","overlayClassName","placement","trigger","children","mouseEnterDelay","mouseLeaveDelay","onOpenChange","overlayStyle","styles","classNames"]),{getPrefixCls:b,className:f,style:k,classNames:S,styles:_}=(0,T.TP)("popover"),O=b("popover",a),[I,z,Y]=L(O),F=b(),N=y()(l,z,Y,f,S.root,null==j?void 0:j.root),B=y()(S.body,null==j?void 0:j.body),[E,R]=(0,C.A)(!1,{value:null!==(t=e.open)&&void 0!==t?t:e.visible,defaultValue:null!==(r=e.defaultOpen)&&void 0!==r?r:e.defaultVisible}),D=(e,n)=>{R(e,!0),null==u||u(e,n)},H=P(o),K=P(s);return I(i.createElement(M.A,Object.assign({placement:d,trigger:c,mouseEnterDelay:h,mouseLeaveDelay:g},v,{prefixCls:O,classNames:{root:N,body:B},styles:{root:Object.assign(Object.assign(Object.assign(Object.assign({},_.root),k),x),null==m?void 0:m.root),body:Object.assign(Object.assign({},_.body),null==m?void 0:m.body)},ref:n,open:E,onOpenChange:e=>{D(e)},overlay:H||K?i.createElement(W,{prefixCls:O,title:H,content:K}):null,transitionName:(0,$.b)(F,"zoom-big",v.transitionName),"data-popover-inject":!0}),(0,A.Ob)(p,{onKeyDown:e=>{var n,t;(0,i.isValidElement)(p)&&(null===(t=null==p?void 0:(n=p.props).onKeyDown)||void 0===t||t.call(n,e)),(e=>{e.keyCode===w.A.ESC&&D(!1,e)})(e)}})))}),H=D;H._InternalPanelDoNotUseOrYouWillBeFired=e=>{const{prefixCls:n,className:t}=e,r=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(t[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var i=0;for(r=Object.getOwnPropertySymbols(e);i<r.length;i++)n.indexOf(r[i])<0&&Object.prototype.propertyIsEnumerable.call(e,r[i])&&(t[r[i]]=e[r[i]])}return t}(e,["prefixCls","className"]),{getPrefixCls:a}=i.useContext(T.QO),o=a("popover",n),[s,l,d]=L(o);return s(i.createElement(R,Object.assign({},r,{prefixCls:o,hashId:l,className:y()(t,d)})))};const K=H,J=d.A.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 10px;
`,V=d.A.p`
  margin: 0 0 12px 0;
  color: ${l.Tj.cloud_80};
  font-size: 13px;
  line-height: 1.4;
`,U=d.A.nav`
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding-top: 10px;
`;var G=t(13937);const Z=({description:e,links:n=[]})=>{const t=(0,G.Zp)(),i=e=>{e&&(e.startsWith("http://")||e.startsWith("https://")?window.open(e,"_blank"):t(e))};return(0,r.jsxs)(J,{children:[(0,r.jsx)(V,{children:e}),n.length>0&&(0,r.jsx)(U,{"aria-label":"Amadeus Home Modules links",children:n.map((e,n)=>{if(e.subLinks&&e.subLinks.length>0){const t=(0,r.jsx)("div",{style:{display:"flex",flexDirection:"column",gap:8},children:e.subLinks.map((e,n)=>(0,r.jsx)(l.N_,{onClick:()=>i(e.url),children:e.label},n))});return(0,r.jsx)(K,{content:t,trigger:"hover",placement:"bottom",children:(0,r.jsx)(l.N_,{id:`amadeus-home-modules-link-${n}`,href:"#",onClick:e=>e.preventDefault(),children:e.label},n)},n)}return(0,r.jsx)(l.N_,{onClick:()=>i(e.url),children:e.label},n)})})]})};var q=t(52244),X=t(82830),Q=t(92626);const ee=()=>{const{isAdmin:e,isExternal:n}=(0,q.A)(),t=(0,X.n)(),{t:o}=(0,a.Bd)("nav"),{t:s}=(0,a.Bd)("home"),d=i.useMemo(()=>t?[{key:"advertisers",title:o("advertisers"),description:s("moduleCards.advertisers.desc"),links:[{label:s("moduleCards.advertisers.link"),url:`${t?.advertisers}?isFollowingOnly=true`}],icon:(0,r.jsx)(l.In,{name:"wallet",width:21,height:21,color:l.Tj.sky_80})},{key:"media-planning",title:"Media Planning & Requests",description:"Contains media planning module , monthly distributions & margin calculator.",links:[{label:"Media Plan Calculator",subLinks:[{label:"NORAM single-property",url:t?.mediaPlanning?.singleProperty},{label:"NORAM multi-property",url:t?.mediaPlanning?.multiProperty},{label:"International",url:t?.mediaPlanning?.international}]},...Q.o.mediaPlan?[{label:"Media Planner",url:`${t?.mediaPlanning?.mediaplanner}?myPlansOnly=true`}]:[]],icon:(0,r.jsx)(l.In,{name:"clipboardListCheck",width:21,height:21,color:l.Tj.sky_80})},{key:"campaign-management",title:"Campaign Management & Setup",description:"Campaign Setup & Management on different platforms.",links:[{label:"Campaign Setup",url:"/all-campaigns"}],icon:(0,r.jsx)(l.In,{name:"ad",width:21,height:21,color:l.Tj.sky_80})},{key:"campaign-optimization",title:o(n?"campaignOptimization":"campaignOptimizationPacing"),description:s("moduleCards.campaignOpt.desc"),links:[...n?[]:[{label:"Pacing Tool",url:t?.campaignOptimization?.pacingTool}],{label:n?s("moduleCards.campaignOpt.link"):"OBA",url:t?.campaignOptimization?.oba}],icon:(0,r.jsx)(l.In,{name:"slidersV",width:21,height:21,color:l.Tj.sky_80})},{key:"reports",title:"Reports",description:"Covers diverse campaign reports both internal and customer facing.",links:[{label:"DMIC",url:t?.reports?.dmic},{label:"ROAS",url:t?.reports?.roas}],icon:(0,r.jsx)(l.In,{name:"chartBar",width:21,height:21,color:l.Tj.sky_80})},{key:"market-insights",title:"Market Insights",description:"Links to different TI tools that provide key market insights.",links:[{label:"TI Portal",url:t?.marketInsights?.tiPortal},{label:"AMI",url:t?.marketInsights?.ami},{label:"Google Travel Analytics",url:t?.marketInsights?.googleTravelAnalytics}],icon:(0,r.jsx)(l.In,{name:"chartLine",width:21,height:21,color:l.Tj.sky_80})},{key:"data-management",title:"Data Management",description:"Includes generic data setups across modules and Advertisers.",links:[{label:"Data Partners",url:t?.dataManagement?.datapartners},{label:"Audience Rules",url:t?.dataManagement?.audienceBuilder},{label:"Audience",url:t?.dataManagement?.audience}],icon:(0,r.jsx)(l.In,{name:"database",width:21,height:21,color:l.Tj.sky_80})},{key:"pricing-billing",title:"Pricing & Billing",description:"Includes links to invoicing tools.",icon:(0,r.jsx)(l.In,{name:"fileInvoiceDollar",width:21,height:21,color:l.Tj.sky_80})},{key:"user-management",title:o("userManagement"),description:s("moduleCards.userMgmt.desc"),links:[{label:s("moduleCards.userMgmt.link"),url:t?.userManagement}],icon:(0,r.jsx)(l.In,{name:"userCog",width:21,height:21,color:l.Tj.sky_80})}]:[],[t,n,o,s]),c=["media-planning","campaign-management","reports","market-insights","data-management","pricing-billing"],p=new Set(["Media Plan Calculator","Campaigns","Unmapped Campaigns","Insite","Ad Copies Creator","Pacing Tool","ROAS"]),h=(0,i.useMemo)(()=>d.filter(t=>"user-management"===t.key?e:!n||!c.includes(t.key)).map(e=>e.links?{...e,links:e.links.filter(e=>!p.has(e.label)).map(e=>e.subLinks?{...e,subLinks:e.subLinks.filter(e=>!p.has(e.label))}:e)}:e),[e,n,d]);return(0,r.jsx)(g,{children:h.map(e=>(0,r.jsx)(j,{Title:()=>(0,r.jsx)(f,{icon:e.icon,text:e.title}),Content:()=>(0,r.jsx)(Z,{description:e.description,links:e.links})},e.key))})};var ne=t(96429),te=t(66522);const re=(0,d.A)(ne.Jx)`
  background-color: ${l.Tj.violet_20};
`,ie=(0,d.A)(ne.a2)`
  gap: 2px;

  .amadeus-btn {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
`,ae=d.A.span`
  color: ${l.Tj.cloud_60};
`,oe=()=>{const[e,n]=(0,i.useState)(!1),[t,a]=(0,i.useState)(!1),o=(0,G.Zp)();return(0,r.jsx)(ne.ee,{accent:l.Tj.sky_60,"data-testid":"media-planner-closed-won-notification",children:(0,r.jsxs)(ne.q7,{children:[(0,r.jsxs)(ne.wm,{children:[(0,r.jsx)(ne.QB,{children:(0,r.jsx)(l.In,{name:"infoCircle",width:18,height:18,color:l.Tj.sky_60})}),e?null:(0,r.jsx)(ne.cL,{"data-testid":"media-planner-closed-won-unread-dot"})]}),(0,r.jsx)(ne.Mx,{children:(0,r.jsxs)(ne.hJ,{children:[(0,r.jsx)(ne.xe,{children:"BID-1234 - Amadeus Hotels - Media plan 'Amadeus Hotels All year 2027 Rooms' is closed-won."}),(0,r.jsxs)(ne.l9,{children:[(0,r.jsxs)(ie,{children:[(0,r.jsx)(l.$n,{id:"media-planner-notification-view-btn",variant:"link",onClick:()=>o("/mediaplanner/"),children:"View"}),(0,r.jsx)(l.$n,{id:"media-planner-notification-create-with-max-btn",variant:"link",onClick:()=>{(0,te.Ic)(),o("/?panel=amadeus-max")},children:"Proceed with Max"}),(0,r.jsx)(l.rI,{items:[{key:"toggle-read",label:e?"Mark as unread":"Mark as read",onClick:()=>n(e=>!e)},{key:"toggle-snooze",label:t?"Unsnooze":"Snooze",onClick:()=>a(e=>!e)}],children:(0,r.jsx)(l.K0,{iconName:"ellipsisVertical",color:l.Tj.cloud_80,title:"More notification actions","aria-label":"More notification actions"})})]}),(0,r.jsxs)(ne.f1,{children:[(0,r.jsx)(ae,{children:"2 hours ago"}),(0,r.jsx)(re,{children:"Media Planner"})]})]})]})})]})})},se=(0,d.A)(ne.Jx)`
  background-color: ${l.Tj.cloud_20};
`,le=(0,d.A)(ne.a2)`
  gap: 2px;

  .amadeus-btn {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
`,de=d.A.span`
  color: ${l.Tj.cloud_60};
`,ce=()=>{const[e,n]=(0,i.useState)(!1),[t,a]=(0,i.useState)(!1),o=(0,G.Zp)();return(0,r.jsx)(ne.ee,{accent:l.Tj.sky_60,"data-testid":"media-planner-growth-opportunity-notification",children:(0,r.jsxs)(ne.q7,{children:[(0,r.jsxs)(ne.wm,{children:[(0,r.jsx)(ne.QB,{children:(0,r.jsx)(l.In,{name:"infoCircle",width:18,height:18,color:l.Tj.sky_60})}),e?null:(0,r.jsx)(ne.cL,{"data-testid":"media-planner-growth-opportunity-unread-dot"})]}),(0,r.jsx)(ne.Mx,{children:(0,r.jsxs)(ne.hJ,{children:[(0,r.jsx)(ne.xe,{children:"BID-5678 - MockStay Hotels - Growth opportunity identified in the US market."}),(0,r.jsxs)(ne.l9,{children:[(0,r.jsxs)(le,{children:[(0,r.jsx)(l.$n,{id:"media-planner-growth-notification-view-btn",variant:"link",onClick:()=>o("/mediaplanner/"),children:"View"}),(0,r.jsx)(l.$n,{id:"media-planner-growth-notification-create-with-max-btn",variant:"link",onClick:()=>{(0,te.jM)(),o("/?panel=amadeus-max")},children:"Proceed with Max"}),(0,r.jsx)(l.rI,{items:[{key:"toggle-read",label:e?"Mark as unread":"Mark as read",onClick:()=>n(e=>!e)},{key:"toggle-snooze",label:t?"Unsnooze":"Snooze",onClick:()=>a(e=>!e)}],children:(0,r.jsx)(l.K0,{iconName:"ellipsisVertical",color:l.Tj.cloud_80,title:"More notification actions","aria-label":"More notification actions"})})]}),(0,r.jsxs)(ne.f1,{children:[(0,r.jsx)(de,{children:"2 hours ago"}),(0,r.jsx)(se,{children:"ATI"})]})]})]})})]})})};var pe=t(42503),he=t(73802),ge=t(66653),ue=t(5327),xe=t(12551),me=t(88885);const je=(0,d.A)("div",{shouldForwardProp:e=>!["twoCols","fullScreen","panelWidth"].includes(e)})`
  display: grid;
  grid-template-columns: ${({twoCols:e,fullScreen:n})=>n?"1fr":e?"minmax(0, 1fr) var(--home-panel-width)":"1fr"};
  row-gap: 14px;
  column-gap: 0;
  height: ${({twoCols:e})=>e?"calc(100vh - 54px)":"auto"};
  overflow: ${({twoCols:e})=>e?"hidden":"visible"};
  --home-panel-width: ${({panelWidth:e})=>`${e}px`};
`,ve=d.A.div`
  background-color: ${l.Tj.cloud_0};
  border-radius: 5px;
  border: 1px solid ${l.Tj.cloud_30};
  padding: 14px 14px 12px;
  margin: 0px 0px 28px 0px;
  min-height: 200px;
`,be=d.A.div`
  width: 100%;
  overflow-x: auto;
`,fe=d.A.div`
  max-height: 560px;
  overflow-y: auto;
  overflow-x: auto;
`,ke=(d.A.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`,d.A.div`
  min-width: 0;
`,d.A.h4`
  margin: 0;
  font-size: 16px;
  line-height: 20px;
  font-weight: 600;
  color: ${l.Tj.cloud_100};
`,d.A.p`
  margin: 0 0 10px;
  font-size: 12px;
  line-height: 16px;
  color: ${l.Tj.cloud_70};
`,d.A.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`,d.A.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 11px;
  line-height: 14px;
  color: ${l.Tj.cloud_70};
`,(0,d.A)("span",{shouldForwardProp:e=>"kind"!==e})`
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: ${({kind:e})=>"improved"===e?l.Tj.forest_60:"declined"===e?l.Tj.crimson_60:l.Tj.cloud_50};
`,d.A.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  align-items: center;
  gap: 0;
  margin: 4px 0 12px;
  border-bottom: 1px solid ${l.Tj.cloud_30};
`),ye=(0,d.A)("button",{shouldForwardProp:e=>"active"!==e})`
  border: none;
  border-bottom: 2px solid ${({active:e})=>e?l.Tj.sky_80:"transparent"};
  border-radius: 0;
  padding: 8px 12px 7px;
  font-size: 14px;
  line-height: 18px;
  font-weight: ${({active:e})=>e?700:400};
  color: ${({active:e})=>l.Tj.cloud_100};
  background: transparent;
  cursor: pointer;
  text-align: center;
`,Ce=d.A.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`,we=d.A.th`
  padding: 7px 10px;
  border-bottom: 1px solid ${l.Tj.cloud_30};
  font-size: 11px;
  line-height: 14px;
  font-weight: 700;
  color: ${l.Tj.cloud_80};
  text-align: left;
  background: ${l.Tj.sky_10};

  &:not(:first-of-type) {
    text-align: center;
  }

  &:first-of-type {
    width: 132px;
  }
`,Pe=d.A.td`
  padding: 7px 10px;
  border-bottom: 1px solid ${l.Tj.cloud_20};
  font-size: 11px;
  line-height: 14px;
  color: ${l.Tj.cloud_100};
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;

  &:not(:first-of-type) {
    text-align: center;
  }
`,$e=(d.A.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`,d.A.div`
  font-size: 11px;
  line-height: 14px;
  color: ${l.Tj.cloud_100};
  font-weight: 600;
`,(0,d.A)("span",{shouldForwardProp:e=>"trendKind"!==e})`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: ${({trendKind:e})=>"positive"===e?l.Tj.forest_60:"negative"===e?l.Tj.crimson_60:l.Tj.cloud_60};
  font-size: 10px;
  line-height: 12px;
  font-weight: 500;
`),Ae=(d.A.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,d.A.div`
  border: 1px solid ${l.Tj.cloud_30};
  border-radius: 6px;
  overflow: hidden;
  background: ${l.Tj.cloud_0};
`),Te=(d.A.h5`
  margin: 0;
  padding: 7px 10px;
  border-bottom: 1px solid ${l.Tj.cloud_30};
  background: ${l.Tj.sky_10};
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: ${l.Tj.cloud_100};
`,d.A.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`),Me=d.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,Se=d.A.div`
  font-size: 14px;
  line-height: 18px;
  color: #666666;
  margin-bottom: 10px;
`,_e=d.A.div`
  display: inline-flex;
  align-items: center;
  gap: 28px;
`,Oe=d.A.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 18px;
  color: ${l.Tj.cloud_100};
`,Ie=(0,d.A)("span",{shouldForwardProp:e=>"kind"!==e})`
  width: 12px;
  height: 20px;
  display: inline-block;
  background: ${({kind:e})=>"last-year"===e?l.Tj.sky_40:l.Tj.sky_90};
`,ze=d.A.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`,Ye=d.A.div`
  display: flex;
  align-items: stretch;
  gap: 10px;
`,Fe=d.A.div`
  width: 48px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 4px;
`,Ne=d.A.div`
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 12px;
  line-height: 14px;
  color: ${l.Tj.cloud_70};
`,Be=d.A.div`
  position: absolute;
  left: -16px;
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: center;
  font-size: 12px;
  line-height: 14px;
  color: ${l.Tj.cloud_100};
  white-space: nowrap;
`,Ee=d.A.div`
  flex: 1;
  min-width: 0;
`,Le=d.A.div`
  height: 120px;
  border-bottom: 1px solid ${l.Tj.cloud_40};
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  align-items: stretch;
  gap: 14px;
`,We=d.A.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
  gap: 4px;
`,Re=(0,d.A)("span",{shouldForwardProp:e=>!["kind","heightPercent"].includes(e)})`
  display: block;
  width: 10px;
  height: ${({heightPercent:e})=>`${e}%`};
  min-height: 2px;
  background: ${({kind:e})=>"last-year"===e?l.Tj.sky_40:l.Tj.sky_90};
`,De=d.A.div`
  margin-top: 6px;
  display: grid;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  gap: 14px;
`,He=d.A.div`
  text-align: center;
  font-size: 12px;
  line-height: 14px;
  color: ${l.Tj.cloud_70};
`,Ke=d.A.div`
  margin-top: 6px;
  font-size: 13px;
  line-height: 16px;
  color: ${l.Tj.cloud_70};
`,Je=(0,d.A)("div",{shouldForwardProp:e=>!["twoCols","fullScreen","campaignCanvas"].includes(e)})`
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
  padding: 24px 24px 0;
  ${({fullScreen:e})=>e?"\n  display: none;\n":""}
  height: ${({twoCols:e})=>e?"100%":"auto"};
  overflow-y: ${({twoCols:e})=>e?"auto":"visible"};

  ${({campaignCanvas:e})=>e?"\n    > :not([data-campaign-canvas='true']) {\n      display: none;\n    }\n  ":""}
`,Ve=(0,d.A)("div",{shouldForwardProp:e=>!["twoCols","fullScreen"].includes(e)})`
  padding: 0;
  min-width: 0;
  min-height: 0;
  height: ${({twoCols:e})=>e?"100%":"auto"};
  overflow: ${({twoCols:e})=>e?"hidden":"visible"};
  position: relative;
`,Ue=d.A.span`
  position: absolute;
  top: 0;
  left: -6px;
  bottom: 0;
  width: 12px;
  cursor: col-resize;
  z-index: 10;

  &:hover {
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 5px;
      width: 2px;
      background: ${l.Tj.sky_60};
    }
  }
`,Ge=(0,d.A)("div",{shouldForwardProp:e=>!["twoCols","fullScreen"].includes(e)})`
  height: ${({twoCols:e})=>e?"100%":"auto"};
  margin: 0;
`,Ze=((0,d.A)(l.K0)`
  position: fixed;
  right: 16px;
  bottom: 72px;
  width: 40px;
  height: 40px;
  padding: 10px;
  border-radius: 999px;
  background: ${l.Tj.sky_60} !important;
  box-shadow: 0 0 8px rgba(128, 128, 128, 0.25);
  z-index: ${me.f.stickyFooter};

  &:hover {
    background: ${l.Tj.sky_80} !important;
  }

  .amadeus-icon {
    color: ${l.Tj.cloud_0} !important;
  }
`,d.A.div`
  position: fixed;
  right: 16px;
  top: 54px;
  bottom: 0;
  width: 360px;
  z-index: ${me.f.drawer};
  box-shadow: 0 8px 24px rgba(0, 8, 53, 0.2);
  border-radius: 8px;
  overflow: hidden;
`);var qe=t(57974),Xe=t(39708),Qe=t(95964),en=t(95420);const nn=Xe.J1`
  query GetWelcomeModal {
    getWelcomeModal {
      status
    }
  }
`,tn=Xe.J1`
  mutation IgnoreWelcomeModal {
    ignoreWelcomeModal {
      success
    }
  }
`,rn=()=>{const e=(0,G.Zp)(),[n,t]=(0,i.useState)(!1),[a]=(0,en.n)(tn),{data:o,loading:s,error:d}=(0,qe.N$)(),{data:c,loading:p,error:h,refetch:g}=(0,Qe.IT)(nn),u=o?.advertisers?.toggle?.totalFollowing??0,x=!0===c?.getWelcomeModal?.status,m=(0,i.useMemo)(()=>"success"===new URLSearchParams(window.location.search).get("login"),[]),j=()=>{const e=new URLSearchParams(window.location.search);e.delete("login");const n=e.toString(),t=n?`/?${n}`:"/";window.history.replaceState({},document.title,t)};(0,i.useEffect)(()=>{t(m&&!s&&!d&&!p&&!h&&0===u&&!x)},[m,s,d,u,p,h,x]);const v=()=>{t(!1),j()};return(0,r.jsxs)(l.aF,{idPrefix:"welcome-mediahub-modal",title:(0,r.jsx)(l.EY.H3,{children:"Welcome to Media Hub"}),open:n,onCancel:v,width:500,centered:!0,footer:(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(l.$n,{variant:"outlined",onClick:async()=>{try{await a({}),await g()}catch{}finally{v()}},children:"Ignore"}),(0,r.jsx)(l.$n,{onClick:()=>{j(),e("/advertisers")},children:"Go to Advertiser"})]}),children:[(0,r.jsx)(l.EY.nB,{style:{marginTop:20},children:"To personalize your experience, we recommend following advertisers that you manage."}),(0,r.jsx)(l.EY.nB,{style:{marginTop:10},children:"This helps us tailor every screen to your preferences — making your journey smoother, smarter, and more relevant."}),(0,r.jsx)(l.EY.nB,{style:{margin:"12px 0px 10px 0px"},children:"👉 Start by selecting the advertisers."})]})},{Content:an}=s.A,{useBreakpoint:on}=o.Ay,sn="mediahub.amadeusMax.panelWidth.v2",ln=()=>"undefined"==typeof window?800:Math.min(800,window.innerWidth),dn=e=>"amadeus-max"===e||"ai-chat"===e||"notifications"===e,cn=[{advertiser:"Marriott Hotels",impressions:{value:185e4,changePercent:14.2},spend:{value:25600,changePercent:-9.2},bookings:{value:385e3,changePercent:12.6},roas:{value:3.7,changePercent:24.1}},{advertiser:"Hilton Worldwide",impressions:{value:142e4,changePercent:2.9},spend:{value:19800,changePercent:7},bookings:{value:292e3,changePercent:6.2},roas:{value:3.2,changePercent:-.8}},{advertiser:"IHG Hotels & Resorts",impressions:{value:98e4,changePercent:15.3},spend:{value:13700,changePercent:-9.9},bookings:{value:201e3,changePercent:8.6},roas:{value:3,changePercent:20.4}},{advertiser:"Hyatt Hotels",impressions:{value:75e4,changePercent:4.2},spend:{value:10500,changePercent:7.1},bookings:{value:158e3,changePercent:9},roas:{value:2.9,changePercent:1.8}},{advertiser:"Accor Hotels",impressions:{value:54e4,changePercent:-6.9},spend:{value:7600,changePercent:-6.2},bookings:{value:118e3,changePercent:-5.6},roas:{value:2.6,changePercent:.7}},{advertiser:"Wyndham Hotels",impressions:{value:385e3,changePercent:-3.8},spend:{value:5400,changePercent:-6.9},bookings:{value:82e3,changePercent:-6.8},roas:{value:2.8,changePercent:.1}},{advertiser:"Choice Hotels",impressions:{value:32e4,changePercent:10.3},spend:{value:4500,changePercent:7.1},bookings:{value:68e3,changePercent:9.7},roas:{value:2.9,changePercent:2.4}},{advertiser:"Best Western",impressions:{value:295e3,changePercent:-4.8},spend:{value:4100,changePercent:-4.7},bookings:{value:61e3,changePercent:-6.2},roas:{value:2.7,changePercent:-1.1}},{advertiser:"Radisson Hotel Group",impressions:{value:185e3,changePercent:5.7},spend:{value:2600,changePercent:8.3},bookings:{value:38e3,changePercent:8.6},roas:{value:2.5,changePercent:-2.5}},{advertiser:"Four Seasons",impressions:{value:165e3,changePercent:6.5},spend:{value:2300,changePercent:9.5},bookings:{value:52e3,changePercent:8.3},roas:{value:2.4,changePercent:-3.2}}],pn=[...cn],hn=e=>e>=1e6?`${(e/1e6).toFixed(1)}M`:e>=1e3?`${Math.round(e/1e3)}K`:`${e}`,gn=e=>e>=1e6?`$${(e/1e6).toFixed(1)}M`:e>=1e3?`$${Math.round(e/1e3)}K`:`$${e}`,un=e=>`${e.toFixed(1)}x`,xn=(e,n)=>Math.abs(e)<.1?"neutral":(n?.invert?e<0:e>0)?"positive":"negative",mn=e=>`${e>=0?"+":""}${e.toFixed(1)}%`,jn=e=>"neutral"===e?"•":"positive"===e?"▲":"▼",vn=(e,n)=>{const t=1+n/100;return t<=0?e:e/t},bn=[{spendCurrent:42e5,spendChangePercent:11.4,bookingsCurrent:402e3,bookingsChangePercent:12.6,roasCurrent:4.1,roasChangePercent:10.8},{spendCurrent:365e4,spendChangePercent:-3.6,bookingsCurrent:338e3,bookingsChangePercent:5.2,roasCurrent:3.7,roasChangePercent:-1.4},{spendCurrent:298e4,spendChangePercent:7.8,bookingsCurrent:276e3,bookingsChangePercent:8.9,roasCurrent:3.4,roasChangePercent:6.1},{spendCurrent:241e4,spendChangePercent:2.9,bookingsCurrent:221e3,bookingsChangePercent:4.4,roasCurrent:3.1,roasChangePercent:1.8},{spendCurrent:187e4,spendChangePercent:-6.8,bookingsCurrent:178e3,bookingsChangePercent:-4.1,roasCurrent:2.8,roasChangePercent:-2.4},{spendCurrent:154e4,spendChangePercent:-2.7,bookingsCurrent:146e3,bookingsChangePercent:-1.9,roasCurrent:2.9,roasChangePercent:.9},{spendCurrent:126e4,spendChangePercent:4.2,bookingsCurrent:119e3,bookingsChangePercent:6.4,roasCurrent:3,roasChangePercent:2.1},{spendCurrent:98e4,spendChangePercent:-4.9,bookingsCurrent:98e3,bookingsChangePercent:-5.3,roasCurrent:2.6,roasChangePercent:-1.7},{spendCurrent:76e4,spendChangePercent:1.6,bookingsCurrent:77e3,bookingsChangePercent:2.2,roasCurrent:2.5,roasChangePercent:-.9},{spendCurrent:64e4,spendChangePercent:-5.4,bookingsCurrent:69e3,bookingsChangePercent:-3.8,roasCurrent:2.3,roasChangePercent:-2.6}],fn=cn.map((e,n)=>{const t=bn[n]??(e=>({spendCurrent:Math.round(300*e.spend.value),spendChangePercent:e.spend.changePercent,bookingsCurrent:Math.round(e.bookings.value),bookingsChangePercent:e.bookings.changePercent,roasCurrent:Number(e.roas.value.toFixed(2)),roasChangePercent:e.roas.changePercent}))(e),r=t.spendCurrent,i=Math.round(vn(r,t.spendChangePercent)),a=t.bookingsCurrent,o=Math.round(vn(a,t.bookingsChangePercent)),s=Number(t.roasCurrent.toFixed(2)),l=Number(vn(s,t.roasChangePercent).toFixed(2)),d=Math.round(a*s*3),c=Math.round(o*l*3);return{advertiser:e.advertiser,spend:{lastYear:i,currentYear:r},bookings:{lastYear:o,currentYear:a},roas:{lastYear:l,currentYear:s},revenue:{lastYear:c,currentYear:d}}}),kn=["spend","bookings","roas","revenue"].reduce((e,n)=>{const t=Math.max(...fn.map(e=>Math.max(e[n].lastYear,e[n].currentYear)));return e[n]=((e,n)=>{const t=((e,n)=>"roas"===e?n<=2.5?.25:n<=4?.5:1:"bookings"===e?n<=12e4?1e4:n<=26e4?25e3:5e4:n<=16e5?2e5:n<=35e5?25e4:5e5)(e,n),r=1.12*n,i=Math.ceil(r/t)*t,a=i/4;return{maxValue:i,tickLabels:[4,3,2,1,0].map(n=>((e,n)=>{if(0===n)return"0";if("roas"===e)return`${n%1==0?n.toFixed(0):n.toFixed(1)}x`;if("bookings"===e){if(n>=1e3){const e=n/1e3;return Number.isInteger(e)?`${e.toFixed(0)}K`:`${e.toFixed(1)}K`}return`${Math.round(n)}`}if(n>=1e6){const e=n/1e6;return Number.isInteger(e)?`${e.toFixed(0)}M`:`${e.toFixed(1)}M`}const t=n/1e3;return Number.isInteger(t)?`${t.toFixed(0)}K`:`${t.toFixed(1)}K`})(e,a*n))}})(n,t),e},{}),yn=e=>.2*e.impressions.changePercent+.2*-e.spend.changePercent+.3*e.bookings.changePercent+.3*e.roas.changePercent,Cn=()=>{const{t:e}=(0,a.Bd)(["home","common"]),n=!!on().lg,t=(0,G.zy)(),o=(0,G.Zp)(),s=new URLSearchParams(t.search),d=s.get("panel"),c=s.get("layout"),p=d||"undefined"==typeof window?null:window.sessionStorage.getItem("mediahub.rightPanel.active"),g=dn(d)?d:dn(p)?p:"notifications",u="amadeus-max"===g,x="ai-chat"===g,m=u&&"full-screen"===c,[j,v]=(0,i.useState)("kpi-trends"),[b,f]=(0,i.useState)(!1),{aiWorkspaceMode:k,aiWorkspaceType:y}=(0,te.b2)(),C=te.UY,[w,P]=(0,i.useState)(()=>"undefined"==typeof window?360:Math.max(300,Math.min(ln(),Number(window.sessionStorage.getItem(sn))||360)));(0,i.useEffect)(()=>{window.sessionStorage.setItem(sn,String(w))},[w]);const $=u?w:360,A=[...pn].sort((e,n)=>yn(n)-yn(e)),T=[...pn].sort((e,n)=>e.roas.changePercent-n.roas.changePercent).slice(0,10),M=[...pn].sort((e,n)=>n.spend.value-e.spend.value).slice(0,10),S=(A.slice(-4).reverse(),(e,n)=>(0,r.jsxs)(Ye,{children:[(0,r.jsxs)(Fe,{children:[(0,r.jsx)(Ne,{children:kn[n].tickLabels.map(n=>(0,r.jsx)("div",{children:n},`${e}-${n}`))}),(0,r.jsx)(Be,{children:e})]}),(0,r.jsxs)(Ee,{children:[(0,r.jsx)(Le,{children:fn.map((t,i)=>(0,r.jsxs)(We,{children:[(0,r.jsx)(Re,{kind:"last-year",heightPercent:t[n].lastYear/kn[n].maxValue*100}),(0,r.jsx)(Re,{kind:"current-year",heightPercent:t[n].currentYear/kn[n].maxValue*100})]},`${e}-${i+1}`))}),(0,r.jsx)(De,{children:fn.map((n,t)=>(0,r.jsx)(He,{children:n.advertiser},`${e}-label-${t+1}`))})]})]})),_=()=>{o({pathname:"/",search:"?panel=notifications"})},O=e=>{if("floating"===e)return f(!0),void o({pathname:"/",search:"?panel=notifications"});f(!1);const n=new URLSearchParams(t.search);n.set("panel","amadeus-max"),n.set("layout",e),o({pathname:"/",search:`?${n.toString()}`})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(rn,{}),(0,r.jsxs)(je,{as:an,twoCols:n,fullScreen:m&&!k,panelWidth:$,children:[(0,r.jsxs)(Je,{twoCols:n,fullScreen:m&&!k,campaignCanvas:k,children:[k?"media-plan"===y?(0,r.jsx)(xe.A,{}):(0,r.jsx)(ue.e,{}):null,(0,r.jsx)(l.EY.H3,{children:"Welcome to Amadeus travel advertising platform"}),(0,r.jsx)(h,{title:"Advertiser Performance Metrics",titleStyle:{fontSize:14},children:(0,r.jsxs)(ve,{children:[(0,r.jsxs)(ke,{children:[(0,r.jsx)(ye,{active:"kpi-trends"===j,type:"button",onClick:()=>v("kpi-trends"),children:"Needs attention"}),(0,r.jsx)(ye,{active:"top-performers"===j,type:"button",onClick:()=>v("top-performers"),children:"Top Spenders"}),(0,r.jsx)(ye,{active:"underperformers"===j,type:"button",onClick:()=>v("underperformers"),children:"Spend & Booking"}),(0,r.jsx)(ye,{active:"comparison"===j,type:"button",onClick:()=>v("comparison"),children:"ROAS & Revenue"})]}),("kpi-trends"===j||"top-performers"===j)&&(0,r.jsx)(Se,{children:"Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)"}),"kpi-trends"===j?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(be,{children:(0,r.jsxs)(Ce,{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)(we,{children:"Advertiser"}),(0,r.jsx)(we,{children:"Impressions"}),(0,r.jsx)(we,{children:"Impr YoY"}),(0,r.jsx)(we,{children:"Spend"}),(0,r.jsx)(we,{children:"Spend YoY"}),(0,r.jsx)(we,{children:"Bookings"}),(0,r.jsx)(we,{children:"Bookings YoY"}),(0,r.jsx)(we,{children:"ROAS"}),(0,r.jsx)(we,{children:"ROAS YoY"})]})}),(0,r.jsx)("tbody",{children:T.map(e=>(0,r.jsxs)("tr",{children:[(0,r.jsx)(Pe,{children:e.advertiser}),(0,r.jsx)(Pe,{children:hn(e.impressions.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.impressions.changePercent),children:[jn(xn(e.impressions.changePercent))," ",mn(e.impressions.changePercent)]})}),(0,r.jsx)(Pe,{children:gn(e.spend.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.spend.changePercent,{invert:!0}),children:[jn(xn(e.spend.changePercent,{invert:!0}))," ",mn(e.spend.changePercent)]})}),(0,r.jsx)(Pe,{children:hn(e.bookings.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.bookings.changePercent),children:[jn(xn(e.bookings.changePercent))," ",mn(e.bookings.changePercent)]})}),(0,r.jsx)(Pe,{children:un(e.roas.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.roas.changePercent),children:[jn(xn(e.roas.changePercent))," ",mn(e.roas.changePercent)]})})]},e.advertiser))})]})}),(0,r.jsx)(Ke,{children:"Data last updated on: 31-Jan-2026"})]}):"top-performers"===j?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(Ae,{children:(0,r.jsx)(fe,{children:(0,r.jsxs)(Ce,{children:[(0,r.jsx)("thead",{children:(0,r.jsxs)("tr",{children:[(0,r.jsx)(we,{children:"Advertiser"}),(0,r.jsx)(we,{children:"ROAS"}),(0,r.jsx)(we,{children:"ROAS YoY"}),(0,r.jsx)(we,{children:"Spend"}),(0,r.jsx)(we,{children:"Spend YoY"}),(0,r.jsx)(we,{children:"Impressions"}),(0,r.jsx)(we,{children:"Impr YoY"}),(0,r.jsx)(we,{children:"Bookings"}),(0,r.jsx)(we,{children:"Bookings YoY"})]})}),(0,r.jsx)("tbody",{children:M.map(e=>(0,r.jsxs)("tr",{children:[(0,r.jsx)(Pe,{children:e.advertiser}),(0,r.jsx)(Pe,{children:un(e.roas.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.roas.changePercent),children:[jn(xn(e.roas.changePercent))," ",mn(e.roas.changePercent)]})}),(0,r.jsx)(Pe,{children:gn(e.spend.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.spend.changePercent,{invert:!0}),children:[jn(xn(e.spend.changePercent,{invert:!0}))," ",mn(e.spend.changePercent)]})}),(0,r.jsx)(Pe,{children:hn(e.impressions.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.impressions.changePercent),children:[jn(xn(e.impressions.changePercent))," ",mn(e.impressions.changePercent)]})}),(0,r.jsx)(Pe,{children:hn(e.bookings.value)}),(0,r.jsx)(Pe,{children:(0,r.jsxs)($e,{trendKind:xn(e.bookings.changePercent),children:[jn(xn(e.bookings.changePercent))," ",mn(e.bookings.changePercent)]})})]},`top-${e.advertiser}`))})]})})}),(0,r.jsx)(Ke,{children:"Data last updated on: 31-Jan-2026"})]}):"underperformers"===j?(0,r.jsxs)(Te,{children:[(0,r.jsxs)(Me,{children:[(0,r.jsx)(Se,{children:"Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)"}),(0,r.jsxs)(_e,{children:[(0,r.jsxs)(Oe,{children:[(0,r.jsx)(Ie,{kind:"last-year"}),"Last Year"]}),(0,r.jsxs)(Oe,{children:[(0,r.jsx)(Ie,{kind:"current-year"}),"Current Year"]})]})]}),(0,r.jsxs)(ze,{children:[S("Spend","spend"),S("Bookings","bookings")]}),(0,r.jsx)(Ke,{children:"Data last updated on: 31-Jan-2026"})]}):(0,r.jsxs)(Te,{children:[(0,r.jsxs)(Me,{children:[(0,r.jsx)(Se,{children:"Time Period - Last 30 Days (01-Jan-2026 to 30-Jan-2026)"}),(0,r.jsxs)(_e,{children:[(0,r.jsxs)(Oe,{children:[(0,r.jsx)(Ie,{kind:"last-year"}),"Last Year"]}),(0,r.jsxs)(Oe,{children:[(0,r.jsx)(Ie,{kind:"current-year"}),"Current Year"]})]})]}),(0,r.jsxs)(ze,{children:[S("ROAS","roas"),S("Revenue","revenue")]}),(0,r.jsx)(Ke,{children:"Data last updated on: 31-Jan-2026"})]})]})}),(0,r.jsx)(h,{title:e("home:modules"),children:(0,r.jsx)(ee,{})})]}),(0,r.jsx)(Ve,{twoCols:n,fullScreen:m,children:(0,r.jsxs)(Ge,{twoCols:n,fullScreen:m,children:[x?(0,r.jsx)(he.n,{titleText:"AskMia",displayMode:"inline",showTrigger:!1,onClosePanel:_}):u?(0,r.jsx)(ge.F,{onClosePanel:_,layoutMode:"full-screen"===c?"full-screen":"sidebar",onLayoutModeChange:O,onCampaignCanvasChange:C,campaignCanvasOpen:k}):(0,r.jsx)("div",{style:{paddingTop:24,paddingRight:24},children:(0,r.jsx)(h,{title:"Notifications",link:{enabled:!0,url:"/notifications",title:"View All"},children:(0,r.jsx)(pe.$,{contractExtraContent:(0,r.jsx)(oe,{}),performanceExtraContent:(0,r.jsx)(ce,{})})})}),!u||m||b?null:(0,r.jsx)(Ue,{onPointerDown:e=>{e.preventDefault();const n=e.clientX,t=w,r=e=>{const r=Math.max(300,ln()),i=t+(n-e.clientX);P(Math.min(r,Math.max(300,i)))},i=()=>{document.body.style.cursor="",document.body.style.userSelect="",window.removeEventListener("pointermove",r),window.removeEventListener("pointerup",i)};document.body.style.cursor="col-resize",document.body.style.userSelect="none",window.addEventListener("pointermove",r),window.addEventListener("pointerup",i)},"aria-label":"Resize Amadeus Max panel"})]})})]}),b?(0,r.jsx)(Ze,{children:(0,r.jsx)(ge.F,{onClosePanel:()=>f(!1),layoutMode:"floating",onLayoutModeChange:O,onCampaignCanvasChange:C,campaignCanvasOpen:k})}):null]})}}}]);