import React,{useState,useEffect,useContext} from 'react';
import axios from 'axios';
import { useGlobalContext } from './context';
const CartContext = React.createContext();

export const CartProvider = ({children})=>{
    const {cart,products} = useGlobalContext();
    const [cartProducts,setCartProducts] = useState([]);
    const [cartTotalItems,setCartTotalItems] = useState(0)
    const [cartTotalAmount,setCartTotalAmount] = useState(0);
    const [couponCode,setCouponCode] = useState('');
    const [couponError,setCouponError] = useState('');
    const [discount,setDiscount] = useState(0);//this contains discount in percent
    const [discountAmount,setDiscountAmount] = useState(0); //this contains discount in paise
    const verifyCoupon = () =>{
        axios.post('/coupon/check',{code: couponCode})
            .then((res)=>{
                if(res.data.success){
                    setDiscount(res.data.discount);
                }
                if(res.data.nomatch){
                    setDiscount(0);
                    setCouponError('invalid coupon code');
                }
            })
    }
    

    useEffect(()=>{
        setCartProducts([]);
        if(cart.length){//only run if cart has something
            let newCartProducts= cart.map(item=>{
                let newItem = null;//
                const {productId,pqty} = item;
                for(let i=0;i<products.length;i++){
                    if(products[i]._id === productId){
                        //remove item from cart products if stock is 0
                        if(products[i].stock===0){
                            return newItem;
                        }
                        newItem = {...products[i],pqty,checked:true};
                        break;
                    }
                }
                return newItem;
            })

            //remove all items that are null
            newCartProducts = newCartProducts.filter(p=> p !== null);
            setCartProducts(newCartProducts);
        }
    },[cart,products]);
    
    useEffect(()=>{
        let totalAmount = 0;
        let totalItems = 0;
        let discountValue = 0;
        cartProducts.forEach(item =>{
            totalAmount += item.pqty * item.price;
            totalItems +=item.pqty;
        })
        discountValue = totalAmount/100 * discount;
        setDiscountAmount(discountValue)
        setCartTotalAmount(totalAmount-discountValue);
        setCartTotalItems(totalItems);
    },[cartProducts,discount]);


    return <CartContext.Provider value={{
            cartProducts,
            cartTotalItems,
            cartTotalAmount,
            couponCode,
            setCouponCode,
            verifyCoupon,
            couponError,
            discountAmount,
            setCouponError,
            discount,
        }}>
        {children}
    </CartContext.Provider>
}

export const useCartContext = () =>{
    return useContext(CartContext);
}