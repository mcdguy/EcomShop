import React,{useEffect} from 'react';
import './orderModal.css';

const OrderModal = ({msg,type,hideOrderAlert}) => {
    useEffect(()=>{
        const x = setTimeout(()=>{
            hideOrderAlert()
        },3000);
        return () => clearTimeout(x);
    },[]);

    return (
        <div className={`order__modal ${type==='success'?'order__success':'order__failed'}`}>
            {type === 'success'?<h1>order success</h1>:<h1>order failed</h1>}
            <p>{msg}</p>
        </div>
    )
}

export default OrderModal
