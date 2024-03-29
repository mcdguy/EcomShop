import React,{useState,useEffect,useRef} from 'react';
import { useAddressContext } from '../../addressContext';
import { useGlobalContext } from '../../context';
import './account.css';
import Order from '../../components/order';
import Loader from '../../components/loader';
import Error from '../../components/error';
import Footer from '../../components/footer';
const Account = () => {
    const {address,setAddress,saveAddress,error,setError,editMode,setEditMode,isLoading,loadingError} = useAddressContext();
    const {isLoggedIn} = useGlobalContext();
    const stateRef = useRef(null);
    const cityRef = useRef(null);
    const pinRef = useRef(null);
    const contactRef = useRef(null);
    const addressLineRef = useRef(null);
    const [showForm,setShowForm] = useState(false)

    const handleChange = (e) =>{
        setError(error => {return ({...error,addressLine:'',state:'',city:'',contact:'',pin:''})});
        setAddress({...address,[e.target.name]:e.target.value});
    }
    
    const resetError = () =>{
        setError(error => {return ({...error,addressLine:'',state:'',city:'',contact:'',pin:''})});
    }


    const saveChanges = () =>{
        setError(error => {return ({...error,addressLine:'',state:'',city:'',contact:'',pin:''})});
        saveAddress({
            addressLine:addressLineRef.current.value,
            state: stateRef.current.value,
            city: cityRef.current.value,
            pin: pinRef.current.value,
            contact: contactRef.current.value,
        });
    }

    if(!isLoggedIn){
        return <div className="account__notLogged">
            You must log in first
        </div>
    }

    if(isLoading){
        return <Loader/>
    }
    
    if(loadingError){
        return <Error/>
    }



    if(!address.exists){
        return <div className="address__save">
            <div className="address__center center">
                <div className="address__header">
                    {address.email && <p> {address.email}</p>}
                </div>
                {!showForm?
                    <div className="save__address__prompt">
                        <span>you have no saved addresses</span>
                        <button className="btn__general" onClick={()=>setShowForm(true)}>add address</button>
                    </div>
                :null}
                {showForm?
                <>   
                    <form className="address__form"> 
                        <input type="text" value={address.addressLine} onChange={handleChange} name="addressLine" placeholder="street address"/>
                        <div className="address__input__error">{error.addressLine}</div>
                        <div className="address__form__row">
                            <div>
                                <input value={address.state} onChange={handleChange} name="state" type="text" placeholder="state"/>
                                <div className="address__input__error">{error.state}</div>
                            </div>
                            <div>
                                <input value={address.city} onChange={handleChange} name="city" type="text" placeholder="city"/>
                                <div className="address__input__error">{error.city}</div>
                            </div>
                        </div>
                        <input value={address.pin} onChange={handleChange} name="pin" type="number" placeholder="pin"/>
                        <div className="address__input__error">{error.pin}</div>
                        <input value={address.contact} onChange={handleChange} name="contact" type="number" placeholder="contact"/>
                        <div className="address__input__error">{error.contact}</div>
                        <div className="btn-wrapper">
                            <span className="btn__general" onClick={(e)=>{e.preventDefault();saveAddress(address)}}>save address</span>
                        </div>
                    </form>
                </>
                :null}
                <h1 className="order__head">previous orders</h1>
                <Order/>
            </div>
            <Footer/>
        </div>
    }

    return (
        <div className="account">
            <div className="address__center center">
                <div className="address__header">
                    {address.email && <p> {address.email}</p>}
                </div>

                <div className="address__details">
                    {!editMode?
                        <div className="account__address__text">
                            <div>
                                <div className="address__text__head">street line: </div>
                                <div className="address__text__desc">{address.addressLine}</div>
                            </div>
                            <div>
                                <div className="address__text__head">state: </div>
                                <div className="address__text__desc">{address.state}</div>
                            </div>
                            <div>
                                <div className="address__text__head">city: </div>
                                <div className="address__text__desc">{address.city}</div>
                            </div>
                            <div>
                                <div className="address__text__head">pin: </div>
                                <div className="address__text__desc">{address.pin}</div>
                            </div>
                            <div>
                                <div className="address__text__head">contact: </div>
                                <div className="address__text__desc">{address.contact}</div>
                            </div>
                        </div>
                    : <div className="account__address__edit">
                        <form> 
                            <div>
                                <label className="address__text__head" htmlFor="addressLine">street line: </label>
                                <input className="address__input" ref={addressLineRef} onFocus={resetError} type="text" defaultValue={address.addressLine} name="addressLine" placeholder="street address"/>
                                <div className="address__input__error">{error.addressLine}</div>
                            </div>
                            <div>
                                <label className="address__text__head" htmlFor="state">state: </label>
                                <input ref={stateRef} onFocus={resetError}defaultValue={address.state} name="state" type="text" placeholder="state"/>
                                <div className="address__input__error">{error.state}</div>

                            </div>
                            <div>
                                <label className="address__text__head" htmlFor="city">city: </label>
                                <input ref={cityRef} onFocus={resetError} defaultValue={address.city} name="city" type="text" placeholder="city"/>
                                <div className="address__input__error">{error.city}</div>
                            </div>
                            <div>
                                <label className="address__text__head" htmlFor="pin">pin: </label>
                                <input ref={pinRef} onFocus={resetError} defaultValue={address.pin} name="pin" type="number" placeholder="pin"/>
                                <div className="address__input__error">{error.pin}</div>
                            </div>
                            <div>
                                <label className="address__text__head" htmlFor="contact">contact: </label>
                                <input ref={contactRef} onFocus={resetError} defaultValue={address.contact} name="contact" type="number" placeholder="contact"/>
                                <div className="address__input__error">{error.contact}</div>
                            </div>
                        </form>
                    </div>
                    }
                    <div>
                        {editMode?
                            <div className="edit__address__wrapper">
                                <button className="cancel__edit__btn btn__general" onClick={()=>setEditMode(false)}>cancel</button>
                                <button className="save__edit__btn btn__general" onClick={saveChanges}>save</button>
                            </div>
                        : <div className="edit__address__wrapper"><button className="edit__address__btn btn__general" onClick={()=>setEditMode(true)}>edit</button></div>
                        }
                    </div>
                </div>
                <h1 className="order__head">previous orders</h1>
                <Order/>
            </div>
            <Footer/>
        </div>
    )
}

export default Account;
