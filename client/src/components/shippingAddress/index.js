import React,{useState,useRef,useEffect} from 'react';
import { useAddressContext } from '../../addressContext';
import { useCheckoutContext } from '../../checkoutContext';
import './shippingAddress.css';

const ShippingAddress = () => {
    const {shippingAddress,shippingError,handleShippingAddress} = useCheckoutContext();   
    return (
        <div className="shipping">
            <form> 
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" type="text" onChange={(e)=>handleShippingAddress(e)} value={shippingAddress.shippingaddressLine} id="shippingaddressLine" name="shippingaddressLine" />
                    <label className="address__inp__label anim--inp--label" htmlFor="shippingaddressLine"> <span>street</span>  </label>
                    {shippingError.sAddressLine?<span className="address__inp__error anim--inp--error">{shippingError.sAddressLine}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" onChange={(e)=>handleShippingAddress(e)} value={shippingAddress.shippingstate} name="shippingstate" type="text" />
                    <label className="address__inp__label anim--inp--label" htmlFor="shippingstate "> <span>state</span>  </label>
                    {shippingError.sState?<span className="address__inp__error anim--inp--error">{shippingError.sState}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" onChange={(e)=>handleShippingAddress(e)} value={shippingAddress.shippingcity} name="shippingcity" type="text" />
                    <label className="address__inp__label anim--inp--label" htmlFor="shippingcity"> <span>city</span> </label>
                    {shippingError.sCity?<span className="address__inp__error anim--inp--error">{shippingError.sCity}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" onChange={(e)=>handleShippingAddress(e)} value={shippingAddress.shippingpin} name="shippingpin" type="number" />
                    <label className="address__inp__label anim--inp--label" htmlFor="shippingpin"><span>pin</span>  </label>
                    {shippingError.sPin?<span className="address__inp__error anim--inp--error">{shippingError.sPin}</span>:null}
                </div>
            </form>
        </div>
    )
}

export default ShippingAddress
