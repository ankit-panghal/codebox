"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[767],{6004:(e,a,t)=>{t.d(a,{Z:()=>d});t(2791);var s=t(7689),n=t(2903),o=t(3951),l=t(5218),r=t(4420),i=t(9176),c=t(184);const d=e=>{let{name:a,bgColor:t,type:d,id:u,color:h,html:m,css:p,js:g}=e;const x=(0,s.s0)(),j={backgroundColor:t,color:h},b=(0,r.I0)();async function Z(){try{const e=await n.Z.post(o.Z+"/dashboard/delete-account",{id:u},{withCredentials:!0});l.ZP.success(e.data.message),b((0,i.I)(!1)),x("/signup")}catch(e){l.ZP.error(e.message)}}function f(e){if("Signup"===a&&x("/signup"),"Login"===a&&x("/login"),"Logout"===a&&async function(){try{const e=await n.Z.get(o.Z+"/auth/logout",{withCredentials:!0});l.ZP.success(e.data.message),b((0,i.I)(!1)),x("/login")}catch(e){console.log(e.message)}}(),"Delete Account"===a&&Z(),"Exit"===a){window.confirm("Have you saved the file ?")&&x("/dashboard")}"Save"===a&&async function(e,a,t,s){try{const r=await n.Z.post(o.Z+"/dashboard/save-files",{id:e,html:a,css:t,js:s},{withCredentials:!0});l.ZP.success(r.data.message)}catch(r){console.log(r)}}(e,m,p,g)}return(0,c.jsx)("button",{className:"btn",type:d,onClick:()=>f(u),id:u,style:t?j:{background:"#6200EE"},children:a})}},3022:(e,a,t)=>{t.d(a,{Z:()=>n});t(2791);var s=t(184);const n=e=>{let{type:a,name:t,placeholder:n,value:o,setValue:l}=e;return(0,s.jsx)("input",{className:"input",type:a,name:t,placeholder:n,value:o,onChange:e=>l(e.target.value)})}},7273:(e,a,t)=>{t.d(a,{Z:()=>n});t(2791);var s=t(184);const n=e=>{let{html:a,css:t,js:n,preview:o}=e;const l="\n      <html>\n      <head>\n      <style>\n      body{\n        height : 'auto'\n      }\n      </style>\n      <style>".concat(t,"</style>\n      </head>\n      <body>\n      ").concat(a,"\n      <script>").concat(n,"<\/script>\n      </body>\n      </html>\n      ");return(0,s.jsx)("iframe",{title:"output",srcDoc:l,style:o?{width:"100%",borderRadius:"inherit",backgroundColor:"white"}:{display:"flex"}})}},6767:(e,a,t)=>{t.r(a),t.d(a,{default:()=>z});var s=t(2791),n=t(4294),o=t(697),l=t(3022),r=t(7968),i=t(6004),c=t(2903),d=t(3951),u=t(5218),h=t(7689),m=t(6193),p=t(184);const g={position:"absolute",top:"20%",left:"50%",transform:"translate(-50%, -50%)",width:400,bgcolor:"#393646",border:"2px solid #000",borderRadius:"10px",boxShadow:24,p:4},x=e=>{let{name:a,open:t,handleOpen:x,handleClose:j}=e;const[b,Z]=(0,s.useState)(""),[f,y]=(0,s.useState)(!1),v=(0,h.s0)();return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(n.Z,{className:"modal-btn",onClick:x,children:a}),(0,p.jsx)(r.Z,{open:t,onClose:j,"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:(0,p.jsx)(o.Z,{className:"modal-container",sx:g,children:(0,p.jsxs)("form",{onSubmit:async function(e){if(e.preventDefault(),b.trim().length<5)u.ZP.error("Arena name should have length greater than 5");else{y(!0);try{const e=await c.Z.post(d.Z+"/dashboard/create-arena",{arenaName:b},{withCredentials:!0});y(!1),u.ZP.success(e.data.message),v("/dashboard/editor",{state:{data:e.data.data}})}catch(a){console.log(a),y(!1)}}},children:[(0,p.jsx)(l.Z,{type:"text",name:"arenaName",placeholder:"Your arena name",value:b,setValue:Z}),(0,p.jsx)(i.Z,{name:"Create",bgColor:"#5C5470"})]})})}),(0,p.jsx)(m.Z,{loading:f})]})},j=()=>{const[e,a]=(0,s.useState)(!1);return(0,p.jsx)("div",{children:(0,p.jsx)(x,{name:"Create Arena",open:e,handleOpen:()=>a(!0),handleClose:()=>a(!1)})})},b=s.memo(j);var Z=t(4420),f=t(346),y=t(7273),v=t(7246),C=t(8338);const w=e=>{let{skipState:a,totalArenas:t}=e;const[n,o]=(0,s.useState)(a?a/3+1:1),l=(0,Z.I0)();return t&&t.length>3&&(0,p.jsx)(v.Z,{page:n,count:Math.floor(t.length/3)+1,shape:"rounded",onChange:function(e){const a=Number(e.target.innerText);o(a),l((0,C.C)(3*(a-1)))}})},S=s.memo(w);var k=t(9759);const N=()=>{const e=(0,Z.v9)((e=>e.skip)),{total:a,portion:t}=(0,Z.v9)((e=>e.arenas)),[n,o]=(0,s.useState)(!1),[l,r]=(0,s.useState)(!1),i=(0,h.s0)(),g=(0,Z.I0)();return(0,s.useEffect)((()=>{!async function(){r(!0);try{const a=await c.Z.get(d.Z+"/dashboard/recent-arenas/?skip=".concat(e,"&limit=3"),{withCredentials:!0});console.log("response total",a.data.total),console.log("response portion",a.data.portion),g((0,k.Hu)(a.data.total)),g((0,k.Fg)(a.data.portion)),r(!1)}catch(a){r(!1),console.log(a.message)}}()}),[e,n]),(0,s.useEffect)((()=>{console.log("total",a),console.log("portion",t),a&&0===t.length&&(console.log("inside"),g((0,k.Fg)(a)))}),[a,t,n]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)("div",{style:{margin:"50px 0 40px 0"},children:"Recent Arenas"}),t?(0,p.jsx)("div",{className:"recent-arenas-container",children:t.map((e=>(0,p.jsxs)("div",{className:"arena-box",id:e._id,onClick:()=>async function(e){r(!0);try{const a=await c.Z.get(d.Z+"/dashboard/get-arena/".concat(e),{withCredentials:!0});r(!1),i("/dashboard/editor",{state:{data:a.data.data}})}catch(a){r(!1),console.log(a)}}(e._id),children:[(0,p.jsx)(y.Z,{html:e.html,css:e.css,js:e.js,preview:!0}),(0,p.jsxs)("div",{className:"bottom",children:[(0,p.jsx)("span",{children:e.arenaName}),(0,p.jsx)(f.Z,{htmlColor:"black",fontSize:"2rem",onClick:a=>async function(e,a){e.stopPropagation();try{const e=await c.Z.post(d.Z+"/dashboard/delete-arena",{id:a},{withCredentials:!0});u.ZP.success(e.data.message),n?(o((e=>!1)),o((e=>!0))):o((e=>!0))}catch(t){o(!1),u.ZP.error(t)}}(a,e._id)})]})]},e._id)))}):(0,p.jsx)("p",{children:"No arenas developed"}),(0,p.jsx)(S,{skipState:e,totalArenas:a}),(0,p.jsx)(m.Z,{loading:l})]})},P=s.memo(N);var A=t(8008),F=t(9823),D=t(1557),E=t(6581);const I=e=>{let{data:a}=e;const[t,n]=(0,s.useState)(null!==a&&void 0!==a&&a.imageUrl?a.imageUrl:""),[o,l]=(0,s.useState)(null),[r,h]=(0,s.useState)(!1);return(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m.Z,{loading:r}),(0,p.jsxs)("form",{className:"upload-form",onSubmit:async function(e){e.preventDefault();const a=new FormData;a.append("image",o);try{h(!0);const e=await c.Z.post(d.Z+"/upload",a,{withCredentials:!0});console.log(e),h(!1),u.ZP.success(e.data.message)}catch(t){h(!1),console.log(t)}l(null)},encType:"multipart/form-data",children:[(0,p.jsxs)("div",{className:"upload-box",children:[(0,p.jsx)(E.Z,{sx:{bgcolor:"tomato",width:"100%",height:"100%",fontSize:"8vw"},src:t}),(0,p.jsx)("label",{htmlFor:"upload-image",className:"upload overlay",children:(0,p.jsx)(D.Z,{sx:{fontSize:"5vw",color:"black"}})})]}),(0,p.jsx)("input",{style:{display:"none"},id:"upload-image",type:"file",name:"image",accept:"image/*",onChange:function(e){const a=e.target.files[0];a&&(n(URL.createObjectURL(a)),l(a))}}),o&&(0,p.jsx)(i.Z,{name:"Upload",bgColor:"rgb(31, 71, 252)"})]})]})},R=e=>{let{data:a,isOpen:t}=e;return(0,p.jsxs)("div",{className:"side-profile",style:t?{display:"flex"}:{display:"none"},children:[(0,p.jsx)(I,{data:a}),(0,p.jsxs)("div",{children:["Hi! ",(0,p.jsx)("span",{className:"user_name",children:a.name})]}),(0,p.jsxs)("div",{className:"out-btns",children:[(0,p.jsx)(i.Z,{name:"Logout"}),(0,p.jsx)(i.Z,{name:"Delete Account",id:a._id,bgColor:"crimson"})]})]})},_={position:"fixed",top:"20px",left:"50%",transform:"translateX(-50%)",backgroundColor:"white",borderRadius:"50%",padding:"5px",fontSize:"2rem",cursor:"pointer",zIndex:1e3},z=()=>{const[e,a]=(0,s.useState)(null),[t,n]=(0,s.useState)(!1),[o,l]=(0,s.useState)(!1),r=(0,h.s0)();return(0,s.useEffect)((()=>{!async function(){n(!0);try{const e=await c.Z.get(d.Z+"/dashboard",{withCredentials:!0});a(e.data.data),n(!1)}catch(e){n(!1),console.log(e.message),r("/login")}}()}),[]),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(m.Z,{loading:t}),e&&(0,p.jsxs)("div",{className:"dash-page",children:[(0,p.jsx)("div",{style:{position:"relative"},children:o?(0,p.jsx)(F.Z,{style:_,onClick:()=>l((e=>!e))}):(0,p.jsx)(A.Z,{style:_,onClick:()=>l((e=>!e))})}),(0,p.jsx)(R,{data:e,isOpen:o}),(0,p.jsxs)("div",{className:"arena-container",children:[(0,p.jsx)("div",{children:"Work Arena"}),(0,p.jsx)(b,{}),(0,p.jsx)(P,{})]})]})]})}}}]);
//# sourceMappingURL=767.01a9b974.chunk.js.map