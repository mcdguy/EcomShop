(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[8],{111:function(e,c,t){},112:function(e,c,t){},126:function(e,c,t){"use strict";t.r(c);var n=t(3),r=t(4),s=t(2),i=t(12),a=(t(111),t(112),t(7)),o=t(88),l=t(1),u=function(e){var c=e.img,t=e.name,n=e.price,r=e.stock,i=e._id,u=Object(s.useRef)(null);return Object(s.useEffect)((function(){new IntersectionObserver((function(e,c){e.forEach((function(e){e.isIntersecting&&(u.current.classList.toggle("visible"),c.disconnect())}))}),{threshold:.2}).observe(u.current)}),[]),Object(l.jsx)(a.b,{to:"/shop/".concat(i),ref:u,className:"product",children:Object(l.jsxs)("article",{className:"product__content",children:[Object(l.jsxs)("div",{className:"product__img__container",children:[Object(l.jsx)("img",{className:"product__img",src:"https://sbcoffeecompany.herokuapp.com/".concat(c[0]),alt:t}),r?null:Object(l.jsx)("div",{className:"product__outofstock",children:Object(l.jsx)("p",{children:"out of stock"})})]}),Object(l.jsxs)("div",{className:"product__info",children:[Object(l.jsx)("h1",{className:"product__name",children:t}),Object(l.jsxs)("h2",{className:"product__price",children:["PRICE: ",Object(o.a)(n)]})]})]})})},j=t(99),f=t(27),d=t(86),b=t(28);c.default=function(){var e=Object(i.b)(),c=e.products,t=e.productError,a=e.productLoading,o=e.filterName,p=e.setFilterName,m=Object(s.useState)(!1),h=Object(r.a)(m,2),_=h[0],O=h[1],x=Object(s.useState)(!1),N=Object(r.a)(x,2),v=N[0],g=N[1],k=function(e){p(e),O(!1)};return Object(s.useEffect)((function(){if("none"!==o)if("featured"!==o){var e=c.filter((function(e){return e.category===o}));g(e)}else{var t=c.filter((function(e){return!0===e.featured}));g(t)}else g(c)}),[o,c]),a?Object(l.jsx)(f.a,{}):t?Object(l.jsx)(d.a,{}):Object(l.jsx)(l.Fragment,{children:v.length?Object(l.jsxs)("div",{className:"shop",onClick:function(){return O(!1)},children:[Object(l.jsxs)("div",{className:"shop__filter center",children:[Object(l.jsx)("span",{className:"".concat("none"===o?"shop__filter__indicator":"shop__filter__indicator show")}),Object(l.jsx)("span",{className:"filter__icon button__effect",onClick:function(e){e.stopPropagation(),O(!_)},children:Object(l.jsx)(j.c,{})}),Object(l.jsxs)("div",{className:"".concat(_?"filter__options show":"filter__options"),children:[Object(l.jsx)("span",{onClick:function(){return k("none")},children:"none"}),Object(l.jsx)("span",{className:"".concat("featured"===o?"active":null),onClick:function(){return k("featured")},children:"featured"}),Object(l.jsx)("span",{className:"".concat("coffee"===o?"active":null),onClick:function(){return k("coffee")},children:"coffee"}),Object(l.jsx)("span",{className:"".concat("brewing equipment"===o?"active":null),onClick:function(){return k("brewing equipment")},children:"brewing equipment"}),Object(l.jsx)("span",{className:"".concat("accompaniment"===o?"active":null),onClick:function(){return k("accompaniment")},children:"accompaniment"})]}),Object(l.jsx)("div",{className:"filter__click__handler"})]}),Object(l.jsx)("div",{className:"shop__center center",children:v.map((function(e){return Object(l.jsx)(u,Object(n.a)({},e),e._id)}))}),Object(l.jsx)(b.a,{})]}):Object(l.jsxs)("div",{className:"shop-empty",children:[Object(l.jsx)("div",{className:"shop__empty__center center",children:"There are no items to display"}),Object(l.jsx)(b.a,{})]})})}},86:function(e,c,t){"use strict";t(2),t(87);var n=t(1);c.a=function(){return Object(n.jsx)("div",{className:"fetch__error",children:Object(n.jsx)("h1",{children:"an error occurred"})})}},87:function(e,c,t){},88:function(e,c,t){"use strict";t.d(c,"a",(function(){return n}));var n=function(e){return Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(e/100).replace(/\.00$/,"")}}}]);
//# sourceMappingURL=8.25b080b3.chunk.js.map