"use strict";(self.webpackChunkmediahub_fe=self.webpackChunkmediahub_fe||[]).push([[907],{34741:(e,i,a)=>{a.r(i),a.d(i,{default:()=>U});var t=a(74848),r=a(98549),s=a(80643),n=a(44669),o=a(94439);const l="#141414",d="#dcdcdc",c="#b80000",p=(n.A.div`
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;
  background: ${o.Tj.sky_90};
  color: ${o.Tj.cloud_0};
  font-size: 13px;
  button {
    padding: 4px 12px;
    border: 1px solid ${o.Tj.cloud_0};
    border-radius: 4px;
    background: transparent;
    color: ${o.Tj.cloud_0};
    font: inherit;
    cursor: pointer;
  }
  button:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`,n.A.div`
  min-height: 100vh;
  background: ${"#f6f6f6"};
  color: ${l};
  font-family: Helvetica, Arial, sans-serif;
  a {
    color: inherit;
    text-decoration: none;
  }
`),h=n.A.header`
  background: ${l};
  color: #fff;
`,m=n.A.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px;
`,x=n.A.span`
  display: inline-flex;
  gap: 3px;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 1px;
  span {
    padding: 1px 8px;
    background: #fff;
    color: ${l};
  }
`,g=n.A.div`
  display: flex;
  gap: 20px;
  font-size: 14px;
`,u=n.A.nav`
  border-bottom: 1px solid ${d};
  background: #fff;
  ul {
    display: flex;
    gap: 4px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    overflow-x: auto;
    list-style: none;
  }
  li a {
    display: block;
    padding: 12px 12px;
    border-bottom: 3px solid transparent;
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
  }
  li a[aria-current='page'] {
    border-bottom-color: ${c};
  }
`,f=n.A.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px 48px;
`,b=n.A.aside`
  display: flex;
  flex-direction: column;
  align-items: ${({$center:e})=>e?"center":"stretch"};
  gap: 4px;
  margin: 16px 0;
`,j=n.A.span`
  color: #6b6b6b;
  font-size: 11px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
`,y=n.A.div`
  width: 100%;
  max-width: ${({$width:e})=>e}px;
  background: #fff;
  border: 1px solid ${d};
`,w=n.A.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 24px;
  @media (max-width: 960px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,v=n.A.h2`
  margin: 24px 0 12px;
  padding-top: 8px;
  border-top: 3px solid ${l};
  font-size: 20px;
`,k=n.A.article`
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid ${d};
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
  h1 {
    margin: 0 0 8px;
    font-size: 32px;
    line-height: 1.15;
  }
  p {
    margin: 0 0 8px;
    color: #3d3d3d;
    line-height: 1.45;
  }
`,A=n.A.div`
  aspect-ratio: ${({$ratio:e})=>e??"16 / 9"};
  background: linear-gradient(
    135deg,
    hsl(${({$hue:e})=>e}, 35%, 38%),
    hsl(${({$hue:e})=>(e+40)%360}, 40%, 62%)
  );
`,$=n.A.span`
  color: #6b6b6b;
  font-size: 12px;
`,z=n.A.span`
  margin-right: 6px;
  padding: 1px 6px;
  background: ${c};
  color: #fff;
  font-size: 11px;
  font-weight: 700;
`,T=n.A.div`
  display: grid;
  grid-template-columns: repeat(${({$columns:e})=>e??2}, minmax(0, 1fr));
  gap: 16px;
  @media (max-width: 700px) {
    grid-template-columns: minmax(0, 1fr);
  }
`,C=n.A.article`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${d};
  h3 {
    margin: 4px 0 0;
    font-size: 17px;
    line-height: 1.25;
  }
  p {
    margin: 0;
    color: #3d3d3d;
    font-size: 14px;
    line-height: 1.4;
  }
`,S=n.A.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
  strong {
    display: block;
    margin-top: 6px;
    font-size: 14px;
    line-height: 1.25;
  }
`,I=n.A.div`
  display: flex;
  flex-direction: column;
`,L=n.A.ol`
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: most;
  li {
    display: flex;
    gap: 12px;
    padding: 10px 0;
    border-bottom: 1px solid ${d};
    counter-increment: most;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
  }
  li::before {
    content: counter(most);
    color: ${c};
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
  }
`,W=n.A.footer`
  margin-top: 32px;
  padding: 24px 16px;
  background: ${l};
  color: #c9c9c9;
  font-size: 13px;
  div {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    max-width: 1200px;
    margin: 0 auto;
  }
`,_=({src:e,alt:i,hue:a=210,ratio:r})=>(0,t.jsx)(A,{$hue:a,$ratio:r,style:{overflow:"hidden"},children:(0,t.jsx)("img",{src:e,alt:i,loading:"lazy",style:{display:"block",width:"100%",height:"100%",objectFit:"cover"}})}),D=["Home","News","Sport","Business","Innovation","Culture","Arts","Travel","Earth","Video","Live"],E=e=>`/Images/news-${String(e).padStart(2,"0")}.png`,H=[{image:E(1),alt:"Two men shake hands outdoors as onlookers watch",title:"Leaders shake on deal after a busy week of talks",summary:"Business and political figures gathered outdoors as the agreement was sealed.",hue:210,meta:"2 hrs ago · Politics"},{image:E(3),alt:"A woman looks on from a courtroom bench",title:"Court hears final arguments in long-running case",summary:"A verdict is expected later this week.",hue:190,meta:"3 hrs ago · World"},{image:E(4),alt:"Illustration of human and robot hands reaching for a red button",title:"Who has their hand on the button? The debate over AI control",summary:"Experts split over how much power machines should be given.",hue:30,meta:"4 hrs ago · Technology"},{image:E(7),alt:"Two bearded men talk in a hospital room",title:"Hospital visit puts spotlight on recovery ahead of Games of the Unbroken 2026",summary:"Patients describe the road back to sport after serious injury.",hue:340,meta:"5 hrs ago · Health"}],N=[{image:E(8),alt:"Stone huts on a rugged, rocky mountainside",title:"Remote stone huts found on rugged hillside",summary:"Walkers stumbled on the shelters high above the valley.",hue:150,meta:"1 hr ago · Travel"},{image:E(9),alt:"Aerial view of a long sandy beach and dunes at dusk",title:"Winter calm settles over the dune coast",summary:"Quiet beaches are drawing visitors out of season.",hue:120,meta:"2 hrs ago · Earth"},{image:E(10),alt:"Chambers carved from rock in an underground city",title:"Underground city carved from rock opens new chambers",summary:"Visitors can now explore passages closed for decades.",hue:260,meta:"6 hrs ago · Culture"},{image:E(5),alt:"Slices of toasted bread rings in a terracotta bowl",title:"The humble twice-baked bread making a comeback",summary:"Chefs are rediscovering a simple classic.",hue:15,meta:"7 hrs ago · Food"},{image:E(6),alt:"Armed men stand on a vehicle in mountainous terrain",title:"Armed men gather in mountain region as tensions simmer",summary:"Local officials call for calm.",hue:300,meta:"8 hrs ago · World"},{image:E(2),alt:"A man in a dinner suit aims a suppressed pistol from the shadows",title:"First look at the new spy thriller",summary:"A moody teaser hints at the film’s tone.",hue:90,meta:"9 hrs ago · Culture"}],F=[{title:"Morning briefing",image:E(9)},{title:"The Business Hour",image:E(1)},{title:"Food Stories",image:E(5)},{title:"Culture Club",image:E(10)},{title:"Travel Talk",image:E(8)}],B=["Leaders shake on deal after a busy week of talks","Court hears final arguments in long-running case","The debate over who controls AI","Underground city opens new chambers","The humble bread making a comeback"],M=({size:e,center:i})=>{const a=(e=>r.k.find(i=>i.size===e))(e);return a?(0,t.jsxs)(b,{$center:i,role:"complementary","aria-label":"Advertisement",children:[(0,t.jsx)(j,{children:"Advertisement"}),(0,t.jsx)(y,{$width:a.width,children:(0,t.jsx)(s.zZ,{banner:a,interactive:!0})})]}):null},P=({story:e})=>(0,t.jsxs)(C,{children:[(0,t.jsx)(_,{src:e.image,alt:e.alt,hue:e.hue}),(0,t.jsx)("h3",{children:e.title}),(0,t.jsx)("p",{children:e.summary}),(0,t.jsx)($,{children:e.meta})]}),U=()=>{const[e,...i]=H;return(0,t.jsxs)(p,{children:[(0,t.jsx)(h,{children:(0,t.jsxs)(m,{children:[(0,t.jsxs)(x,{"aria-label":"Daily News",children:[(0,t.jsx)("span",{children:"DAILY"}),(0,t.jsx)("span",{children:"NEWS"})]}),(0,t.jsxs)(g,{children:[(0,t.jsx)("span",{children:"Sign in"}),(0,t.jsx)("span",{children:"Notifications"}),(0,t.jsx)("span",{children:"Search"})]})]})}),(0,t.jsx)(u,{"aria-label":"Sections",children:(0,t.jsx)("ul",{children:D.map((e,i)=>(0,t.jsx)("li",{children:(0,t.jsx)("a",{href:"#",onClick:e=>e.preventDefault(),"aria-current":0===i?"page":void 0,children:e})},e))})}),(0,t.jsxs)(f,{children:[(0,t.jsx)(b,{role:"complementary","aria-label":"Advertisement",children:(0,t.jsx)("img",{src:"/Images/top-ad.png",alt:"Advertisement",style:{display:"block",width:"100%",height:"auto"}})}),(0,t.jsxs)(w,{children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)(k,{children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{children:e.title}),(0,t.jsx)("p",{children:e.summary}),(0,t.jsxs)($,{children:[(0,t.jsx)(z,{children:"LIVE"}),e.meta]})]}),(0,t.jsx)(_,{src:e.image,alt:e.alt,hue:e.hue})]}),(0,t.jsx)(T,{$columns:3,children:i.map(e=>(0,t.jsx)(P,{story:e},e.title))}),(0,t.jsx)(v,{children:"Only from Daily News"}),(0,t.jsx)(T,{$columns:2,children:N.slice(0,2).map(e=>(0,t.jsx)(P,{story:e},e.title))}),(0,t.jsx)(v,{children:"More news"}),(0,t.jsx)(T,{$columns:3,children:N.map(e=>(0,t.jsx)(P,{story:e},e.title))}),(0,t.jsx)(v,{children:"Recommended audio"}),(0,t.jsx)(S,{children:F.map((e,i)=>(0,t.jsxs)("div",{children:[(0,t.jsx)(_,{src:e.image,alt:"",hue:60*i,ratio:"1 / 1"}),(0,t.jsx)("strong",{children:e.title})]},e.title))})]}),(0,t.jsxs)(I,{children:[(0,t.jsx)(M,{size:"300x250"}),(0,t.jsx)(v,{children:"Most read"}),(0,t.jsx)(L,{children:B.map(e=>(0,t.jsx)("li",{children:e},e))}),(0,t.jsx)(M,{size:"300x600"})]})]})]}),(0,t.jsx)(W,{children:(0,t.jsxs)("div",{children:[(0,t.jsx)("span",{children:"Terms of use"}),(0,t.jsx)("span",{children:"Privacy"}),(0,t.jsx)("span",{children:"Cookies"}),(0,t.jsx)("span",{children:"Contact"}),(0,t.jsx)("span",{children:"Demo page for ad preview only"})]})})]})}}}]);