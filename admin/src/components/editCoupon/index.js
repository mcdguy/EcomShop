import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react';
import './editCoupon.css';

const EditCoupon = ({id}) => {
    const [coupon,setCoupon] = useState({});
    // const codeRef = useRef(null);
    const discountRef = useRef(null);

    useEffect(()=>{
        axios.get(`/coupon/${id}`)
            .then(res=>{
                if(res.data.coupon){
                    setCoupon(res.data.coupon);
                }
            })
    },[])
    const editCoupon = (e) =>{
        e.preventDefault();

        //error handling of input
        axios.patch(`/coupon/${id}`,{discount: discountRef.current.value})
            .then(res => {
                if(res.data.success){
                    console.log('coupon updated');
                }
            })
            .catch(err => console.log({error: 'an error occurred'}));
    }
    return (
        <div className="action__create">
            <form>
                <table className="create__location__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>code</div>
                            </td>
                            <td>
                                <div>
                                    {coupon.code}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>discount</div>
                            </td>
                            <td>
                                <div><input ref={discountRef} type="number" defaultValue={coupon.discount}/></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>editCoupon(e)} className="btn">edit coupon</button>
                </div>
            </form>
        </div>
    )
}

export default EditCoupon
