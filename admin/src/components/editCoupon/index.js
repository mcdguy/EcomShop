import axios from 'axios';
import React,{useState,useEffect,useRef} from 'react';
import './editCoupon.css';
import Loader from '../loader';
import Error from '../error';
import Alert from '../alert';
import { useGlobalContext,baseUrl } from '../../context';
import ValidateError from '../validateError';
import {handleEditCouponError} from '../../utils/handleError';

const EditCoupon = ({id}) => {
    const {fetchCoupon} = useGlobalContext();
    const [coupon,setCoupon] = useState({});
    // const codeRef = useRef(null);
    const discountRef = useRef(null);
    const [isLoading,setIsLoading] = useState(true);
    const [error,setError] = useState(false);
   
    const [editError,setEditError] = useState([]);
    const [editLoader,setEditLoader] = useState(false);
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }
    useEffect(()=>{
        setIsLoading(true);
        setError(false);
        axios.get(`${baseUrl}/coupon/${id}`)
            .then(res=>{
                if(res.data.coupon){
                    setIsLoading(false);
                    setCoupon(res.data.coupon);
                }
            })
            .catch(err =>{
                console.log(err);
                setError(true);
            })
    },[])
    const editCoupon = (e) =>{
        e.preventDefault();

        const error = handleEditCouponError(discountRef.current.value);
        if(error.length>0){
            setEditError(error);
            return;
        }
        if(error.length === 0){
            setEditError([]);
        }

        setEditLoader(true);
        //error handling of input
        axios.patch(`${baseUrl}/coupon/${id}`,{discount: discountRef.current.value})
            .then(res => {
                if(res.data.success){
                    // console.log('coupon updated');
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
                setEditLoader(false);
            })
            .catch(err => console.log({error: 'an error occurred'}));
    }

    if(isLoading){
        return <Loader/>;
    }
    
    if(error){
        return <Error/>;
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
                    {editError.length?<ValidateError error={editError}/>:null}
                    {editLoader?<div className="inline__loader"><Loader/></div>:null}
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </form>
        </div>
    )
}

export default EditCoupon
