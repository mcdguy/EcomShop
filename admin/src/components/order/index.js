import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';
import {formatPrice} from '../../utils/formatPrice';
import Loader from '../loader';
import Error from '../error';
import './order.css';
import { useFilterContext } from '../../filterContext';

//add date field
const Order = () => {
    const {order, showNextOrderPage,orderHasMore,isOrderLoading,orderError} = useGlobalContext();
    const [filteredOrder,setFilteredOrder] = useState([]);
    const {orderFilter,setOrderFilter,orderQuery,setOrderQuery} = useFilterContext();

    useEffect(()=>{
        let cancel;
        if(orderQuery === ''){
            setFilteredOrder(order);
            return;
        }
        axios.get(`/order/find?filter=${orderFilter}&query=${orderQuery}`,{
                cancelToken: new axios.CancelToken(c=> {cancel =c})
            })
            .then(res =>{
                if(res.data.order){
                    setFilteredOrder(res.data.order);
                }
            })
            .catch(err => {
                if(axios.isCancel(err)) return;
                console.log(err);
            })
        return ()=> cancel();
    },[orderQuery,order,orderFilter]);

    if(orderError){
        return <Error/>
    }
    return (
        <div className="read-orders action__read">
            <nav className="locations__nav control__nav">
                {/* <Link to="/create" className="btn">create</Link> */}
                <div>
                    <input className="search" autoComplete="off" type="text" value={orderQuery} onChange={(e)=>setOrderQuery(e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={orderFilter} onChange={(e)=>{setOrderFilter(e.target.value)}}>
                        <option value="orderId">order id</option>
                        <option value="user">user id</option>
                        <option value="paymentId">payment id</option>
                        <option value="pending">pending</option>
                        <option value="receipt">receipt</option>
                        <option value="email">email</option>
                        <option value="contact">contact</option>
                    </select>
                </div>
            </nav>
            {order.length?
            <>
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>buyer</div>
                            </th>
                            <th>
                                <div>order id</div>
                            </th>
                            <th>
                                <div>status</div>
                            </th>
                            <th>
                                <div>contact</div>
                            </th>
                            <th>
                                <div>amount</div>
                            </th>
                            <th className="read__table__show"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrder.map(o=>{
                            return(
                                    <tr key={o._id}>
                                        <td>
                                            <div>{o.buyer.name}</div>
                                        </td>
                                        <td>
                                            <div>{o.orderId}</div>
                                        </td>
                                        <td>
                                            <div>{o.pending?'pending':'completed'}</div>
                                        </td>
                                        <td>
                                            <div>{o.buyer.contact}</div>
                                        </td>
                                        <td>
                                            <div>{formatPrice(o.amount)}</div>
                                        </td>
                                        <td><Link to={`/view/${o._id}`} className="btn">show details</Link></td>
                                    </tr>
                            );
                        })}
                    </tbody>
                </table>
                {orderHasMore?
                <div className="btn-wrapper">
                    <button onClick={showNextOrderPage} className="btn paginate-btn">show more</button>
                </div>
                :
                <div className="btn-wrapper">End of result</div>
                }
            </>
            :null}
            {isOrderLoading?<div className="inline__loader"><Loader/></div>:null}
        </div>
    )
}

export default Order
