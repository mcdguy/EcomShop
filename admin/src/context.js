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
    const [videos,setVideos] = useState([]);
    const [userPage,setUserPage] = useState(1);
    const [userHasMore,setUserHasMore] = useState(true);
    const [orderPage,setOrderPage] = useState(1);
    const [orderHasMore,setOrderHasMore] = useState(true);

    const showNextUserPage = () =>{
        if(userHasMore){
            setUserPage((p)=>{return p+1});
        }
    }

    const showNextOrderPage = () =>{
        if(orderHasMore){
            setOrderPage((p)=>{return p+1});
        }
    }
    useEffect(()=>{
        axios('/gallery')
            .then(res =>{
                setVideos(res.data.videos);
            })
            .catch(err => console.log(err));
    },[]);

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
      axios.get('/location')
        .then(res => {
            if(res.data.locations){
                setLocation(res.data.locations);
            }
        })
        .catch(err => console.log(err));
    },[]);

    useEffect(()=>{
        axios.get(`/user?page=${userPage}&limit=2`)
            .then(res=>{
                if(res.data.users){
                    setUser((oldUser)=>{return[...oldUser,...res.data.users]});
                }
                setUserHasMore(res.data.users.length > 0);
            })
            .catch(err => console.log(err));
    },[userPage])

    useEffect(()=>{
        axios.get(`/order?page=${orderPage}&limit=1`)
            .then(res=>{
                if(res.data.orders){
                    setOrder(oldOrders =>{
                        return([...oldOrders,...res.data.orders]);
                    });
                }
                setOrderHasMore(res.data.orders.length > 0);
            })
    },[orderPage])

    return (
        <AppContext.Provider value={{
                currentTab,
                setCurrentTab,
                user,
                product,
                location,
                order,
                coupon,
                videos,
                showNextUserPage,
                userHasMore,
                showNextOrderPage,
                orderHasMore
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

