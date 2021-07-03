(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{64:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(40),r=n.n(c),s=n(69),i=n(50),l=n(25),o=n(10),u=n(1),d=function(){return Object(u.jsx)("nav",{className:"full-width bg-gray-800 py-3 px-5 lg:py-4 lg:px-6",children:Object(u.jsx)(l.b,{to:"/",className:"font-extrabold text-xl lg:text-2xl",children:"Idow"})})},j=n(19),x=n(3),b=n.n(x),p=n(6),f=n(24),O=n(70),g=function(){var e=Object(p.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/wars").json();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),m=function(){return Object(u.jsx)(j.c,{className:"w-7 h-7 animate-spin"})},v=function(e){return isNaN(e.getTime())?"":"".concat(e.getMonth()+1,"\u6708").concat(e.getDate(),"\u65e5 ").concat(String(e.getHours()).padStart(2,"0"),":").concat(String(e.getMinutes()).padStart(2,"0"))},h=function(e){var t=e.war;return Object(u.jsx)(l.b,{to:"/war/".concat(t.id),className:"p-2 lg:p-4 space-y-2 border-2 border-gray-700 bg-gray-800 rounded-sm",children:Object(u.jsxs)("div",{className:"space-y-1",children:[Object(u.jsxs)("div",{className:"flex items-baseline font-bold ",children:[Object(u.jsx)("span",{className:"mr-2",children:"vs"}),Object(u.jsx)("h2",{className:"text-2xl text-violet-500",children:t.opponent})]})," ",Object(u.jsx)("div",{children:v(new Date(t.spin_time))})]})})},y=function(e){var t=e.showLoadingSpinner,n=void 0===t||t,a=e.className,c=Object(O.a)("wars",g),r=c.data,s=c.isLoading;return Object(u.jsxs)("div",{className:"relative "+a,children:[s&&n&&Object(u.jsx)("div",{className:"absolute inset-0 flex justify-center items-center",children:Object(u.jsx)(m,{})}),!s&&(null===r||void 0===r?void 0:r.map((function(e){return Object(u.jsx)(h,{war:e},e.id)})))]})},w=function(){return Object(u.jsxs)("div",{className:"grid p-5 lg:py-12 lg:px-16 gap-y-5",children:[Object(u.jsx)("h2",{className:"text-2xl lg:text-3xl mb-2 font-bold",children:"\u5bfe\u6226\u4e00\u89a7"}),Object(u.jsxs)(l.b,{to:"/war/new",className:"flex items-center justify-center space-x-1 text-violet-200 w-min ml-auto lg:text-lg",children:[Object(u.jsx)("span",{className:"whitespace-nowrap",children:"\u65b0\u898f\u5bfe\u6226"}),Object(u.jsx)(j.d,{className:"w-5 h-5"})]}),Object(u.jsx)(y,{className:"grid lg:grid-cols-2"})]})},N=n(8),k=n(14),C=n(68),S=n(51),z=n(34),T=["color","size"],M={lg:"px-8 text-lg",md:"px-6 text-base",sm:"px-4 text-sm"},E={violet:"bg-violet-700 hover:bg-violet-600 active:bg-violet-500 text-violet-100 ring-violet-400",gray:"bg-gray-700 hover:bg-gray-600 active:bg-gray-500 text-gray-100 ring-gray-400",rose:"bg-rose-700 hover:bg-rose-600 active:bg-rose-500 text-rose-100 ring-rose-400"},H=Object(a.forwardRef)((function(e,t){var n=e.color,a=e.size,c=Object(z.a)(e,T);return Object(u.jsx)("button",Object(N.a)(Object(N.a)({},c),{},{ref:t,className:"inline-flex items-center justify-center text-center whitespace-nowrap py-3 font-semibold rounded-md focus:outline-none focus:ring-2 space-x-1 ".concat(M[a]," ").concat(E[n]),children:e.children}))})),I=["register"],_=function(e){var t=e.register,n=Object(z.a)(e,I);return Object(u.jsx)("input",Object(N.a)(Object(N.a)({className:"bg-gray-200 text-gray-900 max-w-2xl py-1 px-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-600"},t),n))},D=["isEditMode","label","currentValue","register"],R=function(e){var t=e.isEditMode,n=e.label,a=e.currentValue,c=e.register,r=Object(z.a)(e,D);return Object(u.jsxs)("div",{className:"flex flex-col space-y-2",children:[Object(u.jsx)("label",{className:"whitespace-nowrap",children:n}),t?Object(u.jsx)(_,Object(N.a)(Object(N.a)({},r),{},{register:c})):Object(u.jsx)("span",{className:"font-semibold text-2xl",children:a})]})},V=n(12),L=n(67),F={11:"text-red-300",12:"text-cyan-300",13:"text-blue-300",14:"text-yellow-300"},q=function(e){var t=e.townHall,n=e.players,c=Object(a.useContext)(U),r=c.isEditMode,s=c.roasterTags,i=c.setRoasterTags,l=function(e){return null===s||void 0===s?void 0:s.includes(e)},o=n.filter((function(e){return l(e.tag)}));if(!r&&0===o.length)return null;var d=function(e){var t=e.target.value;i((function(e){if(!e)return e;var n=Object(V.a)(e);if(l(t)){var a=n.indexOf(t);n.splice(a,1)}else n.push(t);return n}))};return Object(u.jsx)(L.a,{children:function(e){var a=e.open;return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsxs)(L.a.Button,{className:"flex w-full max-w-2xl items-center py-2 px-4 rounded-md bg-gray-700 focus:outline-none focus:ring-1 focus:ring-violet-500 overflow-hidden",children:[Object(u.jsxs)("span",{className:"text-lg font-semibold ".concat(F[t]||"text-gray-300"),children:["TH",t]}),Object(u.jsxs)("span",{className:"text-lg ml-1 letter",children:["(",o.length,")"]}),Object(u.jsx)(j.a,{className:"".concat(a?"transform rotate-180":""," w-5 h-5 ml-auto text-gray-300")})]}),Object(u.jsx)(L.a.Panel,{as:"ul",className:"my-2 px-5 divide-y-2 divide-gray-700",children:n.map((function(e){return Object(u.jsx)("li",{className:"flex justify-between items-center py-3",children:r?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("label",{children:e.name}),Object(u.jsx)("input",{className:"text-violet-600 w-5 h-5 rounded-sm focus:outline-none focus:ring-2 focus:ring-violet-600 ml-2",type:"checkbox",name:e.name,value:e.tag,checked:l(e.tag),onChange:d})]}):l(e.tag)&&Object(u.jsx)("span",{children:e.name})},e.tag)}))})]})}})},B=function(e){var t=e.townHalls,n=e.roaster,c=Object(a.useContext)(U).roasterTags;return Object(u.jsxs)("div",{className:"space-y-2",children:[Object(u.jsx)("label",{children:"\u53c2\u52a0\u30e1\u30f3\u30d0\u30fc"}),Object(u.jsxs)("div",{className:"text-violet-200 font-bold text-lg",children:["\u8a08 ",null===c||void 0===c?void 0:c.length]}),t.map((function(e){return Object(u.jsx)(q,{townHall:e,players:n[e]},e)}))]})},J=Object(a.memo)(B),P=n(52),A=function(e){var t=e.roaster,n=Object(a.useState)(!1),c=Object(k.a)(n,2),r=c[0],s=c[1],i=Object.keys(t).sort((function(e,t){return parseInt(t)-parseInt(e)})).map((function(e){return"**TH".concat(e,"**\n")+t[e].map((function(e){return e.name})).join("\n")})).join("\n\n");return Object(u.jsxs)("div",{className:"flex lg:block flex-col space-y-3 lg:space-y-8",children:[Object(u.jsx)("p",{className:"bg-gray-800 px-3 py-5 rounded w-full",children:Object(u.jsx)(P.a,{children:i.replaceAll("\n","<br/>")})}),Object(u.jsxs)(H,{color:"violet",size:"lg",onClick:function(){navigator.clipboard.writeText(i),s(!0)},children:[Object(u.jsx)("span",{children:"\u30b3\u30d4\u30fc"}),Object(u.jsx)(j.b,{className:"w-5 h-5"})]}),Object(u.jsxs)(C.a,{open:r,onClose:function(){return s(!1)},className:"fixed z-10 inset-0 flex items-center justify-center",children:[Object(u.jsx)(C.a.Overlay,{className:"fixed inset-0 opacity-50 bg-gray-900"}),Object(u.jsxs)("div",{className:"flex flex-col items-center justify-center bg-violet-200 w-3/5 py-4 px-6 space-y-3 rounded-md text-violet-800 z-10",children:[Object(u.jsx)(C.a.Title,{className:"lg:text-xl text-center",children:"\u30b3\u30d4\u30fc\u5b8c\u4e86\uff01"}),Object(u.jsx)(H,{onClick:function(){return s(!1)},color:"violet",size:"lg",children:"OK"})]})]})]})},K=function(){var e=Object(p.a)(b.a.mark((function e(){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/players").json();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(p.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.get("/api/war/".concat(t)).json();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Q=(new Date).toISOString().split(".")[0].slice(0,-3),U=Object(a.createContext)({isEditMode:!1,roasterTags:[],setRoasterTags:function(){}}),W=function(){var e,t,n,c,r,s=Object(o.g)().id,i=Object(o.f)(),l=function(e){return Object(O.a)(["war",e],(function(){return G(e)}))}(s),d=Object(O.a)("players",K),x=Object(S.a)(),g=x.register,h=x.handleSubmit,y=Object(a.useState)("new"===s),w=Object(k.a)(y,2),z=w[0],T=w[1],M=Object(a.useState)(!1),E=Object(k.a)(M,2),I=E[0],_=E[1],D=Object(a.useState)((null===(e=l.data)||void 0===e?void 0:e.roaster)||[]),V=Object(k.a)(D,2),L=V[0],F=V[1],q=Object(a.useRef)(null);Object(a.useEffect)((function(){var e;F((null===(e=l.data)||void 0===e?void 0:e.roaster)||[])}),[null===(t=l.data)||void 0===t?void 0:t.roaster]);var B=l.isLoading||d.isLoading,P=Object(a.useCallback)(function(){var e=Object(p.a)(b.a.mark((function e(t){var n,a,c,r,s,o;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(c=t.spin_time||(null===(n=l.data)||void 0===n?void 0:n.spin_time)){e.next=4;break}return alert("\u30de\u30c3\u30c1\u30f3\u30b0\u6642\u9593\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044"),e.abrupt("return");case 4:if(r=Object(N.a)(Object(N.a)({},t),{},{roaster:L,spin_time:c}),!(null===(a=l.data)||void 0===a?void 0:a.id)){e.next=11;break}return e.next=8,f.a.put("/api/war/".concat(null===(s=l.data)||void 0===s?void 0:s.id),{json:r});case 8:i.go(0),e.next=15;break;case 11:return e.next=13,f.a.post("/api/war",{json:r}).json();case 13:o=e.sent,i.push("/war/".concat(o.id));case 15:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[L,null===(n=l.data)||void 0===n?void 0:n.spin_time,null===(c=l.data)||void 0===c?void 0:c.id,i]),W=Object(a.useMemo)((function(){return d.data?Object.keys(d.data).map((function(e){return parseInt(e)})).sort((function(e,t){return t-e})):[]}),[d.data]),X=Object(a.useCallback)(Object(p.a)(b.a.mark((function e(){var t;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,f.a.delete("/api/war/".concat(null===(t=l.data)||void 0===t?void 0:t.id));case 2:i.push("/");case 3:case"end":return e.stop()}}),e)}))),[null===(r=l.data)||void 0===r?void 0:r.id,i]);return Object(u.jsxs)("div",{className:"p-5 lg:py-12 lg:px-16 relative",children:[B&&Object(u.jsx)("div",{className:"absolute inset-0 flex justify-center items-center",children:Object(u.jsx)(m,{})}),!B&&l.isError&&"new"!==s&&Object(u.jsx)("div",{children:"\u7121\u52b9\u306aID"}),!B&&l.data&&d.data&&Object(u.jsx)(U.Provider,{value:{isEditMode:z,roasterTags:L,setRoasterTags:F},children:Object(u.jsxs)("div",{className:"grid gap-y-10 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-16",children:[Object(u.jsxs)("div",{className:"flex flex-col justify-center",children:[Object(u.jsxs)("div",{className:"flex mb-5 ml-auto space-x-3 justify-end",children:["new"!==s&&Object(u.jsxs)(H,{onClick:function(){return _(!0)},color:"rose",size:"md",children:[Object(u.jsx)("span",{className:"whitespace-nowrap",children:"\u524a\u9664"}),Object(u.jsx)(j.f,{className:"w-5 h-5"})]}),Object(u.jsxs)(H,{onClick:function(){return T((function(e){return!e}))},color:z?"violet":"gray",size:"md",children:[Object(u.jsx)("span",{className:"whitespace-nowrap",children:"\u7de8\u96c6"}),Object(u.jsx)(j.e,{className:"w-5 h-5"})]})]}),Object(u.jsxs)(C.a,{open:I,onClose:function(){return _(!1)},initialFocus:q,className:"fixed z-10 inset-0 flex items-center justify-center",children:[Object(u.jsx)(C.a.Overlay,{className:"fixed inset-0 opacity-50 bg-gray-900"}),Object(u.jsxs)("div",{className:"bg-rose-200 z-10 grid p-5 rounded-md items-center justify-center gap-y-2",children:[Object(u.jsx)(C.a.Title,{className:"flex-grow text-rose-800 text-center",children:"\u672c\u5f53\u306b\u524a\u9664\u3057\u307e\u3059\u304b\uff1f"}),Object(u.jsxs)("div",{className:"flex space-x-3",children:[Object(u.jsx)(H,{onClick:X,color:"rose",size:"lg",children:"\u306f\u3044"}),Object(u.jsx)(H,{onClick:function(){return _(!1)},ref:q,color:"gray",size:"md",children:"\u30ad\u30e3\u30f3\u30bb\u30eb"})]})]})]}),Object(u.jsxs)("form",{onSubmit:h(P),className:"flex lg:block flex-col space-y-5 lg:space-y-8",children:[Object(u.jsx)(R,{label:"\u5bfe\u6226\u76f8\u624b",type:"text",isEditMode:z,register:g("opponent"),defaultValue:l.data.opponent,currentValue:l.data.opponent,required:!0}),Object(u.jsx)(R,{label:"\u30de\u30c3\u30c1\u30f3\u30b0\u6642\u9593",type:"datetime-local",isEditMode:z,register:g("spin_time"),currentValue:v(new Date(l.data.spin_time)),min:Q,required:!1}),Object(u.jsx)(J,{townHalls:W,roaster:d.data}),z&&Object(u.jsx)(H,{color:"violet",size:"lg",type:"submit",children:"\u4fdd\u5b58"})]})]}),Object(u.jsx)(A,{roaster:Object.keys(d.data).reduce((function(e,t){var n=d.data[t].filter((function(e){return L.includes(e.tag)}));return 0===n.length||(e[t]=n),e}),{})})]})})]})},X=new s.a,Y=function(){return Object(u.jsx)(i.a,{client:X,children:Object(u.jsxs)(l.a,{children:[Object(u.jsx)(d,{}),Object(u.jsxs)(o.c,{children:[Object(u.jsx)(o.a,{exact:!0,path:"/",children:Object(u.jsx)(w,{})}),Object(u.jsx)(o.a,{exact:!0,path:"/war/:id",children:Object(u.jsx)(W,{})})]})]})})};n(64);r.a.render(Object(u.jsx)(a.StrictMode,{children:Object(u.jsx)(Y,{})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.67641182.chunk.js.map