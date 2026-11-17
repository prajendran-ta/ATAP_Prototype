/*! For license information please see oba.da5e266743f6da067bc4.js.LICENSE.txt */
"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[5389],{82770:(e,a,n)=>{n.r(a),n.d(a,{default:()=>pa});var t=n(74848),r=n(27962),s=n(7160),l=n(42548),i=n(27404),d=n(28797),o=n(75352),u=n(23968),c=n(99086),p=n(73401),m=n(91188),g=n(84824),h=n(43298);function v(e,a){switch(e.kind){case h.b.NULL:return null;case h.b.INT:return parseInt(e.value,10);case h.b.FLOAT:return parseFloat(e.value);case h.b.STRING:case h.b.ENUM:case h.b.BOOLEAN:return e.value;case h.b.LIST:return e.values.map(e=>v(e,a));case h.b.OBJECT:return function(e,a,n){const t=Object.create(null);for(const r of e)t[a(r)]=n(r);return t}(e.fields,e=>e.name.value,e=>v(e.value,a));case h.b.VARIABLE:return null==a?void 0:a[e.name.value]}}var x=n(72823);const b=e=>!!e&&"object"==typeof e&&!Array.isArray(e),f=(e,a)=>{if(void 0===e)return a;if(b(e)&&b(a)){const n={...e};return Object.keys(a).forEach(t=>{n[t]=f(e[t],a[t])}),n}return Array.isArray(e)&&Array.isArray(a)?a.map((a,n)=>f(e[n],a)):a},j=(e,a)=>{const n={};return e.arguments?.forEach(e=>{n[e.name.value]=v(e.value,a.variables)}),n},P=(e,a,n,t)=>{a.selections.forEach(a=>{if(a.kind===h.b.FIELD){const r=a.alias?.value??a.name.value;let s=e[a.name.value];"function"==typeof s&&(s=s(j(a,n)));const l=a.selectionSet?A(s,a.selectionSet,n):s??null;t[r]=f(t[r],l)}else if(a.kind===h.b.FRAGMENT_SPREAD){const r=n.fragments[a.name.value];r&&P(e,r.selectionSet,n,t)}else a.kind===h.b.INLINE_FRAGMENT&&P(e,a.selectionSet,n,t)})},A=(e,a,n)=>{if(null==e)return null;if(Array.isArray(e))return e.map(e=>A(e,a,n));if(!a||"object"!=typeof e)return e;const t={};return P(e,a,n,t),t},C={advertiserPlan:({id:e})=>{const a=(0,x.U7)(e);return a?{value:(0,x.Wi)(a)}:void 0},groupPlan:({id:e})=>{const a=(0,x.$B)(e);return a?{value:(0,x.m6)(a.plan,a.group)}:void 0},groupNames:({filter:e})=>{if(!(0,x.tu)(e?.advertiserPlanId))return;const a="string"==typeof e?.name?e.name.trim().toLowerCase():"";return{value:(0,x.iM)(e.advertiserPlanId).filter(e=>!a||e.name.toLowerCase().includes(a))}},campaignNames:({filter:e})=>{const a=(0,x.Nv)(e?.advertiserId)||(0,x.tu)(e?.advertiserPlanId),n=null!=e?.groupId&&!!(0,x.$B)(e.groupId);return a||n?{value:(0,x.Jj)(e)}:void 0},updateAdvertiserPlan:({input:e})=>{const a=(0,x.tu)(e?.id)?(0,x.Lx)(e):void 0;return a?{value:(0,x.Wi)(a)}:void 0},deleteAdvertiserPlan:({input:e})=>(0,x.tu)(e?.id)?{value:null}:void 0,pauseAdvertiserPlan:({id:e})=>{const a=(0,x.tu)(e)?(0,x.ub)(e,!0):void 0;return a?{value:(0,x.Wi)(a)}:void 0},unpauseAdvertiserPlan:({id:e})=>{const a=(0,x.tu)(e)?(0,x.ub)(e,!1):void 0;return a?{value:(0,x.Wi)(a)}:void 0},pauseCampaign:({campaignId:e,groupId:a})=>{const n=(0,x.$B)(a)?(0,x.do)(e,a,!0):void 0;return n?{value:n}:void 0},unpauseCampaign:({campaignId:e,groupId:a})=>{const n=(0,x.$B)(a)?(0,x.do)(e,a,!1):void 0;return n?{value:n}:void 0},updateGroupPlan:({input:e})=>{const a=(0,x.$B)(e?.id)?(0,x.BP)(e):void 0;return a?{value:(0,x.m6)(a.plan,a.group)}:void 0}},I=(e,...a)=>{const n="string"==typeof e?e.trim().toLowerCase():"";return!n||a.some(e=>e?.toLowerCase().includes(n))},B={advertiserPlans:({filter:e})=>{const a=e??{};if(a.paging?.offset)return[];const n=(a.ids??[]).map(String),t=(a.advertiserIds??[]).map(String),r=a.status??[];return(0,x.T9)().filter(e=>(!a.myAdvertisers||(0,c.WX)(e.advertiser.bpid))&&(!n.length||n.includes(e.id))&&(!t.length||t.includes(e.advertiser.id))&&(!r.length||r.includes(e.status))&&I(a.name,e.name)).map(x.nl)},advertiserPlanNames:({filter:e})=>{const a=e??{},n=(a.ids??[]).map(String);return(0,x.WZ)().filter(e=>(!n.length||n.includes(e.id))&&I(a.name,e.name))},advertiserNames:({filter:e})=>{const a=e??{},n=(a.ids??[]).map(String);return!1===a.fromExistingAdvertiserPlans?[]:(0,x.g9)().filter(e=>(!n.length||n.includes(e.id))&&I(a.name,e.name,e.bpid))},currencies:()=>x.dZ,campaignNames:({filter:e})=>{const a=e??{};return null!=a.advertiserId||null!=a.advertiserPlanId||null!=a.groupId||null!=a.bid?[]:(0,x.Jj)(a)}},w=new m.C((e,a)=>{const n=(0,g.Vn)(e.query),t=n.selectionSet.selections.find(e=>e.kind===h.b.FIELD);if(!t)return a(e);const r=t.name.value,s=t.alias?.value??r,l=(e=>{const a={};return e.query.definitions.forEach(e=>{e.kind===h.b.FRAGMENT_DEFINITION&&(a[e.name.value]=e)}),{fragments:a,variables:e.variables??{}}})(e),i=j(t,l),d=C[r]?.(i);if(d)return o={[s]:A(d.value,t.selectionSet,l)},new p.c(e=>{const a=setTimeout(()=>{e.next({data:o}),e.complete()},150);return()=>clearTimeout(a)});var o;const u=B[r];if("query"===n.operation&&u){const n=A(u(i),t.selectionSet,l),d=(e=>a=>String("currencies"===e?a.code:a.id))(r);return new p.c(t=>{let l=!1;const i=()=>{l||(l=!0,t.next({data:{[s]:n}}),t.complete())},o=a(e).subscribe({next:e=>{const a=e.data?.[s];if(e.errors?.length||!Array.isArray(a))return void i();const l="advertiserPlans"===r?((e,a,n)=>{const t=new Set(e.map(n));return[...a.filter(e=>!t.has(n(e))),...e]})(a,n,d):((e,a,n)=>{const t=new Set(e.map(n));return[...e,...a.filter(e=>!t.has(n(e)))]})(a,n,d);t.next({...e,data:{...e.data,[s]:l}})},error:i,complete:()=>{l||(l=!0,t.complete())}});return()=>o.unsubscribe()})}return a(e)});var $=n(84404);const E=({children:e})=>{const a="localhost"===location.hostname?"/api.oba/graphql":`${o.DR.oba}/graphql`,n=new r.P({uri:a,credentials:"include"}),c=new s.R({link:(0,l.H)([u.n,w,$._,n]),cache:new i.D,defaultOptions:{watchQuery:{fetchPolicy:"cache-and-network",notifyOnNetworkStatusChange:!0}}});return(0,t.jsx)(d.X,{client:c,children:e})};var y=n(13937),S=n(96540),N=n(94439),D=n(16887),k=n(39708),F=n(95964);const _=k.J1`
  query GetAdvertiserPlans($filter: AdvertiserPlanFilter!) {
    advertiserPlans(filter: $filter) {
      id
      name
      status
      advertiser {
        id
        name
        bpid
      }
      currency
      totalBudget {
        budgetCents
        originalCents
        spentCents
      }
      period {
        startDate
        endDate
      }
      marginPercent
      nbGroups
    }
  }
`,O=k.J1`
  query GetAdvertiserPlanNames($filter: AdvertiserPlanNameFilter!) {
    advertiserPlanNames(filter: $filter) {
      id
      name
    }
  }
`,T=k.J1`
  query GetAdvertiserNames($filter: AdvertiserNameFilter!) {
    advertiserNames(filter: $filter) {
      id
      name
      bpid
    }
  }
