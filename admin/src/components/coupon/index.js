import React from 'react'
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import CouponRow from '../couponRow';

const Coupon = () => {
    const {coupon} = useGlobalContext();
    return (
        <div className="read__locations action__read">
            <nav className="locations__nav control__nav">
                <Link to="/create" className="btn">create</Link>
            </nav>
            {coupon.length?
                <table className="read__table">
                    <thead>
                        <tr>
                            <th>
                                <div>id</div> 
                            </th>
                            <th>
                                <div>code</div> 
                            </th>
                            <th>
                                <div>discount (%)</div> 
                            </th>
                            <th className="read__table__edit"></th>
                            <th className="read__table__delete"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupon.map(c=>{
                            return(
                                <CouponRow key={c._id} {...c}/>
                            )
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    )
}

export default Coupon;
