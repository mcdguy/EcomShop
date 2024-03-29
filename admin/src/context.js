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

export const baseUrl = createBaseUrl();
function createBaseUrl(){
    if(process.env.NODE_ENV === 'production'){
        return 'https://sbcoffeecompany.herokuapp.com';
    }else{
        return '';
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
    
    //for pagination
    const [orderCursor,setOrderCursor] = useState('');
    const [userCursor,setUserCursor] = useState(''); 
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
        axios(`${baseUrl}/admin/status`)
            .then(res =>{
                if(res.data.error){
                    setType('read admin');
                    setShowMainLoader(false);
                    setIsLoggedIn(false);
                }
                if(res.data.success){
                    setType(res.data.type);
                    setShowMainLoader(false);
                    setIsLoggedIn(true);
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
        axios(`${baseUrl}/gallery`)
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
        axios(`${baseUrl}/coupon`)
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

    //fetch coupon again after login
    useEffect(()=>{
        fetchCoupon();
    },[isLoggedIn])
    
    const fetchProduct = () =>{
        setIsProductLoading(true);
        setProductError(false);
        axios(`${baseUrl}/product`)
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
        axios.get(`${baseUrl}/location`)
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

 
    const fetchUser = () =>{
        setIsUserLoading(true);
        setUserError(false);
        axios.get(`${baseUrl}/user?cursor=${userCursor}`)
            .then(res=>{
                console.log(res.data);
                if(res.data.users){
                    setUser((oldUser)=>{return[...oldUser,...res.data.users]});
                    setUserCursor(res.data.cursor);
                    setUserHasMore(res.data.hasMore);
                }
                setIsUserLoading(false);
            })
            .catch(err => {
                console.log(err);
                setUserError(true);
            });
    }

    useEffect(()=>{
        fetchUser();
    },[userPage])

    const fetchOrder = () =>{
        setIsOrderLoading(true);
        setOrderError(false);
        axios.get(`${baseUrl}/order?cursor=${orderCursor}`)
            .then(res=>{
                if(res.data.orders){
                    setOrder(oldOrders =>{
                        return([...oldOrders,...res.data.orders]);
                    });
                    setOrderCursor(res.data.cursor);
                    setOrderHasMore(res.data.hasMore);
                }
                setIsOrderLoading(false);
            })
            .catch(err => {
                setOrderError(true);
            })
    }
    useEffect(()=>{
        fetchOrder();
    },[orderPage])

    const fetchAdmin = () =>{
        setIsAdminLoading(true);
        setAdminError(false);
        axios.get(`${baseUrl}/admin`)
            .then(res => {
                if(res.data.admin){
                    setAdmin(res.data.admin);
                }
                setIsAdminLoading(false);
            })
            .catch(err => {
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
                fetchOrder,
                fetchUser,
                isLoggedIn,
                setIsLoggedIn,
                type,
                setType,
                setAdmin,
                showMainLoader,
                setIsUserLoading,
                setIsOrderLoading,
                setUser,
                setOrder
            }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

