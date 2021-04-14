import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../../context';
import './cartItem.css';
import {GrClose} from "react-icons/gr";
import {BiMinus,BiPlus} from "react-icons/bi";
import { Link } from 'react-router-dom';
import { useCartContext } from '../../cartContext';

const CartItem = ({img,name,price,pqty,_id,cartProducts,stock,source,checked}) => {
    const {cart} = useGlobalContext();
    const {toggleCheck} = useCartContext();
    const {updateCartItem,removeCartItem} = useGlobalContext();
    const [quantity,setQuantity] = useState(0);//setting this to 0 because it will get updated in useEffect and i don't want the other useEffect to run when quantity is 0
    
    const cartItem = () =>{
        return (
            <div className="cart__item">
                {/* {source === 'cart'?
                    <div className="check__item__wrapper"><input type="checkbox" onChange={()=>toggleCheck(_id)} checked={checked}/></div>
                :null} */}
                <Link to={`/shop/${_id}`}>
                    <img src={img[0]} alt=""/>
                </Link>
                <div className="cart__item__info">
                    <p className="cart__item__name">{name}</p>
                    <p className="cart__item__price">&#8377; {price}</p>
                    <span className="cart__item__qty">
                            <span className='cart__item__qty__inc' onClick={decreaseQuantity}><BiMinus/></span>     
                            <span>{quantity}</span>     
                            <span className='cart__item__qty__dec' onClick={increaseQuantity}><BiPlus/></span>
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
        // if(quantity === stock){//quantity should be compared with db quantity maybe i need to change property name to stock
        //     return
        // }
       
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

    //this is introducing a bug which is when i change the page i save data to db because this is triggered so if other session has made a change and i switch page i will overwite it because it triggers on page change
    //everything works fine if i stay 
    useEffect(()=>{//any change in qty will be pushed to cart
        //the bug can be stopped by stopping this when page is switched
        // i need to stop this if qty in cartProducts is same to this quantity
        
        //this thing is stopping the cart from triggering again on tab switch
        // let isUpdated = false;
        // cart.forEach(item =>{
        //     if(_id === item.productId){
        //         if(item.pqty === pqty){
        //             isUpdated = true;
        //         }
        //     }
        // })
        // if(isUpdated){
        //         return;
        // }
            
        // console.log('looks like page is switched');
        if(quantity>0){//without this condition all the quantity in cart will become 0 because of initial value of quantity
            updateCartItem(quantity,_id);
        }
    },[quantity]);

    return (
        <>
            {cartItem()}
            {/* {source === 'checkout'?(checked?<>{cartItem()}</>:<>{console.log('hello')}</>):<>{cartItem()}</>} */}
        </>
        // <>
        // {(source === 'checkout' && !checked)
        //     ?<>{console.log('hello')}</>
        //     :<>{cartItem()}</>
        //     // :<div className="cart__item">
        //     //     {source === 'cart'?
        //     //         <div className="check__item__wrapper"><input type="checkbox" onChange={()=>toggleCheck(_id)} checked={checked}/></div>
        //     //     :null}
        //     //     <Link to={`/shop/${_id}`}>
        //     //         <img src={img[0]} alt=""/>
        //     //     </Link>
        //     //     <div className="cart__item__info">
        //     //         <p className="cart__item__name">{name}</p>
        //     //         <p className="cart__item__price">&#8377; {price}</p>
        //     //         <span className="cart__item__qty">
        //     //                 <span className='cart__item__qty__inc' onClick={decreaseQuantity}><BiMinus/></span>     
        //     //                 <span>{quantity}</span>     
        //     //                 <span className='cart__item__qty__dec' onClick={increaseQuantity}><BiPlus/></span>
        //     //         </span>
        //     //     </div>
        //     //     <button className="cart__item__remove" onClick={()=>removeCartItem(_id)}><GrClose/><span className="cart__item__tooltip">remove</span></button>
        //     // </div>
        // }
        // </>

    )
}

export default CartItem
