import React,{useEffect} from 'react';
import './orderModal.css';
import successLogo from '../../assets/images/order__success.jpg';
import {GrClose} from "react-icons/gr";

const OrderModal = ({id,email,hideOrderAlert}) => {
    return (
        <div className="order__modal__wrapper">
            <div className="order__modal">
                <GrClose onClick={hideOrderAlert}/>
                <img src={successLogo} alt=""/>
                <h1>Your order has been received</h1>
                <h4>Your order id is:</h4>
                <h5>{id} </h5>
                <h4> An email has been sent to:</h4>
                <h5>{email} </h5>
            </div>
        </div>
    )
}

export default OrderModal
