(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[4],{101:function(c,t,e){"use strict";var s=e(3),a=e(2),r=(e(95),e(4)),n=e(9),i=(e(96),e(31)),j=e(32),l=e(7),_=e(29),o=e(1),b=function(c){var t=c.img,e=c.name,s=c.price,b=c.pqty,d=c._id,u=c.cartProducts,m=c.stock,O=Object(n.b)(),h=O.updateCartItem,x=O.removeCartItem,p=Object(a.useState)(0),f=Object(r.a)(p,2),v=f[0],N=f[1],y=function(){1!==v&&N((function(c){return c-1}))},g=function(){N(v>=m?m:function(c){return c+1})};return Object(a.useEffect)((function(){N(b>m?m:b)}),[u]),Object(a.useEffect)((function(){v>0&&h(v,d)}),[v]),Object(o.jsx)(o.Fragment,{children:Object(o.jsxs)("div",{className:"cart__item",children:[Object(o.jsx)(l.b,{to:"/shop/".concat(d),children:Object(o.jsx)("img",{src:"https://sbcoffeecompany.herokuapp.com/".concat(t[0]),alt:""})}),Object(o.jsxs)("div",{className:"cart__item__info",children:[Object(o.jsx)("p",{className:"cart__item__name",children:e}),Object(o.jsx)("p",{className:"cart__item__price",children:Object(_.a)(s)}),Object(o.jsxs)("span",{className:"cart__item__qty",children:[Object(o.jsx)("span",{className:"cart__item__qty__inc control",onClick:y,children:Object(o.jsx)(j.b,{})}),Object(o.jsx)("span",{children:v}),Object(o.jsx)("span",{className:"cart__item__qty__dec control",onClick:g,children:Object(o.jsx)(j.c,{})})]})]}),Object(o.jsxs)("button",{className:"cart__item__remove",onClick:function(){return x(d)},children:[Object(o.jsx)(i.a,{}),Object(o.jsx)("span",{className:"cart__item__tooltip",children:"remove"})]})]})})},d=e(20);t.a=function(c){var t=c.source,e=Object(d.b)().cartProducts;return Object(o.jsx)("div",{className:"cart__products",children:e.length?e.map((function(c){return Object(o.jsx)(b,Object(s.a)({source:t,cartProducts:e},c),c._id)})):null})}},103:function(c,t,e){},116:function(c,t,e){"use strict";e.r(t);e(2);var s=e(9),a=e(101),r=(e(103),e(20)),n=e(97),i=e(21),j=e(30),l=e(17),_=e(1);t.default=function(){var c=Object(s.b)(),t=c.cart,e=c.productError,o=c.productLoading,b=Object(r.b)().cartProducts;return o?Object(_.jsx)(i.a,{}):e?Object(_.jsx)(j.a,{}):t.length&&b.length?Object(_.jsxs)("div",{className:"cart",children:[Object(_.jsx)("div",{className:"cart__center center",children:Object(_.jsxs)("div",{className:"cart__content",children:[Object(_.jsx)(a.a,{source:"cart"}),Object(_.jsx)(n.a,{source:"cart"})]})}),Object(_.jsx)(l.a,{})]}):Object(_.jsxs)("div",{className:"cart__empty__wrapper",children:[Object(_.jsx)("div",{className:"cart__empty",children:Object(_.jsx)("p",{children:"There is nothing in cart "})}),Object(_.jsx)(l.a,{})]})}},95:function(c,t,e){},96:function(c,t,e){},97:function(c,t,e){"use strict";e(2);var s=e(20),a=(e(98),e(7)),r=e(29),n=e(1);t.a=function(c){var t=c.source,e=Object(s.b)(),i=e.discountAmount,j=e.cartTotalItems,l=e.cartTotalAmount;return Object(n.jsxs)("div",{className:"cart__summary",children:[Object(n.jsx)("h1",{children:"order summary"}),Object(n.jsxs)("div",{className:"cart__summary__info",children:[Object(n.jsxs)("div",{className:"cart__summary__details",children:[Object(n.jsx)("p",{children:"items"}),Object(n.jsx)("p",{children:j})]}),Object(n.jsxs)("div",{className:"cart__summary__details",children:[Object(n.jsx)("p",{children:"sub total"}),Object(n.jsx)("p",{children:Object(r.a)(i+l)})]}),Object(n.jsxs)("div",{className:"cart__summary__details",children:[Object(n.jsx)("p",{children:"discount"}),Object(n.jsxs)("p",{children:["(-) ",Object(r.a)(i)]})]}),Object(n.jsxs)("div",{className:"cart__summary__details cart__summary__total",children:[Object(n.jsx)("p",{children:"total amount"}),Object(n.jsx)("p",{children:Object(r.a)(l)})]})]}),"cart"===t?Object(n.jsx)(a.b,{to:"/checkout",className:"btn__general",children:"checkout"}):null]})}},98:function(c,t,e){}}]);
//# sourceMappingURL=4.708b1035.chunk.js.map