`;var L=n(24093);const Y=()=>{const{advertiserNames:e,...a}=(()=>{const{data:e,loading:a,...n}=(0,F.IT)(T,{variables:{filter:{}}});return{advertiserNames:e?.advertiserNames,advertiserNamesLoading:a,...n}})();return{advertiserNameOptions:(0,S.useMemo)(()=>e?.map(({id:e,name:a,bpid:n})=>({value:e,label:`${a} (${n??"-"})`})).sort((e,a)=>e.label.localeCompare(a.label))||[],[e]),...a}},V=Object.values(L.m8).filter(e=>e!==L.m8.Unknown).map(e=>({value:e,label:e})),G={ids:"Plan Name",advertiserIds:"Advertiser",status:"Status"},M=[{title:"Status",dataIndex:"status"},{title:"Plan Name",dataIndex:"name",render:(e,a)=>(0,t.jsx)(N.$n,{variant:"text",href:`/oba/plans/${a.id}/settings`,children:a.name})},{title:"Advertiser Name (BPID)",dataIndex:["advertiser","name"],render:(e,a)=>(0,t.jsx)("span",{children:`${a.advertiser.name} (${a.advertiser?.bpid??"-"})`})},{title:"Total Budget",dataIndex:["totalBudget","budgetCents"],render:(e,{currency:a})=>e?`${(0,D.ZV)(e/100)} ${a}`:"-"},{title:"Start Date",dataIndex:["period","startDate"],render:e=>e?(0,D.Yq)(e):"-"},{title:"End Date",dataIndex:["period","endDate"],render:e=>e?(0,D.Yq)(e):"-"},{title:"Total Spent",dataIndex:["totalBudget","spentCents"],render:(e,{currency:a})=>e?`${(0,D.ZV)(e/100)} ${a}`:"-"},{title:"Margin (%)",dataIndex:"marginPercent",render:e=>e?`${e} %`:"-"},{title:"Groups",dataIndex:"nbGroups",render:e=>e||"-"},{title:"",dataIndex:"details",align:"center",render:(e,a,n)=>(0,t.jsx)(N.$n,{id:`details-${n}-link`,variant:"text",href:`/oba/plans/${a.id}/details`,children:"Details"})}],q=()=>{const[e,a]=(0,S.useState)({ids:[],advertiserIds:[],status:[],myAdvertisers:!0}),[n,r]=(0,S.useState)({ids:"",advertiserIds:"",status:""}),{plans:s,plansLoading:l,refetchPlans:i}=(e=>{const{data:a,loading:n,refetch:t,...r}=(0,F.IT)(_,{variables:e});return{plans:a?.advertiserPlans,plansLoading:n,refetchPlans:t,...r}})({filter:e});(0,S.useEffect)(()=>{i({filter:e})},[e,i]);const{planNameOptions:d,planNamesLoading:o}=(()=>{const{planNames:e,...a}=(()=>{const{data:e,loading:a,...n}=(0,F.IT)(O,{variables:{filter:{}}});return{planNames:e?.advertiserPlanNames,planNamesLoading:a,...n}})();return{planNameOptions:(0,S.useMemo)(()=>e?.map(({id:e,name:a})=>({value:e,label:a}))||[],[e]),...a}})(),{advertiserNameOptions:u,advertiserNamesLoading:c}=Y(),p=(e,n=[],t=[])=>{a(a=>({...a,[e]:n})),r(a=>({...a,[e]:t.map(e=>e.label).join(", ")}))};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.Qp,{defaultHome:!0,items:[{title:"Omni-Channel Budget Allocation"}]}),(0,t.jsxs)(N.mc.Y9,{children:[(0,t.jsx)(N.EY.H3,{children:"Omni-Channel Budget Allocation"}),(0,t.jsx)(N.$n,{id:"oba-create-btn",href:"/oba/plans/create",children:"New OBA"})]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsxs)(N.mc.Y9,{children:[(0,t.jsx)(N.EY.H5,{children:"Filters"}),(0,t.jsx)(N.$n,{variant:"link",onClick:()=>{a(({myAdvertisers:e})=>({myAdvertisers:e,ids:[],advertiserIds:[],status:[]})),r({ids:"",advertiserIds:"",status:""})},children:"Clear All"})]}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:G.ids,id:"oba-plan-sel",mode:"multiple",allowClear:!0,loading:o,options:d,value:e.ids,onChange:(e,a)=>p("ids",e,a)})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:G.advertiserIds,id:"oba-adv-sel",mode:"multiple",allowClear:!0,loading:c,options:u,value:e.advertiserIds,onChange:(e,a)=>p("advertiserIds",e,a)})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:G.status,id:"oba-status-sel",mode:"multiple",allowClear:!0,options:V,value:e.status,onChange:(e,a)=>p("status",e,a)})})]}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{children:(0,t.jsx)(N.EY.nB,{children:"Active Filters"})}),(0,t.jsx)(N.xA.fv,{children:(()=>{const e=Object.entries(n).filter(([,e])=>e);return e.length?e.map(([e,a])=>(0,t.jsx)(N.vw,{status:"primary",children:`${G[e]}: ${a}`},e)):(0,t.jsx)(N.vw,{status:"disabled",children:"None"})})()})]})]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.EY.H5,{children:"Omni-Channel Budget Allocation Plan Overview"}),(0,t.jsx)(N.Wg,{options:[{label:"My Plans",value:!0},{label:"All Plans",value:!1}],onChange:e=>{a(a=>({...a,myAdvertisers:e}))}}),(0,t.jsx)(N.XI,{id:"oba-plans-tbl",cellsIdPrefix:"oba",rowKey:"id",loading:l,dataSource:s||[],columns:M,pagination:!0})]})]})};var W=n(74353),R=n.n(W),H=n(44669);const J=H.A.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 80%;
  max-width: 700px;
  padding: 16px 0;
`,U=({totalBudget:e,allocatedBudget:a,spentBudget:n,unspentBudget:r,currency:s,startDate:l,endDate:i})=>{const d=Number(n)>Number(e);return(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.EY.H5,{children:"Budget Allocated"}),(0,t.jsxs)(J,{children:[(0,t.jsxs)(N.EY.nB,{children:[(0,t.jsxs)("b",{children:["Total Budget: ",e&&s?`${(0,D.ZV)(e)} ${s}`:"-"]}),l&&i&&` (${(0,D.Yq)(l)} to ${(0,D.Yq)(i)})`]}),(0,t.jsx)(N.JD,{thresholdPercent:Number(a)/e*100||0,progressPercent:Number(n)/e*100||0,thresholdLabel:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.EY.nB,{children:"Budget Allotted"}),(0,t.jsx)(N.EY.nB,{children:a&&s?`${(0,D.ZV)(a)} ${s}`:"-"})]}),startLabel:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.EY.nB,{...d&&{status:"error"},children:"Budget Spent"}),(0,t.jsx)(N.EY.nB,{...d&&{status:"error"},children:e&&s?`${(0,D.ZV)(Number(n))} ${s}`:"-"})]}),endLabel:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.EY.nB,{...d&&{status:"error"},children:"Unspent Budget"}),(0,t.jsx)(N.EY.nB,{...d&&{status:"error"},children:e&&s?`${(0,D.ZV)(e-Number(n))} ${s}`:"-"})]})})]})]})};var Z=n(95420);const z=k.J1`
  query GetCurrencies {
    currencies {
      code
      name
      symbol
    }
  }
`,K=k.J1`
  fragment AdvPlanSettingsFragment on AdvertiserPlan {
    id
    version
    name
    status
    currency
    marginPercent
    dispatchOptIn
    managementFeePercent
    advertiser {
      id
      name
    }
    period {
      startDate
      endDate
    }
    totalBudget {
      allottedCents
      budgetCents
      originalCents
      spentCents
      unSpentCents
    }
    groups {
      id
      version
      name
      bundles {
        channel
      }
    }
  }
`,Q=k.J1`
  query GetAdvPlanSettings($id: ID!) {
    advertiserPlan(id: $id) {
      ...AdvPlanSettingsFragment
    }
  }
  ${K}
`,X=k.J1`
  mutation UpdateAdvPlanSettings($input: AdvertiserPlanInput!) {
    updateAdvertiserPlan(input: $input) {
      ...AdvPlanSettingsFragment
    }
  }
  ${K}
`,ee=k.J1`
  mutation DeleteAdvertiserPlan($input: DeleteInput!) {
    deleteAdvertiserPlan(input: $input)
  }
`,ae=H.A.div`
  display: flex;
  align-items: center;
  gap: 6px;
`,ne=H.A.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`,te=N.lV.Item,re=()=>{const e=(0,y.Zp)(),a=(0,N.hN)(),{planId:n}=(0,y.g)(),r=location.pathname.includes("/details/"),s=r?`/oba/plans/${n}/details`:`/oba/plans/${n}`,[l,i]=(0,S.useState)(!1),[d,o]=(0,S.useState)(!1),[u]=N.lV.useForm(),c=N.lV.useWatch(["currency"],u),p=N.lV.useWatch(["totalBudget"],u),m=N.lV.useWatch(["period","startDate"],u),g=N.lV.useWatch(["period","endDate"],u),{planSettings:h,planSettingsLoading:v}=(e=>{const{data:a,loading:n,error:t,...r}=(0,F.IT)(Q,{variables:{id:e?+e:0},skip:!e});return{...r,planSettings:a?.advertiserPlan,planSettingsLoading:n,planSettingsError:t}})(n),{updateAdvPlan:x,updatedAdvPlanData:b,updatedAdvPlanLoading:f,updatedAdvPlanError:j}=(()=>{const[e,{data:a,loading:n,error:t,...r}]=(0,Z.n)(X,{variables:void 0});return{updateAdvPlan:e,updatedAdvPlanData:a?.updateAdvertiserPlan,updatedAdvPlanLoading:n,updatedAdvPlanError:t,...r}})(),{deleteAdvPlan:P,deletedAdvPlanData:A,deletedAdvPlanLoading:C,deletedAdvPlanError:I}=(()=>{const[e,{data:a,loading:n,error:t,...r}]=(0,Z.n)(ee,{variables:void 0});return{deleteAdvPlan:e,deletedAdvPlanData:a?.deleteAdvertiserPlan,deletedAdvPlanLoading:n,deletedAdvPlanError:t,...r}})(),{advertiserNameOptions:B,advertiserNamesLoading:w}=Y(),{currencyOptions:$,currenciesLoading:E}=(()=>{const{currencies:e,...a}=(()=>{const{data:e,loading:a,...n}=(0,F.IT)(z);return{currencies:e?.currencies,currenciesLoading:a,...n}})();return{currencyOptions:(0,S.useMemo)(()=>e?.map(e=>({value:e.code,label:e.name}))||[],[e]),...a}})(),k=Number(h?.totalBudget.allottedCents??0)/100,_=Number(h?.totalBudget.spentCents??0)/100,O=Number(h?.totalBudget.unSpentCents??0)/100,T=(0,S.useMemo)(()=>!!h&&(R()().isAfter(R()(h.period.startDate))||h.status===L.m8.Live||h.status===L.m8.Completed),[h]),V=(0,S.useMemo)(()=>{if(!h)return{};const{name:e,advertiser:a,currency:n,totalBudget:t,period:r,marginPercent:s,managementFeePercent:l}=h;return{name:e,advertiserId:a.id,currency:n,marginPercent:s,managementFeePercent:l,totalBudget:Number(t?.budgetCents)/100,period:{startDate:R()(r.startDate),endDate:R()(r.endDate)}}},[h]);return(0,S.useEffect)(()=>{b&&(a.success("Plan Settings have been Saved."),e(`/oba/plans/${b.id}/${r?"details/":""}budget-distribution`))},[b]),(0,S.useEffect)(()=>{j&&a.error("Saving Plan Settings has been Failed!",{description:j.message})},[j]),(0,S.useEffect)(()=>{void 0===A||I||(a.success("OBA Plan has been deleted."),o(!1),e("/oba/plans"))},[A,I,a,e]),(0,S.useEffect)(()=>{I&&a.error("Deleting OBA Plan has Failed!",{description:I.message})},[I]),v?(0,t.jsx)(N.y$,{fullscreen:!0}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(N.lV,{form:u,initialValues:V,onFinish:async e=>{if(!l&&k>Number(e.totalBudget))i(!0);else{const a={...e,...h&&{id:h.id,version:h.version},...e.period&&{period:{startDate:(0,D.Ml)(e.period.startDate),endDate:(0,D.Ml)(e.period.endDate)}},...e.totalBudget&&{totalBudget:Math.round(100*e.totalBudget)}};x({variables:{input:a}})}},children:[(0,t.jsx)(N.Qp,{defaultHome:!0,items:[{title:"Omni-Channel Budget Allocation",href:"/oba/plans"},...r?[{title:"OBA Details",href:s}]:[],{title:n?"OBA Settings":"New OBA Plan"}]}),(0,t.jsx)(N.mc.Y9,{children:(0,t.jsx)(N.EY.H3,{children:n?h?.name:"New OBA Plan"})}),(0,t.jsx)(N.C1,{current:0,items:[{title:"Plan Settings",status:n?"finish":"process"},{title:"Budget Distribution",status:h?.groups.length?"finish":"wait",...n&&{onClick:()=>e(`${s}/budget-distribution`)}},{title:"Campaign Allocation",status:h?.groups?.some(e=>e.bundles?.length)?"finish":"wait",...h?.groups[0]?.id&&{onClick:()=>e(`${s}/campaign-allocation`)}}]}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{span:6,children:(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.EY.H5,{children:"Plan Settings"}),(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(te,{name:"name",colSpan:8,rules:[{required:!0}],children:(0,t.jsx)(N.pd,{label:"Plan Name",id:"oba-plan_name-inp",required:!0})})}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(te,{name:"advertiserId",colSpan:4,rules:[{required:!0}],children:(0,t.jsx)(N.l6,{label:"Advertiser",id:"oba-advertiser_name-sel",required:!0,disabled:!!n,options:B,loading:w})}),(0,t.jsx)(te,{name:"currency",colSpan:4,rules:[{required:!0}],children:(0,t.jsx)(N.l6,{label:"Currency",id:"oba-currency-sel",required:!0,disabled:!!n,loading:E,options:$})})]}),(0,t.jsx)("div",{style:{display:"none"},"aria-hidden":!0,children:(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(te,{name:"marginPercent",colSpan:4,rules:[{validator:(e,a)=>{const n=a%1;return a&&0!==n&&.5!==n?Promise.reject(new Error("Margin value must be in the format x.0 or x.5")):Promise.resolve()}}],children:(0,t.jsx)(N.YI,{label:"Margin",id:"oba-margin-inp",min:0,max:100,step:.5,formatter:e=>Number(e)?.toFixed(1),affixAfter:"%"})}),(0,t.jsx)(te,{name:"managementFeePercent",colSpan:4,children:(0,t.jsx)(N.YI,{label:"Management Fee",id:"oba-management_fee-inp",min:0,max:100,formatter:e=>Number(e)?.toFixed(1),affixAfter:"%"})})]})}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(te,{name:["totalBudget"],colSpan:4,rules:[{required:!0,validator:(e,a)=>!a||a>=_?Promise.resolve():Promise.reject(new Error("Budget can't be less than spent"))}],children:(0,t.jsx)(N.YI,{label:"Total Budget",id:"oba-total_budget-inp",required:!0,disabled:!!n&&h?.status===L.m8.Completed,affixAfter:c||"-"})}),(0,t.jsx)(te,{name:["period","startDate"],colSpan:4,rules:[{required:!0}],children:(0,t.jsx)(N.lr,{label:"Start Date",id:"oba-start_date-sel",required:!0,disabled:!!n&&T,minDate:g?R()(g).subtract(3,"years"):R()().add(1,"month").subtract(3,"years"),maxDate:g?R()(g):void 0})}),(0,t.jsx)(te,{name:["period","endDate"],colSpan:4,rules:[{required:!0}],children:(0,t.jsx)(N.lr,{label:"End Date",id:"oba-end_date-sel",required:!0,disabled:!!n&&h?.status===L.m8.Completed,minDate:m?R()(m).add(1,"month"):R()(),maxDate:m?R()(m).add(3,"years"):void 0})})]})]})}),(0,t.jsx)(N.xA.fv,{span:6,children:(0,t.jsx)(U,{allocatedBudget:k,spentBudget:_,unspentBudget:O,totalBudget:p??0,currency:c??"",startDate:m,endDate:g})})]}),(0,t.jsx)(N.NG,{children:(0,t.jsxs)(ne,{children:[(0,t.jsx)(N.mc.VP,{children:h?.status===L.m8.Scheduled&&(0,t.jsx)(N.$n,{color:"danger",variant:"outlined",id:"oba-delete_plan-btn",onClick:()=>o(!0),children:"Delete Plan"})}),(0,t.jsxs)(N.mc.fI,{children:[(0,t.jsx)(N.$n,{href:"/oba/plans",variant:"outlined",id:"oba-plan_cancel-btn",children:"Cancel"}),(0,t.jsx)(N.$n,{htmlType:"submit",id:"oba-plan_submit-btn",loading:f,children:"Save & Continue"})]})]})})]}),(0,t.jsxs)(N.aF,{idPrefix:"oba-bud_warn-modal",title:(0,t.jsxs)(ae,{children:[(0,t.jsx)(N.In,{name:"exclamationTriangle",color:N.Tj.pumpkin_60,width:32,height:28}),(0,t.jsx)("span",{children:"Allotted budget exceeds total budget"})]}),open:l,okText:"Continue",onOk:u.submit,onCancel:()=>i(!1),children:[(0,t.jsx)(N.EY.nB,{children:"The current modification to the Total budget makes the OBA invalid."}),(0,t.jsx)(N.EY.nB,{children:"If you proceed with the changes, the OBA plan will be paused until the allotted budget is equal to or under the total budget. This can be done in the Budget distribution step."})]}),(0,t.jsxs)(N.aF,{idPrefix:"oba-delete_plan-modal",title:(0,t.jsxs)(ae,{children:[(0,t.jsx)(N.In,{name:"exclamationTriangle",color:N.Tj.pumpkin_60,width:32,height:28}),(0,t.jsx)("span",{children:"Delete OBA Plan"})]}),confirmLoading:C,open:d,okText:"Delete",onOk:async()=>{if(!h?.id||h.status!==L.m8.Scheduled)return a.error("Only Scheduled plans can be deleted."),void o(!1);P({variables:{input:{id:h.id,version:h.version}}})},onCancel:()=>o(!1),children:[(0,t.jsxs)(N.EY.nB,{children:["Are you sure you want to delete the ",h?.name," OBA plan for Advertiser"," ",h?.advertiser?.name,"? This action cannot be undone."]}),(0,t.jsx)(N.EY.nB,{children:"Would you like to proceed with the Delete?"})]})]})},se=k.J1`
  fragment GroupPlanFragment on GroupPlan {
    advertiserPlanId
    bundles {
      channel
      platform {
        id
        name
      }
      tactic
      vendorCampaignIds
      lowerBoundPercent
      upperBoundPercent
      version
      id
    }
    id
    kpi
    monthBudgets {
      month
      current
      budget {
        budgetCents
        spentCents
        originalCents
      }
    }
    name
    specs
    status
    totalBudget {
      budgetCents
      originalCents
      spentCents
    }
    version
    paidSearchChannel {
      lowerBoundPercent
    }
    facebookChannel {
      lowerBoundPercent
    }
    displayChannel {
      lowerBoundPercent
    }
    youtubeChannel {
      lowerBoundPercent
    }
  }
