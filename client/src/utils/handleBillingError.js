// import { useCheckoutContext } from "../checkoutContext";
// const {billingAddress, billingError,setBillingError} = useCheckoutContext();

export const handleBillingError=(billingAddress, billingError,setBillingError)=>{
    // console.log(billingAddress, billingError,setBillingError);
    if(billingAddress.billingaddressLine === ''){
        console.log(true)
        setBillingError(billingError =>{return{...billingError,bAddressLine: 'this field is required'}});
        return false;
    }
    if(billingAddress.billingstate === ''){
        setBillingError(billingError =>{return{...billingError,bState: 'this field is required'}});
        return false;
    }
    if(billingAddress.billingcity === ''){
        setBillingError(billingError =>{return{...billingError,bCity: 'this field is required'}});
        return false;
    }
    if(billingAddress.billingpin === ''){
        setBillingError(billingError =>{return{...billingError,bPin: 'this field is required'}});
        return false;
    }
    if(billingAddress.billingcontact === ''){
        setBillingError(billingError =>{return{...billingError,bContact: 'this field is required'}});
        return false;
    }
    if(billingAddress.billingpin.toString().length !== 6){
        console.log(billingAddress.billingpin);
        setBillingError(billingError =>{return{...billingError,bPin: 'pin must be of 6 digits'}});
        return false;
    }
    if(billingAddress.billingcontact.toString().length !== 10){
        setBillingError(billingError =>{return{...billingError,bContact: 'please enter a valid number'}});
        return false;
    }
    return true;
}