import React,{useState} from 'react'
import {state} from '../../data';
import {useCheckoutContext} from '../../checkoutContext';
const BillingAddress = () => {
    const {billingAddress,billingError,handleBillingAddress,handleBillingState} = useCheckoutContext();
    const [showDropdown,setShowDropDown] = useState(false);
    return (
        <div className="billing">
            <form> 
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" value={billingAddress.billingaddressLine} onChange={handleBillingAddress} type="text" name="billingaddressLine" />
                    <label className="address__inp__label anim--inp--label" htmlFor="billingaddressLine"> <span>street</span>  </label>
                    {billingError.bAddressLine?<span className="address__inp__error anim--inp--error">{billingError.bAddressLine}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper" onClick={()=>setShowDropDown(!showDropdown)}>
                    <div className="state__dropdown">
                        <div className="state__option__head">
                            {billingAddress.billingstate}
                            <label className={`${billingAddress.billingstate===''?"address__inp__label anim--inp--label":"address__inp__label anim--inp--label anim__text__head__label"}`} htmlFor="billingstate"> <span>state</span> </label>
                            {billingError.bState?<span className="address__inp__error anim--inp--error">{billingError.bState}</span>:null}
                        </div>
                        {showDropdown?<div className="state__options">
                            {state.map(s=>{
                                return (
                                    <div key={s} onClick={()=>handleBillingState(s)} className="state__op">{s}</div>
                                )
                            })}
                        </div>:null}
                    </div>
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" value={billingAddress.billingcity} onChange={handleBillingAddress} name="billingcity" type="text"/>
                    <label className="address__inp__label anim--inp--label" htmlFor="billingcity"> <span>city</span> </label>
                    {billingError.bCity?<span className="address__inp__error anim--inp--error">{billingError.bCity}</span>:null}
                </div>

                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" value={billingAddress.billingpin} onChange={handleBillingAddress} name="billingpin" type="number"/>
                    <label className="address__inp__label anim--inp--label" htmlFor="billingpin"> <span>pin</span> </label>
                    {billingError.bPin?<span className="address__inp__error anim--inp--error">{billingError.bPin}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" value={billingAddress.billingcontact} onChange={handleBillingAddress} name="billingcontact" type="number" />
                    <label className="address__inp__label anim--inp--label" htmlFor="billingcontact"> <span>contact</span> </label>
                    {billingError.bContact?<span className="address__inp__error anim--inp--error">{billingError.bContact}</span>:null}
                </div>
            </form>
        </div>
    )
}

export default BillingAddress
