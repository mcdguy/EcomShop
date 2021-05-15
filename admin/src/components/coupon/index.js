import React,{useState,useEffect} from 'react'
import { useGlobalContext } from '../../context';
import { Link } from 'react-router-dom';
import CouponRow from '../couponRow';
import Loader from '../loader';
import Error from '../error';
import { useFilterContext } from '../../filterContext';

const Coupon = () => {
    const {coupon,isCouponLoading,couponError,type} = useGlobalContext();
    const { couponFilter,setCouponFilter,couponQuery,setCouponQuery} = useFilterContext();
    // const [filter,setFilter] = useState('code');
    // const [query,setQuery] = useState('');
    const [filteredCoupon,setFilteredCoupon] = useState([]);
    useEffect(()=>{
        if(couponQuery===''){
            setFilteredCoupon(coupon);
        }
        let newCoupons = coupon.filter(c =>{
            return(c[couponFilter].toString().toLowerCase().indexOf(couponQuery.toLowerCase())>=0)
        })
        setFilteredCoupon(newCoupons);
    },[couponQuery,coupon,couponFilter])
    
    if(isCouponLoading){
        return <Loader/>
    }
    if(couponError){
        return <Error/>
    }
    return (
        <div className="read__locations action__read">
            <nav className="coupon__nav control__nav">
                <div>
                    <input className="search" autoComplete="off" type="text" value={couponQuery} onChange={(e)=>setCouponQuery(e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={couponFilter} onChange={(e)=>{setCouponFilter(e.target.value)}}>
                        <option value="code">code</option>
                        <option value="discount">discount</option>
                    </select>
                </div>
                {type!=='read admin'?<Link to="/create" className="btn">create</Link>:null}
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
                            {type!=='read admin'?<th className="read__table__edit"></th>:null}
                            {type!=='read admin'?<th className="read__table__delete"></th>:null}
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
