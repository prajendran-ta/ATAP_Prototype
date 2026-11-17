"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[6496],{32224:(e,a,i)=>{i.r(a),i.d(a,{default:()=>U});var n=i(74848),t=i(96540),l=i(94439),r=i(26417),s=i(52244),o=i(62977),d=i(4395),c=i(75575),p=i(88218),m=i(99086),u=i(79474),g=i(17076),h=i(56723),x=i(95144),b=i(44669);const f=b.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`,j="28px minmax(260px, 2.2fr) 128px 128px 120px 96px 96px 96px 36px",v=b.A.div`
  display: grid;
  grid-template-columns: ${j};
  gap: ${"8px"};
  align-items: end;
  margin-top: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${l.Tj.cloud_30};
`,y=b.A.div`
  font-size: 14px;
  font-weight: 500;
  color: ${l.Tj.cloud_100};
  line-height: 18px;
  white-space: normal;
  overflow-wrap: anywhere;
`,C=b.A.div`
  display: grid;
  grid-template-columns: ${j};
  gap: ${"8px"};
  align-items: center;
  margin-top: 12px;
`,w=b.A.span`
  font-size: 14px;
  color: ${l.Tj.cloud_80};
  text-align: center;
`,k=b.A.div`
  font-size: 12px;
  color: ${l.Tj.cloud_80};
  margin: 4px 0 4px 36px;
`,S=b.A.p`
  font-size: 12px;
  color: ${l.Tj.cloud_80};
  line-height: 16px;
  margin: 4px 0 0 36px;
