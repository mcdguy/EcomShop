import React,{useState,useEffect} from 'react';
import './singleproduct.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import {formatPrice} from '../../utils/formatPrice';
const SingleProduct = () => {
    const {addCartItem} = useGlobalContext();   
    const {id} = useParams();
    const [item,setItem] = useState({});
    const [error,setError] = useState({message: '',show: false});
    const [isLoading,setIsLoading] = useState(false);
    const [currentImage,setCurrentImage] = useState(0);
    const [showMsg,setShowMsg] = useState(false);
    useEffect(()=>{
        setError({...error, message:'',show: false})
        axios.get(`/product/shop/${id}`)
            .then(res => {
                setItem(res.data);
            })
            .catch(err =>{setError({...error, message: err.message,show: true})});
    },[]);

    useEffect(()=>{
        let x = setTimeout(()=>{
            setShowMsg(false);
        },5000)
        return ()=>{
            clearTimeout(x);
        }
    },[showMsg])

    // const decreaseQuantity = () =>{
    //     if(quantity === 1){
    //         return;
    //     }
    //     setQuantity(quantity-1);
    // }
    // if(isLoading){
    //     return <div className="item-loading"></div>
    // }
    // if(error){
    //     return <div className="item-error"></div>
    // }
    return (
        <> 
            {item.error?<div className="item_error">{item.error}</div>:
                <div className="item">
                    <div className={`${showMsg?'item__added show': 'item__added'}`}>
                        <div className="center">
                            <span className="msg">item added</span>
                            <Link to="/cart">preview</Link>
                        </div>
                    </div>
                    <div className="item__container center">
                        
                        <div className="item__slider">
                            <div className="item__slider__wrapper">
                                <div className="item__img">
                                    {item.img && item.img.map((image,index)=>{
                                        return <img  key={index} className={`${currentImage===index?'active':null}`} src={`/${image}`} alt={item && item.name}/>
                                    })}
                                </div>
                                <div className="item__thumb__bar">
                                    {item.img && item.img.map((image,index)=>{
                                        return <span className={`item__thumb ${currentImage===index?'active':null}`} key={index} onClick={()=>setCurrentImage(index)}><img className="item__thumb__image" src={`/${image}`} alt=""/></span>
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="item__info">
                            <div className="item__info__wrapper">
                                <p className="item__info__name">{item.name}</p>
                                <p className="item__info__price">PRICE: {formatPrice(item.price)}</p>
                                <p className="item__info__weight">{item.weight==='null'?'':item.weight}</p>
                                <p className="item__info__desc">{item.description}</p>
                                {item.stock?
                                    <>
                                    {/* <div className="item__qty">
                                    <span className='item__qty__inc' onClick={decreaseQuantity}>-</span>     
                                    <span>{quantity}</span>     
                                    <span className='item__qty__dec' onClick={()=>setQuantity(quantity+1)}>+</span>
                                    </div> */}
                                    <div className="btn-wrapper">
                                        <a onClick={()=>{setShowMsg(true); addCartItem(item._id,1)}}>add to cart</a>
                                    </div>
                                    {/* <div className={`${showMsg?'alert-wrapper show': 'alert-wrapper'}`}>
                                        <span>item added</span>
                                    </div> */}
                                    </>
                                    :<div className="item__outofstock">
                                        this product is currently unavailable.
                                    </div>
                                    
                                }

                            </div>
                        </div>

                    </div>

                </div>
            }
        </>
    )
}

export default SingleProduct