`,le=k.J1`
  ${se}
  query GetAdvertiserPlan($id: ID!) {
    advertiserPlan(id: $id) {
      advertiser {
        id
        name
      }
      currency
      groups {
        ...GroupPlanFragment
      }
      id
      marginPercent
      name
      period {
        endDate
        startDate
      }
      totalBudget {
        budgetCents
        originalCents
        spentCents
      }
    }
  }
`,ie=k.J1`
  query GetGroupNames($filter: GroupNameFilter!) {
    groupNames(filter: $filter) {
      id
      name
    }
  }
`,de=k.J1`
  query GetCampaignNames($filter: CampaignNameFilter!) {
    campaignNames(filter: $filter) {
      id
      name
    }
  }
`,oe=k.J1`
  fragment CampaignDetailsFragment on CampaignDetails {
    campaignId
    groupId
    status
    statusMessage
    campaign {
      id
      name
      notFound
    }
    channel
    currency
    currentMonthSpentCents
    dailyRecommendedCents
    group {
      id
      name
    }
    lastUpdated
    monthlyRecommendedCents
    platform {
      id
      name
    }
    tactic
    totalSpentCents
  }
`,ue=k.J1`
  fragment AdvertiserPlanFragment on AdvertiserPlan {
    id
    name
    version
    advertiserId
    status
    isRunnable
    disable {
      pause
      resume
    }
  }
