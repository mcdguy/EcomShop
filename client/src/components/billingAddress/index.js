import React from 'react'
// import { useAddressContext } from '../../addressContext';
import {useCheckoutContext} from '../../checkoutContext';
const BillingAddress = () => {
    const {billingAddress,billingError,handleBillingAddress} = useCheckoutContext();

    return (
        <div className="billing">
            <form> 
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" value={billingAddress.billingaddressLine} onChange={handleBillingAddress} type="text" name="billingaddressLine" />
                    <label className="address__inp__label anim--inp--label" htmlFor="billingaddressLine"> <span>street</span>  </label>
                    {billingError.bAddressLine?<span className="address__inp__error anim--inp--error">{billingError.bAddressLine}</span>:null}
                </div>
                <div className="address__inp__wrapper anim--inp--wrapper">
                    <input required className="address__inp anim--inp" value={billingAddress.billingstate} onChange={handleBillingAddress} name="billingstate" type="text" />
                    <label className="address__inp__label anim--inp--label" htmlFor="billingstate"> <span>state</span> </label>
                    {billingError.bState?<span className="address__inp__error anim--inp--error">{billingError.bState}</span>:null}
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
