"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[9279],{9642:(e,a,l)=>{l.d(a,{EE:()=>c,Hd:()=>N,Hm:()=>s,IJ:()=>A,N4:()=>I,UH:()=>u,VA:()=>v,V_:()=>o,Wt:()=>p,_h:()=>d,s_:()=>n,yN:()=>r});var t=l(44669),i=l(94439);const n=t.A.div`
  min-width: 900px;
  padding-bottom: 10px;
`,r=t.A.span`
  display: inline-block;
  padding: 2px 12px;
  border: 1px solid ${i.Tj.cloud_0};
  border-radius: 999px;
  background-color: ${({$isAmadeus:e})=>e?i.Tj.sky_40:"#9240CC"};
  color: ${i.Tj.cloud_0};
  font-size: 12px;
  line-height: 18px;
  white-space: nowrap;
  height: 24px;
  margin-inline-end: 0;
`,u=(t.A.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`,t.A.div`
  white-space: nowrap;
`),d=t.A.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 4px;
`,s=t.A.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0 64px;
`,o=t.A.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: 1px solid ${i.Tj.cloud_30};
  border-radius: 5px;
  background: ${i.Tj.cloud_0};
  margin-bottom: 20px;
`,A=o,c=t.A.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;

  & > div {
    margin-bottom: 0;
  }
`,v=t.A.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  & > div {
    margin-bottom: 0;
  }
`,p=t.A.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,I=t.A.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
`,N=t.A.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`},10216:(e,a,l)=>{l.d(a,{FF:()=>v,Jt:()=>n,zC:()=>p});var t=l(88218),i=l(59536);const n=[{label:"Amadeus audience",value:"DATAPARTNER"},{label:"First party data",value:"FILE"},{label:"Amadeus tracking",value:"ADVERTISER"}],r=[{id:"platform-001",platform:"CM360",advertiserName:"Hotel Alpha CM360",advertiserId:"1111",connected:!0},{id:"platform-002",platform:"SA360",advertiserName:"Hotel Alpha SA360",advertiserId:"2222",connected:!0},{id:"platform-003",platform:"Meta (Facebook)",advertiserName:"Hotel Alpha Facebook",advertiserId:"3333",connected:!1}],u=[{id:"aud-001",advertiser:"Hotel Alpha",audienceName:"High-value hotel bookers",dataType:"ADVERTISER",channels:"Google Ads, Meta",audienceSize:125e3,lastUpload:"18 Sep 2026",nextUpload:"25 Sep 2026",platformAdvertisers:r,audienceRuleIds:["rule-001"]},{id:"aud-002",advertiser:"Grand Aurora",audienceName:"Weekend leisure travelers",dataType:"DATAPARTNER",channels:"DV360",audienceSize:84500,lastUpload:"17 Sep 2026",nextUpload:"24 Sep 2026",platformAdvertisers:r.slice(1),audienceRuleIds:["rule-002"]},{id:"aud-003",advertiser:"Harborlight Resort",audienceName:"Luxury repeat guests",dataType:"FILE",channels:"CM360, Meta",audienceSize:39200,lastUpload:"15 Sep 2026",nextUpload:"22 Sep 2026",platformAdvertisers:r.slice(0,1),audienceRuleIds:["rule-004"]}],d=(e,a)=>{const l=((...e)=>t.fA.filter(a=>e.includes(a.platform)).map(e=>({...e})))(...a);return{...e,advertiser:t.gz.name,channels:l.map(e=>e.platform).join(", "),platformAdvertisers:l}},s=[d({id:"aud-ln001",audienceName:"Londoner website visitors 30d",dataType:"ADVERTISER",audienceSize:31e4,lastUpload:"09 Nov 2026",nextUpload:"16 Nov 2026",audienceRuleIds:["rule-009"]},["Google ADS","Amadeus DSP","Google DV360"]),d({id:"aud-ln002",audienceName:"Londoner abandoned bookings",dataType:"ADVERTISER",audienceSize:4200,lastUpload:"12 Nov 2026",nextUpload:"19 Nov 2026",audienceRuleIds:["rule-012"]},["Google ADS","Amadeus DSP"]),d({id:"aud-ln003",audienceName:"London weekend breakers",dataType:"DATAPARTNER",audienceSize:86e3,lastUpload:"05 Nov 2026",nextUpload:"12 Nov 2026",audienceRuleIds:["rule-009","rule-013"]},["Google ADS","Google DV360"]),d({id:"aud-ln004",audienceName:"US long-haul luxury travellers",dataType:"DATAPARTNER",audienceSize:52e3,lastUpload:"29 Oct 2026",nextUpload:"05 Nov 2026",audienceRuleIds:["rule-011"]},["Amadeus DSP","Google DV360"]),d({id:"aud-ln005",audienceName:"Business travellers - Central London",dataType:"DATAPARTNER",audienceSize:38500,lastUpload:"22 Oct 2026",nextUpload:"29 Oct 2026",audienceRuleIds:["rule-010"]},["Amadeus DSP"]),d({id:"aud-ln006",audienceName:"Londoner loyalty members",dataType:"FILE",fileId:"londoner-loyalty-members",audienceSize:12800,lastUpload:"14 Oct 2026",nextUpload:"21 Oct 2026",audienceRuleIds:[]},["Google ADS","Amadeus DSP"]),d({id:"aud-ln007",audienceName:"Londoner past guests (CRM)",dataType:"FILE",fileId:"londoner-past-guests-crm",audienceSize:24600,lastUpload:"15 Oct 2026",nextUpload:"22 Oct 2026",audienceRuleIds:[]},["Google ADS","Google DV360"])],o=[{name:e=>`${e.campaignPrefix} website visitors 30d`,dataType:"ADVERTISER",platforms:["Google ADS","Amadeus DSP","Google DV360"],ruleIds:["rule-014"],baseSize:24e4},{name:e=>`${e.market} weekend breakers`,dataType:"DATAPARTNER",platforms:["Google ADS","Google DV360"],ruleIds:["rule-016"],baseSize:78e3},{name:e=>`${e.campaignPrefix} loyalty members`,dataType:"FILE",platforms:["Google ADS","Amadeus DSP"],ruleIds:[],baseSize:14500,fileSuffix:"loyalty-members"},{name:e=>`Long-haul visitors to ${e.market}`,dataType:"DATAPARTNER",platforms:["Amadeus DSP","Google DV360"],ruleIds:["rule-015"],baseSize:46e3},{name:e=>`Business & conference travellers - ${e.market}`,dataType:"DATAPARTNER",platforms:["Amadeus DSP"],ruleIds:["rule-017"],baseSize:31e3},{name:e=>`${e.campaignPrefix} family holiday planners`,dataType:"DATAPARTNER",platforms:["Google ADS","Amadeus DSP"],ruleIds:["rule-018","rule-019"],baseSize:22500}],A=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],c=e=>`${String(e.getUTCDate()).padStart(2,"0")} ${A[e.getUTCMonth()]} ${e.getUTCFullYear()}`,v=[...u,...s,...i.TE.flatMap((e,a)=>{const l=4+a%3;return o.slice(0,l).map((l,t)=>{const i=e.platformAdvertisers.filter(e=>l.platforms.includes(e.platform)).map(e=>({...e})),n=new Date(Date.UTC(2026,9+(a+t)%2,1+(5*a+3*t)%28)),r=new Date(n.getTime()+6048e5),u=e.totalBudget/3e5,d=.85+(3*a+7*t)%10*.03;return{id:`aud-${e.key}-${String(t+1).padStart(2,"0")}`,advertiser:e.name,audienceName:l.name(e),dataType:l.dataType,...l.fileSuffix?{fileId:`${e.key}-${l.fileSuffix}`}:{},channels:i.map(e=>e.platform).join(", "),audienceSize:100*Math.round(l.baseSize*u*d/100),lastUpload:c(n),nextUpload:c(r),platformAdvertisers:i,audienceRuleIds:[...l.ruleIds]}})})],p=Object.fromEntries(n.map(e=>[e.value,e.label]))},10498:(e,a,l)=>{l.d(a,{l:()=>o,x:()=>s});var t=l(57239);const i="mediahub.audience-rules";let n=[],r=!1;const u="mediahub.audience-rules.seeded-ids";function d(){if("undefined"!=typeof sessionStorage){if(0===n.length)try{n=JSON.parse(sessionStorage.getItem(i)??"null")??t.$o.map(e=>({...e}))}catch{n=t.$o.map(e=>({...e})),sessionStorage.removeItem(i)}!function(){if(r)return;r=!0;let e=[];try{e=JSON.parse(sessionStorage.getItem(u)??"[]")}catch{e=[]}const a=new Set([...e,...n.map(e=>e.id)]),l=t.$o.filter(e=>!a.has(e.id));l.length>0&&(n=[...n,...l.map(e=>({...e}))],sessionStorage.setItem(i,JSON.stringify(n))),sessionStorage.setItem(u,JSON.stringify([...new Set([...e,...t.$o.map(e=>e.id)])]))}()}}function s(){return d(),n.map(e=>({...e}))}function o(e){"undefined"==typeof sessionStorage||r||d(),n=e.map(e=>({...e})),"undefined"!=typeof sessionStorage&&sessionStorage.setItem(i,JSON.stringify(n))}},19311:(e,a,l)=>{l.r(a),l.d(a,{AudienceBuilderDetailsPage:()=>le,default:()=>w});var t=l(74848),i=l(96540),n=l(13937),r=l(94439),u=l(9932),d=l(44669);const s=d.A.div`
  min-width: 900px;
  padding-bottom: 10px;
