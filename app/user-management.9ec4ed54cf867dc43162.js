"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[106],{28634:(e,t,a)=>{function l(e){return e?e.charAt(0).toUpperCase()+e.slice(1).toLowerCase():""}a.d(t,{Z:()=>l})},48140:(e,t,a)=>{a.r(t),a.d(t,{default:()=>z});var l=a(74848),n=a(96540),i=a(34899),r=a(94439),s=a(5482),o=a(44669);const d=(0,o.A)(r.xA.fv)`
  overflow: auto;
  margin-bottom: 70px;
`,c=o.A.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
`,u=o.A.div``,m=o.A.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: auto;
`,h=o.A.div`
  margin: auto 0px 2px 0px;
`,p=o.A.div`
  display: flex;
  gap: 12px;
  height: auto;
`;var x=a(39708),g=a(95420);const v=x.J1`
  mutation UpdateUser($userId: ID!, $role: String, $isActive: Boolean) {
    updateUser(userId: $userId, role: $role, isActive: $isActive) {
      success
      message
      user {
        id
        role
        status
      }
    }
  }
`;const y=[{key:"advertisers",label:"Advertisers",externalVisible:!0},{key:"media-planning",label:"Media Planning & Requests",externalVisible:!1},{key:"campaign-management",label:"Campaign Management & Setup",externalVisible:!1},{key:"campaign-optimization",navKey:"campaignOptimizationPacing",externalNavKey:"campaignOptimization",externalVisible:!0},{key:"reports",label:"Reports",externalVisible:!1},{key:"market-insights",label:"Market Insights",externalVisible:!1},{key:"data-management",label:"Data Management",externalVisible:!1},{key:"pricing-billing",label:"Pricing & Billing",externalVisible:!1},{key:"user-management",label:"User Management",externalVisible:!0}],f={"mh-administrator":{advertisers:"full","media-planning":"full","campaign-management":"full","campaign-optimization":"full",reports:"full","market-insights":"full","data-management":"full","pricing-billing":"full","user-management":"full"},"mh-standard":{advertisers:"full","media-planning":"full","campaign-management":"full","campaign-optimization":"full",reports:"full","market-insights":"full","data-management":"full","pricing-billing":"full","user-management":"none"},"mh-read-only":{advertisers:"view","media-planning":"view","campaign-management":"view","campaign-optimization":"view",reports:"view","market-insights":"view","data-management":"view","pricing-billing":"view","user-management":"none"}};var j=a(28634),b=a(52244);const w=({user:e,refetch:t,index:a})=>{const[s,o]=(0,n.useState)(!1),{t:x}=(0,i.Bd)(["advertisers","common"]),{updateFields:w}=function(){const e=(0,r.hN)(),[t,{loading:a,error:l}]=(0,g.n)(v);return{updateFields:async(a,l)=>{if(void 0!==l.role||void 0!==l.isActive)try{const n=await t({variables:{userId:a,...l}}),i=n.data?.updateUser;i?.success?e.success(i.message):e.error(i?.message??"Update failed")}catch(t){e.error(`Error: ${t}`)}},loading:a,error:l}}(),[A,S]=(0,n.useState)(e.role?.[0]??"mh-read-only"),[k,C]=(0,n.useState)("active"===e.status.toLowerCase()),[_,I]=(0,n.useState)(!1),{hasPermission:U,isExternal:O}=(0,b.A)(),{t:R}=(0,i.Bd)("nav"),T=U("mh-user-write"),V=(0,r.hN)(),[$]=r.lV.useForm();(0,n.useEffect)(()=>{S(e.role?.[0]??"mh-read-only")},[e.role]);const M=[{title:"Access",dataIndex:"access",key:"access",width:120,align:"center",render:e=>"full"===e?(0,l.jsx)(r.In,{name:"checkCircle",color:r.Tj.forest_60,height:18,width:18}):"view"===e?(0,l.jsx)(r.In,{name:"checkCircle",color:r.Tj.cloud_50,height:18,width:18}):(0,l.jsx)(r.In,{name:"timesCircle",color:r.Tj.cloud_50,height:18,width:18})},{title:"Module",dataIndex:"module",key:"module"}],P=(0,n.useMemo)(()=>{const e=f[A]??f["mh-read-only"];return y.filter(e=>!O||e.externalVisible).map(t=>{const a="navKey"in t?R(O&&"externalNavKey"in t?t.externalNavKey:t.navKey):"label"in t?t.label:"";return{key:t.key,module:a,access:e[t.key]}})},[A,O]);return(0,l.jsxs)(l.Fragment,{children:[!s&&(0,l.jsx)(r.$n,{id:`user-details-${a}-btn`,variant:"text",onClick:()=>o(!0),children:"Details"}),(0,l.jsx)(r._s,{id:"user-drawer",title:"User Details",placement:"right",width:"40vw",onClose:()=>{o(!1),S(e.role?.[0]??"mh-read-only"),C("active"===e.status.toLowerCase())},open:s,children:s&&(0,l.jsxs)(r.lV,{form:$,onFinish:async()=>{if(!T)return;const a=e.role?.[0]??"mh-read-only",l="active"===e.status.toLowerCase(),n={};A!==a&&(n.role=A),k!==l&&(n.isActive=k),0!==Object.keys(n).length?(I(!0),w(e.id,n).then(()=>{t(),I(!1)})):V.info("No changes to save.")},style:{padding:0,height:"100%",display:"flex",flexDirection:"column"},children:[(0,l.jsxs)(d,{children:[(0,l.jsxs)(r.mc.wn,{children:[(0,l.jsx)(r.EY.H5,{id:"user-drawer_general_settings-ttl",children:"General Settings"}),(0,l.jsxs)(c,{children:[(0,l.jsx)(r.pd,{id:"user-drawer_name-inp",label:"User Name",value:(0,j.Z)(e.name),disabled:!0}),(0,l.jsx)(r.pd,{id:"user-drawer_email-inp",label:"Email",value:(0,j.Z)(e.email),disabled:!0}),(0,l.jsx)(u,{children:(0,l.jsx)(r.l6,{id:"user-drawer_role-sel",placeholder:"Select role",label:"Role",value:A,disabled:!T,options:[{label:"Administrator",value:"mh-administrator"},{label:"Standard User",value:"mh-standard"},{label:"Read Only",value:"mh-read-only"}],onChange:async e=>{S(e)}})}),(0,l.jsxs)(p,{children:[(0,l.jsxs)(m,{children:[(0,l.jsx)(r.EY.JU,{children:"Status"}),(0,l.jsx)(r.lM,{checked:k,onChange:e=>C(e)})]}),(0,l.jsx)(h,{id:"user-drawer_status-swch",children:k?"Active":"Inactive"})]})]})]}),(0,l.jsxs)(r.mc.wn,{children:[(0,l.jsx)(r.EY.H5,{id:"user-drawer_module_access-ttl",children:"Module Access"}),(0,l.jsx)(r.XI,{columns:M,dataSource:P,pagination:!1,id:"user-drawer_module_access-tbl",cellsIdPrefix:"user-drawer_module_access",rowKey:"key"})]})]}),(0,l.jsx)(r.xA.fI,{children:(0,l.jsx)(r.xA.fv,{span:12,children:(0,l.jsxs)(r.NG,{left:"60vw",marginBottom:0,children:[(0,l.jsx)(r.$n,{onClick:()=>o(!1),htmlType:"button",id:"user-drawer_close-btn",variant:"outlined",children:"Close"}),T&&(0,l.jsx)(r.$n,{htmlType:"submit",id:"user-drawer_save-btn",loading:_,children:"Save"})]})})})]})})]})},A=(0,o.A)(r.EY.H6)`
  margin-bottom: 0px;
  padding: 2px;
