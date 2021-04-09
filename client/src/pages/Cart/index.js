import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../../context';
import CartItem from '../../components/cartItem';
import CartComponent from '../../components/cartComponent';
import './cart.css';
import Checkout from '../Checkout'
import { Link } from 'react-router-dom';
import { useCartContext } from '../../cartContext';
import CartSummary from '../../components/cartSummary';

const Cart = () => {
    const {cart} = useGlobalContext();
    const {cartProducts,cartTotalItems,cartTotalAmount} = useCartContext();

    if(!cart.length){
        return(
            <div className="cart__empty">
                <p>There is nothing in cart </p>
            </div>
        )
    }

    return (
        <div className="cart">
            <div className="cart__center center">
                    <div className="cart__content">
                        <CartComponent/>
                        {/* <div className="cart__products">
                            {cartProducts.length ? cartProducts.map(item=>{
                                return(
                                    <CartItem key={item._id} cartProducts={cartProducts} {...item}/>//passing cart products to make it a dependency in useEffect
                                )
                            }):null}
                        </div> */}
                        <CartSummary source={'cart'}/>
                    </div>
                
            </div>
        </div>
    )
}

export default Cart
