(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[12],{109:function(e,c,t){},121:function(e,c,t){"use strict";t.r(c);var s=t(4),a=t(2),i=(t(109),t(6)),n=t(5),r=t.n(n),j=t(9),m=t(7),l=t(29),d=t(21),o=t(30),b=t(1);c.default=function(){var e=Object(j.b)().addCartItem,c=Object(i.f)().id,t=Object(a.useState)({}),n=Object(s.a)(t,2),_=n[0],u=n[1],O=Object(a.useState)(!1),h=Object(s.a)(O,2),p=h[0],f=h[1],x=Object(a.useState)(!0),N=Object(s.a)(x,2),v=N[0],g=N[1],w=Object(a.useState)(0),k=Object(s.a)(w,2),S=k[0],C=k[1],y=Object(a.useState)(!1),E=Object(s.a)(y,2),F=E[0],I=E[1];return Object(a.useEffect)((function(){f(!1),g(!0),r.a.get("/product/shop/".concat(c)).then((function(e){u(e.data),g(!1)})).catch((function(e){f(!0)}))}),[]),Object(a.useEffect)((function(){var e=setTimeout((function(){I(!1)}),5e3);return function(){clearTimeout(e)}}),[F]),v?Object(b.jsx)(d.a,{}):p?Object(b.jsx)(o.a,{}):Object(b.jsx)(b.Fragment,{children:_.error?Object(b.jsx)("div",{className:"item_error",children:_.error}):Object(b.jsxs)("div",{className:"item",children:[Object(b.jsx)("div",{className:"".concat(F?"item__added show":"item__added"),children:Object(b.jsxs)("div",{className:"center",children:[Object(b.jsx)("span",{className:"msg",children:"item added"}),Object(b.jsx)(m.b,{to:"/cart",children:"preview"})]})}),Object(b.jsxs)("div",{className:"item__container center",children:[Object(b.jsx)("div",{className:"item__slider",children:Object(b.jsxs)("div",{className:"item__slider__wrapper",children:[Object(b.jsx)("div",{className:"item__img",children:_.img&&_.img.map((function(e,c){return Object(b.jsx)("img",{className:"".concat(S===c?"active":null),src:"https://sbcoffeecompany.herokuapp.com/".concat(e),alt:_&&_.name},c)}))}),Object(b.jsx)("div",{className:"item__thumb__bar",children:_.img&&_.img.map((function(e,c){return Object(b.jsx)("span",{className:"item__thumb ".concat(S===c?"active":null),onClick:function(){return C(c)},children:Object(b.jsx)("img",{className:"item__thumb__image",src:"https://sbcoffeecompany.herokuapp.com/".concat(e),alt:""})},c)}))})]})}),Object(b.jsx)("div",{className:"item__info",children:Object(b.jsxs)("div",{className:"item__info__wrapper",children:[Object(b.jsx)("p",{className:"item__info__name",children:_.name}),Object(b.jsxs)("p",{className:"item__info__price",children:["PRICE: ",Object(l.a)(_.price)]}),Object(b.jsx)("p",{className:"item__info__weight",children:"null"===_.weight?"":_.weight}),Object(b.jsx)("p",{className:"item__info__desc",children:_.description}),_.stock?Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"btn-wrapper",children:Object(b.jsx)("span",{className:"btn__general",onClick:function(){I(!0),e(_._id,1)},children:"add to cart"})})}):Object(b.jsx)("div",{className:"item__outofstock",children:"this product is currently unavailable."})]})})]})]})})}}}]);
//# sourceMappingURL=12.dd90dbb5.chunk.js.map