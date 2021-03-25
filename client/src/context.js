import React, {useState,useEffect,useReducer,useContext} from 'react';
import axios from 'axios';

const AppContext = React.createContext();

const getLocalStorage = () =>{
    let cart = localStorage.getItem('cart');//using the same name(list) i used in localStorage.setItem
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
    if(action.type === 'UPDATE_CART_ITEM'){
        return({...oldState,cart: action.payload});
    }
    if(action.type === 'REMOVE_CART_ITEM'){
        return({...oldState,cart: action.payload});
    }
    if(action.type === 'SET_CART_TOTAL_ITEMS'){
        return({...oldState,cartTotalItems: action.payload});
    }
    if(action.type === 'SET_CART_TOTAL_AMOUNT'){
        return({...oldState,cartTotalAmount: action.payload});
    }
    if(action.type === 'SET_TOKEN'){
        return({...oldState,token: action.payload});
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
    throw new Error('invalid dispatch');
}
const defaultState = {
    products: [],
    cart: getLocalStorage(),
    cartTotalItems: 0,
    cartTotalAmount: 0,
    filter: 'none',
    error: {message: '',show: false},
    isLoading: false,
    filterName: 'none',
    isLoggedIn: false,
    featuredProducts: [],
    // token:null,
    showLoginModal: false,
}
export const AppProvider = ({children}) =>{
    const [state,dispatch] = useReducer(reducer,defaultState);
    
    const setToken = (value) =>{
        dispatch({type: 'SET_TOKEN',payload: value});
    }
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
    const addCartItem = (productId,pqty) =>{
        let alreadyExists = false;
        let newCart = [];
        if(state.cart.length){//if the item already exists i only update qty and wont add it again
            newCart = state.cart.map(cartItem=>{
                if(cartItem.productId === productId){
                    cartItem.pqty +=pqty;
                    alreadyExists = true;
                }
                return cartItem;
            })
        }
        if(!alreadyExists){//if it doesn't then i will add it to the cart 
            if(state.cart.length){//if cart has something copy it
                newCart = [...newCart,{productId,pqty}];
            }
            else{//if cart is empty just push the item
                newCart = [{productId,pqty}];
            }
        }
        // console.log(newCart);
        dispatch({type: 'SET_CART_ITEM',payload: newCart});
    }
    const updateCartItem = (pqty,_id) =>{
        let updatedCart = state.cart.map(item =>{
            // console.log('called');
            if(item.productId === _id){
                // console.log('called');
                item.pqty = pqty;
            }
            return item;
        })
        dispatch({type: 'UPDATE_CART_ITEM',payload: updatedCart});
    }
    const removeCartItem = (_id) =>{
        let newCart = state.cart.filter(item => item.productId !== _id);
        dispatch({type: 'REMOVE_CART_ITEM',payload: newCart});
    }

    const setCartTotalAmount = (amount) => {
        dispatch({type: 'SET_CART_TOTAL_AMOUNT',payload: amount})
    }
    //checking if user is logged in on mount
    useEffect(()=>{
        axios('/user/status')
            .then(res =>{
                console.log(res.data);
                if(res.data.error) return;
                if(res.data.success) setLogin();//if it is success i will set login
            })
            .catch(err => console.log(err));
    },[]);


    //setting the cart
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(state.cart));
        let totalItems = 0;
        state.cart.forEach(item =>{
            totalItems +=item.pqty;
        })
        dispatch({type: 'SET_CART_TOTAL_ITEMS',payload: totalItems})
        
    },[state.cart])

    //setting the products
    useEffect(()=>{
        axios('/product')
            .then(res=>{
                setProducts(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);

    useEffect(()=>{
        let featured = state.products.filter(product=>product.featured === true);
        dispatch({type:'SET_FEATURED',payload: featured})
    },[state.products]);

    return <AppContext.Provider value={{...state,setShowLoginModal,setLogin,setLogout,setHideLoginModal,addCartItem,setToken,setCartTotalAmount,updateCartItem,removeCartItem,setFilterName,setProducts}}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () =>{
    return useContext(AppContext);
}