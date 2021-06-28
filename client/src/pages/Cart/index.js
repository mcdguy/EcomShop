import React from 'react';
import { useGlobalContext } from '../../context';
import CartComponent from '../../components/cartComponent';
import './cart.css';
import { useCartContext } from '../../cartContext';
import CartSummary from '../../components/cartSummary';
import Loader from '../../components/loader';
import Error from '../../components/error';
import Footer from '../../components/footer';

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
            <div className="cart__empty__wrapper">
                <div className="cart__empty">
                    <p>There is nothing in cart </p>
                </div>
                <Footer/>
            </div>
        )
    }

    if(!cartProducts.length){
        return(
            <div className="cart__empty__wrapper">
                <div className="cart__empty">
                    <p>There is nothing in cart </p>
                </div>
                <Footer/>
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
            <Footer/>
        </div>
    )
}

export default Cart
