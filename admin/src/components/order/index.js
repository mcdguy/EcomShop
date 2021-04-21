import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

//add date field
const Order = () => {
    const {order} = useGlobalContext();

    return (
        <div className="read-orders action__read">
             <nav className="locations__nav control__nav">
                {/* <Link to="/create" className="btn">create</Link> */}
            </nav>
            {order.length?
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
                        {order.map(o=>{
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
                                            <div>{o.amount}</div>
                                        </td>
                                        <td><Link to={`/view/${o._id}`} className="btn">show details</Link></td>
                                    </tr>
                            );
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    )
}

export default Order
