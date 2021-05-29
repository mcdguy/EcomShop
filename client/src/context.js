import React, {useEffect,useReducer,useContext} from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const getLocalStorage = () =>{
    let cart = localStorage.getItem('cart');
    if(cart){
        return JSON.parse(cart);
    }else{
        return [];
    }  
}

const reducer = (oldState,action) =>{
    if(action.type==='SET_PRODUCTS'){
        return({...oldState,products: action.payload});
    }
    if(action.type === 'SET_FILTER'){
        return({...oldState,filterName: action.payload});
    }
    if(action.type === 'SET_FEATURED'){
        return({...oldState,featuredProducts: action.payload});
    }
    if(action.type === 'SET_CART_ITEM'){
        return({...oldState,cart: action.payload});
    }
    if(action.type === 'SET_CART'){
        return({...oldState,cart: action.payload});
    }
    if(action.type === 'UPDATE_CART_ITEM'){
        return({...oldState,cart: action.payload});
    }
    if(action.type === 'REMOVE_CART_ITEM'){
        return({...oldState,cart: action.payload});
    }
    if(action.type==='SHOW_LOGIN'){
        return({...oldState,showLogin: true});
    }
    if(action.type==='HIDE_LOGIN'){
        return({...oldState,showLogin: false});
    }
    if(action.type === 'LOGIN'){
        return({...oldState,isLoggedIn: true});
    }
    if(action.type === 'LOGOUT'){
        return({...oldState,isLoggedIn: false});
    }
    if(action.type === 'SET_VIDEO'){
        return({...oldState,videos: action.payload})
    }
    if(action.type === 'SET_PRODUCT_ERROR'){
        return({...oldState,productError: action.payload})
    }
    if(action.type === 'SET_PRODUCT_LOADING'){
        return({...oldState,productLoading: action.payload})
    }
    if(action.type === 'SET_GALLERY_ERROR'){
        return({...oldState,galleryError: action.payload})
    }
    if(action.type === 'SET_GALLERY_LOADING'){
        return({...oldState,galleryLoading: action.payload})
    }
    throw new Error('invalid dispatch');
}

const defaultState = {
    products: [],
    cart: getLocalStorage(),
    filter: 'none',
    productError: false,
    productLoading: true,
    galleryError: false,
    galleryLoading: true,
    filterName: 'none',
    isLoggedIn: false,
    featuredProducts: [],
    showLoginModal: false,
    videos: []
}
export const AppProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,defaultState);
    
    const setProducts = (products) =>{
        dispatch({type: 'SET_PRODUCTS',payload: products});
    }
    const setFilterName = (name) =>{
        dispatch({type: 'SET_FILTER',payload: name});
    }
    const setShowLoginModal = () =>{
        dispatch({type: 'SHOW_LOGIN'});
    }
    const setHideLoginModal = () =>{
        dispatch({type: 'HIDE_LOGIN'});
    }
    const setLogin = () =>{
        dispatch({type: 'LOGIN'});
    }
    const setLogout = () =>{
        dispatch({type: 'LOGOUT'});
    }
    const setProductLoading = (value) =>{
        dispatch({type: 'SET_PRODUCT_LOADING',payload: value});
    }
    const setProductError = (value) =>{
        dispatch({type: 'SET_PRODUCT_ERROR',payload: value});
    }
    const setGalleryLoading = (value) =>{
        dispatch({type: 'SET_GALLERY_LOADING',payload: value});
    }
    const setGalleryError = (value) =>{
        dispatch({type: 'SET_GALLERY_ERROR',payload: value});
    }
    const setCart = (newCart) =>{
        dispatch({type: 'SET_CART',payload: newCart})
    }
    const setVideos = (videos) =>{
        dispatch({type: 'SET_VIDEO',payload:videos});
    }

    //adding item in cart
    const addCartItem = (productId,pqty) =>{
        let alreadyExists = false;
        let newCart = [];
        if(state.cart.length){
            newCart = state.cart.map(cartItem=>{
                if(cartItem.productId === productId){//if the item already exists only update qty
                    cartItem.pqty +=pqty;
                    alreadyExists = true;
                }
                return cartItem;
            })
        }
        if(!alreadyExists){//if it doesn't exist then add it to the cart 
            
            //if cart has something copy it
            if(state.cart.length){
                newCart = [...newCart,{productId,pqty}];
            }
            //if cart is empty just push the item
            else{
                newCart = [{productId,pqty}];
            }
        }
        dispatch({type: 'SET_CART_ITEM',payload: newCart});
    }
    
    //updates purchase quantity of already existing cart item
    const updateCartItem = (pqty,_id) =>{
        let updatedCart = state.cart.map(item =>{
            if(item.productId === _id){
                item.pqty = pqty;
            }
            return item;
        })
        dispatch({type: 'UPDATE_CART_ITEM',payload: updatedCart});
    }

    //removes item from cart
    const removeCartItem = (_id) =>{
        let newCart = state.cart.filter(item => item.productId !== _id);
        dispatch({type: 'REMOVE_CART_ITEM',payload: newCart});
    }

    //checking if user is logged in on mount - refresh or initial load
    useEffect(()=>{
        axios('/user/status')
            .then(res =>{
                if(res.data.error) return;
                if(res.data.success) setLogin();
            })
            .catch(err => console.log(err));
    },[]);
 
    //anytime logged in status changes change localStorage
    useEffect(()=>{
        if(state.isLoggedIn){
            localStorage.setItem('status',true);
        }else{
            localStorage.setItem('status',false);
        }
    },[state.isLoggedIn]);

    //every time cart changes save it in local storage
    useEffect(()=>{
            localStorage.setItem('cart',JSON.stringify(state.cart));
            //save it in db if user is logged in
            if(state.isLoggedIn){
                axios.post('/user/cart',{cart:state.cart})
                    .catch(err => console.log(err));
            }        
    },[state.cart])
   
   
    //cart might also change on mount or refresh - replace frontend cart with db cart if user is logged in and page is refreshed 
    useEffect(()=>{
        let status = localStorage.getItem('status');
        if(status){
            axios.get('/user/cart')
                .then(res => {
                    if(res.data.cart){
                        setCart(res.data.cart);
                    }
                })
                .catch(err => console.log(err));
        }
    },[]);

    //fetches the products
    const getProducts = () =>{
        setProductLoading(true);
        setProductError(false);
        axios('/product')
        .then(res=>{
            if(res.data.product){
                setProducts(res.data.product);
                setProductLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            setProductError(true);
        })
    }


    useEffect(()=>{
        getProducts();
    },[]);

     //fetches the videos
     useEffect(()=>{
        setGalleryError(false);
        setGalleryLoading(true);
        axios('/gallery')
            .then(res =>{
                if(res.data.videos){
                    setVideos(res.data.videos);
                    setGalleryLoading(false);
                }
                
            })
            .catch(err => {
                console.log(err);
                setGalleryError(true);
            });
    },[]);

    //extracts featured products from all products
    useEffect(()=>{
        if(state.products){
            let featured = state.products.filter(product=>product.featured === true);
            dispatch({type:'SET_FEATURED',payload: featured})
        }
    },[state.products]);

    return <AppContext.Provider value={{
            ...state,
            setShowLoginModal,
            setLogin,
            setCart,
            setLogout,
            setHideLoginModal,
            addCartItem,
            updateCartItem,
            removeCartItem,
            setFilterName,
            setProducts,
            getProducts
        }}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () =>{
    return useContext(AppContext);
}
