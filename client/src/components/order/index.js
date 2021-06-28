import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context';
import './order.css';
import { Link } from 'react-router-dom';
import {formatPrice} from '../../utils/formatPrice';

const Order = () => {
    const {isLoggedIn} = useGlobalContext();
    const [orders,setOrders] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    useEffect(()=>{
        setIsLoading(true);
        if(isLoggedIn){
            axios.get('/user/orders')
                .then(res =>{
                    if(res.data.orders){
                        setOrders(res.data.orders);
                        setIsLoading(false);
                    }
                })
        }
    },[isLoggedIn]);

    if(isLoading){
        return (
            <div className="order__loader">
                <div className="loader__spinner"></div>
            </div>
        )
    }

    if(!orders.length){
        return <p className="no__orders center">All your orders will be displayed here</p>
    }

    return (
        <div className="orders">
            {orders.map(o =>{
                return <div key={o.orderId} className="single__order">
                    <h1> <span>order id :</span> {o.orderId}</h1>
                    <h1> <span>total : </span> {formatPrice(o.amount)}</h1>
                    {o.order.map((item,index) => {
                        return(
                            <div key={index}className="order__item">
                                <Link to={`/shop/${item.itemId}`}><img src={`https://sbcoffeecompany.herokuapp.com/${item.img}`} alt=""/></Link>
                                <span>{item.name}</span>
                                <span>{formatPrice(item.price)}</span>
                                <span>{item.pqty}</span>
                            </div>
                        );
                    })}
                </div>
            })}
        </div>
    )
}

export default Order
