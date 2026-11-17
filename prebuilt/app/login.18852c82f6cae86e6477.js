"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[6966],{70238:(e,i,n)=>{n.r(i),n.d(i,{default:()=>w});var t=n(74848),l=n(96540),o=n(44669);const s=n.p+"84cd866ab1562485107d.jpg",a=o.A.div`
  width: 400px;

  button {
    width: 100% !important;
    font-size: large !important;
    border: none !important;
  }
`,r=o.A.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: url(${s});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`,c=o.A.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`,d=o.A.div`
  text-align: center;
  color: white;
`;var h=n(16845),f=n(52244),g=n(75352),u=n(94439),p=n(54863);const w=()=>{const{user:e}=(0,f.A)(),[i,n]=(0,l.useState)((0,p.hN)()),[o,s]=(0,l.useState)((0,p.Qo)());(0,l.useEffect)(()=>{e&&(window.location.href="/")},[e]);const w=new URLSearchParams(window.location.search).get("destinationPath")||"/";return(0,l.useEffect)(()=>{o&&(window.location.href=w)},[w,o]),(0,t.jsxs)(r,{children:[(0,t.jsx)(c,{children:(0,t.jsxs)("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[(0,t.jsx)(a,{children:(0,t.jsx)(h.$,{id:"signin",size:"large",onClick:()=>{if(i)return(0,p.I_)(),void(window.location.href=w);let e=`${g.DR.shared}/b0a8be27d966/login?destinationPath=${encodeURIComponent(w)}`;origin.includes("localhost")&&(e=`${e}&env=local`),window.location.href=e},children:"Sign in"})}),(0,t.jsxs)("label",{htmlFor:"offline-switch",style:{display:"flex",alignItems:"center",gap:8,marginTop:16,fontSize:14,color:u.Tj.cloud_0},children:[(0,t.jsx)(u.lM,{id:"offline-switch",size:"small",checked:i,disabled:o,onChange:e=>{(0,p.XR)(e),n(e)}}),"Work offline (backend off, demo data)"]}),(0,t.jsxs)("label",{htmlFor:"skip-login-switch",style:{display:"flex",alignItems:"center",gap:8,marginTop:8,fontSize:14,color:u.Tj.cloud_0},children:[(0,t.jsx)(u.lM,{id:"skip-login-switch",size:"small",checked:o,onChange:e=>{(0,p.CA)(e),s(e),n((0,p.hN)())}}),"Skip sign-in (always signed in as the demo user)"]})]})}),(0,t.jsxs)(d,{children:["© ",(new Date).getFullYear()," TRAVELAUDIENCE.COM GmbH. All rights reserved"]})]})}}}]);