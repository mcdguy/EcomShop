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
    if(action.type === 'SET_CART'){
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
    // cart: [],
    cartTotalItems: 0,
    cartTotalAmount: 0,
    filter: 'none',
    error: {message: '',show: false},
    isLoading: false,
    filterName: 'none',
    isLoggedIn: false,
    featuredProducts: [],
    showLoginModal: false,
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
    //replacing cart with new one
    const setCart = (newCart) =>{
        // console.log('hello');
        dispatch({type: 'SET_CART',payload: newCart})
    }
    const addCartItem = (productId,pqty) =>{
        let alreadyExists = false;
        let newCart = [];
        if(state.cart.length){
            newCart = state.cart.map(cartItem=>{
                if(cartItem.productId === productId){//if the item already exists i only update qty and wont add it again
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
        dispatch({type: 'SET_CART_ITEM',payload: newCart});
    }
    const updateCartItem = (pqty,_id) =>{
        let updatedCart = state.cart.map(item =>{
            if(item.productId === _id){
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
 
    //anytime logged in status changes i will change localStorage
    useEffect(()=>{
        if(state.isLoggedIn){
            localStorage.setItem('status',true);
        }else{
            localStorage.setItem('status',false);
        }
    },[state.isLoggedIn]);


    //every time cart changes set the cart in localStorage or in db if user is logged in
    //but cart might also change if user refresh the db but there is no real change in cart 
    // at that time we will fetch cart from db because other device might have made a change to the db and refreshing this page will revert that change so sessions will never sync
    //because every session will try to replace db cart with localstorage
    // useEffect(()=>{
    //     let localCart = getLocalStorage();
    //     // console.log(JSON.stringify(localCart),JSON.stringify(state.cart));
    //     //using stringify because i need to compare objects and there order wont change on refresh
    //     console.log(localCart.length === state.cart.length === 0)
    //     if(!(localCart.length === state.cart.length === 0)){
    //        console.log('looks like it is happening');
    //        axios.get('/user/cart')
    //             .then(res => {
    //                 if(res.data.cart){
    //                     setCart(res.data.cart);
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }else if(JSON.stringify(localCart) === JSON.stringify(state.cart) && localCart.length !== 0){
    //         console.log('looks like page is refreshed');
    //         axios.get('/user/cart')
    //             .then(res => {
    //                 if(res.data.cart){
    //                     setCart(res.data.cart);
    //                     localStorage.setItem('cart',[]);
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }else{
    //         localStorage.setItem('cart',JSON.stringify(state.cart));
    //         let totalItems = 0;
    //         state.cart.forEach(item =>{
    //             totalItems +=item.pqty;
    //         })
    //         dispatch({type: 'SET_CART_TOTAL_ITEMS',payload: totalItems})
    //         if(state.isLoggedIn){
    //             axios.post('/user/cart',{cart:state.cart})
    //                 .then(res =>{
    //                     //basically i don't need to do anything here or i can see if user is logged out i can set loggedout here
    //                     console.log('updated cart');
    //                 })
    //                 .catch(err => console.log(err));
    //         }
    //     }
    // },[state.cart])


    useEffect(()=>{
            localStorage.setItem('cart',JSON.stringify(state.cart));
            let totalItems = 0;
            state.cart.forEach(item =>{
                totalItems +=item.pqty;
            })
            // if (window.performance) {
            //     if (performance.navigation.type == 1) {
            //       alert( "This page is reloaded" );
            //     } else {
            //       alert( "This page is not reloaded");
            //     }
            // }
            dispatch({type: 'SET_CART_TOTAL_ITEMS',payload: totalItems})
            if(state.isLoggedIn){
                axios.post('/user/cart',{cart:state.cart})
                    .then(res =>{
                        //basically i don't need to do anything here or i can see if user is logged out i can set loggedout here
                        console.log('updated cart');
                    })
                    .catch(err => console.log(err));
            }
        
    },[state.cart])
   
    // useEffect(()=>{
    //         let status = localStorage.getItem('status');
    //     console.log(status);
    //         if (status && window.performance) {
    //             if (performance.navigation.type == 1) {
    //             //   alert( "This page is reloaded" );
    //               axios.get('/user/cart')
    //                 .then(res => {
    //                     if(res.data.cart){
    //                         setCart(res.data.cart);
    //                         // localStorage.setItem('cart',[]);
    //                     }
    //                 })
    //                 .catch(err => console.log(err));
                  
    //             } else {
    //               alert( "This page is not reloaded");
    //               localStorage.setItem('cart',JSON.stringify(state.cart));
    //               let totalItems = 0;
    //               state.cart.forEach(item =>{
    //                   totalItems +=item.pqty;
    //               })
    //               dispatch({type: 'SET_CART_TOTAL_ITEMS',payload: totalItems})
    //               if(state.isLoggedIn){
    //                   axios.post('/user/cart',{cart:state.cart})
    //                       .then(res =>{
    //                           //basically i don't need to do anything here or i can see if user is logged out i can set loggedout here
    //                           console.log('updated cart');
    //                       })
    //                       .catch(err => console.log(err));
    //               }
    //             }
    //         }else{
    //             localStorage.setItem('cart',JSON.stringify(state.cart));
    //             let totalItems = 0;
    //             state.cart.forEach(item =>{
    //                 totalItems +=item.pqty;
    //             })
    //             dispatch({type: 'SET_CART_TOTAL_ITEMS',payload: totalItems})
    //             if(state.isLoggedIn){
    //                 axios.post('/user/cart',{cart:state.cart})
    //                     .then(res =>{
    //                         //basically i don't need to do anything here or i can see if user is logged out i can set loggedout here
    //                         console.log('updated cart');
    //                     })
    //                     .catch(err => console.log(err));
    //             }
    //         }
           
        
    // },[state.cart])

    // const getfullCart = () =>{
    //     alert('page is refreshed');
    //     console.log('hey');
    // }
    // useEffect(()=>{
    //     window.addEventListener('beforeunload',getfullCart);
    //     return () =>{
    //         window.removeEventListener('beforeunload',getfullCart);
    //     }
    // },[]);

    // useEffect(()=>{
    //     // alert('this effect is running');
    //     let status = localStorage.getItem('status');
    //     console.log(status);
    //     if(status){
    //         axios.get('/user/cart')
    //             .then(res => {
    //                 if(res.data.cart){
    //                     // console.log(res.data.cart);
    //                     setCart(res.data.cart);
    //                     // localStorage.setItem('cart',[]);
    //                 }
    //             })
    //             .catch(err => console.log(err));
    //     }

    // },[])

    useEffect(()=>{
        // alert('running');
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

    return <AppContext.Provider value={{...state,setShowLoginModal,setLogin,setCart,setLogout,setHideLoginModal,addCartItem,setCartTotalAmount,updateCartItem,removeCartItem,setFilterName,setProducts}}>
        {children}
    </AppContext.Provider>
}
export const useGlobalContext = () =>{
    return useContext(AppContext);
}

//commented cart get local storage in state
//also commenting set local storage in useEffect