`,ce=k.J1`
  ${ue}
  ${oe}
  query GetPlanDetails($id: ID!, $filter: CampaignDetailsFilter) {
    advertiserPlan(id: $id) {
      ...AdvertiserPlanFragment
      campaignDetails(filter: $filter) {
        ...CampaignDetailsFragment
      }
    }
  }
`,pe=k.J1`
  ${ue}
  mutation PauseAdvertiserPlan($id: ID!) {
    pauseAdvertiserPlan(id: $id) {
      ...AdvertiserPlanFragment
    }
  }
`,me=k.J1`
  ${ue}
  mutation UnpauseAdvertiserPlan($id: ID!) {
    unpauseAdvertiserPlan(id: $id) {
      ...AdvertiserPlanFragment
    }
  }
`,ge=k.J1`
  ${oe}
  mutation PauseCampaign($campaignId: String!, $groupId: ID!) {
    pauseCampaign(campaignId: $campaignId, groupId: $groupId) {
      ...CampaignDetailsFragment
    }
  }
`,he=k.J1`
  ${oe}
  mutation UnpauseCampaign($campaignId: String!, $groupId: ID!) {
    unpauseCampaign(campaignId: $campaignId, groupId: $groupId) {
      ...CampaignDetailsFragment
    }
  }
`,ve={statuses:"OBA Status",groupIds:"Group",channels:"Channel",tactics:"Tactic",vendorCampaignIds:"Campaigns"},xe={statuses:[],groupIds:[],channels:[],tactics:[],vendorCampaignIds:[]},be={statuses:"",groupIds:"",channels:"",tactics:"",vendorCampaignIds:""},fe=Object.values(L.M$).filter(e=>e!==L.M$.Unknown).map(e=>({label:e,value:e})),je=Object.values(L.pE).filter(e=>e!==L.pE.Unknown).map(e=>({label:e,value:e})),Pe=Object.values(L.WE).filter(e=>e!==L.WE.Unknown).map(e=>({label:e,value:e})),Ae=e=>{const{campaignNamesData:a,...n}=(e=>{const{data:a,loading:n,error:t,refetch:r,...s}=(0,F.IT)(de,{variables:e});return{campaignNamesData:a?.campaignNames||[],campaignNamesLoading:n,campaignNamesError:t,refetchCampaignNames:r,...s}})({filter:e});return{campaignNamesOptions:a.map(e=>({label:e.name,value:e.id})),...n}},Ce=k.J1`
  ${se}
  query GetGroupPlan($id: ID!) {
    groupPlan(id: $id) {
      ...GroupPlanFragment
      advertiserPlan {
        advertiser {
          id
          name
        }
      }
    }
  }
`,Ie=k.J1`
  mutation UpdateGroupPlan($input: GroupPlanInput!) {
    updateGroupPlan(input: $input) {
      ...GroupPlanFragment
    }
  }
  ${se}
`,Be=[{label:"Clicks",value:L.EB.Clicks},{label:"Conversions",value:L.EB.Conversions},{label:"ROAS",value:L.EB.Roas}],we=[{label:"Display",value:L.pE.Display},{label:"Facebook",value:L.pE.Facebook},{label:"PaidSearch",value:L.pE.PaidSearch},{label:"Youtube",value:L.pE.YouTube}],$e=[{label:"AdvantagePlus",value:L.WE.AdvantagePlus},{label:"Brand",value:L.WE.Brand},{label:"Generic",value:L.WE.Generic},{label:"DemandGen",value:L.WE.DemandGen},{label:"Pmax",value:L.WE.Pmax},{label:"Prospecting",value:L.WE.Prospecting},{label:"Remarketing",value:L.WE.Remarketing}],Ee={[L.pE.PaidSearch]:[L.WE.Brand,L.WE.Generic,L.WE.Pmax],[L.pE.Display]:[L.WE.Prospecting,L.WE.Remarketing,L.WE.DemandGen],[L.pE.Facebook]:[L.WE.Prospecting,L.WE.Remarketing,L.WE.AdvantagePlus],[L.pE.YouTube]:[L.WE.Remarketing,L.WE.Prospecting]},ye=H.A.div`
  margin-left: 2px;
  display: inline-flex;
  align-items: center;
`,Se=(0,H.A)(N.N_)`
  margin-right: 3px;
`,Ne=(0,H.A)(N.xA.fv)`
  align-content: end;
