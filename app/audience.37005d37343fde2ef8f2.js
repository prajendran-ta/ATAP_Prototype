"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[1401],{10498:(e,r,t)=>{t.d(r,{l:()=>u,x:()=>o});var i=t(57239);const l="mediahub.audience-rules";let a=[],d=!1;const n="mediahub.audience-rules.seeded-ids";function s(){if("undefined"!=typeof sessionStorage){if(0===a.length)try{a=JSON.parse(sessionStorage.getItem(l)??"null")??i.$o.map(e=>({...e}))}catch{a=i.$o.map(e=>({...e})),sessionStorage.removeItem(l)}!function(){if(d)return;d=!0;let e=[];try{e=JSON.parse(sessionStorage.getItem(n)??"[]")}catch{e=[]}const r=new Set([...e,...a.map(e=>e.id)]),t=i.$o.filter(e=>!r.has(e.id));t.length>0&&(a=[...a,...t.map(e=>({...e}))],sessionStorage.setItem(l,JSON.stringify(a))),sessionStorage.setItem(n,JSON.stringify([...new Set([...e,...i.$o.map(e=>e.id)])]))}()}}function o(){return s(),a.map(e=>({...e}))}function u(e){"undefined"==typeof sessionStorage||d||s(),a=e.map(e=>({...e})),"undefined"!=typeof sessionStorage&&sessionStorage.setItem(l,JSON.stringify(a))}},53644:(e,r,t)=>{t.d(r,{AC:()=>o,I0:()=>y,OO:()=>g,Q_:()=>h,R2:()=>m,RD:()=>T,SZ:()=>u,Ux:()=>d,ZF:()=>n,a6:()=>c,aD:()=>A,b4:()=>E,cB:()=>f,jC:()=>v,oP:()=>s,pp:()=>I,rF:()=>p,sp:()=>x,zj:()=>a});var i=t(44669),l=t(94439);const a=i.A.div`
  display: flex;
  flex-direction: column;
  min-width: 700px;
  gap: 16px;
  margin-bottom: 50px;
`,d=(i.A.span`
  display: inline-block;
  padding: 2px 12px;
  border: 1px solid ${l.Tj.cloud_0};
  border-radius: 999px;
  background-color: ${({$isAmadeus:e})=>e?l.Tj.sky_40:"#9240CC"};
  color: ${l.Tj.cloud_0};
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  height: 24px;
  margin-inline-end: 0;
`,i.A.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,i.A.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,i.A.span`
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid #9240CC;
  border-radius: 999px;
  background-color: ${l.Tj.cloud_0};
  color: #9240CC;
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
`),n=(0,i.A)(l.xA.fv)`
  display: flex;
  flex-direction: column;
  background-color: ${l.Tj.cloud_0};
  border-radius: 5px;
  border: 1px solid ${l.Tj.cloud_30};
  gap: 16px;
  padding: 16px;
  margin-top: 10px;
`,s=i.A.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
`,o=i.A.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${l.Tj.cloud_0};
  padding: 16px;
  border-radius: 5px;
  border: 1px solid ${l.Tj.cloud_30};
  min-height: 0;
`,u=i.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`,c=i.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
  margin: 8px 0 16px;
