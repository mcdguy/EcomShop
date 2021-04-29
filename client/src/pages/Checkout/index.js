import React from 'react';
import { useGlobalContext } from '../../context';
import './checkout.css';
import BillingAddress from '../../components/billingAddress';
import ShippingAddress from '../../components/shippingAddress';
import { useCheckoutContext } from '../../checkoutContext';
import CartSummary from '../../components/cartSummary';
import CartComponent from '../../components/cartComponent';
import OrderModal from '../../components/orderModal';
import { useCartContext } from '../../cartContext';
import Alert from '../../components/alert';

const Checkout = () => {
    const { showShipping,showShippingAddress,hideShippingAddress,makePayment,user,handleUserDetails,userError,orderAlert,hideOrderAlert,showAlert,setShowAlert} = useCheckoutContext();
    const {couponCode,setCouponError,couponError,setCouponCode,verifyCoupon,discount} = useCartContext();
    const {isLoggedIn} = useGlobalContext();

    const handleCheckbox = (e) =>{
        if(e.target.checked){
            hideShippingAddress();
        }
        else{
            showShippingAddress();
        }
    }
    // if(!isLoggedIn){
    //     return <div className="checkout__notlogged">
    //         <div>
    //             <button>log in</button>
    //         </div>
    //         <div>
    //             <button>guest checkout</button>
    //         </div>
    //     </div>
    // }

    return (
        <div className="checkout">
            <div className="center">
            {showAlert && <Alert setShowAlert={setShowAlert} message={'cart has been modified'}/>}
            {orderAlert.show && <OrderModal {...orderAlert} hideOrderAlert={hideOrderAlert}/>}
                <div className="checkout__form">
                        <div className="user__wrapper">
                            <h1 className="form__type">user details</h1>
                            <div className="user__form">
                                <form>
                                    <div className="anim--inp--wrapper">
                                        <input className="anim--inp" type="text" id="userformname" value={user.name} onChange={e=>handleUserDetails(e)} autoComplete='off' name="name" required/>
                                        <label htmlFor="userformname" className="anim--inp--label">name</label>
                                        {userError.name?<span className="anim--inp--error">{userError.name}</span>:null}
                                    </div>
                                    <div className="anim--inp--wrapper">
                                        <input className="anim--inp" type="text" id="userformemail" value={user.email} onChange={e=>handleUserDetails(e)} autoComplete='off' name="email" required/>
                                        <label htmlFor="userformemail" className="anim--inp--label">email</label>
                                        {userError.email?<span className="anim--inp--error">{userError.email}</span>:null}
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="billing__wrapper">
                            <h1 className="form__type">billing address</h1>
                            <BillingAddress/>
                        </div>
                        <p className="checkout__checkbox">
                            <input type="checkbox" id="same-address" onChange={handleCheckbox} checked={!showShipping} />
                            <label htmlFor="same-address"> billing address same as shipping address</label>
                        </p>
                        {showShipping && 
                        <div className="shipping__wrapper">
                            <h1 className="form__type type-billing">shipping address</h1>
                            <ShippingAddress/>
                        </div>}
                        <div className="promo__code">
                            <div className="promo__wrapper">
                                <div className="promo__input__wrapper">
                                    <input value={couponCode} onChange={(e)=>{setCouponCode(e.target.value);setCouponError('')}} placeholder="got a promo code?" type="text"></input>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={discount?'valid': 'nothing'} viewBox="0 0 37 37">
                                        <path
                                            className="circ path"
                                            d="M30.5 6.5h0c6.6 6.6 6.6 17.4 0 24h0c-6.6 6.6-17.4 6.6-24 0h0c-6.6-6.6-6.6-17.4 0-24h0c6.6-6.7 17.4-6.7 24 0z"
                                            fill="none"
                                            stroke="#000"
                                            strokeWidth={3}
                                            strokeLinejoin="round"
                                            strokeMiterlimit={10}
                                        />
                                        <path
                                            className="tick path"
                                            fill="none"
                                            stroke="#000"
                                            strokeWidth={3}
                                            strokeLinejoin="round"
                                            strokeMiterlimit={10}
                                            d="M11.6 20l4.3 4.2 10.5-10.4"
                                        />
                                    </svg>
                                    {couponError===''?null:<span className="anim--inp--error coupon__error">{couponError}</span>}
                                </div>
                                <button onClick={verifyCoupon} >apply</button>
                            </div>
                        </div>
                        <div className="btn__wrapper"><button className="checkout__btn" onClick={makePayment}>make payment</button></div>
                </div>
                <div className="checkout__sidebar">
                    {/* passing source to hide checkbox in checkout form */}
                    <CartComponent source={'checkout'}/>
                    <CartSummary source={'checkout'}/>
                    
                </div>
            </div>
        </div>

    )
}

export default Checkout