`,De=({groupId:e,drawerIsOpen:a,onCloseDrawer:n})=>{const r=(0,o.nf)(),{groupPlan:s,groupPlanLoading:l}=(e=>{const{data:a,loading:n,...t}=(0,F.IT)(Ce,{variables:e,skip:!e.id});return{groupPlan:a?.groupPlan,groupPlanLoading:n,...t}})({id:Number(e)}),{updateGroupPlan:i,updateGroupPlanData:d,updateGroupPlanLoading:u,updateGroupPlanError:c}=(()=>{const[e,{data:a,loading:n,error:t,...r}]=(0,Z.n)(Ie,{variables:void 0});return{updateGroupPlan:e,updateGroupPlanData:a?.updateGroupPlan,updateGroupPlanLoading:n,updateGroupPlanError:t,...r}})(),{campaignNamesOptions:p,campaignNamesLoading:m,refetchCampaignNames:g}=Ae({advertiserPlanId:s?.advertiserPlanId}),h=(0,N.hN)(),[v]=N.lV.useForm(),x=N.lV.useWatch(["bundles"],v),b=N.lV.useWatch(["kpi"],v);(0,S.useEffect)(()=>{s?.advertiserPlanId&&g({filter:{advertiserPlanId:s.advertiserPlanId}})},[e,s?.advertiserPlanId,g]),(0,S.useEffect)(()=>{if(!s)return;const e=s.bundles.length>0?{...s,bundles:s.bundles.map(({platform:e,...a})=>({...a,channel:a.channel,lowerBoundPercent:a.lowerBoundPercent??void 0,upperBoundPercent:a.upperBoundPercent??void 0,id:a.id,version:a.version}))}:{...s,bundles:[{vendorCampaignIds:[],lowerBoundPercent:void 0,upperBoundPercent:void 0}]};v.setFieldsValue(e)},[s,v]);const f=()=>{v.resetFields(),n()};(0,S.useEffect)(()=>{d&&(h.success("Group Plan has been saved successfully"),f())},[d]),(0,S.useEffect)(()=>{c&&h.error("Saving Group Plan has been Failed!",{description:c?.message})},[c]);const j=e=>{v.validateFields([["bundles",e,"lowerBoundPercent"],["bundles",e,"upperBoundPercent"]])},P=e=>()=>{const a=v.getFieldValue(["bundles",e,"lowerBoundPercent"]),n=v.getFieldValue(["bundles",e,"upperBoundPercent"]);return"number"==typeof a&&"number"==typeof n&&a>n?Promise.reject(new Error("Lower Bound must be less than or equal to Upper Bound")):Promise.resolve()},A=(e,a)=>(n,t)=>null==t||""===t?Promise.reject(new Error("Please enter a value")):"number"!=typeof t?Promise.reject(new Error("Value must be a number")):t<e?Promise.reject(new Error(`Value must be higher than ${e}`)):t>a?Promise.reject(new Error(`Value must be between ${e} and ${a}`)):Promise.resolve(),C=l||m||u;return(0,t.jsx)(N._s,{title:!C&&`Campaign Allocation - ${s?.name}`,placement:"right",width:"80vw",onClose:n,open:a,children:C?(0,t.jsx)(N.y$,{}):(0,t.jsxs)(N.lV,{onFinish:(e,a)=>{const n={...e,id:s?.id,version:s?.version,specs:b===L.EB.Roas?e.specs:null,bundles:e.bundles?.map(e=>({...e,lowerBoundPercent:Number(e.lowerBoundPercent),upperBoundPercent:Number(e.upperBoundPercent)})).filter((e,n)=>!a?.includes(n))};i({variables:{input:n}}).catch(e=>{})},form:v,children:[(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(N.xA.fv,{span:12,children:(0,t.jsx)(N.EY.H5,{children:"General Settings"})})}),(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(N.lV.Item,{name:"name",colSpan:4,rules:[{required:!0,message:"Please enter the Plan Name"}],children:(0,t.jsx)(N.pd,{label:"Plan Name",id:"oba-group_plan_name-inp"})})}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.lV.Item,{name:"kpi",colSpan:2,rules:[{required:!0,message:"Please select a value"}],children:(0,t.jsx)(N.l6,{label:"KPI",id:"oba-group_plan_kpi-sel",options:Be,value:s?.kpi})}),b===L.EB.Roas&&(0,t.jsx)(N.lV.Item,{name:"specs",colSpan:2,rules:[{required:!0,message:"Please enter the KPI value"},{pattern:/^[1-9]\d*$/,message:"Value must be a positive integer"}],children:(0,t.jsx)(N.pd,{label:"KPI Value",id:"oba-group_plan_kpi-inp"})})]})]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(N.xA.fv,{span:12,children:(0,t.jsx)(N.EY.H5,{children:"Channel Level Bounds"})})}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(Ne,{span:2,children:"Lower Bound (%)"}),(0,t.jsx)(N.lV.Item,{rules:[{validator:A(30,100)}],colSpan:2,name:["paidSearchChannel","lowerBoundPercent"],children:(0,t.jsx)(N.YI,{label:"Paid Search *",placeholder:"Please enter a value between 30 and 100",id:"oba-group_plan_paid_search_lower_bound-inp",onBlur:()=>{v.validateFields(["paidSearchChannel","lowerBoundPercent"])}})}),(0,t.jsx)(N.lV.Item,{rules:[{validator:A(10,100)}],colSpan:2,name:["displayChannel","lowerBoundPercent"],children:(0,t.jsx)(N.YI,{placeholder:"Please enter a value between 10 and 100",label:"Display *",id:"oba-group_plan_display_lower_bound-inp"})}),(0,t.jsx)(N.lV.Item,{rules:[{validator:A(10,100)}],colSpan:2,name:["facebookChannel","lowerBoundPercent"],children:(0,t.jsx)(N.YI,{label:"Facebook *",placeholder:"Please enter a value between 10 and 100",id:"oba-group_plan_facebook_lower_bound-inp"})}),(0,t.jsx)(N.lV.Item,{rules:[{validator:A(5,100)}],colSpan:2,name:["youtubeChannel","lowerBoundPercent"],children:(0,t.jsx)(N.YI,{placeholder:"Please enter a value between 5 and 100",label:"Youtube *",id:"oba-group_plan_youtube_lower_bound-inp"})})]}),(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(N.lV.Item,{dependencies:["paidSearchChannel","displayChannel","facebookChannel","youtubeChannel"],validateTrigger:["onChange","onBlur"],name:"channelBoundsSumValidation",rules:[{validator:()=>(()=>{const e=[{name:["paidSearchChannel","lowerBoundPercent"],min:30,max:100},{name:["displayChannel","lowerBoundPercent"],min:10,max:100},{name:["facebookChannel","lowerBoundPercent"],min:10,max:100},{name:["youtubeChannel","lowerBoundPercent"],min:5,max:100}],a=e.map(({name:e})=>Number(v.getFieldValue(e)));return e.every(({min:e,max:n},t)=>{const r=a[t];return r>=e&&r<=n&&!isNaN(r)})&&a.reduce((e,a)=>e+a,0)>100?Promise.reject(new Error("Sum off all lower bounds should be less than or equal to 100%")):Promise.resolve()})()}],children:(0,t.jsx)("input",{type:"hidden"})})})]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsxs)(N.xA.fI,{gutter:10,children:[(0,t.jsx)(N.xA.fv,{span:11,children:(0,t.jsx)(N.EY.H5,{children:"Campaign Allocation"})}),(0,t.jsx)(N.xA.fv,{span:1,dir:"rtl",children:(0,t.jsx)(N.$n,{id:"oba-group_plans_add_category-btn",onClick:()=>{if(!x)return;v.setFieldValue("bundles",[...x,{channel:void 0,tactic:void 0,vendorCampaignIds:[],lowerBoundPercent:void 0,upperBoundPercent:void 0}])},variant:"outlined",children:"Add Category"})})]}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{span:1.5,children:(0,t.jsx)(N.EY.HP,{children:"Channel *"})}),(0,t.jsx)(N.xA.fv,{span:1.5,children:(0,t.jsx)(N.EY.HP,{children:"Tactic *"})}),(0,t.jsx)(N.xA.fv,{span:6.5,children:(0,t.jsx)(N.EY.HP,{children:"Campaign *"})}),(0,t.jsx)(N.xA.fv,{span:1,children:(0,t.jsx)(N.EY.HP,{children:"Lower Bound (%) "})}),(0,t.jsx)(N.xA.fv,{span:1,children:(0,t.jsx)(N.EY.HP,{children:"Upper Bound (%) "})}),(0,t.jsx)(N.xA.fv,{span:.5})]}),(0,t.jsx)(N.lV.List,{name:"bundles",children:e=>(0,t.jsx)(t.Fragment,{children:e.map((e,a)=>{const n=x?.[a]?.channel,r=(e=>{const a=e?Ee[e]:[];return a?$e.filter(e=>a.includes(e.value)):[]})(n);return(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.lV.Item,{colSpan:1.5,name:[a,"channel"],rules:[{required:!0,message:"Please select a value"}],children:(0,t.jsx)(N.l6,{id:"oba-group_plan_channel-sel",options:we})}),(0,t.jsx)(N.lV.Item,{colSpan:1.5,name:[a,"tactic"],rules:[{required:!0,message:"Please select a value"}],children:(0,t.jsx)(N.l6,{options:r,id:"oba-group_tactic-sel",notFoundContent:(0,t.jsx)(N.EY.Or,{children:"Please select a channel first."})})}),(0,t.jsx)(N.lV.Item,{colSpan:6.5,name:[a,"vendorCampaignIds"],rules:[{required:!0,message:"Please select a value"}],children:(0,t.jsx)(N.l6,{mode:"tags",id:"oba-group_campaigns-sel",withBadges:!0,options:p})}),(0,t.jsx)(N.lV.Item,{colSpan:1,name:[a,"lowerBoundPercent"],rules:[{validator:P(a)}],children:(0,t.jsx)(N.YI,{id:"oba-group_plan_lower_bound-inp",placeholder:"0",min:0,max:100,onChange:()=>j(a)})}),(0,t.jsx)(N.lV.Item,{colSpan:1,name:[a,"upperBoundPercent"],rules:[{validator:P(a)}],children:(0,t.jsx)(N.YI,{id:"oba-group_plan_upper_bound-inp",placeholder:"100",min:0,max:100,onChange:()=>j(a)})}),0!==a&&(0,t.jsx)(N.xA.fv,{span:.5,children:(0,t.jsx)(N.rI,{menuType:"kebab",items:[{key:"delete",label:"Delete",onClick:()=>(e=>{const a=v.getFieldsValue(!0).bundles.filter((a,n)=>n!==e);v.setFieldValue("bundles",a)})(a)}]})})]},a)})})}),(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(N.xA.fv,{span:12,children:(0,t.jsxs)(N.EY.nB,{children:["Please be aware that the campaigns will only be listed if the external Advertiser mapping is present in CMT.",(0,t.jsxs)(ye,{children:[(0,t.jsx)(Se,{target:"_blank",href:`${r?.campaignManagement?.cmt}/site/advertiser/advertisers/${s?.advertiserPlan.advertiser.id}/external-advertisers`,children:"External Advertiser Mapping"}),(0,t.jsx)(N.In,{name:"externalLink",width:13,height:13,color:N.Tj.sky_60})]})]})})})]}),(0,t.jsx)(N.xA.fI,{children:(0,t.jsx)(N.xA.fv,{span:12,children:(0,t.jsxs)(N.NG,{left:"20vw",marginBottom:0,children:[(0,t.jsx)(N.$n,{onClick:f,htmlType:"button",id:"oba-group_plan_cancel-btn",variant:"outlined",children:"Close"}),(0,t.jsx)(N.$n,{htmlType:"submit",id:"oba-group_plan_submit-btn",children:"Save"})]})})})]})})};var ke=n(58168);const Fe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"}},{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}}]},name:"check-circle",theme:"outlined"};var _e=n(87064),Oe=function(e,a){return S.createElement(_e.A,(0,ke.A)({},e,{ref:a,icon:Fe}))};const Te=S.forwardRef(Oe),Le={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z"}},{tag:"path",attrs:{d:"M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z"}}]},name:"info-circle",theme:"outlined"};var Ye=function(e,a){return S.createElement(_e.A,(0,ke.A)({},e,{ref:a,icon:Le}))};const Ve=S.forwardRef(Ye),Ge={icon:{tag:"svg",attrs:{"fill-rule":"evenodd",viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M512 64c247.4 0 448 200.6 448 448S759.4 960 512 960 64 759.4 64 512 264.6 64 512 64zm0 76c-205.4 0-372 166.6-372 372s166.6 372 372 372 372-166.6 372-372-166.6-372-372-372zm128.01 198.83c.03 0 .05.01.09.06l45.02 45.01a.2.2 0 01.05.09.12.12 0 010 .07c0 .02-.01.04-.05.08L557.25 512l127.87 127.86a.27.27 0 01.05.06v.02a.12.12 0 010 .07c0 .03-.01.05-.05.09l-45.02 45.02a.2.2 0 01-.09.05.12.12 0 01-.07 0c-.02 0-.04-.01-.08-.05L512 557.25 384.14 685.12c-.04.04-.06.05-.08.05a.12.12 0 01-.07 0c-.03 0-.05-.01-.09-.05l-45.02-45.02a.2.2 0 01-.05-.09.12.12 0 010-.07c0-.02.01-.04.06-.08L466.75 512 338.88 384.14a.27.27 0 01-.05-.06l-.01-.02a.12.12 0 010-.07c0-.03.01-.05.05-.09l45.02-45.02a.2.2 0 01.09-.05.12.12 0 01.07 0c.02 0 .04.01.08.06L512 466.75l127.86-127.86c.04-.05.06-.06.08-.06a.12.12 0 01.07 0z"}}]},name:"close-circle",theme:"outlined"};var Me=function(e,a){return S.createElement(_e.A,(0,ke.A)({},e,{ref:a,icon:Ge}))};const qe=S.forwardRef(Me);var We=n(36659);const Re=(0,H.A)(Te)`
  color: ${(0,We.q)("success")};
  font-size: 16px;
`,He=(0,H.A)(Ve)`
  color: ${(0,We.q)("warning")};
  font-size: 16px;
`,Je=(0,H.A)(qe)`
  color: ${(0,We.q)("error")};
  font-size: 16px;
