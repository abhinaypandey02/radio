(this.webpackJsonplofiradio=this.webpackJsonplofiradio||[]).push([[0],{102:function(e,t,n){"use strict";n.r(t);var c=n(0),s=n.n(c),a=n(15),i=n.n(a),r=(n(54),n(55),n(70),n(71),n(7)),l=n(45),o=n.n(l),j=n(46),d=n(109),u=n(111),b=n(108),h=n(110),O=n(4);function m(e){var t=e.chats,n=e.sendMessage,s=e.name,a=Object(c.useState)(""),i=Object(r.a)(a,2),l=i[0],o=i[1];return Object(O.jsxs)("div",{children:[Object(O.jsx)("div",{id:"chatBox",className:"overflow-auto my-3 p-2",style:{maxHeight:"60vh"},children:t.map((function(e){return Object(O.jsxs)("div",{className:"my-3 "+(e.sender===s?"text-end":"text-start"),children:[Object(O.jsx)("div",{style:{wordBreak:"break-all"},children:e.message}),Object(O.jsxs)("small",{className:"fw-light",children:[e.sender," | ",e.time]}),Object(O.jsx)("hr",{})]},e.id)}))}),Object(O.jsxs)(d.a,{onSubmit:function(){o(""),n(l)},className:"d-flex",children:[Object(O.jsx)(d.a.Control,{className:"me-2",value:l,onChange:function(e){return o(e.target.value)},placeholder:"Write a message"}),Object(O.jsx)(u.a,{type:"submit",children:"Send"})]})]})}function f(){var e=Object(c.useState)(),t=Object(r.a)(e,2),n=t[0],s=t[1],a=Object(c.useState)(!1),i=Object(r.a)(a,2),l=i[0],f=i[1],x=Object(c.useState)(!1),g=Object(r.a)(x,2),v=g[0],p=g[1],y=Object(c.useState)("X"),N=Object(r.a)(y,2),S=N[0],C=N[1],k=Object(c.useState)(!1),w=Object(r.a)(k,2),B=w[0],E=w[1],H=Object(c.useRef)(null),F=Object(c.useState)(""),L=Object(r.a)(F,2),M=L[0],P=L[1],I=Object(c.useState)(!1),T=Object(r.a)(I,2),D=T[0],W=T[1],A=Object(c.useState)(!1),G=Object(r.a)(A,2),J=G[0],R=G[1],X=Object(c.useState)(),q=Object(r.a)(X,2),z=q[0],K=q[1],Q=Object(c.useState)([]),U=Object(r.a)(Q,2),V=U[0],Y=U[1];function Z(){""!==M?(R(!0),W(!1)):(W(!0),R(!1))}return Object(c.useEffect)((function(){var e=document.getElementById("chatBox");e&&(e.scrollTop=e.scrollHeight)}),[V]),Object(c.useEffect)((function(){z&&z.emit("getChats")}),[z]),Object(c.useEffect)((function(){if(z)z.on("connect",(function(){setInterval((function(){z.emit("askSong")}),2e3),z.on("receiveSong",(function(e,t,c){"P"===t&&e&&(s(e),function(e){var t;if(n){var c=n;e&&(c=e);var s,a=((new Date).getTime()-c.start)/1e3;Math.abs(a-(null===(t=H.current)||void 0===t?void 0:t.seek()))>1&&(null===(s=H.current)||void 0===s||s.seek(a))}}(e),f(!0)),c&&(l||(null===n||void 0===n?void 0:n.song.id)===c.song.id||s(c)),C(t)})),z.on("newChat",(function(e){Y(e)}))}));else{var e=Object(j.io)("http://localhost:3001");K(e)}}),[n,l,z]),Object(O.jsxs)("div",{onClick:function(){var e;!B&&v&&(null===(e=H.current)||void 0===e||e.play()),E(!0)},className:"d-flex min-vh-100 align-items-center justify-content-center",children:[Object(O.jsxs)(b.a,{show:D,centered:!0,onHide:function(){return W(!1)},children:[Object(O.jsx)(b.a.Header,{children:"Enter Name to Chat"}),Object(O.jsxs)(b.a.Body,{children:[Object(O.jsx)(d.a.Group,{className:"mb-3",children:Object(O.jsx)(d.a.Control,{placeholder:"Name",value:M,onChange:function(e){return P(e.target.value)}})}),Object(O.jsx)(d.a.Group,{className:"mt-3",children:Object(O.jsx)(u.a,{onClick:Z,type:"submit",children:"Chat"})})]})]}),Object(O.jsxs)(b.a,{show:J,centered:!0,onHide:function(){return R(!1)},children:[Object(O.jsx)(b.a.Header,{children:"Messages"}),Object(O.jsx)(b.a.Body,{children:Object(O.jsx)(m,{name:M,chats:V,sendMessage:function(e){if(z&&M){var t={message:e,sender:M,id:Object(h.a)(),time:(new Date).toLocaleString()};z.emit("sendChat",t)}}})})]}),n&&Object(O.jsx)(o.a,{src:n.song.url,ref:H,playing:l,onLoad:function(){p(!0)},onPlay:function(){E(!0),f(!0)},onEnd:function(){f(!1),p(!1)}}),Object(O.jsxs)("div",{className:"centre-card",children:[Object(O.jsx)("div",{className:"h3",children:"Abhinay's LoFi Radio"}),l&&B&&Object(O.jsxs)("div",{className:"",children:["Currently Playing : ",null===n||void 0===n?void 0:n.song.name]}),v&&!B&&Object(O.jsx)("div",{className:"",children:"Click anywhere to start the playback!"}),"W"===S&&B&&Object(O.jsx)("div",{className:"",children:"Waiting for the next song"}),!v&&Object(O.jsx)("div",{className:"spinner-border text-light m-3",role:"status"}),Object(O.jsx)("hr",{}),Object(O.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[V.length>0&&Object(O.jsxs)("div",{children:[V[V.length-1].sender," says ",Object(O.jsxs)("i",{children:[V[V.length-1].message.slice(0,20),V[V.length-1].message.length>20&&"..."]})]}),Object(O.jsx)("img",{alt:"chat",className:"ms-2 poh",onClick:Z,src:"https://img.icons8.com/material-outlined/24/000000/chat--v1.png"})]})]})]})}var x=function(){return Object(O.jsx)("div",{className:"App",children:Object(O.jsx)(f,{})})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,112)).then((function(t){var n=t.getCLS,c=t.getFID,s=t.getFCP,a=t.getLCP,i=t.getTTFB;n(e),c(e),s(e),a(e),i(e)}))};i.a.render(Object(O.jsx)(s.a.StrictMode,{children:Object(O.jsx)(x,{})}),document.getElementById("root")),g()},70:function(e,t,n){},71:function(e,t,n){}},[[102,1,2]]]);
//# sourceMappingURL=main.a1dc1c91.chunk.js.map