import React,{useState,useEffect,useContext} from 'react';
import {useAddressContext} from './addressContext';
import {handleBillingError} from './utils/handleBillingError';
import {handleShippingError} from './utils/handleShippingError';
import axios from 'axios';
import { useCartContext } from './cartContext';
import { handleUserError } from './utils/handleUserError';
import { useGlobalContext } from './context';

const CheckoutContext = React.createContext();

// getting shipping address from local storage
const getsiad = () =>{
    let siad = localStorage.getItem('siad');
    if(siad){
        return JSON.parse(siad);
    }else{
        return {
            shippingaddressLine:'',
            shippingstate:'',
            shippingcity:'',
            shippingpin:'',
        }
    }
}

export const CheckoutProvider = ({children}) =>{
    const {address} = useAddressContext();
    const {cartProducts,couponCode} = useCartContext();
    const {getProducts} = useGlobalContext();
    const [showShipping,setShowShipping] = useState(false);
    const [user,setUser] = useState({name:'',email:''});
    const [orderAlert,setOrderAlert] = useState({id:'',email:'',show:false});
    const [userError,setUserError] = useState({name:'',email:''});
    const [showAlert,setShowAlert] = useState(false);
    const [saveDetails,setSaveDetails]  = useState(true);

    const hideOrderAlert = () =>{
        setOrderAlert(OrderAlert=>{return({...OrderAlert,show: false})});
    }
    const showShippingAddress = () =>{
        setShowShipping(true);
    }
    const hideShippingAddress = () =>{
        setShowShipping(false);
    }

    const [billingError,setBillingError] = useState({
        bAddressLine:'',
        bState:'',
        bCity:'',
        bPin:'',
        bContact:'',
    });

    const [shippingAddress,setShippingAddress] = useState(getsiad());

    const [shippingError,setShippingError] = useState({
        sAddressLine:'',
        sState:'',
        sCity:'',
        sPin:'',
    });

    

    const [billingAddress,setBillingAddress] = useState({
        billingaddressLine:'',
        billingstate:'',
        billingcity:'',
        billingpin:'',
        billingcontact:''
    })

    //this prepopulates the billing address
    useEffect(()=>{
        setUser(user=>{return{...user,name: address.username,email: address.email}});
        setBillingAddress({
            billingaddressLine:address.addressLine,
            billingstate:address.state,
            billingcity:address.city,
            billingpin:address.pin,
            billingcontact:address.contact})
    },[address])//every time user changes address in 'account page' this will run


    //setting shipping adddress in local storage
    useEffect(()=>{
        localStorage.setItem('siad',JSON.stringify(shippingAddress));
    },[shippingAddress])
   
    //seperate function for setting shipping state since it's custom dropdown
    const handleShippingState = (state) =>{
        setShippingError(shippingError=>{return{...shippingError,sAddressLine:'',sState:'',sCity:'',sPin:'',}});
        setShippingAddress(shippingAddress=>{
            return({
                ...shippingAddress,
                shippingstate: state
            })
        })
    }
    const handleShippingAddress = (e) =>{
        setShippingError(shippingError=>{return{...shippingError,sAddressLine:'',sState:'',sCity:'',sPin:'',}});
        setShippingAddress(shippingAddress=>{
            return({
                ...shippingAddress,
                [e.target.name]:e.target.value
            })
        })
    }

    //seperate function for setting biliing state since it's custom dropdown
    const handleBillingState = (state) =>{
        setBillingError(billingError=>{return{...billingError,bAddressLine:'',bState:'',bCity:'',bPin:'',bContact:''}});
        setBillingAddress(billingAddress=>{
            return({
                ...billingAddress,
                billingstate:state
            })
        })
    }
    const handleBillingAddress = (e) =>{
        setBillingError(billingError=>{return{...billingError,bAddressLine:'',bState:'',bCity:'',bPin:'',bContact:''}});
        setBillingAddress(billingAddress=>{
            return({
                ...billingAddress,
                [e.target.name]:e.target.value
            })
        })
    }
    

    const handleUserDetails = (e) =>{
        setUserError(userError=>{return{...userError,name:'',email:''}});
        setUser(user=>{
            if(e.target.name==='email'){
                return({
                    ...user,
                    [e.target.name]:e.target.value.trim().toLowerCase()//this trims whitespace and makes letter lowercase
                })
            }else{
                return({
                    ...user,
                    [e.target.name]:e.target.value
                })
            }
        })
    }


    //making payment
    const makePayment = async () =>{
        //validating all fields
        let succeed = false;
        succeed = handleBillingError(billingAddress, billingError,setBillingError);
        succeed= handleUserError(user,setUserError);
        if(showShipping){
            succeed = handleShippingError(shippingAddress,shippingError,setShippingError);
        }
        if(!succeed){
            return;
        }
        if(!cartProducts.length){
            console.log('no items in cart');
            return;
        }

        //only proceed if there is no error in above functions
        axios.post('/makepayment',{cartProducts,billingAddress,shippingAddress,user,showShipping,code:couponCode,saveDetails})
            .then(res =>{
                if(res.data.mismatch){
                    //if cart items don't match then update cart(stock is less than required or item doesn't exist)
                    getProducts();
                    setShowAlert(true);
                    return;
                }
                 if(res.status !==200){
                    return;
                } 
                const options = {
                "key": "rzp_test_qlKfA8K3Z1aaLP", //put this in .env file
                "amount": res.data.amount, 
                "currency": "INR",
                "name": "bakhsh",
                "timeout": 600,
                "description": "payment for beans",
                // "image": "https://example.com/your_logo",
                "order_id": res.data.id, 
                "handler": function (response){
                    axios.post('/verify',{order_id:res.data.id,payment_id:response.razorpay_payment_id,payment_sign:response.razorpay_signature})
                        .then(res => {
                            if(res.data.success){
                                setOrderAlert(alert => {
                                    return({...alert,show:true,id:response.razorpay_payment_id,email: user.email})
                                })
                            }
                        })
                        .catch(err => console.log(err));
                },
                "modal": {
                    "escape": false,
                    "ondismiss": function(){
                        axios.delete('/deleteorder',{data:{order_id:res.data.id}})
                        // .then(res => console.log(res.data))
                        .catch(err => console.log(err));
                     }
                },
                "prefill": {
                    "name": user.name,
                    "email": user.email,
                    "contact": billingAddress.billingcontact
                },
                "theme": {
                    "color": "#1d1c19"
                }
            };
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
            rzp1.on('payment.failed', function (response){
                    alert('payment failed');
            });
        })
        .catch(err => console.log(err));
        
    }
    
    return <CheckoutContext.Provider 
    value={
        {
            shippingAddress,
            setShippingAddress,
            handleShippingAddress,
            billingAddress,
            setBillingAddress,
            handleBillingAddress,
            showShipping,
            showShippingAddress,
            hideShippingAddress,
            billingError,
            makePayment,
            shippingError,
            hideOrderAlert,
            user,
            orderAlert,
            saveDetails,
            setSaveDetails,
            userError,
            setUserError,
            handleUserDetails,
            showAlert,
            setShowAlert,
            handleShippingState,
            handleBillingState
        }}>
        {children}
    </CheckoutContext.Provider>
}

export const useCheckoutContext = () =>{
    return useContext(CheckoutContext);
}