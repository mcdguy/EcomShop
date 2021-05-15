import React,{useState,useEffect} from 'react';
import './deleteModal.css';
import axios from 'axios';
import Alert from '../alert';
import { useGlobalContext } from '../../context';

const DeleteModal = ({id,closeModal,source}) => {
    const {fetchGallery,fetchCoupon,fetchProduct,fetchLocation,fetchAdmin} = useGlobalContext();
    const [alert,setShowAlert] = useState({msg:'',show:false});
    
    const hideAlert = () =>{
        setShowAlert(prev =>{
            return ({...prev,msg:'',show:false});
        })
    }
    const handleDelete = () =>{
        if(source === 'location'){
            axios.delete(`/location/${id}`)
                .then(res => {
                    if(res.data.success){
                        closeModal();
                        fetchLocation();
                    }
                    if(res.data.error){
                        setShowAlert((prev)=>{
                            return ({...prev,msg:res.data.error,show:true});
                        })
                        console.log(res.data.error);
                    }
                })
                .catch(err => console.log(err));
            // i can also trigger rerender of list 
        }
        if(source === 'product'){
            axios.delete(`/product/${id}`)
                .then(res => {
                    if(res.data.success){
                        closeModal();
                        fetchProduct();
                    }
                    if(res.data.error){
                        setShowAlert((prev)=>{
                            return ({...prev,msg:res.data.error,show:true});
                        })
                        console.log(res.data.error);
                    }
                })
                .catch(err => console.log(err));
        }
        if(source === 'coupon'){
            axios.delete(`coupon/${id}`)
            .then(res => {
                if(res.data.success){
                    closeModal();
                    fetchCoupon();
                }
                if(res.data.error){
                    setShowAlert((prev)=>{
                        return ({...prev,msg:res.data.error,show:true});
                    })
                    console.log(res.data.error);
                }
            })
            .catch(err => console.log(err));
        }
        if(source === 'gallery'){
            axios.delete(`gallery/${id}`)
                .then(res =>{
                    if(res.data.success){
                        closeModal();
                        fetchGallery();
                    }
                    if(res.data.error){
                        setShowAlert((prev)=>{
                            return ({...prev,msg:res.data.error,show:true});
                        })
                        console.log(res.data.error);
                    }
                })
        }
        if(source === 'admin'){
            axios.delete(`admin/delete-admin/${id}`)
                .then(res =>{
                    if(res.data.success){
                        closeModal();
                        fetchAdmin();
                    }
                    if(res.data.error){
                        setShowAlert((prev)=>{
                            return ({...prev,msg:res.data.error,show:true});
                        })
                        console.log(res.data.error);
                    }
                })
        }
    }
    return (
        <div className="delete__modal__wrapper">
            <div className="delete__modal">
                <p>delete item?</p>
                <div className="btns">
                    <button onClick={closeModal} className="btn">cancel</button>
                    <button onClick={handleDelete} className="btn btn__delete">confirm</button>
                </div>
                <div className="btn-wrapper">
                    {alert.show?<Alert msg={alert.msg} hideAlert={hideAlert}/>:null}
                </div>
            </div>
        </div>
            
    )
}

export default DeleteModal
