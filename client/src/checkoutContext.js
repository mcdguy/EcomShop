import React,{useState,useReducer,useEffect,useContext} from 'react';
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
    const {address,setAddress,saveAddress,error,setError,editMode,setEditMode} = useAddressContext();
    const {cartProducts,couponCode} = useCartContext();
    const {getProducts} = useGlobalContext();
    const [showShipping,setShowShipping] = useState(false);
    const [user,setUser] = useState({name:'',email:''});
    const [orderAlert,setOrderAlert] = useState({id:'',email:'',show:false});
    const [userError,setUserError] = useState({name:'',email:''});
    const [showAlert,setShowAlert] = useState(false);
    // const [couponCode,setCouponCode] = useState('');
    // const [couponError,setCouponError] = useState('');
    // const [discount,setDiscount] = useState(0);

    // const verifyCoupon = () =>{
    //     console.log('hello',couponCode);
    //     axios.post('/coupon/check',{code: couponCode})
    //         .then((res)=>{
    //             if(res.data.success){
    //                 setDiscount(res.data.discount);
    //             }
    //             if(res.data.nomatch){
    //                 setCouponError('invalid coupon code');
    //             }
    //         })
    // }
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
    //every time address change this will run which will change when user save address in account section or when page is refreshed
    //this prepopulates the state
    useEffect(()=>{
        setUser(user=>{return{...user,name: address.username,email: address.email}});
        setBillingAddress({
            billingaddressLine:address.addressLine,
            billingstate:address.state,
            billingcity:address.city,
            billingpin:address.pin,
            billingcontact:address.contact})
    },[address])

    useEffect(()=>{
        localStorage.setItem('siad',JSON.stringify(shippingAddress));
    },[shippingAddress])
   


    const handleShippingAddress = (e) =>{
        setShippingError(shippingError=>{return{...shippingError,sAddressLine:'',sState:'',sCity:'',sPin:'',}});
        setShippingAddress(shippingAddress=>{
            return({
                ...shippingAddress,
                [e.target.name]:e.target.value
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

    const makePayment = async () =>{
        // console.log(showShipping);
        let succeed = false;
        succeed = handleBillingError(billingAddress, billingError,setBillingError);
        succeed= handleUserError(user,setUserError);
        if(showShipping){
            succeed = handleShippingError(shippingAddress,shippingError,setShippingError);
        }
        if(!succeed){
            console.log('fill the fields');
            return;
        }
        if(!cartProducts.length){
            console.log('there is nothing in cart');
            return;
        }
        //only proceed if there is no error in above functions
        axios.post('/makepayment',{cartProducts,billingAddress,shippingAddress,user,showShipping,code:couponCode})
            .then(res =>{
                if(res.data.mismatch){
                    //now i should update cart
                    //will create a popup informing user about this now
                    console.log('need to update cart');
                    getProducts();
                    setShowAlert(true);
                    return;
                }
                console.log(res.data);
                 if(res.status !==200){
                    return;
                } 
                const options = {
                "key": "rzp_test_qlKfA8K3Z1aaLP", //put this in .env file
                "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "bakhsh",
                "timeout": 600,
                "description": "payment for beans",
                // "image": "https://example.com/your_logo",
                "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                "handler": function (response){
                    // alert(response.razorpay_payment_id);
                    // alert(response.razorpay_order_id);
                    // alert(response.razorpay_signature);
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
                        // alert('modal closed');
                        axios.delete('/deleteorder',{data:{order_id:res.data.id}})
                        .then(res => console.log(res.data))
                        .catch(err => console.log(err));
                     }
                },
                "prefill": {
                    "name": user.name,
                    "email": user.email,
                    "contact": billingAddress.billingcontact
                },
                // "notes": {
                //     "address": "Razorpay Corporate Office"
                // },
                "theme": {
                    "color": "#1d1c19"
                }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
        rzp1.on('payment.failed', function (response){
                alert('payment failed');
                // axios.delete('/deleteorder',{data:{order_id:res.data.id}})
                //     .then(res => console.log(res.data))
                //     .catch(err => console.log(err));
                // alert(response.error.code);
                // alert(response.error.description);
                // alert(response.error.source);
                // alert(response.error.step);
                // alert(response.error.reason);
                // alert(response.error.metadata.order_id);
                // alert(response.error.metadata.payment_id);
        });
            })
            .catch(err => console.log(err));
        
    }
    

    // const [checkoutState,dispatch] = useReducer(reducer,defaultCheckoutState);
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
            // setUser,
            userError,
            setUserError,
            handleUserDetails,
            showAlert,
            setShowAlert,
            // couponCode,
            // setCouponCode,
            // verifyCoupon,
        }}>
        {children}
    </CheckoutContext.Provider>
}

export const useCheckoutContext = () =>{
    return useContext(CheckoutContext);
}