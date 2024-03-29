import React,{useState} from 'react';
import { useCheckoutContext } from '../../checkoutContext';
import {state} from '../../data';


const ShippingAddress = () => {
    const {shippingAddress,shippingError,handleShippingAddress,handleShippingState} = useCheckoutContext();   
    const [showDropdown,setShowDropDown] = useState(false);
    return (
        <div className="shipping">
            <form> 
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" type="text" onChange={(e)=>handleShippingAddress(e)} value={shippingAddress.shippingaddressLine} id="shippingaddressLine" name="shippingaddressLine" />
                    <label className="address__inp__label anim--inp--label" htmlFor="shippingaddressLine"> <span>street</span>  </label>
                    {shippingError.sAddressLine?<span className="address__inp__error anim--inp--error">{shippingError.sAddressLine}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper" onClick={()=>setShowDropDown(!showDropdown)}>
                    <div className="state__dropdown">
                        <div className="state__option__head">
                            {shippingAddress.shippingstate}
                            <label className={`${shippingAddress.shippingstate===''?"address__inp__label anim--inp--label":"address__inp__label anim--inp--label anim__text__head__label"}`} htmlFor="billingstate"> <span>state</span> </label>
                            {shippingError.sState?<span className="address__inp__error anim--inp--error">{shippingError.sState}</span>:null}                            
                        </div>
                        {showDropdown?<div className="state__options">
                            {state.map(s=>{
                                return (
                                    <div key={s} onClick={()=>handleShippingState(s)} className="state__op">{s}</div>
                                )
                            })}
                        </div>:null}
                    </div>
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
