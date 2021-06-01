import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../../context';
import './cartItem.css';
import {GrClose} from "react-icons/gr";
import {BiMinus,BiPlus} from "react-icons/bi";
import { Link } from 'react-router-dom';
import {formatPrice} from '../../utils/formatPrice';

const CartItem = ({img,name,price,pqty,_id,cartProducts,stock}) => {
    const {updateCartItem,removeCartItem} = useGlobalContext();
    const [quantity,setQuantity] = useState(0);
    const cartItem = () =>{
        return (
            <div className="cart__item">
                <Link to={`https://sbcoffeecompany.herokuapp.com/shop/${_id}`}>
                    <img src={img[0]} alt=""/>
                </Link>
                <div className="cart__item__info">
                    <p className="cart__item__name">{name}</p>
                    <p className="cart__item__price">{formatPrice(price)}</p>
                    <span className="cart__item__qty">
                            <span className='cart__item__qty__inc control' onClick={decreaseQuantity}><BiMinus/></span>     
                            <span>{quantity}</span>     
                            <span className='cart__item__qty__dec control' onClick={increaseQuantity}><BiPlus/></span>
                    </span>
                </div>
                <button className="cart__item__remove" onClick={()=>removeCartItem(_id)}><GrClose/><span className="cart__item__tooltip">remove</span></button>
            </div>
        );
    }
    const decreaseQuantity = () =>{
        //quantity can't be 0
        if(quantity === 1){
            return;
        }
        setQuantity(quantity => {return(quantity-1)});
    }
    const increaseQuantity = () =>{
        if(quantity >= stock){
            setQuantity(stock);
            return;
        }
        setQuantity(quantity => {return(quantity+1)})
    }
    useEffect(()=>{
        //checking at the time of initializing that if the quantity is less than the purchase quantity
        if(pqty>stock){
            setQuantity(stock);
            return;
        }
        setQuantity(pqty);
    },[cartProducts]);

    useEffect(()=>{
        //without this quantity will become 0 because of initial value of quantity
        if(quantity>0){
            updateCartItem(quantity,_id);
        }
    },[quantity]);

    return (
        <>
            {cartItem()}
        </>
    )
}

export default CartItem
