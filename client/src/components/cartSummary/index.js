import React,{useState} from 'react';
import { useCartContext } from '../../cartContext';
import './cartSummary.css';
import { Link } from 'react-router-dom';
import {formatPrice} from '../../utils/formatPrice';

const CartSummary = ({source}) => {
    const {discountAmount,cartTotalItems,cartTotalAmount} = useCartContext();
    return (
        <div className="cart__summary">
            <h1>order summary</h1>
            <div className="cart__summary__info">
                <div className="cart__summary__details">
                    <p>items</p>
                    <p>{cartTotalItems}</p>
                </div>
                <div className="cart__summary__details">
                    <p>sub total</p>
                    <p>{formatPrice(discountAmount + cartTotalAmount)}</p>
                </div>
                <div className="cart__summary__details">
                    <p>discount</p>
                    <p>(-) {formatPrice(discountAmount)}</p>
                </div>
                <div className="cart__summary__details cart__summary__total">
                    <p>total amount</p>
                    <p>{formatPrice(cartTotalAmount)}</p>
                </div>
            </div>
            {source==='cart'?
                <Link to='/checkout' className="btn-checkout">checkout</Link>
                :null
            }
        </div>
    )
}

export default CartSummary
