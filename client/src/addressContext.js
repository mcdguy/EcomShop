import React,{useState,useContext,useReducer,useEffect, createContext} from 'react';
import { useGlobalContext } from './context';
import axios from 'axios';

const AddressContext = React.createContext();
export const AddressProvider = ({children}) =>{
    const {isLoggedIn} = useGlobalContext();
    const [error,setError] = useState({addressLine:'',state:'',city:'',contact:'',pin:''})
    const [address,setAddress] = useState({email: '',username:'', exists:false, addressLine: '',state: '', city: '', contact: '', pin:''})
    const [editMode,setEditMode] = useState(false);

    const saveAddress=({addressLine,state,city,pin,contact})=>{
        axios.post('/user/account/address',{address:{addressLine,state,city,pin,contact}})
            .then(res=>{
                if(res.data.errors){
                    // console.log(res.data.errors);
                    setError({addressLine:res.data.errors.addressLine,state:res.data.errors.state,pin: res.data.errors.pin,city: res.data.errors.city,contact: res.data.errors.contact})
                }else{
                    // console.log(res.data);
                    //however my res is also sending hashed password
                    // maybe instead i need to use res.data.success type thing
                    //so when i successfully save data i will set state instead of already setting it
                    setAddress(address => {return{...address,exists: true,addressLine,state,city,pin,contact}});
                    //this is specifically for function called sent via saveChanges
                    setEditMode(false);
                }
            })
            .catch(err=> console.log(err))
    }
    useEffect(()=>{
        //getting from db
        if(isLoggedIn){
            axios.get('/user/account/address')
                .then(res =>{
                    // console.log(res.data);
                    //this is error which comes from jwt
                    if(res.data.error==='user not logged in'){//this means user is not logged in and state is manipulated
                        //i can even set logout here specifically if error message is could not find user
                        
                        return;
                    }else{
                        //should check success before doing this
                        //setting up email and username because they surely exist but can't say about address
                        setAddress({...address,username:res.data.username,email:res.data.email})
                        if(!res.data.address){
                            setAddress((address) => {return{...address,exists: false}})
                        }else{
                            const {city,state,pin,contact,addressLine} = res.data.address;
                            setAddress(address=>{return({...address,exists: true,city,state,pin,contact,addressLine})});
                        }

                    }
                })
                .catch(err => console.log(err));
        }else{//when user logs out clearing up the state
            setAddress({email: '',username:'', exists:false, addressLine: '',state: '', city: '', contact: '', pin:''});
        }
    },[isLoggedIn])

    return <AddressContext.Provider value={{address,saveAddress,setAddress,error,setError,editMode,setEditMode}}>
        {children}
    </AddressContext.Provider>
}

export const useAddressContext = () =>{
    return useContext(AddressContext);
}

