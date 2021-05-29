import React,{useState,useContext,useEffect} from 'react';
import { useGlobalContext } from './context';
import axios from 'axios';

const AddressContext = React.createContext();
export const AddressProvider = ({children}) =>{
    const {isLoggedIn} = useGlobalContext();
    const [error,setError] = useState({addressLine:'',state:'',city:'',contact:'',pin:''})
    const [address,setAddress] = useState({email: '',username:'', exists:false, addressLine: '',state: '', city: '', contact: '', pin:''})
    const [editMode,setEditMode] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [loadingError,setLoadingError] = useState(false);

    //this function is also called by saveChanges
    const saveAddress=({addressLine,state,city,pin,contact})=>{
        axios.post('/user/account/address',{address:{addressLine,state,city,pin,contact}})
            .then(res=>{
                if(res.data.errors){
                    setError({addressLine:res.data.errors.addressLine,state:res.data.errors.state,pin: res.data.errors.pin,city: res.data.errors.city,contact: res.data.errors.contact})
                }else{
                    if(res.data.success){
                        setAddress(address => {return{...address,exists: true,addressLine,state,city,pin,contact}});

                        //below statement is specifically for function called by saveChanges
                        setEditMode(false);
                    }
                    
                }
            })
            .catch(err=> console.log(err))
    }

    useEffect(()=>{
        setIsLoading(true);
        setLoadingError(false);
        
        if(isLoggedIn){
            axios.get('/user/account/address')
                .then(res =>{
                    if(res.data.error==='user not logged in'){
                        setIsLoading(false);
                        return;
                    }
                    if(res.data.success){
                        setAddress({...address,username:res.data.username,email:res.data.email})
                        //address may or may not be available
                        if(!res.data.address){
                            setAddress((address) => {return{...address,exists: false}})
                        }else{
                            const {city,state,pin,contact,addressLine} = res.data.address;
                            setAddress(address=>{return({...address,exists: true,city,state,pin,contact,addressLine})});
                        }
                        setIsLoading(false);
                    }
                })
                .catch(err => {
                    setLoadingError(true);
                });
        }else{
            //when user logs out clearing up the state
            setAddress({email: '',username:'', exists:false, addressLine: '',state: '', city: '', contact: '', pin:''});
        }
    },[isLoggedIn])

    return <AddressContext.Provider value={{address,saveAddress,setAddress,error,setError,editMode,setEditMode,isLoading,loadingError}}>
        {children}
    </AddressContext.Provider>
}

export const useAddressContext = () =>{
    return useContext(AddressContext);
}