`,T=b.A.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  color: ${l.Tj.cloud_70};

  &:hover:not(:disabled) {
    background: ${l.Tj.cloud_20};
    color: ${l.Tj.crimson_60};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${l.Tj.cloud_40};
  }
`,_=[{label:"SA360",value:"SA360"},{label:"CM360",value:"CM360"},{label:"Meta (Facebook)",value:"Meta"},{label:"DerbySoft",value:"DerbySoft"},{label:"WIHP",value:"WIHP"}],A=new Set(["SA360","CM360","Meta"]),N=e=>({id:e,externalName:"",custom1:"",custom2:"",custom3:""}),$="__own__:";function P({id:e,value:a,placeholder:i,disabled:r,excludeValues:s,onPick:o}){const[d,p]=(0,t.useState)(""),m=(0,t.useMemo)(()=>{const e=d.trim(),i=c.Jp.filter(e=>e.value===a||!s.has(e.value)),n=i.some(a=>a.value.toLowerCase()===e.toLowerCase());return[...e&&!n?[{label:e,value:`${$}${e}`}]:[],...i]},[d,a,s]);return(0,n.jsx)(l.l6,{id:e,showSearch:!0,allowClear:!0,placeholder:i,options:m,value:a,disabled:r,onChange:e=>o(e),onSearch:p,searchBy:"label",notFoundContent:"Type to add a Campaign ID"})}function I({id:e,label:a,value:i}){return(0,n.jsx)(l.pd,{id:e,label:a,value:i,disabled:!0})}const M=function({open:e,readOnly:a=!1,onClose:i}){const[r,s]=(0,t.useState)(void 0),[o,d]=(0,t.useState)(void 0),[p,m]=(0,t.useState)(void 0),[u,g]=(0,t.useState)([N(1)]),[b,j]=(0,t.useState)(void 0),[M,q]=(0,t.useState)(void 0),[D,B]=(0,t.useState)(void 0),[F,O]=(0,t.useState)(""),[L,E]=(0,t.useState)(""),[H,V]=(0,t.useState)(""),[W,z]=(0,t.useState)(""),[K,Z]=(0,t.useState)("");(0,t.useEffect)(()=>{e&&(s(void 0),d(void 0),m(void 0),g([N(1)]),j(void 0),q(void 0),B(void 0),O(""),E(""),V(""),z(""),Z(""))},[e]);const G=(e,a)=>g(i=>i.map(i=>i.id===e?{...i,...a}:i)),J=!!r,R=!!r&&A.has(r),Y=r?(0,c.G8)(r):"Platform",U=`${Y} ${(0,c.sF)(r)}`,X=!(!r||!o||!p||a),Q=e=>{const a=[(0,c.jj)(o),e.tactic,e.subType,e.language,e.custom1,e.custom2,e.custom3].filter(Boolean);return a.length?a.join("_"):"-"},ee=(()=>{if(!X)return!1;if(R){const e=u.filter(e=>e.externalName);return 0!==e.length&&e.every(e=>e.tactic&&e.subType&&e.language)}return"WIHP"===r?!!b&&L.trim().length>0:"DerbySoft"===r&&!!b&&!!D&&F.trim().length>0})();return(0,n.jsxs)(l._s,{id:"quick-campaigns-drawer",title:"Map Campaign",placement:"right",width:"1200px",onClose:i,open:e,destroyOnClose:!0,styles:{body:{padding:0,display:"flex",flexDirection:"column"},header:{background:"transparent"}},children:[(0,n.jsxs)(h.zj,{children:[(0,n.jsxs)(h.Zp,{children:[(0,n.jsx)(l.EY.H5,{id:"quick-campaigns-drawer_settings-ttl",children:"Mapping Settings"}),(0,n.jsx)(l.l6,{id:"quick-campaigns-drawer_bpid-sel",label:"Advertiser (BPID)",required:!0,showSearch:!0,placeholder:"Advertiser Name",options:c.i2,value:o,disabled:a,onChange:e=>d(e)}),(0,n.jsxs)(h.v2,{children:[(0,n.jsx)(l.l6,{id:"quick-campaigns-drawer_platform-sel",label:"Platform",required:!0,placeholder:"Select a platform",options:_,value:r,disabled:a,onChange:e=>{const a=e;s(a),m(void 0),g(e=>(A.has(a)?e:e.slice(0,1)).map(e=>({...e,externalName:""})))}}),(0,n.jsx)(l.l6,{id:"quick-campaigns-drawer_ext-advertiser-sel",label:`${Y} Advertiser`,required:!0,showSearch:!0,placeholder:"Select an external advertiser",options:c.b6,value:p,disabled:!J||a,onChange:e=>m(e)})]})]}),R?(0,n.jsxs)(h.Zp,{children:[(0,n.jsxs)(f,{children:[(0,n.jsxs)(l.EY.H5,{id:"quick-campaigns-drawer_campaigns-ttl",children:["Campaigns (",u.length,")"]}),(0,n.jsx)(l.$n,{id:"quick-campaigns-drawer_add-btn",variant:"outlined",size:"small",onClick:()=>{r&&!A.has(r)||g(e=>e.length>=20?e:[...e,N((e[e.length-1]?.id??0)+1)])},disabled:!X||!R||u.length>=20,children:"Add Campaign"})]}),(0,n.jsxs)(v,{children:[(0,n.jsx)(y,{}),(0,n.jsxs)(y,{children:[U," *"]}),(0,n.jsx)(y,{children:"Tactic *"}),(0,n.jsx)(y,{children:"Sub-Type *"}),(0,n.jsx)(y,{children:"Language *"}),(0,n.jsx)(y,{children:"Custom 1"}),(0,n.jsx)(y,{children:"Custom 2"}),(0,n.jsx)(y,{children:"Custom 3"}),(0,n.jsx)(y,{})]}),u.map((e,a)=>(0,n.jsxs)("div",{children:[(0,n.jsxs)(C,{children:[(0,n.jsx)(w,{children:a+1}),(0,n.jsx)(P,{id:`quick-campaigns-drawer_campaign-${e.id}-sel`,placeholder:U,disabled:!X,value:e.externalName||void 0,excludeValues:new Set(u.filter(a=>a.id!==e.id&&a.externalName).map(e=>e.externalName)),onPick:a=>G(e.id,{externalName:a??""})}),(0,n.jsx)(l.l6,{placeholder:"-",options:c.rF,value:e.tactic,disabled:!X,onChange:a=>G(e.id,{tactic:a})}),(0,n.jsx)(l.l6,{placeholder:"-",options:c.fZ,value:e.subType,disabled:!X,onChange:a=>G(e.id,{subType:a})}),(0,n.jsx)(l.l6,{placeholder:"-",options:c.Po,value:e.language,disabled:!X,onChange:a=>G(e.id,{language:a})}),(0,n.jsx)(l.pd,{placeholder:"-",disabled:!X,value:e.custom1,onChange:a=>G(e.id,{custom1:a.target.value})}),(0,n.jsx)(l.pd,{placeholder:"-",disabled:!X,value:e.custom2,onChange:a=>G(e.id,{custom2:a.target.value})}),(0,n.jsx)(l.pd,{placeholder:"-",disabled:!X,value:e.custom3,onChange:a=>G(e.id,{custom3:a.target.value})}),(0,n.jsx)(T,{type:"button","aria-label":`Remove campaign ${a+1}`,disabled:1===u.length,onClick:()=>{return a=e.id,g(e=>1===e.length?e:e.filter(e=>e.id!==a));var a},children:(0,n.jsx)(l.In,{name:"trashCan",width:16,height:16})})]}),!!e.externalName&&e.externalName.startsWith($)&&(0,n.jsx)(S,{children:"Once the campaign is available in the backend the mapping will be complete. This can take up to 48 hours."}),(0,n.jsxs)(k,{children:["Campaign Name: ",Q(e)]})]},e.id))]}):"DerbySoft"===r?(0,n.jsxs)(h.Zp,{children:[(0,n.jsx)(l.EY.H5,{id:"quick-campaigns-drawer_derby-ttl",children:"Campaign Settings"}),(0,n.jsx)(l.l6,{id:"quick-campaigns-drawer_derby-campaign-sel",label:"DerbySoft Campaign",required:!0,showSearch:!0,placeholder:"Select a DerbySoft campaign",options:c.HA,value:b,disabled:!X,onChange:e=>j(e)}),(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_derby-paid-search-inp",label:"Paid Search ID",required:!0,placeholder:"Enter the Paid Search ID",disabled:!X,value:F,onChange:e=>O(e.target.value)}),(0,n.jsxs)(h.JK,{children:[(0,n.jsx)(l.l6,{id:"quick-campaigns-drawer_derby-tactic-sel",label:"Tactic",required:!0,placeholder:"Select a tactic",options:c.jN,value:D,disabled:!X,onChange:e=>B(e)}),(0,n.jsx)(I,{id:"quick-campaigns-drawer_derby-subtype-ro",label:"Sub-Type",value:"Metasearch"}),(0,n.jsx)(I,{id:"quick-campaigns-drawer_derby-lang-ro",label:"Language",value:"EN"})]}),(0,n.jsxs)(h.JK,{children:[(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_derby-c1-inp",label:"Custom 1",placeholder:"-",disabled:!X,value:H,onChange:e=>V(e.target.value)}),(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_derby-c2-inp",label:"Custom 2",placeholder:"-",disabled:!X,value:W,onChange:e=>z(e.target.value)}),(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_derby-c3-inp",label:"Custom 3",placeholder:"-",disabled:!X,value:K,onChange:e=>Z(e.target.value)})]}),(0,n.jsxs)(k,{children:["Campaign Name: ",[(0,c.jj)(o),D,"Metasearch","EN",H,W,K].filter(Boolean).join("_")||"-"]})]}):"WIHP"===r?(0,n.jsxs)(h.Zp,{children:[(0,n.jsx)(l.EY.H5,{id:"quick-campaigns-drawer_wihp-ttl",children:"Campaign Settings"}),(0,n.jsx)(l.l6,{id:"quick-campaigns-drawer_wihp-campaign-sel",label:"WIHP Campaign",required:!0,showSearch:!0,placeholder:"Select a WIHP campaign",options:c.o7,value:b,disabled:!X,onChange:e=>{const a=e;j(a),q(c.o7.find(e=>e.value===a)?.tactic)}}),(0,n.jsxs)(h.n1,{children:[(0,n.jsx)(h.NP,{children:"Paid Search IDs"}),(0,n.jsx)(x.A,{id:"quick-campaigns-drawer_wihp-paid-search-txt",placeholder:"Add one or more Paid Search IDs",rows:3,disabled:!X,value:L,onChange:e=>E(e.target.value)})]}),(0,n.jsxs)(h.JK,{children:[(0,n.jsx)(I,{id:"quick-campaigns-drawer_wihp-tactic-ro",label:"Tactic",value:M??"-"}),(0,n.jsx)(I,{id:"quick-campaigns-drawer_wihp-subtype-ro",label:"Sub-Type",value:"Metasearch"}),(0,n.jsx)(I,{id:"quick-campaigns-drawer_wihp-lang-ro",label:"Language",value:"EN"})]}),(0,n.jsxs)(h.JK,{children:[(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_wihp-c1-inp",label:"Custom 1",placeholder:"-",disabled:!X,value:H,onChange:e=>V(e.target.value)}),(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_wihp-c2-inp",label:"Custom 2",placeholder:"-",disabled:!X,value:W,onChange:e=>z(e.target.value)}),(0,n.jsx)(l.pd,{id:"quick-campaigns-drawer_wihp-c3-inp",label:"Custom 3",placeholder:"-",disabled:!X,value:K,onChange:e=>Z(e.target.value)})]}),(0,n.jsxs)(k,{children:["Campaign Name: ",[(0,c.jj)(o),M,"Metasearch","EN",H,W,K].filter(Boolean).join("_")||"-"]})]}):null]}),(0,n.jsxs)(h.tb,{children:[(0,n.jsx)(l.$n,{htmlType:"button",id:"quick-campaigns-drawer_cancel-btn",variant:"outlined",onClick:i,children:a?"Close":"Cancel"}),!a&&(0,n.jsx)(l.$n,{htmlType:"button",id:"quick-campaigns-drawer_save-btn",onClick:i,disabled:!ee,children:"Save"})]})]})},q=b.A.div`
  min-width: 900px;
  padding-bottom: 10px;
`,D=b.A.div`
  display: flex;
  flex-direction: column;
  line-height: 18px;
`,B=b.A.span`
  color: ${l.Tj.cloud_80};
  font-size: 12px;
`,F=b.A.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${l.Tj.sky_60};
  cursor: pointer;
  text-align: left;
  font: inherit;

  &:hover {
    text-decoration: underline;
  }
