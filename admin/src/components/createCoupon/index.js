import axios from 'axios';
import React,{useState} from 'react';
import './createCoupon.css';
import Alert from '../alert';
import Loader from '../loader';
import { useGlobalContext } from '../../context';
import ValidateError from '../validateError';
import {handleCreateCouponError} from '../../utils/handleError';

const CreateCoupon = () => {
    const {fetchCoupon} = useGlobalContext();
    const [coupon,setCoupon] = useState({
        code: '',
        discount: ''
    })
    const [createError,setCreateError] = useState([]);
    const [createLoader,setCreateLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }
    const handleChange = (e) =>{
        setCoupon(oldCoupon =>{
            return({
                ...oldCoupon,[e.target.name]:e.target.value
            })
        })
    }
    const createCoupon = (e) =>{
        e.preventDefault();
        const error = handleCreateCouponError(coupon.code,coupon.discount);
        if(error.length>0){
            setCreateError(error);
            return;
        }
        if(error.length === 0){
            setCreateError([]);
        }
        setCreateLoader(true);
        axios.post('/coupon',{code: coupon.code,discount: coupon.discount})
            .then(res =>{
                if(res.data.success){
                    console.log('coupon created');
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.success,show:true});
                    })
                    fetchCoupon();
                }
                if(res.data.error){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.error,show:true});
                    })
                }
                setCreateLoader(false);
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
                    {createError.length?<ValidateError error={createError}/>:null}
                    {createLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default CreateCoupon