`,S=(0,o.A)(r.mc.Y9)`
  display: flex;
  justify-content: 'start';
  width: 100%;
  margin-bottom: 16px;
`,k=(o.A.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-bottom: 16px;
`,o.A.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 24px;
`),C=o.A.div`
  background-color: ${({color:e})=>r.Tj[e]};
  padding: 4px 6px;
  border-radius: 9999px;
  min-width: 100px;
  text-align: center;
`,_=o.A.div`
  font-size: 20px;
  text-align: center;
  margin-top: 4px;
`,I=({totals:e})=>(0,l.jsxs)(r.mc.wn,{id:"user-summary-banner",children:[(0,l.jsx)(S,{children:(0,l.jsx)(r.EY.H5,{children:"User Summary"})}),(0,l.jsxs)(k,{children:[(0,l.jsxs)(r.mc.VP,{children:[(0,l.jsx)(C,{color:"sky_30",children:(0,l.jsx)(A,{id:"user-summary-admins-ttl",children:"Administrator"})}),(0,l.jsx)(_,{children:e.totalAdministrators})]}),(0,l.jsxs)(r.mc.VP,{children:[(0,l.jsx)(C,{color:"sky_10",children:(0,l.jsx)(A,{id:"user-summary-standard-ttl",children:"Standard User"})}),(0,l.jsx)(_,{children:e.totalStandard})]}),(0,l.jsxs)(r.mc.VP,{children:[(0,l.jsx)(C,{color:"crimson_20",children:(0,l.jsx)(A,{id:"user-summary-readonly-ttl",children:"Read Only"})}),(0,l.jsx)(_,{children:e.totalReadOnly})]})]})]}),U=o.A.div`
  min-width: 900px;
  padding-bottom: 10px;
