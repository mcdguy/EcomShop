(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4],{105:function(e,s,n){},106:function(e,s,n){},107:function(e,s,n){},125:function(e,s,n){"use strict";n.r(s);var a=n(14),i=n(3),c=n(2),t=n(9),r=(n(105),n(4)),l=n(18),d=n(32),j=n(1),p=function(){var e=Object(d.b)(),s=e.billingAddress,n=e.billingError,a=e.handleBillingAddress,i=e.handleBillingState,t=Object(c.useState)(!1),p=Object(r.a)(t,2),_=p[0],b=p[1];return Object(j.jsx)("div",{className:"billing",children:Object(j.jsxs)("form",{children:[Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",value:s.billingaddressLine,onChange:a,type:"text",name:"billingaddressLine"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"billingaddressLine",children:[" ",Object(j.jsx)("span",{children:"street"}),"  "]}),n.bAddressLine?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.bAddressLine}):null]}),Object(j.jsx)("div",{className:"address__inp__wrapper anim--inp--wrapper",onClick:function(){return b(!_)},children:Object(j.jsxs)("div",{className:"state__dropdown",children:[Object(j.jsxs)("div",{className:"state__option__head",children:[s.billingstate,Object(j.jsxs)("label",{className:"".concat(""===s.billingstate?"address__inp__label anim--inp--label":"address__inp__label anim--inp--label anim__text__head__label"),htmlFor:"billingstate",children:[" ",Object(j.jsx)("span",{children:"state"})," "]}),n.bState?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.bState}):null]}),_?Object(j.jsx)("div",{className:"state__options",children:l.a.map((function(e){return Object(j.jsx)("div",{onClick:function(){return i(e)},className:"state__op",children:e},e)}))}):null]})}),Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",value:s.billingcity,onChange:a,name:"billingcity",type:"text"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"billingcity",children:[" ",Object(j.jsx)("span",{children:"city"})," "]}),n.bCity?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.bCity}):null]}),Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",value:s.billingpin,onChange:a,name:"billingpin",type:"number"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"billingpin",children:[" ",Object(j.jsx)("span",{children:"pin"})," "]}),n.bPin?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.bPin}):null]}),Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",value:s.billingcontact,onChange:a,name:"billingcontact",type:"number"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"billingcontact",children:[" ",Object(j.jsx)("span",{children:"contact"})," "]}),n.bContact?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.bContact}):null]})]})})},_=function(){var e=Object(d.b)(),s=e.shippingAddress,n=e.shippingError,a=e.handleShippingAddress,i=e.handleShippingState,t=Object(c.useState)(!1),p=Object(r.a)(t,2),_=p[0],b=p[1];return Object(j.jsx)("div",{className:"shipping",children:Object(j.jsxs)("form",{children:[Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",type:"text",onChange:function(e){return a(e)},value:s.shippingaddressLine,id:"shippingaddressLine",name:"shippingaddressLine"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"shippingaddressLine",children:[" ",Object(j.jsx)("span",{children:"street"}),"  "]}),n.sAddressLine?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.sAddressLine}):null]}),Object(j.jsx)("div",{className:"address__inp__wrapper anim--inp--wrapper",onClick:function(){return b(!_)},children:Object(j.jsxs)("div",{className:"state__dropdown",children:[Object(j.jsxs)("div",{className:"state__option__head",children:[s.shippingstate,Object(j.jsxs)("label",{className:"".concat(""===s.shippingstate?"address__inp__label anim--inp--label":"address__inp__label anim--inp--label anim__text__head__label"),htmlFor:"billingstate",children:[" ",Object(j.jsx)("span",{children:"state"})," "]}),n.sState?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.sState}):null]}),_?Object(j.jsx)("div",{className:"state__options",children:l.a.map((function(e){return Object(j.jsx)("div",{onClick:function(){return i(e)},className:"state__op",children:e},e)}))}):null]})}),Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",onChange:function(e){return a(e)},value:s.shippingcity,name:"shippingcity",type:"text"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"shippingcity",children:[" ",Object(j.jsx)("span",{children:"city"})," "]}),n.sCity?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.sCity}):null]}),Object(j.jsxs)("div",{className:"address__inp__wrapper anim--inp--wrapper",children:[Object(j.jsx)("input",{required:!0,className:"address__inp anim--inp",onChange:function(e){return a(e)},value:s.shippingpin,name:"shippingpin",type:"number"}),Object(j.jsxs)("label",{className:"address__inp__label anim--inp--label",htmlFor:"shippingpin",children:[Object(j.jsx)("span",{children:"pin"}),"  "]}),n.sPin?Object(j.jsx)("span",{className:"address__inp__error anim--inp--error",children:n.sPin}):null]})]})})},b=n(95),o=n(99),m=(n(106),n.p+"static/media/order__success.5b096b2c.jpg"),h=n(16),u=function(e){var s=e.id,n=e.email,a=e.hideOrderAlert;return Object(j.jsx)("div",{className:"order__modal__wrapper",children:Object(j.jsxs)("div",{className:"order__modal",children:[Object(j.jsx)(h.a,{onClick:a}),Object(j.jsx)("img",{src:m,alt:""}),Object(j.jsx)("h1",{children:"Your order has been received"}),Object(j.jsx)("h4",{children:"Your order id is:"}),Object(j.jsxs)("h5",{children:[s," "]}),Object(j.jsx)("h4",{children:" An email has been sent to:"}),Object(j.jsxs)("h5",{children:[n," "]})]})})},O=n(20),x=(n(107),function(e){var s=e.message,n=e.setShowAlert;return Object(c.useEffect)((function(){var e=setTimeout((function(){n(!1)}),2e3);return function(){return clearTimeout(e)}}),[]),Object(j.jsx)("div",{className:"alert_wrapper",children:Object(j.jsxs)("div",{className:"alert",children:[Object(j.jsx)(h.a,{onClick:function(){return n(!1)}}),s]})})});s.default=function(){var e=Object(d.b)(),s=e.showShipping,n=e.showShippingAddress,c=e.hideShippingAddress,r=e.makePayment,l=e.user,m=e.handleUserDetails,h=e.userError,N=e.orderAlert,v=e.hideOrderAlert,g=e.showAlert,f=e.setShowAlert,w=e.saveDetails,y=e.setSaveDetails,k=Object(O.b)(),C=k.couponCode,A=k.setCouponError,S=k.couponError,F=k.setCouponCode,L=k.verifyCoupon,q=k.discount,E=Object(t.b)().isLoggedIn;return Object(j.jsx)("div",{className:"checkout",children:Object(j.jsxs)("div",{className:"center",children:[g&&Object(j.jsx)(x,{setShowAlert:f,message:"cart has been modified"}),N.show&&Object(j.jsx)(u,Object(i.a)(Object(i.a)({},N),{},{hideOrderAlert:v})),Object(j.jsxs)("div",{className:"checkout__form",children:[Object(j.jsxs)("div",{className:"user__wrapper",children:[Object(j.jsx)("h1",{className:"form__type",children:"user details"}),Object(j.jsx)("div",{className:"user__form",children:Object(j.jsxs)("form",{children:[Object(j.jsxs)("div",{className:"anim--inp--wrapper",children:[Object(j.jsx)("input",{className:"anim--inp",type:"text",id:"userformname",value:l.name,onChange:function(e){return m(e)},autoComplete:"off",name:"name",required:!0}),Object(j.jsx)("label",{htmlFor:"userformname",className:"anim--inp--label",children:"name"}),h.name?Object(j.jsx)("span",{className:"anim--inp--error",children:h.name}):null]}),Object(j.jsxs)("div",{className:"anim--inp--wrapper",children:[Object(j.jsx)("input",{className:"anim--inp",type:"text",id:"userformemail",value:l.email,onChange:function(e){return m(e)},autoComplete:"off",name:"email",required:!0}),Object(j.jsx)("label",{htmlFor:"userformemail",className:"anim--inp--label",children:"email"}),h.email?Object(j.jsx)("span",{className:"anim--inp--error",children:h.email}):null]})]})})]}),Object(j.jsxs)("div",{className:"billing__wrapper",children:[Object(j.jsx)("h1",{className:"form__type",children:"billing address"}),Object(j.jsx)(p,{})]}),s&&Object(j.jsxs)("div",{className:"shipping__wrapper",children:[Object(j.jsx)("h1",{className:"form__type type-billing",children:"shipping address"}),Object(j.jsx)(_,{})]}),Object(j.jsx)("div",{className:"promo__code",children:Object(j.jsxs)("div",{className:"promo__wrapper",children:[Object(j.jsxs)("div",{className:"promo__input__wrapper",children:[Object(j.jsx)("input",{value:C,onChange:function(e){F(e.target.value),A("")},placeholder:"got a promo code?",type:"text"}),Object(j.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",className:q?"valid":"nothing",viewBox:"0 0 37 37",children:[Object(j.jsx)("path",{className:"circ path",d:"M30.5 6.5h0c6.6 6.6 6.6 17.4 0 24h0c-6.6 6.6-17.4 6.6-24 0h0c-6.6-6.6-6.6-17.4 0-24h0c6.6-6.7 17.4-6.7 24 0z",fill:"none",stroke:"#000",strokeWidth:3,strokeLinejoin:"round",strokeMiterlimit:10}),Object(j.jsx)("path",{className:"tick path",fill:"none",stroke:"#000",strokeWidth:3,strokeLinejoin:"round",strokeMiterlimit:10,d:"M11.6 20l4.3 4.2 10.5-10.4"})]}),""===S?null:Object(j.jsx)("span",{className:"anim--inp--error coupon__error",children:S})]}),Object(j.jsx)("button",{className:"button__effect",onClick:L,children:"apply"})]})}),Object(j.jsxs)("p",{className:"checkout__checkbox",children:[Object(j.jsx)("input",{type:"checkbox",id:"same-address",onChange:function(e){e.target.checked?c():n()},checked:!s}),Object(j.jsx)("label",{htmlFor:"same-address",children:" billing address same as shipping address"})]}),E?Object(j.jsxs)("p",{className:"checkout__checkbox",children:[Object(j.jsx)("input",Object(a.a)({type:"checkbox",id:"save-details",onChange:function(){return y(!w)},checked:!s},"checked",w)),Object(j.jsx)("label",{htmlFor:"save-details",children:" save details"})]}):null,Object(j.jsx)("div",{className:"btn__wrapper",children:Object(j.jsx)("button",{className:"checkout__btn",onClick:r,children:"make payment"})})]}),Object(j.jsxs)("div",{className:"checkout__sidebar",children:[Object(j.jsx)(o.a,{source:"checkout"}),Object(j.jsx)(b.a,{source:"checkout"})]})]})})}},93:function(e,s,n){},94:function(e,s,n){},95:function(e,s,n){"use strict";n(2);var a=n(20),i=(n(96),n(6)),c=n(29),t=n(1);s.a=function(e){var s=e.source,n=Object(a.b)(),r=n.discountAmount,l=n.cartTotalItems,d=n.cartTotalAmount;return Object(t.jsxs)("div",{className:"cart__summary",children:[Object(t.jsx)("h1",{children:"order summary"}),Object(t.jsxs)("div",{className:"cart__summary__info",children:[Object(t.jsxs)("div",{className:"cart__summary__details",children:[Object(t.jsx)("p",{children:"items"}),Object(t.jsx)("p",{children:l})]}),Object(t.jsxs)("div",{className:"cart__summary__details",children:[Object(t.jsx)("p",{children:"sub total"}),Object(t.jsx)("p",{children:Object(c.a)(r+d)})]}),Object(t.jsxs)("div",{className:"cart__summary__details",children:[Object(t.jsx)("p",{children:"discount"}),Object(t.jsxs)("p",{children:["(-) ",Object(c.a)(r)]})]}),Object(t.jsxs)("div",{className:"cart__summary__details cart__summary__total",children:[Object(t.jsx)("p",{children:"total amount"}),Object(t.jsx)("p",{children:Object(c.a)(d)})]})]}),"cart"===s?Object(t.jsx)(i.b,{to:"/checkout",className:"btn__general",children:"checkout"}):null]})}},96:function(e,s,n){},99:function(e,s,n){"use strict";var a=n(3),i=n(2),c=(n(93),n(4)),t=n(9),r=(n(94),n(16)),l=n(31),d=n(6),j=n(29),p=n(1),_=function(e){var s=e.img,n=e.name,a=e.price,_=e.pqty,b=e._id,o=e.cartProducts,m=e.stock,h=Object(t.b)(),u=h.updateCartItem,O=h.removeCartItem,x=Object(i.useState)(0),N=Object(c.a)(x,2),v=N[0],g=N[1],f=function(){1!==v&&g((function(e){return e-1}))},w=function(){g(v>=m?m:function(e){return e+1})};return Object(i.useEffect)((function(){g(_>m?m:_)}),[o]),Object(i.useEffect)((function(){v>0&&u(v,b)}),[v]),Object(p.jsx)(p.Fragment,{children:Object(p.jsxs)("div",{className:"cart__item",children:[Object(p.jsx)(d.b,{to:"/shop/".concat(b),children:Object(p.jsx)("img",{src:s[0],alt:""})}),Object(p.jsxs)("div",{className:"cart__item__info",children:[Object(p.jsx)("p",{className:"cart__item__name",children:n}),Object(p.jsx)("p",{className:"cart__item__price",children:Object(j.a)(a)}),Object(p.jsxs)("span",{className:"cart__item__qty",children:[Object(p.jsx)("span",{className:"cart__item__qty__inc control",onClick:f,children:Object(p.jsx)(l.b,{})}),Object(p.jsx)("span",{children:v}),Object(p.jsx)("span",{className:"cart__item__qty__dec control",onClick:w,children:Object(p.jsx)(l.c,{})})]})]}),Object(p.jsxs)("button",{className:"cart__item__remove",onClick:function(){return O(b)},children:[Object(p.jsx)(r.a,{}),Object(p.jsx)("span",{className:"cart__item__tooltip",children:"remove"})]})]})})},b=n(20);s.a=function(e){var s=e.source,n=Object(b.b)().cartProducts;return Object(p.jsx)("div",{className:"cart__products",children:n.length?n.map((function(e){return Object(p.jsx)(_,Object(a.a)({source:s,cartProducts:n},e),e._id)})):null})}}}]);
//# sourceMappingURL=4.25b9e533.chunk.js.map