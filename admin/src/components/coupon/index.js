import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import CouponRow from '../couponRow';

const Coupon = () => {
    const {coupon} = useGlobalContext();
    const [filter,setFilter] = useState('code');
    const [query,setQuery] = useState('');
    const [filteredCoupon,setFilteredCoupon] = useState([]);
    useEffect(()=>{
        if(query===''){
            setFilteredCoupon(coupon);
        }
        let newCoupons = coupon.filter(c =>{
            return(c[filter].toString().toLowerCase().indexOf(query.toLowerCase())>=0)
        })
        setFilteredCoupon(newCoupons);
    },[query,coupon])
    return (
        <div className="read__locations action__read">
            <nav className="coupon__nav control__nav">
                <Link to="/create" className="btn">create</Link>
                <input autoComplete="off" type="text" value={query} onChange={(e)=>setQuery(e.target.value)} name="search" placeholder="search"/>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                    <option value="code">code</option>
                    <option value="discount">discount</option>
                </select>
            </nav>
            {filteredCoupon.length?
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
                        {filteredCoupon.map(c=>{
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