`,o=d.A.div`
  min-width: 900px;
  padding-bottom: 10px;
`,A=d.A.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 12px;
`,c=d.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`,v=d.A.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
`,p=d.A.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;

  > * {
    flex: 1;
  }
`,I=d.A.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`,N=d.A.div`
  flex: 1;
`,m=d.A.div`
  flex: 2;
`,E=d.A.div`
  flex: 0 0 auto;
  align-self: flex-start;
  padding-top: 0;
`,S=d.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
`,h=[r.Tj.sky_10,r.Tj.cloud_10,r.Tj.cloud_0],T=d.A.div`
  margin-top: 8px;
  border: 1px solid ${r.Tj.cloud_30};
  border-radius: 6px;
  max-height: 220px;
  overflow-y: auto;
  background: ${r.Tj.cloud_0};
`,g=d.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 0 12px;
  padding-left: ${({depth:e=0})=>12+20*e}px;
  background: ${({depth:e=0,summary:a})=>a?r.Tj.cloud_10:h[Math.min(e,h.length-1)]};
  border-bottom: 1px solid ${r.Tj.cloud_30};

  &:last-child {
    border-bottom: none;
  }
`,R=d.A.span`
  display: inline-flex;
  visibility: ${({invisible:e})=>e?"hidden":"visible"};
  transform: rotate(${({expanded:e})=>e?90:0}deg);
  transition: transform 0.15s ease;
`,x=d.A.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  color: ${r.Tj.cloud_100};

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`,y=d.A.span`
  color: ${r.Tj.cloud_70};
  flex-shrink: 0;
`,f=(d.A.div`
  margin-top: 6px;
  color: ${r.Tj.cloud_70};
  font-size: 12px;
`,d.A.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 4px 0;
  color: ${r.Tj.cloud_70};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${r.Tj.cloud_30};
  }
`),b=d.A.div`
  background: ${r.Tj.cloud_10};
  border: 1px solid ${r.Tj.cloud_30};
  border-radius: 8px;
  padding: 18px 24px;
  margin: 16px 0;
`,O=d.A.ol`
  margin: 12px 0 0;
  padding-left: 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`,C=d.A.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
