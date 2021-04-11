import React from 'react'
import './cartComponent.css';
import CartItem from '../cartItem';
import { useCartContext } from '../../cartContext';

const CartComponent = ({cartProducts,source}) => {
    return (
        <div className="cart__products">
             {cartProducts.length ? cartProducts.map(item=>{
                    return(
                        <CartItem key={item._id} source={source} cartProducts={cartProducts} {...item}/>//passing cart products to make it a dependency in useEffect
                    )
                }):null}
        </div>
    )
}

export default CartComponent