`,Ue=String(R()().get("month")+1).padStart(2,"0"),Ze=`${R()().get("year")}-${Ue}`,ze=(e,a="")=>[{title:"Status",dataIndex:"status",render:e=>"active"===e.toLowerCase()?(0,t.jsx)(Re,{}):"incomplete"===e.toLowerCase()?(0,t.jsx)(He,{}):"error"===e.toLowerCase()?(0,t.jsx)(Je,{}):"-"},{title:"Group Name",dataIndex:"name"},{title:"Total Budget Allocated",dataIndex:["totalBudget","budgetCents"],render:e=>e?`${(0,D.ZV)(e/100)} ${a}`:"-"},{title:"Total Budget Spent",dataIndex:["totalBudget","spentCents"],render:e=>e?`${(0,D.ZV)(e/100)} ${a}`:"-"},{title:"Budget Allocated Current Month",dataIndex:["monthBudgets"],render:e=>{const n=e?.find(e=>e.month===Ze)?.budget?.budgetCents;return n?`${(0,D.ZV)(n/100)} ${a}`:"-"}},{title:"Budget Spent Current Month",dataIndex:["monthBudgets"],render:e=>{const n=e?.find(e=>e.month===Ze)?.budget?.spentCents;return n?`${(0,D.ZV)(n/100)} ${a}`:"-"}},{title:"KPI",dataIndex:"kpi",render:e=>e||"-"},{title:"Campaigns",dataIndex:["bundles"],render:e=>e?.reduce((e,a)=>e+(a?.vendorCampaignIds?.length??0),0)||"-"},{title:"",dataIndex:"details",render:(a,n,r)=>(0,t.jsx)(N.$n,{id:`oba-campaign_allocation-${r}-lnk`,variant:"text",onClick:()=>e(n.id||0),children:"Details"})}],Ke=()=>{const e=(0,y.Zp)(),{planId:a}=(0,y.g)(),{advertiserPlans:n,advertiserPlansLoading:r}=(e=>{const{data:a,loading:n,...t}=(0,F.IT)(le,{variables:e});return{advertiserPlans:a?.advertiserPlan,advertiserPlansLoading:n,...t}})({id:+a}),[s,l]=(0,S.useState)("All"),[i,d]=(0,S.useState)(""),[o,u]=(0,S.useState)(!1),c=location.pathname.includes("/details/"),p=c?`/oba/plans/${a}/details`:`/oba/plans/${a}`,m=(0,S.useMemo)(()=>((e=[],a)=>"All"===a?e.filter(e=>"Active"===e.status||"Incomplete"===e.status):e.filter(e=>e.status===a))(n?.groups,s).filter(e=>e.name.toLowerCase().includes(i)||e.status.toLowerCase().includes(i)||e?.kpi?.toLowerCase().includes(i)),[n?.groups,s,i]),g=n?.groups.filter(e=>"Active"===e.status||"Incomplete"===e.status),h=n?.groups.filter(e=>"Incomplete"===e.status),v=n?.groups.filter(e=>"Active"===e.status),x=(0,S.useMemo)(()=>[{key:"All",label:`All (${g?.length})`},{key:"Incomplete",label:`New Groups (${h?.length})`},{key:"Active",label:`Completed Groups (${v?.length})`}],[n?.groups]),[b,f]=(0,S.useState)();return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.Qp,{defaultHome:!0,items:[{title:"Omni-Channel Budget Allocation",href:"/oba/plans"},...c?[{title:"OBA Details",href:p}]:[],{title:a?"OBA Settings":"New OBA Plan"}]}),(0,t.jsx)(N.mc.Y9,{children:(0,t.jsx)(N.EY.H3,{children:a?n?.name:"New OBA Plan"})}),(0,t.jsx)(N.C1,{current:2,items:[{title:"Plan Settings",status:a?"finish":"process",onClick:()=>e(`${p}/settings`)},{title:"Budget Distribution",onClick:()=>e(`${p}/budget-distribution`),status:n?.groups.length?"finish":"wait"},{title:"Campaign Allocation",status:n?.groups?.some(e=>e.bundles?.length)?"finish":"process"}]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.mc.Y9,{children:(0,t.jsx)(N.EY.H5,{children:"Campaign Allocation"})}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{span:6,children:(0,t.jsx)(N.Wg,{value:s,onChange:e=>l(e),options:x.map(e=>({value:e.key,label:e.label}))})}),(0,t.jsx)(N.xA.fv,{span:3}),(0,t.jsx)(N.xA.fv,{span:3,children:(0,t.jsx)(N.vj,{placeholder:"Group Name, Status, KPI",onSearch:e=>d(e)})})]}),(0,t.jsx)(N.XI,{id:"oba-group_plans-tbl",cellsIdPrefix:"oba",columns:ze(e=>{f(e),u(!0)},n?.currency),dataSource:m||[],rowKey:"id",loading:r,pagination:!1})]}),(0,t.jsx)(N.NG,{children:(0,t.jsx)(N.$n,{href:"/oba/plans",htmlType:"button",id:"oba-group_plans_back-btn",children:"Complete"})}),(0,t.jsx)(De,{drawerIsOpen:o,groupId:b,onCloseDrawer:()=>{f(void 0),u(!1)}})]})},Qe={name:200,month:Math.round(.063*screen.width)},Xe=e=>{const{startDate:a,endDate:n}=e,t=R()(n).startOf("month").diff(R()(a).startOf("month"),"month")+1;return Array.from({length:t},(e,n)=>R()(a).add(n,"month").format("MMM YYYY"))},ea=e=>{if(!e)return 0;const a=e.reduce((e,a)=>e+(a.monthBudgetCents?.reduce((e,a)=>Number(e)+(a??0),0)||0),0);return Math.round(100*a)/100},aa=H.A.div`
  ${({monthsCount:e})=>`width: ${e>=12?"100%":Qe.name+e*Qe.month}px;`}
  ${({monthsCount:e})=>e>12&&"overflow-x: auto"};

  .amadeus-table-tbody > tr > td {
    vertical-align: top !important;
  }
`,na=H.A.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  text-align: center;
`,ta=({period:e,currency:a,groups:n})=>{const r=N.lV.useFormInstance(),s=(0,S.useMemo)(()=>Xe(e),[e]),[l,i]=(0,S.useState)(),d=e=>{const a=["groups",Number(l?.index),"name"];!e&&r.getFieldError(a).length||(e&&l&&r.setFieldValue(a,l.prevValue),i(null))},o=e=>{"Enter"===e.key?d(!1):"Escape"===e.key&&d(!0)},u=(0,S.useMemo)(()=>{const e={title:"",dataIndex:"name",minWidth:Qe.name,fixed:"left",render:(e,r,s)=>r.isSummaryRow?(0,t.jsx)(N.EY.nB,{children:"Monthly Total"}):l?.index===s?(0,t.jsxs)(N.xA.fI,{align:"middle",children:[(0,t.jsx)(N.lV.Item,{colSpan:9,name:[s,"name"],rules:[{required:!0,message:"Group name is required"}],children:(0,t.jsx)(N.pd,{onKeyDown:o})}),(0,t.jsx)(N.xA.fv,{span:1,children:(0,t.jsx)(N.K0,{iconName:"checkCircle",id:"oba-name_save-btn",title:"Save",width:16,color:N.Tj.forest_70,onClick:()=>d(!1)})}),(0,t.jsx)(N.xA.fv,{span:1,children:(0,t.jsx)(N.K0,{iconName:"timesCircle",id:"oba-name_cancel-btn",title:"Cancel",width:16,color:N.Tj.crimson_60,onClick:()=>d(!0)})})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(N.xA.fI,{align:"middle",children:[(0,t.jsx)(N.xA.fv,{children:(0,t.jsx)(N.EY.nB,{children:e})}),(0,t.jsx)(N.xA.fv,{children:(0,t.jsx)(N.K0,{iconName:"pen",id:"oba-name_edit-btn",title:"Edit",color:N.Tj.sky_60,onClick:()=>(e=>{i({index:e,prevValue:n?.[e]?.name||""})})(s)})})]}),(0,t.jsxs)(N.mc.VP,{children:[(0,t.jsxs)(N.EY.HP,{status:"helper",children:["Budget Alloted: ",r.allottedSum?(0,D.vv)(r.allottedSum,a):"-"]}),void 0!==r.spentSum&&r.spentSum>0&&(0,t.jsxs)(N.EY.HP,{status:"helper",children:["Budget Spent: ",(0,D.vv)(r.spentSum/100,a)]})]})]})},u=s.map((e,r)=>({title:`${e}*`,dataIndex:`monthBudgets[${r}]`,minWidth:Qe.month,render:(e,s,l)=>{if(s.isSummaryRow){const e=n?.reduce((e,a)=>e+(a.monthBudgetCents?.[r]??0),0),s=e?(0,D.vv)(e,a):"-";return(0,t.jsx)(na,{children:s})}{const e=s.monthBudgets?.[r],a=e?.budget.spentCents,n=e?.budget.unSpentCents,i=e?.budget.overSpentCents;let d="";return a&&e.current?d=`Spent: ${(0,D.ZV)(a/100)}`:n&&e.past&&(d=`Unspent: ${(0,D.ZV)(n/100)}`),(0,t.jsx)(N.lV.Item,{name:[l,"monthBudgetCents",r],children:(0,t.jsx)(N.YI,{min:0,disabled:e?.past,...d&&{helperMessage:d},...i&&{errorMessage:`Overspent: ${(0,D.ZV)(i/100)}`}})})}}})),c={title:"",dataIndex:"actions",render:(e,a,n)=>{const s=a.monthBudgets?.some(e=>!e.future);return a.isSummaryRow||0===n||s?null:(0,t.jsx)(N.rI,{menuType:"kebab",items:[{key:"delete",label:"Delete",onClick:()=>(e=>{const a=r.getFieldsValue(!0).groups.filter((a,n)=>n!==e);r.setFieldValue("groups",a)})(n)}]})}};return[e,...u,c]},[n,a,s,l]),c=(0,S.useMemo)(()=>{if(!n)return[];const e=n.map(({name:e,monthBudgets:a,monthBudgetCents:n},t)=>({key:`group-${t}`,name:e||`Group ${t+1}`,monthBudgets:a,monthBudgetCents:n,allottedSum:n?.reduce((e,a)=>Number(e)+(a??0),0)||0,spentSum:a?.reduce((e,a)=>e+(a.budget.spentCents??0),0)||0}));return[...e,{key:"summary",name:"Monthly Total",allottedSum:ea(n),isSummaryRow:!0}]},[n,s]);return(0,t.jsx)(aa,{monthsCount:s.length,children:(0,t.jsx)(N.XI,{id:"oba-bud_dist-tbl",cellsIdPrefix:"oba",noBorders:!0,columns:u,dataSource:c,pagination:!1})})},ra=k.J1`
  fragment AdvPlanBudgetsFragment on AdvertiserPlan {
    id
    version
    name
    currency
    status
    period {
      startDate
      endDate
    }
    dispatchOptIn
    totalBudget {
      budgetCents
      originalCents
      spentCents
      unSpentCents
      allottedCents
    }
    groups {
      id
      version
      name
      status
      monthBudgets {
        current
        future
        past
        month
        budget {
          budgetCents
          originalCents
          allottedCents
          spentCents
          unSpentCents
          overSpentCents
        }
      }
      bundles {
        channel
      }
    }
  }
`,sa=k.J1`
  query GetAdvPlanBudgets($id: ID!) {
    advertiserPlan(id: $id) {
      ...AdvPlanBudgetsFragment
    }
  }
  ${ra}
`,la=k.J1`
  mutation UpdateAdvPlanBudgets($input: AdvertiserPlanInput!) {
    updateAdvertiserPlan(input: $input) {
      ...AdvPlanBudgetsFragment
    }
  }
  ${ra}
`,ia=H.A.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0 5px 10px;
`,da=H.A.span`
  margin-left: 10px;