`,O=b.A.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`,L=b.A.span`
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({color:e})=>e};
`,E=(b.A.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: ${l.Tj.cloud_20};
  }

  &:focus-visible {
    outline: 2px solid ${l.Tj.sky_60};
    outline-offset: 1px;
  }
`,b.A.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  cursor: not-allowed;
`),H=b.A.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: ${l.Tj.sky_20};
  }

  &:focus-visible {
    outline: 2px solid ${l.Tj.sky_60};
    outline-offset: 1px;
  }
`,V=b.A.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: ${l.Tj.cloud_80};
`,W=b.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`,z=b.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`,K=b.A.button`
  padding: 0;
  border: none;
  background: transparent;
  color: ${l.Tj.sky_60};
  cursor: pointer;
  text-align: left;
  font: inherit;
  font-style: italic;

  &:hover {
    text-decoration: underline;
  }
`,Z={scheduled:{color:l.Tj.violet_60,label:"Scheduled"},live:{color:l.Tj.forest_60,label:"Live"},pause:{color:l.Tj.pumpkin_60,label:"Pause"},complete:{color:l.Tj.sky_60,label:"Complete"},unknown:{color:l.Tj.cloud_50,label:"Unknown"}};function G(e){return Array.isArray(e)?e:"string"==typeof e&&e.length>0?[e]:[]}function J(e,a){if(!a)return;const i=e.find(e=>e.value===a);if(i)return i.value;const n=e.find(e=>e.label.toLowerCase()===a.toLowerCase());return n?n.value:a}function R(e){return{id:e.id,platform:e.platform,advertiserName:e.advertiserName,advertiserBid:e.advertiserBid,externalAdvertiserName:e.advertiserName,externalAdvertiserId:e.advertiserBid,externalCampaignName:e.campaignName,externalCampaignId:e.id,advertiserMapping:"mapped",campaignMapping:"mapped",invoiceMapping:"unmapped",offersMapping:"unmapped",isFollowed:e.isFollowed,expandable:!1,prefill:{tactic:J(d.rF,e.tactic),subType:J(d.fZ,e.subType),language:J(d.Po,e.language)}}}function Y({advertiserBid:e,showBreadcrumb:a=!1}){const{isAdmin:i,isStandard:h}=(0,s.A)(),x=!(i||h),b=!!e,f=(0,t.useRef)(null),[j,v]=(0,t.useState)(e?d.rN.filter(a=>a.advertiserBid===e):d.rN),[y,C]=(0,t.useState)(null),[w,k]=(0,t.useState)(!1),[S,T]=(0,t.useState)(null),[_,A]=(0,t.useState)(null),[N,$]=(0,t.useState)(null),[P,I]=(0,t.useState)(!1),[J,Y]=(0,t.useState)(null),[U,X]=(0,t.useState)(!1),[Q,ee]=(0,t.useState)(1),[ae,ie]=(0,t.useState)("all"),ne=e=>{$(e),A(R(e)),T("campaign"),k(!0)},te=e=>{Y(R(e)),I(!0)},le=()=>{k(!1),T(null),A(null),$(null)},re=e=>[{key:"edit",label:x?"View mapping":"Edit mapping",onClick:()=>ne(e)},{key:"offers",label:x?"View offers":"Offers",onClick:()=>te(e)},...x?[]:[{key:"delete",label:"Delete mapping",danger:!0,onClick:()=>C(e)}]],se=[{title:"Mapping Status",dataIndex:"mappingStatus",key:"mappingStatus",width:"8%",align:"center",render:e=>{const a="green"===e?{name:"checkCircleSolid",color:l.Tj.forest_60,label:"Confirmed"}:"red"===e?{name:"timesCircleSolid",color:l.Tj.crimson_60,label:"Not confirmed after 48h"}:{name:"timesCircleSolid",color:l.Tj.cloud_50,label:"Awaiting backend confirmation"};return(0,n.jsx)(o.A,{title:`Mapping status: ${a.label}`,children:(0,n.jsx)(E,{"aria-label":`Mapping status: ${a.label}`,children:(0,n.jsx)(l.In,{name:a.name,color:a.color,width:18,height:18})})})}},{title:"Advertiser (BPID)",dataIndex:"advertiserBid",key:"advertiserBid",width:"20%",ellipsis:!0,render:(e,a)=>(0,n.jsxs)(D,{children:[(0,n.jsx)("span",{children:a.advertiserName}),(0,n.jsx)(B,{children:a.advertiserBid})]})},{title:"Platform",dataIndex:"platform",key:"platform",width:"10%",render:e=>(0,n.jsx)("span",{children:(0,c.G8)(e)})},{title:"Reporting Platform",dataIndex:"reportingPlatform",key:"reportingPlatform",width:"12%",render:e=>(0,n.jsx)("span",{children:e})},{title:"Campaign Name",dataIndex:"campaignName",key:"campaignName",width:"26%",ellipsis:!0,render:(e,a)=>{const i=Z[a.campaignStatus];return(0,n.jsxs)(O,{children:[(0,n.jsx)(o.A,{title:`Campaign Status in Platform : ${i.label}`,children:(0,n.jsx)(L,{color:i.color,"aria-label":`Campaign status: ${i.label}`})}),(0,n.jsx)(F,{type:"button",onClick:()=>ne(a),children:a.campaignName})]})}},{title:"Tactic",dataIndex:"tactic",key:"tactic",width:"12%"},{title:"Sub-Type",dataIndex:"subType",key:"subType",width:"12%"},{title:"Language",dataIndex:"language",key:"language",width:"8%"},{title:"Offers",dataIndex:"offersMapping",key:"offersMapping",width:"8%",align:"center",render:(e,a)=>{if(!(0,c.x2)(a.platform))return(0,n.jsx)(o.A,{title:"Offer mapping does not exist for this platform",children:(0,n.jsx)(E,{"aria-label":"Offers: not applicable",children:(0,n.jsx)(l.In,{name:"ban",color:l.Tj.cloud_50,width:18,height:18})})});if("green"!==a.mappingStatus)return(0,n.jsx)(o.A,{title:"Campaign must be confirmed (Green) before offers can be mapped",children:(0,n.jsx)(E,{"aria-label":"Offers: unavailable until the campaign is confirmed",children:(0,n.jsx)(l.In,{name:"timesCircle",color:l.Tj.cloud_50,width:18,height:18})})});const i=a.offerCounts,t=i.green+i.grey+i.red>0;return(0,n.jsx)(o.A,{title:t?`Offers: ${i.green} confirmed · ${i.grey} awaiting · ${i.red} attention — click to view/edit`:"No offers yet — click to map",children:(0,n.jsxs)(H,{type:"button","aria-label":t?`View offers for ${a.campaignName}`:`Map offers for ${a.campaignName}`,onClick:()=>te(a),children:[(0,n.jsxs)(V,{children:[(0,n.jsx)(L,{color:l.Tj.forest_60})," ",i.green]}),(0,n.jsxs)(V,{children:[(0,n.jsx)(L,{color:l.Tj.cloud_50})," ",i.grey]}),(0,n.jsxs)(V,{children:[(0,n.jsx)(L,{color:l.Tj.crimson_60})," ",i.red]})]})})}},{key:"actions",align:"center",width:"4%",render:(e,a)=>(0,n.jsx)(l.rI,{items:re(a),menuType:"kebab",children:(0,n.jsx)(l.K0,{id:`campaign-${a.id}-actions-btn`,iconName:"ellipsisVertical",color:l.Tj.cloud_80})})}],oe=(e,a,i)=>({value:t,setValue:r})=>(0,n.jsx)(l.l6,{id:e,label:a,mode:"multiple",showSearch:!0,placeholder:"Select",options:i,value:G(t),onChange:e=>r(e)}),de=[{name:"mappingStatus",label:"Mapping Status",type:"multiple",placement:"banner",options:d.FJ,renderControl:oe("campaign-mapping-status-sel","Mapping Status",d.FJ)},{name:"advertiserBid",label:"Advertiser (BPID)",type:"multiple",placement:"banner",options:d.iX,renderControl:oe("campaign-advertiser-sel","Advertiser (BPID)",d.iX)},{name:"platform",label:"Platform",type:"multiple",placement:"banner",options:d.MD,renderControl:oe("campaign-platform-sel","Platform",d.MD)},{name:"reportingPlatform",label:"Reporting Platform",type:"multiple",placement:"banner",options:d.Sy,renderControl:oe("campaign-reporting-platform-sel","Reporting Platform",d.Sy)},{name:"campaignName",label:"Campaign Name",placement:"banner",renderControl:({value:e,setValue:a})=>(0,n.jsx)(l.pd,{id:"campaign-name-inp",label:"Campaign Name",placeholder:"Campaign Name",value:"string"==typeof e?e:"",onChange:e=>a(e.target.value)})},{name:"campaignStatus",label:"Campaign Status",type:"multiple",placement:"banner",options:d.VW,renderControl:oe("campaign-status-sel","Campaign Status",d.VW)},{name:"tactic",label:"Tactic",type:"multiple",placement:"banner",options:d.rF,renderControl:oe("campaign-tactic-sel","Tactic",d.rF)},{name:"subType",label:"Sub-Type",type:"multiple",placement:"banner",options:d.fZ,renderControl:oe("campaign-subtype-sel","Sub-Type",d.fZ)},{name:"language",label:"Language",type:"multiple",placement:"banner",options:d.Po,renderControl:oe("campaign-language-sel","Language",d.Po)},{name:"scope",label:"Scope",type:"single",placement:"header",showInTags:!1,renderControl:({value:e,setValue:a})=>{const i="string"==typeof e&&e.length>0?e:"my";return(0,n.jsx)(l.Wg,{value:i,onChange:e=>a(String(e)),options:[{label:(0,n.jsx)("span",{id:"campaign-scope-my-txt",children:"My Campaigns"}),value:"my"},{label:(0,n.jsx)("span",{id:"campaign-scope-all-txt",children:"All Campaigns"}),value:"all"}]})}}],ce=b?[]:de,pe=b?{scope:"all"}:{scope:"my"},me=x?null:(0,n.jsx)(l.$n,{id:"campaign-map-btn",size:"small",variant:b?"outlined":"solid",onClick:()=>X(!0),children:"Map Campaign"}),ue=(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(u.A,{open:w,mappingType:S,campaign:_,readOnly:x,onClose:le,onSave:le,onDelete:!x&&N?()=>{const e=N;le(),C(e)}:void 0}),(0,n.jsx)(g.A,{open:P,campaign:J,readOnly:x,onClose:()=>{I(!1),Y(null)}}),(0,n.jsx)(l.aF,{idPrefix:"campaign-delete",title:"Delete campaign mapping",open:!!y,okText:"Delete",cancelText:"Cancel",onCancel:()=>C(null),onOk:()=>{y&&(v(e=>e.filter(e=>e.id!==y.id)),C(null),b||setTimeout(()=>f.current?.refetchWithFilters(),0))},children:(()=>{if(!y)return null;const e=y.offerCounts,a="mapped"===y.offersMapping||e.green+e.grey+e.red>0,i="green"===y.mappingStatus;return(0,n.jsxs)(n.Fragment,{children:["Delete the mapping for ",(0,n.jsx)("strong",{children:y.campaignName}),"? This removes the campaign mapping.",a&&(0,n.jsxs)(n.Fragment,{children:[" ","This campaign has ",(0,n.jsx)("strong",{children:"mapped offers"}),", which will also be deleted."]}),i&&(0,n.jsxs)(n.Fragment,{children:[" ","This campaign is ",(0,n.jsx)("strong",{children:"Green"})," (DWI-confirmed) — deleting it removes a confirmed mapping."]})]})})()}),(0,n.jsx)(M,{open:U,readOnly:x,onClose:()=>X(!1)})]}),ge="–",he=e=>{A(e),T("campaign"),k(!0)},xe=[{title:"Mapping Status",key:"mappingStatus",width:"8%",align:"center",render:(e,a)=>{if("unmapped"===a.kind)return(0,n.jsx)(o.A,{title:"Campaign mapping: Unmapped — click the name to map",children:(0,n.jsx)(E,{"aria-label":"Campaign mapping: unmapped",children:(0,n.jsx)(l.In,{name:"timesCircle",color:l.Tj.crimson_60,width:18,height:18})})});const i=a.src.mappingStatus,t="green"===i?{name:"checkCircleSolid",color:l.Tj.forest_60,label:"Confirmed"}:"red"===i?{name:"timesCircleSolid",color:l.Tj.crimson_60,label:"Not confirmed after 48h"}:{name:"timesCircleSolid",color:l.Tj.cloud_50,label:"Awaiting backend confirmation"};return(0,n.jsx)(o.A,{title:`Mapping status: ${t.label}`,children:(0,n.jsx)(E,{"aria-label":`Mapping status: ${t.label}`,children:(0,n.jsx)(l.In,{name:t.name,color:t.color,width:18,height:18})})})}},{title:"Platform",key:"platform",width:"10%",render:(e,a)=>(0,c.G8)(a.src.platform)},{title:"Reporting Platform",key:"reportingPlatform",width:"12%",render:(e,a)=>"mapped"===a.kind?a.src.reportingPlatform:ge},{title:"Campaign Name",key:"campaignName",width:"28%",ellipsis:!0,render:(e,a)=>{if("unmapped"===a.kind){const e="-"===a.src.externalCampaignName?a.src.externalAdvertiserName:a.src.externalCampaignName,i="-"===a.src.externalCampaignId?a.src.externalAdvertiserId:a.src.externalCampaignId;return(0,n.jsxs)(O,{children:[(0,n.jsx)(o.A,{title:"Not yet mapped — external campaign (click to map)",children:(0,n.jsx)(L,{color:l.Tj.crimson_60,"aria-label":"Unmapped"})}),(0,n.jsxs)(D,{children:[(0,n.jsx)(K,{type:"button",onClick:()=>he(a.src),children:e}),(0,n.jsx)(B,{children:i})]})]})}const i=Z[a.src.campaignStatus],t=a.src;return(0,n.jsxs)(O,{children:[(0,n.jsx)(o.A,{title:`Campaign Status in Platform : ${i.label}`,children:(0,n.jsx)(L,{color:i.color,"aria-label":`Campaign status: ${i.label}`})}),(0,n.jsx)(F,{type:"button",onClick:()=>ne(t),children:t.campaignName})]})}},{title:"Tactic",key:"tactic",width:"12%",render:(e,a)=>"mapped"===a.kind?a.src.tactic:ge},{title:"Sub-Type",key:"subType",width:"12%",render:(e,a)=>"mapped"===a.kind?a.src.subType:ge},{title:"Language",key:"language",width:"8%",render:(e,a)=>"mapped"===a.kind?a.src.language:ge},{title:"Offers",key:"offers",width:"8%",align:"center",render:(e,a)=>{if("unmapped"===a.kind)return(0,n.jsx)("span",{children:ge});const i=a.src;if(!(0,c.x2)(i.platform))return(0,n.jsx)(o.A,{title:"Offer mapping does not exist for this platform",children:(0,n.jsx)(E,{"aria-label":"Offers: not applicable",children:(0,n.jsx)(l.In,{name:"ban",color:l.Tj.cloud_50,width:18,height:18})})});if("green"!==i.mappingStatus)return(0,n.jsx)(o.A,{title:"Campaign must be confirmed (Green) before offers can be mapped",children:(0,n.jsx)(E,{"aria-label":"Offers: unavailable until the campaign is confirmed",children:(0,n.jsx)(l.In,{name:"timesCircle",color:l.Tj.cloud_50,width:18,height:18})})});const t=i.offerCounts,r=t.green+t.grey+t.red>0;return(0,n.jsx)(o.A,{title:r?`Offers: ${t.green} confirmed · ${t.grey} awaiting · ${t.red} attention`:"No offers yet — click to map",children:(0,n.jsxs)(H,{type:"button","aria-label":`Offers for ${i.campaignName}`,onClick:()=>te(i),children:[(0,n.jsxs)(V,{children:[(0,n.jsx)(L,{color:l.Tj.forest_60})," ",t.green]}),(0,n.jsxs)(V,{children:[(0,n.jsx)(L,{color:l.Tj.cloud_50})," ",t.grey]}),(0,n.jsxs)(V,{children:[(0,n.jsx)(L,{color:l.Tj.crimson_60})," ",t.red]})]})})}},{key:"actions",align:"center",width:"4%",render:(e,a)=>{const i="unmapped"===a.kind?[{key:"map",label:x?"View mapping":"Map campaign",onClick:()=>he(a.src)}]:re(a.src);return(0,n.jsx)(l.rI,{items:i,menuType:"kebab",children:(0,n.jsx)(l.K0,{id:`advertiser-campaign-${a.kind}-actions-btn`,iconName:"ellipsisVertical",color:l.Tj.cloud_80})})}}];if(b){const a=c.EF.filter(a=>a.advertiserBid===e&&"mapped"===a.advertiserMapping&&"unmapped"===a.campaignMapping&&!(0,c.vD)(a)),i=Array.from(new Set([...j,...a].map(e=>e.platform))),t=[{label:"All Campaigns",value:"all"},...i.map(e=>({label:(0,c.G8)(e),value:e}))],r=i.includes(ae)||"all"===ae?ae:"all",s="all"===r?a:a.filter(e=>e.platform===r),o="all"===r?j:j.filter(e=>e.platform===r),d=[...s.map(e=>({kind:"unmapped",src:e})),...o.map(e=>({kind:"mapped",src:e}))],p=e=>"unmapped"===e.kind?0:{red:1,grey:2,green:3}[e.src.mappingStatus],m=(e,a)=>"mapped"===e.kind?e.src[a]:"",u=[...d].sort((e,a)=>{let i=p(e)-p(a);return i||(i=e.src.platform.localeCompare(a.src.platform),i||(i=m(e,"reportingPlatform").localeCompare(m(a,"reportingPlatform")),i||(i=m(e,"tactic").localeCompare(m(a,"tactic")),i||(i=m(e,"subType").localeCompare(m(a,"subType")),i||m(e,"language").localeCompare(m(a,"language"))))))}),g=u.length,h=10*(Q-1),x=u.slice(h,h+10);return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(W,{children:[(0,n.jsx)(l.EY.H5,{id:"advertiser-campaigns-ttl",children:"Campaigns"}),me]}),i.length>1&&(0,n.jsx)(z,{children:(0,n.jsx)(l.Wg,{value:r,onChange:e=>{ie(String(e)),ee(1)},options:t})}),(0,n.jsx)(l.XI,{id:"advertiser-campaigns-tbl",cellsIdPrefix:"advertiser-campaigns",rowKey:e=>"mapped"===e.kind?e.src.id:`um-${e.src.id}`,columns:xe,dataSource:x,pagination:!1}),g>10&&(0,n.jsx)(l.dK,{current:Q,pageSize:10,total:g,showTotal:(e,[,a])=>`${a} of ${e} items`,onChange:e=>ee(e)}),ue]})}return(0,n.jsxs)(q,{children:[a&&(0,n.jsx)(l.Qp,{items:[{title:"Home",href:"/"},{title:"Campaigns"}]}),(0,n.jsx)(r.A,{id:"campaign-tbl",cellsIdPrefix:"campaign",rowKey:"id",ref:f,sectionTitle:"Campaigns",titleButtons:me,columns:se,filterItems:ce,initialFilters:pe,filterMode:"server",queryFn:async(e,a)=>{const i=e??{},n=G(i.platform),t=G(i.reportingPlatform),l=G(i.advertiserBid),r=G(i.tactic),s=G(i.subType),o=G(i.campaignStatus),d=G(i.mappingStatus),u=G(i.language),g="string"==typeof i.campaignName?i.campaignName.trim().toLowerCase():"",h=b?"all":"string"==typeof i.scope?i.scope:"my",x="string"==typeof i.search?i.search.trim().toLowerCase():"",f=j.filter(e=>!(n.length>0&&!n.includes(e.platform))&&(!(t.length>0&&!t.includes(e.reportingPlatform))&&(!(l.length>0&&!l.includes(e.advertiserBid))&&(!(r.length>0&&!r.includes(e.tactic))&&(!(s.length>0&&!s.includes(e.subType))&&(!(o.length>0&&!o.includes(e.campaignStatus))&&(!(d.length>0&&!d.includes(e.mappingStatus))&&(!(u.length>0&&!u.includes(e.language))&&(!(g&&!e.campaignName.toLowerCase().includes(g))&&(!("my"===h&&!(0,c.DA)(e))&&!(x&&![e.platform,e.campaignName,e.advertiserName,e.advertiserBid,e.tactic,e.subType,e.language].join(" ").toLowerCase().includes(x)))))))))))),v=(0,m.aL)(f,e=>e.advertiserBid===p.gz.bpid),y=a?.pageSize??10,C=((a?.current??1)-1)*y;return{data:v.slice(C,C+y),total:v.length}},tableSearch:{show:!0,placeholder:"Search"},tableTitle:"Campaigns Overview"}),ue]})}const U=function(){return(0,n.jsx)(Y,{showBreadcrumb:!0})}}}]);