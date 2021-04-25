import axios from 'axios';
import React,{useState} from 'react';
import './createCoupon.css';

const CreateCoupon = () => {
    const [coupon,setCoupon] = useState({
        code: '',
        discount: ''
    })
    const handleChange = (e) =>{
        setCoupon(oldCoupon =>{
            return({
                ...oldCoupon,[e.target.name]:e.target.value
            })
        })
    }
    const createCoupon = (e) =>{
        e.preventDefault();
        axios.post('/coupon',{code: coupon.code,discount: coupon.discount})
            .then(res =>{
                if(res.data.success){
                    console.log('coupon created');

                }
                if(res.data.error){
                    console.log('could not create coupon');
                }
            })
    }
    return (
        <div className="action__create page">
            <form>
                <table className="create__location__table">
                    <tbody>
                        <tr>
                            <td>
                                <div>code</div>
                            </td>
                            <td>
                                <div>
                                    <input type="text" autoComplete="off" value={coupon.code} name="code" onChange={(e) =>handleChange(e)}/>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>discount</div>
                            </td>
                            <td>
                                <div>
                                    <input type="number" value={coupon.discount} name="discount" onChange={(e) =>handleChange(e)}/>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn-wrapper">
                    <button onClick={(e)=>createCoupon(e)} className="btn">create coupon</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCoupon
