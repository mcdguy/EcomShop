// import { useCheckoutContext } from "../checkoutContext";
// const {billingAddress, billingError,setBillingError} = useCheckoutContext();

export const handleShippingError = (shippingAddress,shippingError,setShippingError) =>{
    if(shippingAddress.shippingaddressLine === ''){
        setShippingError(shippingError =>{return{...shippingError,sAddressLine: 'this field is required'}});
        return false;
    }
    if(shippingAddress.shippingstate === ''){
        setShippingError(shippingError =>{return{...shippingError,sState: 'this field is required'}});
        return false;
    }
    if(shippingAddress.shippingcity === ''){
        setShippingError(shippingError =>{return{...shippingError,sCity: 'this field is required'}});
        return false;
    }
    if(shippingAddress.shippingpin === ''){
        setShippingError(shippingError =>{return{...shippingError,sPin: 'this field is required'}});
        return false;
    }
    if(shippingAddress.shippingpin.toString().length !== 6){
        setShippingError(shippingError =>{return{...shippingError,sContact: 'pin must be of 6 digits'}});
        return false;
    }
    return true;
}