import axios from 'axios';
import React,{useState,useEffect} from 'react'
import './viewOrder.css';
import {formatPrice} from '../../utils/formatPrice';
import Loader from '../loader';
import Error from '../error';
var moment = require('moment');

const ViewOrder = ({id}) => {
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);

    const [order,setOrder] = useState(null);
    useEffect(()=>{
        setIsLoading(true);
        setError(false);
        axios.get(`/order/${id}`)
            .then(res =>{
                if(res.data.order){
                    setIsLoading(false);
                    setOrder(res.data.order);
                }
                if(res.data.error){
                    setError(true);
                    console.log(res.data.error);
                }
            })
            .catch(err => {
                console.log(err);
                setError(true);
            })
    },[]);
    
    if(isLoading){
        return <Loader/>;
    }
    
    if(error){
        return <Error/>;
    }
    
    if(!order) return null;
    
    return (
        <div className="view__order">

            <div className="view__order__details">
                <h3 className="view__order__head">Order details</h3>
                <table className="view__order__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>payment id</div>
                            </td>
                            <td>
                                <div>{order.paymentId}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>order id</div>
                            </td>
                            <td>
                                <div>{order.orderId}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>receipt</div>
                            </td>
                            <td>
                                <div>{order.receipt}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>status</div>
                            </td>
                            <td>
                                <div>{order.pending?'pending':'completed'}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>amount</div>
                            </td>
                            <td>
                                <div>{formatPrice(order.amount)}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>discount</div>
                            </td>
                            <td>
                                <div>{formatPrice(order.discount)}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>date</div>
                            </td>
                            <td>
                                <div>{moment(order.createdAt).format('DD-MM-YYYY')}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>time</div>
                            </td>
                            <td>
                                <div>{moment(order.createdAt).format('HH:mm:ss')}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <div>payment id: {order.paymentId}</div>
                <div>order id: {order.orderId}</div>
                <div>receipt: {order.receipt}</div>
                <div>status: {order.pending?'pending':'completed'}</div> */}
            </div>
            <div className="view__order__buyer__details">
                <h3 className="view__order__head">buyer details</h3>
                <table className="view__order__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>name</div>
                            </td>
                            <td>
                                <div>{order.buyer.name}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>user</div>
                            </td>
                            <td>
                                <div>{order.user || 'not registered'}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>email</div>
                            </td>
                            <td>
                                <div>{order.buyer.email}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>contact</div>
                            </td>
                            <td>
                                <div>{order.buyer.contact}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <div>{order.buyer.name}</div>
                <div>{order.buyer.email}</div>
                <div>{order.buyer.contact}</div> */}
            </div>
            <div className="view__order__address__billing">
                <h3 className="view__order__head">billing details</h3>
                <table className="view__order__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>street</div>
                            </td>
                            <td>
                                <div>{order.billingAddress.addressLine}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>state</div>
                            </td>
                            <td>
                                <div>{order.billingAddress.state}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>city</div>
                            </td>
                            <td>
                                <div>{order.billingAddress.city}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>pin</div>
                            </td>
                            <td>
                                <div>{order.billingAddress.pin}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {/* <div>{order.billingAddress.addressLine}</div>
                <div>{order.billingAddress.state}</div>
                <div>{order.billingAddress.city}</div>
                <div>{order.billingAddress.pin}</div> */}
            </div>
                {order.shippingAddress?
                <div className="view__order__address__shipping">
                    <h3 className="view__order__head">shipping details</h3>
                    <table className="view__order__table">
                        <tbody>
                            <tr>
                                <td>
                                    <div>street</div>
                                </td>
                                <td>
                                    <div>{order.shippingAddress.addressLine}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>state</div>
                                </td>
                                <td>
                                    <div>{order.shippingAddress.state}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>city</div>
                                </td>
                                <td>
                                    <div>{order.shippingAddress.city}</div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>pin</div>
                                </td>
                                <td>
                                    <div>{order.shippingAddress.pin}</div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* <div>{order.shippingAddress.addressLine}</div>
                    <div>{order.shippingAddress.state}</div>
                    <div>{order.shippingAddress.city}</div>
                    <div>{order.shippingAddress.pin}</div> */}
                </div>
            :null}
            <div className="view__order__items">
                <h3 className="view__order__head">order items</h3>
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>id</div>
                            </th>
                            <th>
                                <div>name</div>
                            </th>
                            <th>
                                <div>price</div>
                            </th>
                            <th>
                                <div>purchase qty</div>
                            </th>
                        </tr>
                    </thead>
                {order.orderItems.map((item,index)=>{
                    return(
                        <tbody key={index}>
                            <tr>
                                <td>
                                    <div>{item.itemId}</div>
                                </td>
                                <td>
                                    <div>{item.name}</div>
                                </td>
                                <td>
                                    <div>{formatPrice(item.price)}</div>
                                </td>
                                <td>
                                    <div>{item.pqty}</div>
                                </td>
                            </tr>
                        </tbody>
                    );                    
                })}
                </table>
            </div>
            {/* <h3 className="view__order__head">cart total</h3>
            <div>{order.amount}</div> */}
        </div>
    )
}

export default ViewOrder
