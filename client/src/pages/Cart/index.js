import React from 'react';
import { useGlobalContext } from '../../context';
import CartComponent from '../../components/cartComponent';
import './cart.css';
import { useCartContext } from '../../cartContext';
import CartSummary from '../../components/cartSummary';
import Loader from '../../components/loader';
import Error from '../../components/error';

const Cart = () => {
    const {cart,productError,productLoading} = useGlobalContext();
    const {cartProducts} = useCartContext();
    
    if(productLoading){
        return <Loader/>
    }
    if(productError){
        return <Error/>
    }

    if(!cart.length){
        return(
            <div className="cart__empty">
                <p>There is nothing in cart </p>
            </div>
        )
    }

    if(!cartProducts.length){
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
                        <CartComponent source={'cart'}/>
                        <CartSummary source={'cart'}/>
                    </div>
                
            </div>
        </div>
    )
}

export default Cart
