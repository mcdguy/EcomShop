import React,{useState,useEffect} from 'react';
import './deleteModal.css';
import axios from 'axios';

const DeleteModal = ({id,closeModal,source}) => {
    const handleDelete = () =>{
        if(source === 'location'){
            axios.delete(`/location/${id}`)
                .then(res => {
                    if(res.data.success){
                        closeModal();
                    }
                    if(res.data.error){
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
                    }
                    if(res.data.error){
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
                }
                if(res.data.error){
                    console.log(res.data.error);
                }
            })
            .catch(err => console.log(err));
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
            </div>
        </div>
            
    )
}

export default DeleteModal
