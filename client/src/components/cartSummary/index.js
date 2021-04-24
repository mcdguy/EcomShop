import React from 'react';
import { useCartContext } from '../../cartContext';
import './cartSummary.css';
import { Link } from 'react-router-dom';
import {formatPrice} from '../../utils/formatPrice';

const CartSummary = ({source}) => {
    const {cartProducts,cartTotalItems,cartTotalAmount} = useCartContext();
    return (
        <div className="cart__summary">
            <h1>order summary</h1>
            <div className="cart__summary__info">
                <div className="cart__summary__details">
                    <p>items</p>
                    <p>{cartTotalItems}</p>
                </div>
                <div className="cart__summary__details">
                    <p>amount</p>
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
