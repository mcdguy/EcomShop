import React,{useState,useEffect} from 'react';
import './deleteModal.css';

const DeleteModal = ({id,closeModal,source}) => {
    const handleDelete = () =>{
        if(source === 'location'){
            console.log(id);
            //after deletion
            //closeModal();
            // i can also trigger rerender of list 
        }
        if(source === 'product'){
            console.log(id);
            //after deletion
            //closeModal();
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
