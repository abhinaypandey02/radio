(this.webpackJsonplofiradio=this.webpackJsonplofiradio||[]).push([[0],{40:function(e,n,t){},41:function(e,n,t){},81:function(e,n,t){"use strict";t.r(n);var c=t(1),i=t.n(c),a=t(33),o=t.n(a),s=(t(40),t(41),t(8)),r=t(34),l=t.n(r),u=t(35),d=t(0);function j(){var e=Object(c.useState)(),n=Object(s.a)(e,2),t=n[0],i=n[1],a=Object(c.useState)(!1),o=Object(s.a)(a,2),r=o[0],j=o[1],b=Object(c.useState)(!1),f=Object(s.a)(b,2),v=f[0],O=f[1],g=Object(c.useState)("X"),h=Object(s.a)(g,2),m=h[0],x=h[1],p=Object(c.useState)(!1),y=Object(s.a)(p,2),S=y[0],k=y[1],N=Object(c.useRef)(null),C=Object(u.io)("http://gabriel.sed.lol:3001");return Object(c.useEffect)((function(){var e;return C.on("connect",(function(){e=setInterval((function(){C.emit("askSong")}),2e3),C.on("receiveSong",(function(e,n,c){"P"===n&&e&&(i(e),function(e){var n;if(t){var c=t;e&&(c=e);var i,a=((new Date).getTime()-c.start)/1e3;Math.abs(a-(null===(n=N.current)||void 0===n?void 0:n.seek()))>1&&(null===(i=N.current)||void 0===i||i.seek(a))}}(e),j(!0)),c&&(r||(null===t||void 0===t?void 0:t.song.id)===c.song.id||i(c)),x(n)}))})),function(){e&&clearInterval(e),C.off("connect"),C.off("receiveSong")}}),[t,r]),Object(d.jsxs)("div",{onClick:function(){var e;!S&&v&&(null===(e=N.current)||void 0===e||e.play()),k(!0)},className:"d-flex min-vh-100 align-items-center justify-content-center",children:[t&&Object(d.jsx)(l.a,{src:t.song.url,ref:N,playing:r,onLoad:function(){O(!0)},onPlay:function(){k(!0),j(!0)},onEnd:function(){j(!1),O(!1)}}),Object(d.jsxs)("div",{className:"centre-card",children:[Object(d.jsx)("div",{className:"h3",children:"Abhinay's LoFi Radio"}),r&&S&&Object(d.jsxs)("div",{className:"",children:["Currently Playing : ",null===t||void 0===t?void 0:t.song.name," Duration - ",null===t||void 0===t?void 0:t.song.duration]}),v&&!S&&Object(d.jsx)("div",{className:"",children:"Click anywhere to start the playback!"}),"W"===m&&S&&Object(d.jsx)("div",{className:"",children:"Waiting for the next song"}),!v&&Object(d.jsx)("div",{className:"spinner-border text-light",role:"status"})]})]})}var b=function(){return Object(d.jsx)("div",{className:"App",children:Object(d.jsx)(j,{})})},f=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,82)).then((function(n){var t=n.getCLS,c=n.getFID,i=n.getFCP,a=n.getLCP,o=n.getTTFB;t(e),c(e),i(e),a(e),o(e)}))};t(80);o.a.render(Object(d.jsx)(i.a.StrictMode,{children:Object(d.jsx)(b,{})}),document.getElementById("root")),f()}},[[81,1,2]]]);
//# sourceMappingURL=main.c23a6e7c.chunk.js.map