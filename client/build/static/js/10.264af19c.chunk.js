(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[10],{112:function(e,c,n){},122:function(e,c,n){"use strict";n.r(c);var t=n(3),r=n(4),i=n(2),s=n(9),a=(n(112),n(42)),o=n(100),l=n(30),u=n(88),j=n(1);c.default=function(){var e=Object(s.b)(),c=e.products,n=e.productError,f=e.productLoading,d=e.filterName,b=e.setFilterName,p=Object(i.useState)(!1),h=Object(r.a)(p,2),_=h[0],m=h[1],O=Object(i.useState)(!1),x=Object(r.a)(O,2),v=x[0],N=x[1],k=function(e){b(e),m(!1)};return Object(i.useEffect)((function(){if("none"!==d)if("featured"!==d){var e=c.filter((function(e){return e.category===d}));N(e)}else{var n=c.filter((function(e){return!0===e.featured}));N(n)}else N(c)}),[d,c]),f?Object(j.jsx)(l.a,{}):n?Object(j.jsx)(u.a,{}):Object(j.jsx)(j.Fragment,{children:v.length?Object(j.jsxs)("div",{className:"shop",onClick:function(){return m(!1)},children:[Object(j.jsxs)("div",{className:"shop__filter center",children:[Object(j.jsx)("span",{className:"".concat("none"===d?"shop__filter__indicator":"shop__filter__indicator show")}),Object(j.jsx)("span",{className:"filter__icon button__effect",onClick:function(e){e.stopPropagation(),m(!_)},children:Object(j.jsx)(o.c,{})}),Object(j.jsxs)("div",{className:"".concat(_?"filter__options show":"filter__options"),children:[Object(j.jsx)("span",{onClick:function(){return k("none")},children:"none"}),Object(j.jsx)("span",{className:"".concat("featured"===d?"active":null),onClick:function(){return k("featured")},children:"featured"}),Object(j.jsx)("span",{className:"".concat("coffee"===d?"active":null),onClick:function(){return k("coffee")},children:"coffee"}),Object(j.jsx)("span",{className:"".concat("brewing equipment"===d?"active":null),onClick:function(){return k("brewing equipment")},children:"brewing equipment"}),Object(j.jsx)("span",{className:"".concat("accompaniment"===d?"active":null),onClick:function(){return k("accompaniment")},children:"accompaniment"})]}),Object(j.jsx)("div",{className:"filter__click__handler"})]}),Object(j.jsx)("div",{className:"shop__center center",children:v.map((function(e){return Object(j.jsx)(a.a,Object(t.a)({},e),e._id)}))})]}):Object(j.jsx)("div",{className:"shop-empty",children:Object(j.jsx)("div",{className:"shop__empty__center center",children:Object(j.jsx)("h1",{children:"There are no items to display"})})})})}},88:function(e,c,n){"use strict";n(2),n(89);var t=n(1);c.a=function(){return Object(t.jsx)("div",{className:"fetch__error",children:Object(t.jsx)("h1",{children:"an error occurred"})})}},89:function(e,c,n){}}]);
//# sourceMappingURL=10.264af19c.chunk.js.map