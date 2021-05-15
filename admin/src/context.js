import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';

const AppContext = React.createContext();
const getCurrentTab = () =>{
    let currentTab = localStorage.getItem('currentTab');
    if(currentTab){
        return (currentTab);
    }
    else{
        return ('product');
    }
}
export const AppProvider = ({children}) => {
    const [currentTab,setCurrentTab] = useState(getCurrentTab());
    const [user,setUser] = useState([]);
    const [isLoggedIn,setIsLoggedIn]= useState(false);
    const [type,setType] = useState('read admin');
    
    const [location,setLocation] = useState([]);
    const [order,setOrder]=useState([]);
    const [product,setProduct]=useState([]);
    const [coupon,setCoupon]=useState([]);
    const [videos,setVideos] = useState([]);
    const [admin,setAdmin] = useState([]);
    
    const [userPage,setUserPage] = useState(1);
    const [userHasMore,setUserHasMore] = useState(true);
    const [orderPage,setOrderPage] = useState(1);
    const [orderHasMore,setOrderHasMore] = useState(true);
    
    const [showMainLoader,setShowMainLoader] = useState(true);
    const [isUserLoading,setIsUserLoading] = useState(true);
    const [isProductLoading,setIsProductLoading] = useState(true);
    const [isOrderLoading,setIsOrderLoading] = useState(true);
    const [isLocationLoading,setIsLocationLoading] = useState(true);
    const [isCouponLoading,setIsCouponLoading] = useState(true);
    const [isVideosLoading,setIsVideosLoading] = useState(true);
    const [isAdminLoading,setIsAdminLoading] = useState(true);

    const [userError,setUserError] = useState(false);
    const [productError,setProductError] = useState(false);
    const [orderError,setOrderError] = useState(false);
    const [locationError,setLocationError] = useState(false);
    const [couponError,setCouponError] = useState(false);
    const [videoError,setVideoError] = useState(false);
    const [adminError,setAdminError] = useState(false);

    useEffect(()=>{
        if(currentTab){
            localStorage.setItem('currentTab',currentTab);
        }
    },[currentTab]);

    useEffect(()=>{
        setShowMainLoader(true);
        axios('/admin/status')
            .then(res =>{
                // console.log(res);
                // console.log(res.data);
                if(res.data.error){
                    setType('read admin');
                    setShowMainLoader(false);
                    setIsLoggedIn(false);
                }
                if(res.data.success){
                    setType(res.data.type);
                    setShowMainLoader(false);
                    setIsLoggedIn(true);
                    // fetchAdmin();
                }
                setShowMainLoader(false);
            })
            .catch(err =>{
                console.log('an error occurred');
                setShowMainLoader(false);
            })
    },[]);

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
    const fetchGallery = () =>{
        setIsVideosLoading(true);
        setVideoError(false);
        axios('/gallery')
        .then(res =>{
            if(res.data.videos){
                setVideos(res.data.videos);
            }
            setIsVideosLoading(false);
        })
        .catch(err => {
            console.log(err);
            setVideoError(true);
        });
    }

    useEffect(()=>{
       fetchGallery();
    },[]);

    const fetchCoupon = () =>{
        // setIsCouponLoading(true);
        setCouponError(false);
        axios('/coupon')
        .then(res =>{
            if(res.data.coupon){
                setCoupon(res.data.coupon);
            }
            setIsCouponLoading(false);
        })
        .catch(err => {
            console.log(err);
            setCouponError(true);
        });
    }

    useEffect(()=>{
        fetchCoupon();
    },[])
    
    const fetchProduct = () =>{
        setIsProductLoading(true);
        setProductError(false);
        axios('/product')
        .then(res=>{
            if(res.data.product){
                setProduct(res.data.product);
            }
            setIsProductLoading(false);
        })
        .catch(err => {
            console.log(err);
            setProductError(true);
        })
    }

    useEffect(()=>{
        fetchProduct();
    },[]);

    const fetchLocation = () =>{
        setIsLocationLoading(true);
        setLocationError(false);
        axios.get('/location')
        .then(res => {
            if(res.data.locations){
                setLocation(res.data.locations);
            }
            setIsLocationLoading(false);
        })
        .catch(err => {
            console.log(err);
            setLocationError(true);
        });
    }
    useEffect(()=>{
        fetchLocation();
    },[]);

    // const fetchUser = () =>{
        
    // }
    useEffect(()=>{
        setIsUserLoading(true);
        setUserError(false);
        axios.get(`/user?page=${userPage}&limit=20`)
            .then(res=>{
                if(res.data.users){
                    setUser((oldUser)=>{return[...oldUser,...res.data.users]});
                }
                setUserHasMore(res.data.users.length > 0);
                setIsUserLoading(false);
            })
            .catch(err => {
                console.log(err);
                setUserError(true);
            });
    },[userPage])

    useEffect(()=>{
        setIsOrderLoading(true);
        setOrderError(false);
        axios.get(`/order?page=${orderPage}&limit=20`)
            .then(res=>{
                if(res.data.orders){
                    setOrder(oldOrders =>{
                        return([...oldOrders,...res.data.orders]);
                    });
                }
                setIsOrderLoading(false);
                setOrderHasMore(res.data.orders.length > 0);
            })
            .catch(err => {
                console.log(err);
                setOrderError(true);
            })
    },[orderPage])

    const fetchAdmin = () =>{
        setIsAdminLoading(true);
        setAdminError(false);
        axios.get('/admin')
            .then(res => {
                if(res.data.admin){
                    setAdmin(res.data.admin);
                }
                setIsAdminLoading(false);
            })
            .catch(err => {
                // console.log(err);
                setAdminError(false);
            });
    }

    useEffect(()=>{
        fetchAdmin();
    },[]);

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
                admin,
                showNextUserPage,
                userHasMore,
                showNextOrderPage,
                orderHasMore,
                isProductLoading,
                isOrderLoading,
                isLocationLoading,
                isCouponLoading,
                isVideosLoading,
                isUserLoading,
                isAdminLoading,
                userError,
                productError,
                orderError,
                locationError,
                couponError,
                videoError,
                adminError,
                fetchGallery,
                fetchCoupon,
                fetchProduct,
                fetchLocation,
                fetchAdmin,
                isLoggedIn,
                setIsLoggedIn,
                type,
                setType,
                setAdmin,
                showMainLoader
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

