import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../../context';
import './cartItem.css';
import {GrClose} from "react-icons/gr";
import {FaMinus,FaPlus} from "react-icons/fa";
import {BiMinus,BiPlus} from "react-icons/bi";
import { Link } from 'react-router-dom';

const CartItem = ({img,name,price,pqty,_id}) => {
    const {updateCartItem,removeCartItem} = useGlobalContext();
    const [quantity,setQuantity] = useState(0);//setting this to 0 because it will get updated in useEffect and i don't want the other useEffect to run when quantity is 0
    const decreaseQuantity = () =>{
        if(quantity === 1){
            return;
        }
        setQuantity(quantity-1);
    }
    useEffect(()=>{
        setQuantity(pqty);
    },[]);//not passing any dependency as it is dependent on cartItem which will re render itself on any change
    
    useEffect(()=>{
        if(quantity>0){//without this condition all the quantity in cart will become 0 because of initial value of quantity
            updateCartItem(quantity,_id);
        }
    },[quantity]);
    return (
        <div className="cart__item">
            <Link to={`/shop/${_id}`}>
                <img src={img[0]} alt=""/>
            </Link>
            <div className="cart__item__info">
                <p className="cart__item__name">{name}</p>
                <p className="cart__item__price">&#8377; {price}</p>
                <span className="cart__item__qty">
                        <span className='cart__item__qty__inc' onClick={decreaseQuantity}><BiMinus/></span>     
                        <span>{quantity}</span>     
                        <span className='cart__item__qty__dec' onClick={()=>setQuantity(quantity+1)}><BiPlus/></span>
                </span>
            </div>
            <button className="cart__item__remove" onClick={()=>removeCartItem(_id)}><GrClose/><span className="cart__item__tooltip">remove</span></button>
        </div>

    )
}

export default CartItem