`,_=d.A.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`,D=d.A.div`
  margin-top: 12px;
  color: ${r.Tj.cloud_70};
  font-size: 13px;
`;var L=l(57239),U=l(10216),G=l(9642),j=l(10498),M=l(48572);const w=function(){const e=(0,n.Zp)(),a=(0,i.useRef)(null),[l]=(0,i.useState)(()=>{const e=(0,j.x)();return(0,j.l)(e),e}),[d,o]=(0,i.useState)(null),[A,c]=(0,i.useState)(""),[v,p]=(0,i.useState)(1),I=(0,M.V)(),N=I.length>0?I:U.FF,m=(d?N.filter(e=>e.audienceRuleIds.includes(d)).map(({id:e,advertiser:a,audienceName:l})=>({id:e,advertiser:a,audienceName:l})):[]).filter(e=>{const a=A.trim().toLowerCase();return!a||e.advertiser.toLowerCase().includes(a)||e.audienceName.toLowerCase().includes(a)}),E=m.slice(10*(v-1),10*v),h=l.map(e=>({label:e.ruleName,value:e.ruleName})),T=[{title:"Rule Name",dataIndex:"ruleName",key:"ruleName",width:"auto",ellipsis:!0,render:(a,l,i)=>(0,t.jsx)(r.$n,{id:`audience_builder-open-${i}-btn`,variant:"text",onClick:()=>{return a=l.id,void e(`/audience-builder/${a}`);var a},children:a})},{title:"Travel Intent Category",dataIndex:"travelIntentCategory",key:"travelIntentCategory",width:"25%",ellipsis:!0,render:e=>L.g$[e]??e},{title:"Used in Audiences",dataIndex:"usedInAudiences",key:"usedInAudiences",width:"20%",ellipsis:!0,render:(e,a)=>(0,t.jsxs)(r.$n,{id:`audience_builder-used_in_audiences-${a.id}-btn`,variant:"text",disabled:0===e,onClick:()=>{return e=a.id,o(e),c(""),void p(1);var e},children:[e," ",1===e?"audience":"audiences"]})}],g=[{name:"ruleName",label:"Rule Name",type:"multiple",options:h,renderControl:({value:e,setValue:a})=>(0,t.jsx)(r.l6,{label:"Rule Name",id:"audience_builder-rule_name_filter-sel",placeholder:"Select",mode:"multiple",showSearch:!0,value:Array.isArray(e)?e:[],onChange:e=>a(e),options:h,allowClear:!0})},{name:"travelIntentCategory",label:"Travel Intent Category",type:"multiple",options:L.e8,renderControl:({value:e,setValue:a})=>(0,t.jsx)(r.l6,{label:"Travel Intent Category",id:"audience_builder-travel_intent_category_filter-sel",placeholder:"Select",mode:"multiple",showSearch:!0,value:Array.isArray(e)?e:[],onChange:e=>a(e),options:L.e8,allowClear:!0})}];return(0,t.jsxs)(s,{children:[(0,t.jsx)("div",{id:"audience_builder-breadcrumb-nav",children:(0,t.jsx)(r.Qp,{items:[{title:"Home",href:"/"},{title:"Audience Rules"}]})}),(0,t.jsx)(u.v,{ref:a,sectionTitle:"Audience Rules",titleButtons:(0,t.jsx)(r.$n,{id:"audience_builder-add_rule-btn",variant:"solid",onClick:()=>e("/audience-builder/new"),children:"New Audience Rule"}),columns:T,filterItems:g,filterMode:"client",clientSideFilters:["ruleName","travelIntentCategory","search"],queryFn:async()=>({data:l.map(e=>({...e,usedInAudiences:N.filter(a=>a.audienceRuleIds.includes(e.id)).length,travelIntentCategoryLabel:L.g$[e.travelIntentCategory]??e.travelIntentCategory})),total:l.length}),tableSearch:{show:!0,placeholder:"Search",keys:["ruleName","travelIntentCategoryLabel","usedInAudiences"]},tableTitle:"Rules",id:"audience_builder-tbl",cellsIdPrefix:"audience_builder",rowKey:"id"}),(0,t.jsx)(r._s,{id:"audience_builder-usage-drawer",title:"Used in Audiences",placement:"right",width:"720px",open:null!==d,onClose:()=>{o(null),c(""),p(1)},children:(0,t.jsxs)(G.Hm,{children:[(0,t.jsxs)(G.IJ,{children:[(0,t.jsxs)(S,{children:[(0,t.jsx)(r.EY.H5,{children:"Audience rule usage"}),(0,t.jsx)("div",{style:{width:220},children:(0,t.jsx)(r.pd,{id:"audience_builder-usage-search-inp",placeholder:"Search",value:A,onChange:e=>{c(e.target.value),p(1)}})})]}),(0,t.jsx)(r.XI,{id:"audience_builder-usage-tbl",rowKey:"id",pagination:!1,dataSource:E,columns:[{title:"Advertiser",dataIndex:"advertiser",key:"advertiser"},{title:"Audience",dataIndex:"audienceName",key:"audienceName"}]}),(0,t.jsx)(r.dK,{current:v,pageSize:10,total:m.length,showTotal:(e,[a,l])=>`${l} of ${e} items`,showSizeChanger:!1,onChange:p})]}),(0,t.jsx)(r.NG,{left:"calc(100% - 720px)",children:(0,t.jsx)(G.N4,{children:(0,t.jsx)(r.$n,{onClick:()=>{o(null),c(""),p(1)},children:"Close"})})})]})})]})};var B=l(79204);const V=[{label:"Origin",value:"ORIGIN"},{label:"Destination",value:"DESTINATION"},{label:"Engagement Activity",value:"ENGAGEMENT_ACTIVITY"},{label:"Number of Passengers",value:"NUMBER_OF_PASSENGERS"},{label:"Duration of Stay",value:"DURATION_OF_STAY"}],k=Object.fromEntries(V.map(e=>[e.value,e.label])),P=(e,a)=>"AIRLINE"===a&&"ORIGIN"===e?"Origin IATA":"AIRLINE"===a&&"DESTINATION"===e?"Destination IATA":k[e],H=["ORIGIN","DESTINATION"],$=["NUMBER_OF_PASSENGERS","DURATION_OF_STAY"],F=[{label:"Visited",value:"VISITED"},{label:"Abandoned Carts",value:"ABANDONED_CARTS"},{label:"Searched",value:"SEARCHED"},{label:"Booked",value:"BOOKED"}],Y=[{label:"Greater than or equal",value:"GTE"},{label:"Less than or equal",value:"LTE"},{label:"Equals",value:"EQ"}],K=(e,a=0)=>e.map(e=>{const l=e.children?K(e.children,a+1):void 0;if(1!==a)return{...e,...l?{children:l}:{}};const t=(e=>{const a=e.replace(/[^A-Z]/gi,"").toUpperCase().split("").reduce((e,a)=>e+a.charCodeAt(0),0);return Array.from({length:3},(e,l)=>String.fromCharCode(65+(a+11*l)%26)).join("")})(e.value);return{...e,children:[...l??[],{title:`${e.title} (IATA: ${t})`,value:`${e.value}_IATA_${t}`}]}}),z=K([{title:"Africa",value:"AFRICA",children:[{title:"Algeria",value:"ALGERIA"},{title:"Angola",value:"ANGOLA"},{title:"Benin",value:"BENIN"},{title:"Botswana",value:"BOTSWANA"},{title:"Burkina Faso",value:"BURKINA_FASO"},{title:"Burundi",value:"BURUNDI"},{title:"Cabo Verde",value:"CABO_VERDE"},{title:"Cameroon",value:"CAMEROON"},{title:"Central African Republic",value:"CENTRAL_AFRICAN_REPUBLIC"},{title:"Chad",value:"CHAD"},{title:"Comoros",value:"COMOROS"},{title:"Congo",value:"CONGO"},{title:"DR Congo",value:"DR_CONGO"},{title:"Djibouti",value:"DJIBOUTI"},{title:"Egypt",value:"EGYPT",children:[{title:"Cairo",value:"CAIRO"},{title:"Alexandria",value:"ALEXANDRIA"}]},{title:"Equatorial Guinea",value:"EQUATORIAL_GUINEA"},{title:"Eritrea",value:"ERITREA"},{title:"Eswatini",value:"ESWATINI"},{title:"Ethiopia",value:"ETHIOPIA"},{title:"Gabon",value:"GABON"},{title:"Gambia",value:"GAMBIA"},{title:"Ghana",value:"GHANA"},{title:"Guinea",value:"GUINEA"},{title:"Guinea-Bissau",value:"GUINEA_BISSAU"},{title:"Ivory Coast",value:"IVORY_COAST"},{title:"Kenya",value:"KENYA"},{title:"Lesotho",value:"LESOTHO"},{title:"Liberia",value:"LIBERIA"},{title:"Libya",value:"LIBYA"},{title:"Madagascar",value:"MADAGASCAR"},{title:"Malawi",value:"MALAWI"},{title:"Mali",value:"MALI"},{title:"Mauritania",value:"MAURITANIA"},{title:"Mauritius",value:"MAURITIUS"},{title:"Morocco",value:"MOROCCO"},{title:"Mozambique",value:"MOZAMBIQUE"},{title:"Namibia",value:"NAMIBIA"},{title:"Niger",value:"NIGER"},{title:"Nigeria",value:"NIGERIA"},{title:"Rwanda",value:"RWANDA"},{title:"Sao Tome and Principe",value:"SAO_TOME_AND_PRINCIPE"},{title:"Senegal",value:"SENEGAL"},{title:"Seychelles",value:"SEYCHELLES"},{title:"Sierra Leone",value:"SIERRA_LEONE"},{title:"Somalia",value:"SOMALIA"},{title:"South Africa",value:"SOUTH_AFRICA"},{title:"South Sudan",value:"SOUTH_SUDAN"},{title:"Sudan",value:"SUDAN"},{title:"Tanzania",value:"TANZANIA"},{title:"Togo",value:"TOGO"},{title:"Tunisia",value:"TUNISIA"},{title:"Uganda",value:"UGANDA"},{title:"Zambia",value:"ZAMBIA"},{title:"Zimbabwe",value:"ZIMBABWE"}]},{title:"Asia",value:"ASIA",children:[{title:"Afghanistan",value:"AFGHANISTAN"},{title:"Armenia",value:"ARMENIA"},{title:"Azerbaijan",value:"AZERBAIJAN"},{title:"Bahrain",value:"BAHRAIN"},{title:"Bangladesh",value:"BANGLADESH"},{title:"Bhutan",value:"BHUTAN"},{title:"Brunei",value:"BRUNEI"},{title:"Cambodia",value:"CAMBODIA"},{title:"China",value:"CHINA",children:[{title:"Beijing",value:"BEIJING"},{title:"Shanghai",value:"SHANGHAI"}]},{title:"Cyprus",value:"CYPRUS"},{title:"Georgia",value:"GEORGIA"},{title:"India",value:"INDIA",children:[{title:"New Delhi",value:"NEW_DELHI"},{title:"Mumbai",value:"MUMBAI"}]},{title:"Indonesia",value:"INDONESIA",children:[{title:"Jakarta",value:"JAKARTA"},{title:"Bali",value:"BALI"}]},{title:"Iran",value:"IRAN"},{title:"Iraq",value:"IRAQ"},{title:"Israel",value:"ISRAEL"},{title:"Japan",value:"JAPAN",children:[{title:"Tokyo",value:"TOKYO"},{title:"Osaka",value:"OSAKA"}]},{title:"Jordan",value:"JORDAN"},{title:"Kazakhstan",value:"KAZAKHSTAN"},{title:"Kuwait",value:"KUWAIT"},{title:"Kyrgyzstan",value:"KYRGYZSTAN"},{title:"Laos",value:"LAOS"},{title:"Lebanon",value:"LEBANON"},{title:"Malaysia",value:"MALAYSIA"},{title:"Maldives",value:"MALDIVES"},{title:"Mongolia",value:"MONGOLIA"},{title:"Myanmar",value:"MYANMAR"},{title:"Nepal",value:"NEPAL"},{title:"North Korea",value:"NORTH_KOREA"},{title:"Oman",value:"OMAN"},{title:"Pakistan",value:"PAKISTAN"},{title:"Palestine",value:"PALESTINE"},{title:"Philippines",value:"PHILIPPINES"},{title:"Qatar",value:"QATAR"},{title:"Saudi Arabia",value:"SAUDI_ARABIA"},{title:"Singapore",value:"SINGAPORE"},{title:"South Korea",value:"SOUTH_KOREA"},{title:"Sri Lanka",value:"SRI_LANKA"},{title:"Syria",value:"SYRIA"},{title:"Taiwan",value:"TAIWAN"},{title:"Tajikistan",value:"TAJIKISTAN"},{title:"Thailand",value:"THAILAND",children:[{title:"Phuket",value:"PHUKET"}]},{title:"Timor-Leste",value:"TIMOR_LESTE"},{title:"Turkey",value:"TURKEY"},{title:"Turkmenistan",value:"TURKMENISTAN"},{title:"United Arab Emirates",value:"UNITED_ARAB_EMIRATES"},{title:"Uzbekistan",value:"UZBEKISTAN"},{title:"Vietnam",value:"VIETNAM"},{title:"Yemen",value:"YEMEN"}]},{title:"Europe",value:"EUROPE",children:[{title:"Albania",value:"ALBANIA"},{title:"Andorra",value:"ANDORRA"},{title:"Austria",value:"AUSTRIA"},{title:"Belarus",value:"BELARUS"},{title:"Belgium",value:"BELGIUM"},{title:"Bosnia and Herzegovina",value:"BOSNIA_AND_HERZEGOVINA"},{title:"Bulgaria",value:"BULGARIA"},{title:"Croatia",value:"CROATIA"},{title:"Czech Republic",value:"CZECH_REPUBLIC"},{title:"Denmark",value:"DENMARK"},{title:"Estonia",value:"ESTONIA"},{title:"Finland",value:"FINLAND"},{title:"France",value:"FRANCE",children:[{title:"Paris",value:"PARIS"},{title:"Nice",value:"NICE"}]},{title:"Germany",value:"GERMANY",children:[{title:"Berlin",value:"BERLIN"},{title:"Munich",value:"MUNICH"},{title:"Frankfurt",value:"FRANKFURT"}]},{title:"Greece",value:"GREECE"},{title:"Hungary",value:"HUNGARY"},{title:"Iceland",value:"ICELAND"},{title:"Ireland",value:"IRELAND"},{title:"Italy",value:"ITALY"},{title:"Kosovo",value:"KOSOVO"},{title:"Latvia",value:"LATVIA"},{title:"Liechtenstein",value:"LIECHTENSTEIN"},{title:"Lithuania",value:"LITHUANIA"},{title:"Luxembourg",value:"LUXEMBOURG"},{title:"Malta",value:"MALTA"},{title:"Moldova",value:"MOLDOVA"},{title:"Monaco",value:"MONACO"},{title:"Montenegro",value:"MONTENEGRO"},{title:"Netherlands",value:"NETHERLANDS"},{title:"North Macedonia",value:"NORTH_MACEDONIA"},{title:"Norway",value:"NORWAY"},{title:"Poland",value:"POLAND"},{title:"Portugal",value:"PORTUGAL"},{title:"Romania",value:"ROMANIA"},{title:"Russia",value:"RUSSIA"},{title:"San Marino",value:"SAN_MARINO"},{title:"Serbia",value:"SERBIA"},{title:"Slovakia",value:"SLOVAKIA"},{title:"Slovenia",value:"SLOVENIA"},{title:"Spain",value:"SPAIN",children:[{title:"Madrid",value:"MADRID"},{title:"Barcelona",value:"BARCELONA"}]},{title:"Sweden",value:"SWEDEN"},{title:"Switzerland",value:"SWITZERLAND"},{title:"Ukraine",value:"UKRAINE"},{title:"United Kingdom",value:"UNITED_KINGDOM",children:[{title:"London",value:"LONDON"},{title:"Manchester",value:"MANCHESTER"}]},{title:"Vatican City",value:"VATICAN_CITY"}]},{title:"North America",value:"NORTH_AMERICA",children:[{title:"Antigua and Barbuda",value:"ANTIGUA_AND_BARBUDA"},{title:"Bahamas",value:"BAHAMAS"},{title:"Barbados",value:"BARBADOS"},{title:"Belize",value:"BELIZE"},{title:"Canada",value:"CANADA",children:[{title:"Toronto",value:"TORONTO"},{title:"Vancouver",value:"VANCOUVER"}]},{title:"Costa Rica",value:"COSTA_RICA"},{title:"Cuba",value:"CUBA"},{title:"Dominica",value:"DOMINICA"},{title:"Dominican Republic",value:"DOMINICAN_REPUBLIC"},{title:"El Salvador",value:"EL_SALVADOR"},{title:"Grenada",value:"GRENADA"},{title:"Guatemala",value:"GUATEMALA"},{title:"Haiti",value:"HAITI"},{title:"Honduras",value:"HONDURAS"},{title:"Jamaica",value:"JAMAICA"},{title:"Mexico",value:"MEXICO",children:[{title:"Mexico City",value:"MEXICO_CITY"},{title:"Cancun",value:"CANCUN"}]},{title:"Nicaragua",value:"NICARAGUA"},{title:"Panama",value:"PANAMA"},{title:"Saint Kitts and Nevis",value:"SAINT_KITTS_AND_NEVIS"},{title:"Saint Lucia",value:"SAINT_LUCIA"},{title:"Saint Vincent and the Grenadines",value:"SAINT_VINCENT_AND_THE_GRENADINES"},{title:"Trinidad and Tobago",value:"TRINIDAD_AND_TOBAGO"},{title:"United States",value:"UNITED_STATES",children:[{title:"New York",value:"NEW_YORK"},{title:"Los Angeles",value:"LOS_ANGELES"},{title:"Miami",value:"MIAMI"}]}]},{title:"South America",value:"SOUTH_AMERICA",children:[{title:"Argentina",value:"ARGENTINA"},{title:"Bolivia",value:"BOLIVIA"},{title:"Brazil",value:"BRAZIL",children:[{title:"Rio de Janeiro",value:"RIO_DE_JANEIRO"},{title:"Sao Paulo",value:"SAO_PAULO"}]},{title:"Chile",value:"CHILE"},{title:"Colombia",value:"COLOMBIA"},{title:"Ecuador",value:"ECUADOR"},{title:"Guyana",value:"GUYANA"},{title:"Paraguay",value:"PARAGUAY"},{title:"Peru",value:"PERU"},{title:"Suriname",value:"SURINAME"},{title:"Uruguay",value:"URUGUAY"},{title:"Venezuela",value:"VENEZUELA"}]},{title:"Oceania",value:"OCEANIA",children:[{title:"Australia",value:"AUSTRALIA",children:[{title:"Sydney",value:"SYDNEY"},{title:"Melbourne",value:"MELBOURNE"}]},{title:"Fiji",value:"FIJI"},{title:"Kiribati",value:"KIRIBATI"},{title:"Marshall Islands",value:"MARSHALL_ISLANDS"},{title:"Micronesia",value:"MICRONESIA"},{title:"Nauru",value:"NAURU"},{title:"New Zealand",value:"NEW_ZEALAND"},{title:"Palau",value:"PALAU"},{title:"Papua New Guinea",value:"PAPUA_NEW_GUINEA"},{title:"Samoa",value:"SAMOA"},{title:"Solomon Islands",value:"SOLOMON_ISLANDS"},{title:"Tonga",value:"TONGA"},{title:"Tuvalu",value:"TUVALU"},{title:"Vanuatu",value:"VANUATU"}]}]),J=e=>({id:e,type:"ORIGIN",values:[]}),W=Object.fromEntries(F.map(e=>[e.value,e.label])),Z=Object.fromEntries(Y.map(e=>[e.value,e.label])),q=e=>{const a=l=>{for(const t of l){if(t.value===e)return t.title;const l=t.children&&a(t.children);if(l)return l}};return a(z)??e},Q=e=>{let a=0;for(let l=0;l<e.length;l++)a=31*a+e.charCodeAt(l)|0;return Math.abs(a)%4990+10},X=e=>{const a=new Set(e),l=e=>{const t=[];return e.forEach(e=>{const i=a.has(e.value),n=e.children?l(e.children):[];(i||n.length>0)&&t.push({value:e.value,title:e.title,children:n})}),t};return l(z)},ee=(e,a)=>{const l=P(e.type,a);if(H.includes(e.type)){if(0===e.values.length)return;return{typeLabel:l,chips:e.values.map(q)}}if("ENGAGEMENT_ACTIVITY"===e.type){if(0===e.values.length)return;return{typeLabel:l,chips:e.values.map(e=>W[e]??e)}}if($.includes(e.type)){if(!e.operator||null==e.numberValue)return;return{typeLabel:l,text:`${Z[e.operator]??e.operator} ${e.numberValue}`}}},ae=e=>[e.value,...e.children.flatMap(ae)],le=function(){const{ruleId:e}=(0,n.g)(),a=(0,n.Zp)(),l=(0,r.hN)(),[u,d]=(0,i.useState)(!1),s=(0,j.x)().find(a=>a.id===e)??(0,L.tR)(e),[h]=r.lV.useForm(),G=r.lV.useWatch("travelIntentCategory",h)??s?.travelIntentCategory??"HOTEL",[w,k]=(0,i.useState)(()=>s?.criteriaRows??[J("criteria-1")]),[K,W]=(0,i.useState)(new Set),[Z,q]=(0,i.useState)(new Set),le=(e,a)=>{k(l=>l.map(l=>l.id===e?{...l,...a}:l))},te=e=>{const a=new Set(w.filter(a=>a.id!==e).map(e=>e.type));return V.filter(e=>!a.has(e.value)).map(e=>({...e,label:P(e.value,G)}))},ie=w.length>=V.length,ne=(e,a,l,i,n=!1)=>{const u=`${a}::${e.value}`,d=(n?Z:K).has(u),s=e.children.length>0,o=0===i?(e=>{const a=(l,t)=>{for(const i of l){const l=[...t,i.title];if(i.value===e)return l;const n=i.children&&a(i.children,l);if(n)return n}};return a(z,[])??[e]})(e.value).join(" > "):e.title;return(0,t.jsxs)("div",{children:[(0,t.jsxs)(g,{depth:i,summary:n,id:`${l}-row-${e.value}`,children:[(0,t.jsxs)(x,{children:[(0,t.jsx)(R,{expanded:d,invisible:!s,id:`${l}-expand-${e.value}-btn`,onClick:()=>s&&((e,a)=>{(a?q:W)(a=>{const l=new Set(a);return l.has(e)?l.delete(e):l.add(e),l})})(u,n),children:(0,t.jsx)(r.In,{name:"chevronRight",width:12,height:12})}),(0,t.jsx)("span",{children:o}),(0,t.jsxs)(y,{children:["(",Q(e.value),")"]})]}),!n&&(0,t.jsx)(r.K0,{id:`${l}-remove-${e.value}-btn`,iconName:"xmark",onClick:()=>{const l=new Set(ae(e)),t=w.find(e=>e.id===a);t&&le(a,{values:t.values.filter(e=>!l.has(e))})}})]}),s&&d&&e.children.map(e=>ne(e,a,l,i+1,n))]},e.value)},re=(e,a)=>{if(H.includes(e.type)){const l=X(e.values);return l.reduce((e,a)=>e+Q(a.value),0),(0,t.jsxs)("div",{children:[(0,t.jsx)(B.A,{id:`audience_builder_details-criteria_value-${a}-sel`,treeData:z,treeCheckable:!0,showCheckedStrategy:B.A.SHOW_ALL,placeholder:"Select country, continent or city",style:{width:"100%"},value:e.values,onChange:a=>le(e.id,{values:a}),allowClear:!0,maxTagCount:0,maxTagPlaceholder:()=>`${e.values.length} items selected`}),l.length>0&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(T,{children:l.map(l=>ne(l,e.id,`audience_builder_details-criteria_value-${a}`,0))})})]})}return"ENGAGEMENT_ACTIVITY"===e.type?(0,t.jsx)(r.l6,{id:`audience_builder_details-criteria_value-${a}-sel`,placeholder:"Select",mode:"multiple",showSearch:!0,withBadges:!0,value:e.values,onChange:a=>le(e.id,{values:a}),options:F,allowClear:!0}):$.includes(e.type)?(0,t.jsxs)(p,{children:[(0,t.jsx)(r.l6,{id:`audience_builder_details-criteria_operator-${a}-sel`,placeholder:"Operator",value:e.operator,onChange:a=>le(e.id,{operator:a}),options:Y}),(0,t.jsx)(r.YI,{id:`audience_builder_details-criteria_number-${a}-inp`,placeholder:"Value",value:e.numberValue,onChange:a=>le(e.id,{numberValue:null==a?void 0:Number(a)})})]}):null},ue=w.map((e,a)=>({row:e,index:a,summary:ee(e,G)})).filter(e=>Boolean(e.summary)),de=(0,M.V)(),se=(de.length>0?de:U.FF).filter(a=>a.audienceRuleIds.includes(e??""));return(0,t.jsxs)(o,{children:[(0,t.jsx)("div",{id:"audience_builder_details-breadcrumb-nav",children:(0,t.jsx)(r.Qp,{items:[{title:"Home",href:"/"},{title:"Audience Rules",href:"/audience-builder"},{title:"Audience Rule Settings"}]})}),(0,t.jsxs)(r.lV,{form:h,initialValues:{name:s?.ruleName,travelIntentCategory:s?.travelIntentCategory??"HOTEL"},onFinish:t=>{if(0===ue.length)return void l.error("Add at least one complete query rule before saving.");const i=(0,j.x)(),n={id:e&&"new"!==e?e:`rule-${Date.now()}`,ruleName:t.name?.trim()||"New Audience Rule",travelIntentCategory:t.travelIntentCategory??"HOTEL",usedInAudiences:0,criteriaRows:w},r=i.some(e=>e.id===n.id)?i.map(e=>e.id===n.id?n:e):[n,...i];(0,j.l)(r),l.success("Audience rule saved successfully."),a("/audience-builder")},children:[(0,t.jsxs)(r.xA.fI,{align:"top",children:[(0,t.jsxs)(r.xA.fv,{span:9,children:[(0,t.jsxs)(r.mc.wn,{children:[(0,t.jsx)(r.EY.H5,{children:"General Settings"}),(0,t.jsxs)(r.xA.fI,{children:[(0,t.jsx)(r.lV.Item,{name:"name",colSpan:6,rules:[{required:!0,message:"Please enter a Name"}],children:(0,t.jsx)(r.pd,{label:"Name",id:"audience_builder_details-name-inp",required:!0})}),(0,t.jsx)(r.lV.Item,{name:"travelIntentCategory",colSpan:6,rules:[{required:!0,message:"Please select a Travel Intent Segment"}],children:(0,t.jsx)(r.l6,{label:"Travel Intent Segment",id:"audience_builder_details-travel_intent_segment-sel",required:!0,options:L.e8})})]})]}),(0,t.jsxs)(r.mc.wn,{children:[(0,t.jsxs)(S,{children:[(0,t.jsx)(r.EY.H5,{children:"Query Rules"}),(0,t.jsx)(r.$n,{id:"audience_builder_details-add_criteria-btn",variant:"outlined",onClick:()=>{k(e=>{const a=new Set(e.map(e=>e.type)),l=V.find(e=>!a.has(e.value))?.value;return l?[{...J(`criteria-${Date.now()}`),type:l},...e]:e})},disabled:ie,children:"Add Rule"})]}),w.map((e,a)=>(0,t.jsx)("div",{children:(0,t.jsxs)(I,{children:[(0,t.jsx)(N,{children:(0,t.jsx)(r.l6,{id:`audience_builder_details-criteria_type-${a}-sel`,value:e.type,onChange:a=>((e,a)=>{le(e,{type:a,values:[],operator:void 0,numberValue:void 0})})(e.id,a),options:te(e.id)})}),(0,t.jsx)(m,{children:re(e,a)}),(0,t.jsx)(E,{children:(0,t.jsx)(r.rI,{menuType:"kebab",items:[{key:"remove-rule",label:"Remove Rule",disabled:1===w.length,onClick:()=>{return a=e.id,void k(e=>e.length>1?e.filter(e=>e.id!==a):e);var a}}]})})]})},e.id))]})]}),(0,t.jsx)(r.xA.fv,{span:3,children:(0,t.jsxs)(b,{children:[(0,t.jsx)(r.EY.H5,{children:"Rule Summary"}),ue.length>0?(0,t.jsx)(O,{children:ue.map(({row:e,index:a,summary:l},i)=>(0,t.jsxs)(C,{id:`audience_builder_details-rule_summary-${a}-txt`,children:[(0,t.jsx)(r.EY.JU,{children:l.typeLabel}),H.includes(e.type)?(0,t.jsx)(T,{children:X(e.values).map(l=>ne(l,e.id,`audience_builder_details-rule_summary-${a}`,0,!0))}):l.chips?(0,t.jsxs)(_,{children:[l.chips.slice(0,10).map((e,a)=>(0,t.jsx)(r.vw,{children:e},a)),l.chips.length>10&&(0,t.jsx)(r.vw,{children:`+${l.chips.length-10} more`})]}):(0,t.jsx)("span",{children:l.text}),i<ue.length-1&&(0,t.jsx)(f,{children:"AND"})]},e.id))}):(0,t.jsx)(D,{id:"audience_builder_details-rule_summary_empty-txt",children:"No rules defined."})]})})]}),(0,t.jsx)(r.NG,{left:"60px",children:(0,t.jsx)(A,{children:(0,t.jsxs)(c,{children:[e&&"new"!==e&&(0,t.jsx)(r.$n,{id:"audience_builder_details-delete-btn",color:"danger",variant:"outlined",onClick:()=>d(!0),children:"Delete Audience Rule"}),(0,t.jsxs)(v,{children:[(0,t.jsx)(r.$n,{id:"audience_builder_details-cancel-btn",variant:"outlined",onClick:()=>a("/audience-builder"),children:"Cancel"}),(0,t.jsx)(r.$n,{id:"audience_builder_details-save-btn",htmlType:"submit",children:"Save"})]})]})})})]}),(0,t.jsxs)(r.aF,{idPrefix:"audience-builder-delete-modal",title:(0,t.jsxs)("span",{style:{display:"flex",alignItems:"center",gap:8},children:[(0,t.jsx)(r.In,{name:"exclamationTriangle",color:r.Tj.pumpkin_60,width:24,height:24}),(0,t.jsx)("span",{children:"Delete Audience Rule"})]}),open:u,maskStyle:{backgroundColor:r.Tj.sky_90},okText:se.length>0?"Close":"Delete",footer:se.length>0?(0,t.jsx)(r.$n,{onClick:()=>d(!1),children:"Close"}):void 0,onOk:()=>{if(se.length>0)return;const t=(0,j.x)();(0,j.l)(t.filter(a=>a.id!==e)),d(!1),l.success("Audience rule deleted successfully."),a("/audience-builder")},onCancel:()=>d(!1),children:[se.length>0?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(r.EY.nB,{children:["This audience rule ",(0,t.jsx)("strong",{children:s?.ruleName??"Audience Rule"})," is being used in the following Audiences and cannot be deleted:"]}),(0,t.jsx)(r.XI,{id:"audience-builder-dependent-audiences-tbl",rowKey:"id",pagination:!1,dataSource:se,columns:[{title:"Audience",dataIndex:"audienceName",key:"audienceName"},{title:"Advertiser",dataIndex:"advertiser",key:"advertiser"}]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(r.EY.nB,{children:["Are you sure you want to delete the ",(0,t.jsx)("strong",{children:s?.ruleName??"Audience Rule"}),"? This action cannot be undone."]}),(0,t.jsx)(r.EY.nB,{children:"This rule is not currently used in any Audience."})]}),0===se.length&&(0,t.jsx)(r.EY.nB,{children:"Would you like to proceed with the Delete?"})]})]})}},48572:(e,a,l)=>{l.d(a,{N:()=>A,V:()=>o});var t=l(10216);let i=[],n=!1;const r="mediahub.audiences",u="mediahub.audiences.seeded-ids",d=e=>({...e,platformAdvertisers:e.platformAdvertisers.map(e=>({...e})),audienceRuleIds:[...e.audienceRuleIds]});function s(){if("undefined"!=typeof sessionStorage){if(0===i.length)try{i=JSON.parse(sessionStorage.getItem(r)??"[]")}catch{sessionStorage.removeItem(r)}!function(){if(n)return;n=!0;let e=[];try{e=JSON.parse(sessionStorage.getItem(u)??"[]")}catch{e=[]}const a=new Set([...e,...i.map(e=>e.id)]),l=t.FF.filter(e=>!a.has(e.id));l.length>0&&(i=[...i,...l.map(d)],sessionStorage.setItem(r,JSON.stringify(i))),sessionStorage.setItem(u,JSON.stringify([...new Set([...e,...t.FF.map(e=>e.id)])]))}()}}function o(){return s(),i.map(e=>({...e,platformAdvertisers:e.platformAdvertisers.map(e=>({...e})),audienceRuleIds:[...e.audienceRuleIds]}))}function A(e){"undefined"==typeof sessionStorage||n||s(),i=e.map(e=>({...e,platformAdvertisers:e.platformAdvertisers.map(e=>({...e})),audienceRuleIds:[...e.audienceRuleIds]})),"undefined"!=typeof sessionStorage&&sessionStorage.setItem(r,JSON.stringify(i))}},57239:(e,a,l)=>{l.d(a,{$o:()=>n,e8:()=>t,g$:()=>i,tR:()=>r});const t=[{label:"Airline",value:"AIRLINE"},{label:"Hotel",value:"HOTEL"},{label:"Destination",value:"DESTINATION"},{label:"Cruise",value:"CRUISE"},{label:"Train",value:"TRAIN"},{label:"Car Rental",value:"CAR_RENTAL"},{label:"Bus",value:"BUS"},{label:"Package",value:"PACKAGE"},{label:"All",value:"ALL"},{label:"Others",value:"OTHERS"}],i=Object.fromEntries(t.map(e=>[e.value,e.label])),n=[{id:"rule-001",ruleName:"High-Value Corporate Bookers",travelIntentCategory:"AIRLINE",usedInAudiences:4},{id:"rule-002",ruleName:"Weekend Getaway Seekers",travelIntentCategory:"DESTINATION",usedInAudiences:2},{id:"rule-003",ruleName:"Family Suite Browsers",travelIntentCategory:"HOTEL",usedInAudiences:3},{id:"rule-004",ruleName:"5-Star Repeat Guests",travelIntentCategory:"PACKAGE",usedInAudiences:1},{id:"rule-005",ruleName:"Flash Sale Responders",travelIntentCategory:"ALL",usedInAudiences:5},{id:"rule-006",ruleName:"Conference & Meeting Planners",travelIntentCategory:"TRAIN",usedInAudiences:2},{id:"rule-007",ruleName:"Frequent Business Extenders",travelIntentCategory:"CAR_RENTAL",usedInAudiences:0},{id:"rule-008",ruleName:"Beach Resort Explorers",travelIntentCategory:"CRUISE",usedInAudiences:6},{id:"rule-009",ruleName:"London Weekend Breakers",travelIntentCategory:"DESTINATION",usedInAudiences:2,criteriaRows:[{id:"rule-009-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED"]},{id:"rule-009-c2",type:"DESTINATION",values:["LONDON"]},{id:"rule-009-c3",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:3}]},{id:"rule-010",ruleName:"Business Travellers - Central London",travelIntentCategory:"HOTEL",usedInAudiences:1,criteriaRows:[{id:"rule-010-c1",type:"DESTINATION",values:["LONDON"]},{id:"rule-010-c2",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","VISITED"]},{id:"rule-010-c3",type:"NUMBER_OF_PASSENGERS",values:[],operator:"EQ",numberValue:1}]},{id:"rule-011",ruleName:"US & Gulf Luxury Long-Haul Visitors",travelIntentCategory:"ALL",usedInAudiences:1,criteriaRows:[{id:"rule-011-c1",type:"ORIGIN",values:["UNITED_STATES","UNITED_ARAB_EMIRATES","SAUDI_ARABIA","QATAR"]},{id:"rule-011-c2",type:"DESTINATION",values:["LONDON"]},{id:"rule-011-c3",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:4}]},{id:"rule-012",ruleName:"Abandoned Booking Re-engagers",travelIntentCategory:"HOTEL",usedInAudiences:1,criteriaRows:[{id:"rule-012-c1",type:"ENGAGEMENT_ACTIVITY",values:["ABANDONED_CARTS"]}]},{id:"rule-013",ruleName:"Afternoon Tea & Theatre Package Seekers",travelIntentCategory:"PACKAGE",usedInAudiences:1,criteriaRows:[{id:"rule-013-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED"]},{id:"rule-013-c2",type:"DESTINATION",values:["LONDON"]},{id:"rule-013-c3",type:"NUMBER_OF_PASSENGERS",values:[],operator:"GTE",numberValue:2}]},{id:"rule-014",ruleName:"Resort & Spa Leisure Seekers",travelIntentCategory:"HOTEL",usedInAudiences:10,criteriaRows:[{id:"rule-014-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","VISITED"]},{id:"rule-014-c2",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:3},{id:"rule-014-c3",type:"NUMBER_OF_PASSENGERS",values:[],operator:"GTE",numberValue:2}]},{id:"rule-015",ruleName:"Long-Haul Trans-Pacific Visitors",travelIntentCategory:"ALL",usedInAudiences:10,criteriaRows:[{id:"rule-015-c1",type:"ORIGIN",values:["AUSTRALIA","JAPAN","SOUTH_KOREA","SINGAPORE"]},{id:"rule-015-c2",type:"ORIGIN",values:["CANADA","UNITED_STATES"]},{id:"rule-015-c3",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:5}]},{id:"rule-016",ruleName:"City Break Weekenders",travelIntentCategory:"DESTINATION",usedInAudiences:10,criteriaRows:[{id:"rule-016-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED"]},{id:"rule-016-c2",type:"DESTINATION",values:["NEW_YORK","BARCELONA","SYDNEY","MELBOURNE"]},{id:"rule-016-c3",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:3}]},{id:"rule-017",ruleName:"Business & Conference Travellers",travelIntentCategory:"HOTEL",usedInAudiences:6,criteriaRows:[{id:"rule-017-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","BOOKED"]},{id:"rule-017-c2",type:"NUMBER_OF_PASSENGERS",values:[],operator:"EQ",numberValue:1},{id:"rule-017-c3",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:4}]},{id:"rule-018",ruleName:"Family Holiday Planners",travelIntentCategory:"PACKAGE",usedInAudiences:3,criteriaRows:[{id:"rule-018-c1",type:"ENGAGEMENT_ACTIVITY",values:["SEARCHED","ABANDONED_CARTS"]},{id:"rule-018-c2",type:"NUMBER_OF_PASSENGERS",values:[],operator:"GTE",numberValue:3},{id:"rule-018-c3",type:"DURATION_OF_STAY",values:[],operator:"GTE",numberValue:5}]},{id:"rule-019",ruleName:"Last-Minute Deal Seekers",travelIntentCategory:"ALL",usedInAudiences:3,criteriaRows:[{id:"rule-019-c1",type:"ENGAGEMENT_ACTIVITY",values:["VISITED","ABANDONED_CARTS"]},{id:"rule-019-c2",type:"DURATION_OF_STAY",values:[],operator:"LTE",numberValue:2}]}];function r(e){if(e)return n.find(a=>a.id===e)}}}]);