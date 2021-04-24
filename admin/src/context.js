import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';

const AppContext = React.createContext();

export const AppProvider = ({children}) => {
    const [currentTab,setCurrentTab] = useState('product');
    const [user,setUser] = useState([]);
    const [location,setLocation] = useState([]);
    const [order,setOrder]=useState([]);
    const [product,setProduct]=useState([]);
    const [coupon,setCoupon]=useState([]);

    useEffect(()=>{
        axios('/coupon')
            .then(res =>{
                setCoupon(res.data.coupon);
            })
            .catch(err => console.log(err));
    })
    useEffect(()=>{
        axios('/product')
        .then(res=>{
            setProduct(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    },[]);

    useEffect(()=>{
        axios.get('/order')
            .then(res=>{
                if(res.data.orders){
                    setOrder(res.data.orders);
                }
            })
    },[])

    useEffect(()=>{
      axios.get('/location')
        .then(res => {
            if(res.data.locations){
                setLocation(res.data.locations);
            }
        })
        .catch(err => console.log(err));
    },[]);

    useEffect(()=>{
        axios.get('/user')
            .then(res=>{
                if(res.data.users){
                    setUser(res.data.users);
                }
            })
            .catch(err => console.log(err));
    },[])
    return (
        <AppContext.Provider value={{
                currentTab,
                setCurrentTab,
                user,
                product,
                location,
                order,
                coupon
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