`,p=i.A.div`
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
`,m=i.A.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-right: 1px solid ${l.Tj.cloud_30};
`,A=i.A.button`
  border: 0;
  border-left: 3px solid ${({active:e})=>e?l.Tj.sky_80:"transparent"};
  border-radius: 4px;
  padding: 10px 12px;
  text-align: left;
  color: ${l.Tj.cloud_100};
  background: transparent;
  font: inherit;
  font-weight: ${({active:e})=>e?700:400};
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${l.Tj.sky_20};
    color: ${l.Tj.sky_80};
  }

  &:disabled {
    color: ${l.Tj.cloud_50};
    cursor: not-allowed;
  }
`,x=i.A.div`
  min-width: 0;
`,f=(i.A.div`
  margin: 4px 0 20px;
  color: ${l.Tj.cloud_70};
  font-size: 16px;
`,i.A.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 8px 0 64px;
`),h=i.A.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${l.Tj.cloud_30};
  border-radius: 5px;
  background: ${l.Tj.cloud_0};
`,v=i.A.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`,I=i.A.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`,g=i.A.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 18px;
`,y=i.A.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`,T=i.A.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;

  > div:first-child {
    flex: 1;
    min-width: 0;
  }

  > div:last-child {
    flex: 0 0 auto;
    padding-bottom: 8px;
  }
`,E=i.A.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 6px 10px;
  border-radius: 16px;
  background: ${l.Tj.cloud_20};
  color: ${l.Tj.cloud_100};
`;(0,i.A)(l.Ex)`
  border: none;
  background: ${l.Tj.violet_20};
  color: ${l.Tj.cloud_100};
`},57239:(e,r,t)=>{t.d(r,{$o:()=>a,e8:()=>i,g$:()=>l,tR:()=>d});const i=[{label:"Airline",value:"AIRLINE"},{label:"Hotel",value:"HOTEL"},{label:"Destination",value:"DESTINATION"},{label:"Cruise",value:"CRUISE"},{label:"Train",value:"TRAIN"},{label:"Car Rental",value:"CAR_RENTAL"},{label:"Bus",value:"BUS"},{label:"Package",value:"PACKAGE"},{label:"All",value:"ALL"},{label:"Others",value:"OTHERS"}],l=Object.fromEntries(i.map(e=>[e.value,e.label])),a=[{id:"rule-001",ruleName:"High-Value Corporate Bookers",travelIntentCategory:"AIRLINE",usedInAudiences:4},{id:"rule-002",ruleName:"Weekend Getaway Seekers",travelIntentCategory:"DESTINATION",usedInAudiences:2},{id:"rule-003",ruleName:"Family Suite Browsers",travelIntentCategory:"HOTEL",usedInAudiences:3},{id:"rule-004",ruleName:"5-Star Repeat Guests",travelIntentCategory:"PACKAGE",usedInAudiences:1},{id:"rule-005",ruleName:"Flash Sale Responders",travelIntentCategory:"ALL",usedInAudiences:5},{id:"rule-006",ruleName:"Conference & Meeting Planners",travelIntentCategory:"TRAIN",usedInAudiences:2},{id:"rule-007",ruleName:"Frequent Business Extenders",travelIntentCategory:"CAR_RENTAL",usedInAudiences:0},{id:"rule-008",ruleName:"Beach Resort Explorers",travelIntentCategory:"CRUISE",usedInAudiences:6},{id:"rule-009",ruleName:"London Weekend Breakers",travelIntentCategory:"DESTINATION",usedInAudiences:2,criteriaRows:[{id:"rule-009-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED"]},{id:"rule-009-c2",type:"DESTINATION",values:["LONDON"]},{id:"rule-009-c3",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:3}]},{id:"rule-010",ruleName:"Business Travellers - Central London",travelIntentCategory:"HOTEL",usedInAudiences:1,criteriaRows:[{id:"rule-010-c1",type:"DESTINATION",values:["LONDON"]},{id:"rule-010-c2",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","VISITED"]},{id:"rule-010-c3",type:"NUMBER_OF_PASSENGERS",values:[],operator:"EQ",numberValue:1}]},{id:"rule-011",ruleName:"US & Gulf Luxury Long-Haul Visitors",travelIntentCategory:"ALL",usedInAudiences:1,criteriaRows:[{id:"rule-011-c1",type:"ORIGIN",values:["UNITED_STATES","UNITED_ARAB_EMIRATES","SAUDI_ARABIA","QATAR"]},{id:"rule-011-c2",type:"DESTINATION",values:["LONDON"]},{id:"rule-011-c3",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:4}]},{id:"rule-012",ruleName:"Abandoned Booking Re-engagers",travelIntentCategory:"HOTEL",usedInAudiences:1,criteriaRows:[{id:"rule-012-c1",type:"ENGAGEMENT_ACTIVITY",values:["ABANDONED_CARTS"]}]},{id:"rule-013",ruleName:"Afternoon Tea & Theatre Package Seekers",travelIntentCategory:"PACKAGE",usedInAudiences:1,criteriaRows:[{id:"rule-013-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED"]},{id:"rule-013-c2",type:"DESTINATION",values:["LONDON"]},{id:"rule-013-c3",type:"NUMBER_OF_PASSENGERS",values:[],operator:"GTE",numberValue:2}]},{id:"rule-014",ruleName:"Resort & Spa Leisure Seekers",travelIntentCategory:"HOTEL",usedInAudiences:10,criteriaRows:[{id:"rule-014-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","VISITED"]},{id:"rule-014-c2",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:3},{id:"rule-014-c3",type:"NUMBER_OF_PASSENGERS",values:[],operator:"GTE",numberValue:2}]},{id:"rule-015",ruleName:"Long-Haul Trans-Pacific Visitors",travelIntentCategory:"ALL",usedInAudiences:10,criteriaRows:[{id:"rule-015-c1",type:"ORIGIN",values:["AUSTRALIA","JAPAN","SOUTH_KOREA","SINGAPORE"]},{id:"rule-015-c2",type:"ORIGIN",values:["CANADA","UNITED_STATES"]},{id:"rule-015-c3",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:5}]},{id:"rule-016",ruleName:"City Break Weekenders",travelIntentCategory:"DESTINATION",usedInAudiences:10,criteriaRows:[{id:"rule-016-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED"]},{id:"rule-016-c2",type:"DESTINATION",values:["NEW_YORK","BARCELONA","SYDNEY","MELBOURNE"]},{id:"rule-016-c3",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:3}]},{id:"rule-017",ruleName:"Business & Conference Travellers",travelIntentCategory:"HOTEL",usedInAudiences:6,criteriaRows:[{id:"rule-017-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","BOOKED"]},{id:"rule-017-c2",type:"NUMBER_OF_PASSENGERS",values:[],operator:"EQ",numberValue:1},{id:"rule-017-c3",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:4}]},{id:"rule-018",ruleName:"Family Holiday Planners",travelIntentCategory:"PACKAGE",usedInAudiences:3,criteriaRows:[{id:"rule-018-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","ABANDONED_CARTS"]},{id:"rule-018-c2",type:"NUMBER_OF_PASSENGERS",values:[],operator:"GTE",numberValue:3},{id:"rule-018-c3",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:5}]},{id:"rule-019",ruleName:"Last-Minute Deal Seekers",travelIntentCategory:"ALL",usedInAudiences:3,criteriaRows:[{id:"rule-019-c1",type:"ENGAGEMENT_ACTIVITY",values:["VISITED","ABANDONED_CARTS"]},{id:"rule-019-c2",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:2}]}];function d(e){if(e)return a.find(r=>r.id===e)}},66728:(e,r,t)=>{t.r(r),t.d(r,{AudienceDetailsPage:()=>p,AudienceFormPage:()=>S,default:()=>i.A});var i=t(42641),l=t(74848),a=t(13937),d=t(94439),n=t(50770),s=t(12609),o=t(9642),u=t(10216),c=t(57239);const p=function(){const{audienceId:e}=(0,a.g)(),r=u.FF.find(r=>r.id===e);return(0,l.jsxs)(o.s_,{children:[(0,l.jsx)(d.Qp,{items:[{title:"Home",href:"/"},{title:"Audience",href:"/audience"},{title:r?.audienceName??"Audience Settings"}]}),(0,l.jsx)(d.EY.H3,{id:"audience-details-ttl",children:"Audience Settings"}),(0,l.jsxs)(o.V_,{children:[(0,l.jsx)(d.EY.H5,{children:"Audience Information"}),(0,l.jsx)(d.pd,{label:"Advertiser",value:r?.advertiser??"-",disabled:!0}),(0,l.jsx)(d.pd,{label:"Audience Name",value:r?.audienceName??"-",disabled:!0}),(0,l.jsx)(n.Ay.Group,{value:r?.dataType,options:u.Jt,disabled:!0})]}),(0,l.jsxs)(o.V_,{children:[(0,l.jsx)(d.EY.H5,{children:"Platform Settings"}),(0,l.jsx)(d.XI,{id:"audience-details-platforms-tbl",rowKey:"id",pagination:!1,dataSource:r?.platformAdvertisers??[],columns:[{title:"Enable",key:"enabled",render:()=>(0,l.jsx)(s.A,{defaultChecked:!0})},{title:"Platform",dataIndex:"platform",key:"platform"},{title:"Advertiser Name",dataIndex:"advertiserName",key:"advertiserName"},{title:"Advertiser ID",dataIndex:"advertiserId",key:"advertiserId"},{title:"Connection",dataIndex:"connected",key:"connected",render:e=>(0,l.jsx)(d.In,{name:e?"checkCircle":"timesCircle",color:e?"#2e8540":d.Tj.crimson_60,width:18,height:18})}]})]}),(0,l.jsxs)(o.V_,{children:[(0,l.jsx)(d.EY.H5,{children:"Audience Rules"}),(0,l.jsx)(d.l6,{mode:"multiple",value:r?.audienceRuleIds,options:c.$o.map(e=>({label:e.ruleName,value:e.id})),disabled:!0})]})]})};var m=t(96540),A=t(62977),x=t(10498),f=t(59536),h=t(57974),v=t(86808),I=t(25070),g=t(53644);const y=new Set(["google ads","google dv360","facebook","meta (facebook)","amadeus dsp"]),T=e=>y.has(e.platform.trim().toLowerCase()),E=[{label:"Hotel Alpha Customer List",value:"hotel-alpha-customer-list"},{label:"Hotel Alpha Loyalty Members",value:"hotel-alpha-loyalty-members"},{label:"Hotel Alpha Website Visitors",value:"hotel-alpha-website-visitors"},{label:"Londoner Loyalty Members",value:"londoner-loyalty-members"},{label:"Londoner Past Guests (CRM)",value:"londoner-past-guests-crm"},...f.TE.map(e=>({label:`${e.campaignPrefix} Loyalty Members`,value:`${e.key}-loyalty-members`}))],N=["CM360","SA360","Meta (Facebook)","WHIP","Derbysoft","Google DV360","Google ADS","Amadeus DSP"].map(e=>({label:e,value:e})).filter(e=>y.has(e.value.toLowerCase()));function j({open:e,mode:r="create",initialAudience:t,advertiserOptions:i,lockedAdvertiser:c,onClose:p,onSave:f,onDelete:y,page:j=!1,advertiserBreadcrumb:b}){const S=(0,a.Zp)(),[C]=d.lV.useForm(),[R,_]=(0,m.useState)([]),[O,D]=(0,m.useState)(!1),[k,w]=(0,m.useState)(!1),[V,L]=(0,m.useState)([]),[G]=d.lV.useForm(),$=d.lV.useWatch("audienceRuleIds",C)??[],F=d.lV.useWatch("advertiser",C),P=d.lV.useWatch("dataType",C),H=d.lV.useWatch("platform",G),Y=d.lV.useWatch("platformAdvertiserId",G),U=(0,I.c)(H,Y),B=t?i.find(e=>e.label===t.advertiser):void 0,M=F??c??B?.value,{loading:J}=(0,h.ny)(Number(M)),W=(0,x.x)();(0,m.useEffect)(()=>{L(M?(0,v.kO)(M):[])},[M]);const q=u.Jt.map(e=>"ADVERTISER"===e.value?{...e,label:(0,l.jsxs)("span",{children:[e.label," ",(0,l.jsx)(A.A,{title:"the text here is TBD",children:(0,l.jsx)("span",{style:{display:"inline-flex",cursor:"help"},children:(0,l.jsx)(d.In,{name:"infoCircle",color:d.Tj.cloud_50,width:14,height:14})})})]})}:e),K=[...(M?[{id:`default-amadeus-dsp-${M}`,platform:"Amadeus DSP",advertiserName:i.find(e=>e.value===M)?.label.replace(/\s\([^)]*\)$/,"")??"-",advertiserId:M,connected:!0},...V.map(e=>{const r=(0,I.c)(e.platform,e.advertiserId);return r?{...e,advertiserName:r.name,connected:!0}:e})]:[]).filter(T),...(t?.platformAdvertisers??[]).filter(T)].filter((e,r,t)=>t.findIndex(r=>r.platform.trim().toLowerCase()===e.platform.trim().toLowerCase())===r);(0,m.useEffect)(()=>{if(!e)return;const r=t?.platformAdvertisers??[],i=new Set(r.map(e=>e.platform.trim().toLowerCase())),l=K.filter(e=>r.some(r=>r.id===e.id||i.has(e.platform.trim().toLowerCase()))).map(e=>e.id);t?C.setFieldsValue({advertiser:M,audienceName:t.audienceName,dataType:t.dataType,fileId:t.fileId,audienceRuleIds:t.audienceRuleIds,platformAdvertiserIds:l}):c&&!F?C.setFieldsValue({advertiser:c}):F||c||C.resetFields(),_(l)},[C,t,e,M,F,c]);const z=(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(o.Hm,{children:(0,l.jsxs)(d.lV,{form:C,layout:"vertical",onFinish:e=>{f({...e,platformAdvertiserIds:R,platformAdvertisers:K.filter(e=>R.includes(e.id)),audienceRuleIds:e.audienceRuleIds??[]}),C.resetFields(),_([])},children:[(0,l.jsxs)(o.VA,{children:[(0,l.jsxs)(o.EE,{children:[(0,l.jsxs)(o.IJ,{children:[(0,l.jsx)(d.EY.H5,{children:"General Settings"}),(0,l.jsx)(d.lV.Item,{name:"audienceName",rules:[{required:!0}],children:(0,l.jsx)(d.pd,{id:"audience-add-name-inp",label:"Audience Name",required:!0})}),(0,l.jsx)(d.lV.Item,{name:"advertiser",rules:[{required:!0}],children:(0,l.jsx)(d.l6,{id:"audience-add-advertiser-sel",label:"Advertiser",options:i,required:!0,disabled:Boolean(t?.advertiser||c)})})]}),(0,l.jsxs)(o.IJ,{children:[(0,l.jsx)(d.EY.H5,{children:"Data Settings"}),(0,l.jsxs)(d.EY.JU,{children:["Data Type ",(0,l.jsx)(d.EY.JU,{status:"error",children:" *"})]}),(0,l.jsx)(d.lV.Item,{name:"dataType",rules:[{required:!0}],children:(0,l.jsx)(n.Ay.Group,{id:"audience-add-data_type-radio",options:q})})]})]}),(0,l.jsxs)(o.IJ,{children:[(0,l.jsx)(d.EY.H5,{children:"FILE"===P?"First party data settings":"Audience Rule Settings"}),"FILE"===P?(0,l.jsx)(d.lV.Item,{name:"fileId",required:!1,label:(0,l.jsxs)(d.EY.JU,{children:["File name ",(0,l.jsx)(d.EY.JU,{status:"error",children:" *"})]}),rules:[{required:!0,message:"Please select a file"}],children:(0,l.jsx)(d.l6,{id:"audience-add-file-sel",options:E,placeholder:"Select a file"})}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)(d.EY.JU,{children:["Audience Rules ",(0,l.jsx)(d.EY.JU,{status:"error",children:" *"})]}),0===W.length&&(0,l.jsx)(d.$n,{htmlType:"button",variant:"outlined",onClick:()=>S("/audience-builder/new"),children:"Create an Audience Rule"}),(0,l.jsx)(d.lV.Item,{name:"audienceRuleIds",rules:[{required:!0,message:"Please select at least one Audience Rule"}],children:(0,l.jsx)(d.l6,{id:"audience-add-rules-sel",mode:"multiple",options:W.map(e=>({label:e.ruleName,value:e.id})),required:!0})}),$.length>0&&(0,l.jsx)(o.Wt,{children:$.map(e=>(0,l.jsx)(d.vw,{children:W.find(r=>r.id===e)?.ruleName??e},e))})]})]}),(0,l.jsxs)(o.IJ,{children:[(0,l.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16},children:[(0,l.jsx)(d.EY.H5,{children:"Platform Settings"}),(0,l.jsx)(d.$n,{variant:"outlined",htmlType:"button",disabled:!M,onClick:()=>w(!0),children:"Add Platform"})]}),M?(0,l.jsx)(d.XI,{id:"audience-add-platforms-tbl",rowKey:"id",pagination:!1,loading:J,dataSource:K,columns:[{title:"Enable",key:"enabled",render:(e,r)=>(0,l.jsx)(s.A,{checked:R.includes(r.id),onChange:e=>_(t=>e?[...t,r.id]:t.filter(e=>e!==r.id))})},{title:"Platform",dataIndex:"platform",key:"platform"},{title:"Platform Advertiser ID",dataIndex:"advertiserId",key:"advertiserId"},{title:"Platform Advertiser Name",dataIndex:"advertiserName",key:"advertiserName"},{title:"Data connection",dataIndex:"connected",key:"connected",render:e=>(0,l.jsx)(d.In,{name:e?"checkCircle":"timesCircle",color:e?"#2e8540":d.Tj.crimson_60,width:18,height:18})}]}):(0,l.jsx)(d.EY.nB,{style:{color:d.Tj.cloud_80,fontStyle:"italic"},children:"Please select advertiser to see platforms."})]})]}),(0,l.jsx)(d.NG,{left:j?"60px":"calc(100% - 720px)",children:(0,l.jsxs)(o.N4,{children:["edit"===r&&y&&(0,l.jsx)(d.$n,{color:"danger",variant:"outlined",htmlType:"button",onClick:()=>D(!0),children:"Delete Audience"}),(0,l.jsxs)(o.Hd,{children:[(0,l.jsx)(d.$n,{htmlType:"button",variant:"outlined",onClick:p,children:"Cancel"}),(0,l.jsx)(d.$n,{htmlType:"submit",children:"Save"})]})]})})]})}),(0,l.jsx)(d._s,{id:"audience-platform-drawer",title:"Add Platform",placement:"right",width:"480px",open:k,onClose:()=>{w(!1),G.resetFields()},children:(0,l.jsx)(g.cB,{children:(0,l.jsxs)(d.lV,{form:G,layout:"vertical",onFinish:e=>{if(!M)return;const r=e.platformAdvertiserId.trim(),t=(0,I.c)(e.platform,r),l={id:`added-${e.platform}-${r}`,platform:e.platform,advertiserName:t?.name??i.find(e=>e.value===M)?.label.replace(/\s\([^)]*\)$/,"")??"-",advertiserId:r,connected:Boolean(t)},a=[...(0,v.kO)(M).filter(e=>e.id!==l.id),l];(0,v.o4)(M,a),L(a),w(!1),G.resetFields()},children:[(0,l.jsxs)(g.Q_,{children:[(0,l.jsx)(d.EY.H5,{children:"Platform Information"}),(0,l.jsx)(d.lV.Item,{name:"platform",label:"Platform Name",rules:[{required:!0,message:"Please select a platform"}],children:(0,l.jsx)(d.l6,{id:"audience-platform_name-sel",options:N,placeholder:"Select a platform"})}),(0,l.jsxs)(g.RD,{children:[(0,l.jsx)(d.lV.Item,{name:"platformAdvertiserId",label:"Platform Advertiser ID",rules:[{required:!0,message:"Please enter the Platform Advertiser ID"}],children:(0,l.jsx)(d.pd,{id:"audience-platform_advertiser_id-inp",placeholder:"Enter platform advertiser ID"})}),Y?.trim()&&(0,l.jsx)(g.OO,{id:"audience-platform-connection-status",children:(0,l.jsx)(d.In,{name:U?"checkCircle":"timesCircle",color:U?"#2e8540":d.Tj.crimson_60,width:18,height:18})})]}),U&&(0,l.jsxs)(g.b4,{id:"audience-platform-connected-chip",children:[(0,l.jsx)(d.In,{name:"checkCircle",color:"#2e8540",width:16,height:16}),(0,l.jsx)(d.vw,{children:U.name})]})]}),(0,l.jsx)(d.NG,{left:"calc(100% - 480px)",children:(0,l.jsx)(g.jC,{children:(0,l.jsxs)(g.pp,{children:[(0,l.jsx)(d.$n,{htmlType:"button",variant:"outlined",onClick:()=>{w(!1),G.resetFields()},children:"Cancel"}),(0,l.jsx)(d.$n,{htmlType:"submit",children:"Save"})]})})})]})})}),(0,l.jsxs)(d.aF,{idPrefix:"audience-delete-modal",title:(0,l.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:8},children:[(0,l.jsx)(d.In,{name:"exclamationTriangle",color:d.Tj.pumpkin_60,width:24,height:24}),(0,l.jsx)("span",{children:"Delete Audience"})]}),open:O,maskStyle:{backgroundColor:d.Tj.sky_90},okText:"Delete",onOk:()=>{D(!1),y?.()},onCancel:()=>D(!1),children:[(0,l.jsxs)(d.EY.nB,{children:["Are you sure you want to delete the ",(0,l.jsx)("strong",{children:t?.audienceName})," Audience? This action cannot be undone."]}),(0,l.jsx)(d.EY.nB,{children:"Would you like to proceed with the Delete?"})]})]});if(j){const e=b?[{title:"Home",href:"/"},{title:"Advertiser",href:"/advertisers"},{title:"Advertiser Details",href:b.href},{title:"Audiences",href:b.href},{title:"edit"===r?"Audience Settings":"New Audience"}]:[{title:"Home",href:"/"},{title:"Audience",href:"/audience"},{title:"edit"===r?"Audience Settings":"New Audience"}];return(0,l.jsxs)(o.s_,{children:[(0,l.jsx)(d.Qp,{items:e}),(0,l.jsx)(d.EY.H3,{children:"edit"===r?"Audience Settings":"New Audience"}),z]})}return(0,l.jsx)(d._s,{id:"audience-form-drawer",title:"edit"===r?"Audience Settings":"Add Audience",placement:"right",width:"720px",open:e,onClose:p,children:z})}var b=t(48572);function S(){const e=(0,a.Zp)(),r=(0,a.zy)(),{audienceId:t}=(0,a.g)(),i=(0,d.hN)(),{data:n}=(0,h.BJ)(),s=(0,b.V)(),o=s.length>0?s:u.FF,c=t?o.find(e=>e.id===t):void 0,p=r.state,m=(n?.advertisers?.advertisers??[]).map(e=>({label:`${e.advertiserName} (${String(e.bpid).toUpperCase()})`,value:String(e.advertiserId)})),A=p?.returnTo??"/audience",x=m.find(e=>e.value===p?.advertiserId)??m.find(e=>e.label===c?.advertiser),f=x&&A.startsWith("/advertisers/")?{label:x.label.replace(/\s\([^)]*\)$/,""),href:A}:void 0;return(0,l.jsx)(j,{open:!0,page:!0,mode:c?"edit":"create",initialAudience:c,advertiserOptions:m,lockedAdvertiser:p?.advertiserId,advertiserBreadcrumb:f,onClose:()=>e(A),onSave:r=>{const t=c?.id??`aud-${Date.now()}`,l=m.find(e=>e.value===r.advertiser)?.label??r.advertiser,a=r.platformAdvertisers??[],d={id:t,advertiser:l,audienceName:r.audienceName,dataType:r.dataType,fileId:r.fileId,channels:a.map(e=>e.platform).join(", ")||"Not configured",audienceSize:c?.audienceSize??0,lastUpload:c?.lastUpload??"-",nextUpload:c?.nextUpload??"-",platformAdvertisers:a,audienceRuleIds:r.audienceRuleIds??[]},n=c?o.map(e=>e.id===c.id?d:e):[d,...o];(0,b.N)(n),i.success(c?"Audience updated successfully.":"Audience added successfully."),e(A)},onDelete:()=>{c&&((0,b.N)(o.filter(e=>e.id!==c.id)),i.success("Audience deleted successfully."),e(A))}})}}}]);