`,oa=()=>{const e=(0,y.Zp)(),a=(0,N.hN)(),{planId:n}=(0,y.g)(),r=location.pathname.includes("/details/"),s=r?`/oba/plans/${n}/details`:`/oba/plans/${n}`,[l,i]=(0,S.useState)(!1),[d]=N.lV.useForm(),o=N.lV.useWatch(["groups"],d),u=(0,S.useMemo)(()=>ea(o??[]),[o]),{planBudgets:c,planBudgetsLoading:p,planBudgetsError:m}=(e=>{const{data:a,loading:n,error:t,...r}=(0,F.IT)(sa,{variables:{id:e?+e:0},skip:!e});return{...r,planBudgets:a?.advertiserPlan,planBudgetsLoading:n,planBudgetsError:t}})(n),{updateAdvPlanBudgets:g,updatedAdvPlanBudgetsData:h,updatedAdvPlanBudgetsLoading:v,updatedAdvPlanBudgetsError:x}=(()=>{const[e,{data:a,loading:n,error:t,...r}]=(0,Z.n)(la,{variables:void 0});return{updateAdvPlanBudgets:e,updatedAdvPlanBudgetsData:a?.updateAdvertiserPlan,updatedAdvPlanBudgetsLoading:n,updatedAdvPlanBudgetsError:t,...r}})();(0,S.useEffect)(()=>{h&&(a.success("Budget Distribution has been saved!"),b())},[h]),(0,S.useEffect)(()=>{m&&a.error("Error loading plan data",{description:m.message})},[m]),(0,S.useEffect)(()=>{x&&a.error("Error saving plan budget distribution",{description:x?.message})},[x]),(0,S.useEffect)(()=>{if(!c)return;let e=[];e=c.groups.length?c.groups.map(({id:e,name:a,version:n,monthBudgets:t})=>({id:e,name:a,version:n,monthBudgets:t,monthBudgetCents:t.map(({budget:e})=>"number"==typeof e.budgetCents?e.budgetCents/100:null)})):[{name:"Group Name 1",monthBudgetCents:[]}],d.setFieldsValue({groups:e})},[c]);const b=()=>e(`${s}/campaign-allocation`);return p?(0,t.jsx)(N.y$,{fullscreen:!0}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.Qp,{defaultHome:!0,items:[{title:"Omni-Channel Budget Allocation",href:"/oba/plans"},...r?[{title:"OBA Details",href:s}]:[],{title:n?"OBA Settings":"New OBA Plan"}]}),(0,t.jsx)(N.mc.Y9,{children:(0,t.jsx)(N.EY.H3,{children:c?.name||"OBA Plan"})}),(0,t.jsx)(N.C1,{current:1,items:[{title:"Plan Settings",status:"finish",onClick:()=>e(`${s}/settings`)},{title:"Budget Distribution",status:c?.groups.length?"finish":"wait"},{title:"Campaign Allocation",status:c?.groups?.some(e=>e.bundles?.length)?"finish":"wait",...c?.groups[0]?.id&&{onClick:()=>b()}}]}),(0,t.jsx)(U,{allocatedBudget:u,spentBudget:Number(c?.totalBudget.spentCents)/100,unspentBudget:Number(c?.totalBudget.unSpentCents)/100,totalBudget:Number(c?.totalBudget.budgetCents)/100,currency:c?.currency,startDate:c?.period.startDate,endDate:c?.period.endDate}),(0,t.jsxs)(N.lV,{form:d,onFinish:async e=>{if(c){const{id:n,version:t,status:r,totalBudget:s}=c,o=e.dispatchOptIn,p=Number(s.budgetCents)/100,m=Number(s.budgetCents)/100;if(!l&&r===L.m8.Paused&&m>p&&u<=p)i(!0);else{const{groups:e}=d.getFieldsValue(!0);if(u>p)return void a.error("Total allocated budget cannot exceed total budget.");const r=Xe(c.period).length,s=e?.map(({monthBudgets:e,monthBudgetCents:a,...n})=>{const t=a?.map(e=>Math.round(100*(e||0)))||[];for(;t.length<r;)t.push(null);return{...n,monthBudgetCents:t}})||[];await g({variables:{input:{id:n,version:t,dispatchOptIn:o,groups:s}}})}}else a.error("Submission Failed!",{description:"Advertiser plan data is missed."})},children:[(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsxs)(N.mc.Y9,{children:[(0,t.jsx)(N.EY.H5,{children:"Budget Distribution"}),(0,t.jsx)(N.$n,{variant:"outlined",onClick:()=>{if(!o)return;const e={name:`Group Name ${o.length+1}`,monthBudgetCents:[]};d.setFieldValue("groups",[...o,e])},disabled:!o,children:"Add Group"})]}),(0,t.jsx)(N.lV.List,{name:"groups",children:(e,{add:a,remove:n})=>c&&(0,t.jsx)(ta,{period:c.period,currency:c.currency,groups:o??[]})}),(0,t.jsx)(ia,{children:(0,t.jsx)(N.xA.fI,{align:"middle",children:(0,t.jsx)(N.lV.Item,{colSpan:12,name:"dispatchOptIn",children:(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.lM,{defaultChecked:c?.dispatchOptIn,onChange:e=>{d.setFieldValue("dispatchOptIn",e)}}),(0,t.jsx)(da,{children:"Allocate spoilage spend pro-rata to upcoming monthly budgets."})]})})})})]}),(0,t.jsxs)(N.NG,{children:[(0,t.jsx)(N.$n,{href:"/oba/plans",variant:"outlined",id:"oba-budget_cancel-btn",children:"Cancel"}),(0,t.jsx)(N.$n,{htmlType:"submit",id:"oba-budget_submit-btn",loading:v,children:"Save & Continue"})]})]}),(0,t.jsx)(N.aF,{idPrefix:"oba-bud_warn-modal",title:"Resume OBA",open:l,okText:"Confirm",onOk:d.submit,onCancel:()=>i(!1),children:(0,t.jsx)(N.EY.nB,{children:"The budget allocation is under the Total budget. This will resume OBA."})})]})},ua=()=>{const e=(0,N.hN)(),{planId:a}=(0,y.g)(),[n,r]=(0,S.useState)(xe),[s,l]=(0,S.useState)(be),[i,d]=(0,S.useState)(null),[o,u]=(0,S.useState)(""),[c,p]=(0,S.useState)(!1),{planDetailsData:m,planDetailsLoading:g,planDetailsError:h,refetchPlanDetails:v}=(e=>{const{data:a,loading:n,error:t,refetch:r,...s}=(0,F.IT)(ce,{variables:e});return{planDetailsData:a?.advertiserPlan,planDetailsLoading:n,planDetailsError:t,refetchPlanDetails:r,...s}})({id:Number(a),filter:n}),{groupNamesOptions:x,groupNamesLoading:b,groupNamesError:f}=(e=>{const{groupNamesData:a,...n}=(e=>{const{data:a,loading:n,error:t}=(0,F.IT)(ie,{variables:e});return{groupNamesData:a?.groupNames||[],groupNamesLoading:n,groupNamesError:t}})({filter:e});return{groupNamesOptions:a.map(e=>({label:e.name,value:e.id})),...n}})({advertiserPlanId:Number(a)}),{campaignNamesOptions:j,campaignNamesLoading:P,campaignNamesError:A}=Ae({fromExistingAdvertiserPlans:!0,advertiserId:m?.advertiserId}),[C,I]=(0,S.useState)(m?.campaignDetails||[]),{pauseAdvPlan:B,pausedAdvPlanData:w,pausedAdvPlanLoading:$,pausedAdvPlanError:E}=(()=>{const[e,{data:a,loading:n,error:t}]=(0,Z.n)(pe,{variables:void 0});return{pauseAdvPlan:e,pausedAdvPlanData:a?.pauseAdvertiserPlan,pausedAdvPlanLoading:n,pausedAdvPlanError:t}})(),{unpauseAdvPlan:k,unpausedAdvPlanData:_,unpausedAdvPlanLoading:O,unpausedAdvPlanError:T}=(()=>{const[e,{data:a,loading:n,error:t}]=(0,Z.n)(me,{variables:void 0});return{unpauseAdvPlan:e,unpausedAdvPlanData:a?.unpauseAdvertiserPlan,unpausedAdvPlanLoading:n,unpausedAdvPlanError:t}})(),{pauseCampaign:Y,pausedCampaignData:V,pausedCampaignError:G}=(()=>{const[e,{data:a,loading:n,error:t}]=(0,Z.n)(ge,{variables:void 0});return{pauseCampaign:e,pausedCampaignData:a?.pauseCampaign,pausedCampaignLoading:n,pausedCampaignError:t}})(),{unpauseCampaign:M,unpausedCampaignData:q,unpausedCampaignError:W}=(()=>{const[e,{data:a,loading:n,error:t}]=(0,Z.n)(he,{variables:void 0});return{unpauseCampaign:e,unpausedCampaignData:a?.unpauseCampaign,unpausedCampaignLoading:n,unpausedCampaignError:t}})(),R=m?.status===L.m8.Paused;(0,S.useEffect)(()=>{(f||A||h)&&e.error("Error in fetching data",{description:f?.message||A?.message||h?.message})},[f,A,h]),(0,S.useEffect)(()=>{w&&e.success("OBA Plan has been Paused.")},[w]),(0,S.useEffect)(()=>{_&&e.success("OBA Plan has been Resumed.")},[_]),(0,S.useEffect)(()=>{(E||T)&&e.error(`Error while ${E?"pausing":"resuming"} OBA Plan.`,{description:(E||T)?.message})},[E,T]),(0,S.useEffect)(()=>{(V||q)&&e.success(`Campaign recommendation has been ${V?"Paused":"Resumed"}.`)},[V,q]),(0,S.useEffect)(()=>{(G||W)&&e.error(`Error while ${G?"pausing":"resuming"} OBA Plan.`,{description:(G||W)?.message})},[G,W]);const H=(e,a=[],n=[])=>{r(n=>({...n,[e]:a})),l(a=>({...a,[e]:n.map(e=>e.label).join(", ")}))},J=()=>p(!1);(0,S.useEffect)(()=>{let e=m?.campaignDetails;o&&(e=m?.campaignDetails.filter(e=>{const{group:a,channel:n,platform:t,tactic:r,campaign:s}=e;return a?.name.toLowerCase().includes(o)||n.toLowerCase().includes(o)||t?.name.toLowerCase().includes(o)||r.toLowerCase().includes(o)||s.name.toLowerCase().includes(o)})),I(e||[])},[o,m]);const U=(0,S.useMemo)(()=>[{title:"OBA Status",dataIndex:"status",width:60,align:"center",render:e=>((e,a)=>{switch(e){case L.M$.Active:return(0,t.jsx)(N.In,{name:"checkCircle",width:18,color:a?N.Tj.cloud_50:N.Tj.forest_70,title:a?"OBA Plan is paused":"Campaign is active"});case L.M$.Error:return(0,t.jsx)(N.In,{name:"timesCircle",width:18,color:a?N.Tj.cloud_50:N.Tj.crimson_70,title:a?"OBA Plan is paused":"Failed to generate & push the recommendation"});case L.M$.Paused:return(0,t.jsx)(N.In,{name:"pauseCircle",width:18,color:a?N.Tj.cloud_50:N.Tj.canary_70,title:a?"OBA Plan is paused":"Campaign is paused"});case L.M$.Manual:return(0,t.jsx)(N.In,{name:"userEdit",width:21,height:18,color:a?N.Tj.cloud_50:N.Tj.forest_70,title:a?"OBA Plan is paused":"Campaign needs to be updated manually"});case L.M$.Warning:return(0,t.jsx)(N.In,{name:"exclamationTriangle",width:21,height:18,color:a?N.Tj.cloud_50:N.Tj.pumpkin_60,title:a?"OBA Plan is paused":"Campaign is not delivering"});case L.M$.Unknown:return(0,t.jsx)(N.In,{name:"exclamationTriangle",width:21,height:18,color:a?N.Tj.cloud_50:N.Tj.pumpkin_60,title:a?"OBA Plan is paused":"Unknown recommendation status"});default:return"-"}})(e,R)},{title:"Group Name",dataIndex:["group","name"]},{title:"Channel",dataIndex:"channel"},{title:"Tactic",dataIndex:"tactic"},{title:"Campaign Name",dataIndex:"campaign",render:(e,a)=>(0,t.jsx)(N.EY.nB,{...(e.notFound||a.status===L.M$.Error)&&{status:"error"},children:e.name})},{title:"Monthly Recom.",dataIndex:"monthlyRecommendedCents",render:(e,{currency:a})=>e?(0,D.vv)(e/100,a):"-"},{title:"Daily Recom.",dataIndex:"dailyRecommendedCents",render:(e,{currency:a})=>e?(0,D.vv)(e/100,a):"-"},{title:"Last Updated",dataIndex:"lastUpdated",render:e=>e?(0,D.Yq)(e):"-"},{title:"",dataIndex:"actions",align:"center",width:40,render:(e,{campaign:a,group:n,status:r})=>{const s=r===L.M$.Paused;return(0,t.jsx)(N.rI,{menuType:"kebab",disabled:R,items:[{key:"pause",disabled:R,label:(s?"Resume":"Pause")+" Campaign Recommendation",onClick:()=>(async(e,a,n)=>{n?await M({variables:{campaignId:e,groupId:a}}):await Y({variables:{campaignId:e,groupId:a}}),await v()})(a.id,n.id,s)}]})}}],[R]);return $||O?(0,t.jsx)(N.y$,{}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(N.Qp,{defaultHome:!0,items:[{title:"Omni-Channel Budget Allocation",href:"/oba/plans"},{title:"OBA Details"}]}),(0,t.jsxs)(N.mc.Y9,{children:[(0,t.jsxs)(N.EY.H3,{children:["OBA Details - ",m?.name]}),(0,t.jsxs)(N.mc.fI,{children:[(0,t.jsxs)(N.$n,{id:"oba-pause_oba-btn",variant:"outlined",disabled:m?.disable[R?"resume":"pause"],onClick:()=>p(!0),children:[R?"Resume":"Pause"," OBA"]}),(0,t.jsx)(N.$n,{id:"oba-settings-btn",href:`/oba/plans/${a}/details/settings`,children:"Settings"})]})]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsxs)(N.mc.Y9,{children:[(0,t.jsx)(N.EY.H5,{children:"Filters"}),(0,t.jsx)(N.$n,{variant:"link",onClick:()=>{r(xe),l(be)},children:"Clear All"})]}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:ve.statuses,id:"oba-status-sel",mode:"multiple",allowClear:!0,options:fe,value:n.statuses,onChange:(e,a)=>H("statuses",e,a)})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:ve.groupIds,id:"oba-group-sel",mode:"multiple",allowClear:!0,loading:b,options:x,value:n.groupIds,onChange:(e,a)=>H("groupIds",e,a)})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:ve.channels,id:"oba-channel-sel",mode:"multiple",allowClear:!0,options:je,value:n.channels,onChange:(e,a)=>H("channels",e,a)})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:ve.tactics,id:"oba-tactic-sel",mode:"multiple",allowClear:!0,options:Pe,value:n.tactics,onChange:(e,a)=>H("tactics",e,a)})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.l6,{label:ve.vendorCampaignIds,id:"oba-campaigns-sel",mode:"multiple",allowClear:!0,loading:P,options:j,value:n.vendorCampaignIds,onChange:(e,a)=>H("vendorCampaignIds",e,a)})})]}),(0,t.jsxs)(N.xA.fI,{children:[(0,t.jsx)(N.xA.fv,{children:(0,t.jsx)(N.EY.nB,{children:"Active Filters"})}),(0,t.jsx)(N.xA.fv,{children:(()=>{const e=Object.entries(s).filter(([,e])=>e);return e.length?e.map(([e,a])=>(0,t.jsx)(N.vw,{status:"primary",children:`${ve[e]}: ${a}`},e)):(0,t.jsx)(N.vw,{status:"disabled",children:"None"})})()})]})]}),(0,t.jsxs)(N.mc.wn,{children:[(0,t.jsx)(N.EY.H5,{children:"Budget Spend"}),(0,t.jsxs)(N.xA.fI,{justify:"space-between",children:[(0,t.jsx)(N.xA.fv,{span:4,children:(0,t.jsx)(N.Wg,{id:"oba-status_filter-tab",disabled:R,value:i,options:[{label:"All Campaigns",value:null},...fe],onChange:e=>{d(e),H("statuses",e?[e]:[],fe.filter(a=>a.value===e))}})}),(0,t.jsx)(N.xA.fv,{span:2,children:(0,t.jsx)(N.vj,{id:"oba-bud_spend-search",placeholder:"Group, Channel, Tactic, Campaign",onSearch:u})})]}),(0,t.jsx)(N.XI,{id:"oba-bud_spend-tbl",cellsIdPrefix:"oba",rowKey:e=>e.campaign.id,dataSource:C,columns:U,loading:g,pagination:!0})]}),(0,t.jsxs)(N.aF,{idPrefix:"oba-pause_oba-modal",title:(R?"Resume":"Pause")+" Budget Optimization",open:c,okText:"Confirm",onOk:async()=>{R?await k({variables:{id:Number(a)}}):(await B({variables:{id:Number(a)}}),d(null)),J()},onCancel:J,children:[(0,t.jsxs)(N.EY.nB,{children:["This action will ",R?"resume":"pause"," automatic budget optimizations for all campaigns within this plan."]}),(0,t.jsxs)(N.EY.nB,{children:["You can ",R?"pause":"resume"," optimizations at any time."]})]})]})},ca=()=>(0,t.jsxs)(y.BV,{children:[(0,t.jsx)(y.qh,{path:"/plans",element:(0,t.jsx)(q,{})}),(0,t.jsx)(y.qh,{path:"/plans/create",element:(0,t.jsx)(re,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/settings",element:(0,t.jsx)(re,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/campaign-allocation",element:(0,t.jsx)(Ke,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/budget-distribution",element:(0,t.jsx)(oa,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/details",element:(0,t.jsx)(ua,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/details/settings",element:(0,t.jsx)(re,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/details/campaign-allocation",element:(0,t.jsx)(Ke,{})}),(0,t.jsx)(y.qh,{path:"/plans/:planId/details/budget-distribution",element:(0,t.jsx)(oa,{})}),(0,t.jsx)(y.qh,{path:"/",element:(0,t.jsx)(y.C5,{to:"/oba/plans"})}),(0,t.jsx)(y.qh,{path:"*",element:(0,t.jsx)("h2",{children:"Page Not Found in OBA"})})]}),pa=()=>(0,t.jsx)(E,{children:(0,t.jsx)(ca,{})})}}]);