`,O=(o.A.span`
  color: ${r.Tj.sky_60};
  cursor: pointer;
  width: auto;
`,(0,o.A)(r.Ex)`
  border: 1px solid ${({color:e})=>e};
  color: ${({fill:e,color:t})=>e?r.Tj.cloud_100:t};
  background-color: ${({fill:e,color:t})=>e?t:"transparent"};
`);o.A.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;var R=a(26417);const T=o.A.div`
  display: flex;
  flex-direction: column;
  min-width: 900px;
  margin-bottom: 70px;
`,V=({summaryBanner:e})=>{const[t,a]=(0,n.useState)(!1),i=()=>a(e=>!e),s=[{title:"Module",dataIndex:"module",key:"module"},...["Administrator","Standard User","Read Only"].map(e=>({title:e,dataIndex:e,key:e,align:"center",render:e=>(e=>{switch(e){case"full":return(0,l.jsx)(r.In,{name:"checkCircle",color:r.Tj.forest_60,height:18,width:18});case"none":return(0,l.jsx)(r.In,{name:"timesCircle",color:r.Tj.cloud_50,height:18,width:18});case"view":return(0,l.jsx)(r.In,{name:"checkCircle",color:r.Tj.cloud_50,height:18,width:18})}})(e)}))],o=Object.entries({Advertisers:{Administrator:"full","Standard User":"full","Read Only":"view"},"Media Planning & Request":{Administrator:"full","Standard User":"full","Read Only":"view"},"Campaign Management & Setup":{Administrator:"full","Standard User":"full","Read Only":"view"},"Campaign Optimization & Pacing":{Administrator:"full","Standard User":"full","Read Only":"view"},Reports:{Administrator:"full","Standard User":"full","Read Only":"view"},"Market Insights":{Administrator:"full","Standard User":"full","Read Only":"view"},"Data Management":{Administrator:"full","Standard User":"full","Read Only":"view"},"Pricing & Billing":{Administrator:"full","Standard User":"full","Read Only":"view"},"User Management":{Administrator:"full","Standard User":"none","Read Only":"none"}}).map(([e,t])=>({key:e,module:e,...t}));return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.$n,{id:"user-permissions-btn",onClick:i,children:"Roles & Permissions"}),(0,l.jsxs)(r._s,{title:"Roles & Permissions",placement:"right",width:"70vw",onClose:i,open:t,style:{padding:0},children:[(0,l.jsxs)(T,{children:[e,(0,l.jsx)(r.mc.wn,{style:{marginTop:0},children:(0,l.jsx)(r.XI,{columns:s,dataSource:o,pagination:!1})})]}),(0,l.jsx)(r.xA.fI,{children:(0,l.jsx)(r.xA.fv,{span:12,children:(0,l.jsx)(r.NG,{left:"30vw",marginBottom:0,children:(0,l.jsx)(r.$n,{onClick:()=>a(!1),htmlType:"button",id:"user_management-permissions_roles_cancel-btn",variant:"outlined",children:"Close"})})})})]})]})},$={"mh-administrator":{label:"Administrator",color:r.Tj.sky_30,value:"mh-administrator"},"mh-standard":{label:"Standard User",color:r.Tj.sky_10,value:"mh-standard"},"mh-read-only":{label:"Read Only",color:r.Tj.crimson_20,value:"mh-read-only"}},M={active:{label:"Active",color:r.Tj.forest_70},inactive:{label:"Inactive",color:r.Tj.cloud_40}};function P(e,t=!1){return Object.entries(e).map(([e,{label:a,value:l}])=>({label:a,value:l??(t?e:"")}))}var B=a(16887);const z=function(){const{t:e}=(0,i.Bd)(["users","common"]),t=(0,n.useContext)(b.c),{isAdmin:a}=(0,b.A)(),o=(0,n.useRef)(null),[d,c]=(0,n.useState)({totalAdministrators:0,totalReadOnly:0,totalStandard:0}),[u,m]=(0,n.useState)({totalActive:0,totalInactive:0,totalUsers:0}),[h,p]=(0,n.useState)([]),x=[{title:e("users:columns.name"),dataIndex:"name",key:"name",width:"20%",ellipsis:!0},{title:e("users:columns.email"),dataIndex:"email",key:"email",width:"auto",ellipsis:!0},{title:e("users:columns.role"),dataIndex:"role",key:"role",width:"15%",render:e=>{const t=$[e?.[0]??"mh-read-only"];return(0,l.jsx)(O,{color:t?.color,content:t?.label,fill:!0})}},{title:e("users:columns.status"),dataIndex:"status",key:"status",width:"10%",render:e=>(0,l.jsx)(O,{color:M[e]?.color,content:M[e]?.label})},{title:e("users:columns.lastLogin"),dataIndex:"lastLogin",key:"lastLogin",width:"15%"},{key:"actions",align:"center",width:"10%",render:(e,t,a)=>(0,l.jsx)(w,{index:a,user:t,refetch:()=>{o.current?.refetchWithFilters()}})}],g=P($),v=P(M,!0),y=[{name:"id",label:e("users:columns.name"),type:"multiple",optionsTagLabelKey:"label",options:h,renderControl:({value:t,setValue:a})=>(0,l.jsx)(r.l6,{id:"user-name-sel",label:e("users:columns.name"),mode:"multiple",showSearch:!0,placeholder:"Select",options:(0,B.ap)(A.options,h),value:Array.isArray(t)?t:[],onChange:e=>{a(e),(0,B.$B)(e,A.options,p)},loading:A.loading,onSearch:A.onSearch,onBlur:A.onBlur,onPopupScroll:A.onPopupScroll,filterMode:"server"})},{name:"role",label:e("common:role"),type:"multiple",options:g,renderControl:({value:t,setValue:a})=>(0,l.jsx)(r.l6,{label:e("common:role"),id:"user-role-sel",placeholder:"Select",mode:"multiple",showSearch:!0,value:Array.isArray(t)?t:[],onChange:e=>a(e),options:g})},{name:"status",label:e("common:status"),type:"multiple",renderControl:({value:t,setValue:a})=>(0,l.jsx)(r.l6,{label:e("common:status"),id:"user-status-sel",placeholder:"Select",mode:"multiple",showSearch:!0,value:Array.isArray(t)?t:[],onChange:e=>a(e),options:v})}],f=[{name:"status",label:"View",type:"single",placement:"header",renderControl:({value:t,setValue:a})=>{const n=Array.isArray(t)?2===t.length?"all":t[0]??"all":t??"all";return(0,l.jsx)(r.Wg,{value:n||"all",onChange:e=>{const t=String(e);a("all"===t?["active","inactive"]:[t])},options:[{label:(0,l.jsx)("span",{id:"user-all-txt",children:e("users:filters.allUsers",{count:u.totalUsers})}),value:"all"},{label:(0,l.jsx)("span",{id:"user-active-txt",children:e("users:filters.activeUsers",{count:u.totalActive})}),value:"active"},{label:(0,l.jsx)("span",{id:"user-inactive-txt",children:e("users:filters.inactiveUsers",{count:u.totalInactive})}),value:"inactive"}]})}}],{refetch:j}=(0,s.Yg)(void 0,void 0,!0),A=(0,B.F$)({queryFn:(0,B.qB)({refetch:j,buildVars:(e,t)=>({options:{search:{query:e,fields:["name","email"]},paginate:{limit:t.limit,offset:t.offset}}}),getItems:e=>e?.users?.users??[],mapToOption:e=>({label:e.name,value:e.id})}),pageSize:20}),{refetch:S}=(0,s.gr)(),k=function(e,t,a=()=>{}){return async(l,n)=>{const i=l?.search,r={...l??{}},s=Object.entries(r).flatMap(([e,t])=>null==t||0===t.length?[]:Array.isArray(t)?[{field:e,operator:"in",values:t.map(e=>String(e))}]:[{field:e,operator:"in",values:[String(t)]}]),o="string"==typeof i&&i.trim().length>0?{query:i.trim(),fields:["name","email"]}:void 0,d={paginate:{limit:n?.pageSize??10,offset:((n?.current??1)-1)*(n?.pageSize??10)},search:o,operators:s.length>0?s:void 0},c=await e({options:d}),{totalAdministrators:u=0,totalReadOnly:m=0,totalStandard:h=0}=c.data?.users??{};return t({totalAdministrators:u,totalReadOnly:m,totalStandard:h}),a({totalActive:c.data?.users.toggle.totalActive??0,totalInactive:c.data?.users?.toggle.totalInactive??0,totalUsers:c.data?.users?.toggle.totalUsers??0}),{data:c.data?.users?.users??[],total:c.data?.users?.totalCount??0}}}(S,c,m),C=(0,l.jsx)(V,{summaryBanner:(0,l.jsx)(I,{totals:d,margin:"16px 0px 0px 0px"})});return t?.permissionsLoaded?a?(0,l.jsxs)(U,{children:[(0,l.jsx)(r.Qp,{items:[{title:e("common:home"),href:"/"},{title:e("users:title")}]}),(0,l.jsx)(R.A,{id:"user-tbl",cellsIdPrefix:"user",rowKey:"id",ref:o,sectionTitle:e("users:title"),titleButtons:C,summaryContent:(0,l.jsx)(I,{totals:d}),columns:x,filterItems:[...y,...f],initialFilters:{},filterMode:"server",queryFn:k,tableSearch:{show:!0},tableTitle:e("users:tableTitle")})]}):(window.location.assign("/"),null):(0,l.jsx)(r.y$,{})}}}]);