import React,{useState,useReducer,useEffect,useContext} from 'react';
import { useGlobalContext } from './context';
const CartContext = React.createContext();

export const CartProvider = ({children})=>{
    const {cart,products} = useGlobalContext();
    const [cartProducts,setCartProducts] = useState([]);
    const [cartTotalItems,setCartTotalItems] = useState(0)
    const [cartTotalAmount,setCartTotalAmount] = useState(0);
    const toggleCheck = (id) =>{
        //this function needs the id of item we want to check or uncheck
        // console.log('hello',id);
        setCartProducts(cartProducts =>{
            let products = cartProducts.map(item=>{
                if(item._id === id){
                    item.checked = !item.checked;
                }
                return item;
            })
            return products;
        });
    }
    useEffect(()=>{
        console.log('im running');
        setCartProducts([]);
        if(cart.length){//if cart has something only then i need to run this
            let newCartProducts= cart.map(item=>{
                let newItem = null;// in case item id doesnot match with any product (which will happen if someone deltes the product from database and when product is not fetched but local storage has items)
                const {productId,pqty} = item;
                for(let i=0;i<products.length;i++){//now i will check if any product id matches with this cart item
                    if(products[i]._id === productId){
                        //i have to delete or hide item from cart Products if it is 0
                        if(products[i].stock===0){
                            return newItem;//i am returning null if stock of this item is 0
                        }
                        newItem = {...products[i],pqty,checked:true};
                        break;//to use break i will use normal for loop
                    }
                }
                return newItem;//i have to return this outside the for each and thus i created that newItem variable
            })
            newCartProducts = newCartProducts.filter(p=> p !== null);//filtering out all cart items that are null due to deletion or delay in fetch
            // console.log(newCartProducts);
            setCartProducts(newCartProducts);
        }
    },[cart,products]);
    
    useEffect(()=>{
        let totalAmount = 0;
        let totalItems = 0;
        cartProducts.forEach(item =>{
            totalAmount += item.pqty * item.price;
            totalItems +=item.pqty;
        })
        setCartTotalAmount(totalAmount);
        setCartTotalItems(totalItems);
    },[cartProducts]);


    return <CartContext.Provider value={{
            cartProducts,
            cartTotalItems,
            toggleCheck,
            cartTotalAmount
        }}>
        {children}
    </CartContext.Provider>
}

export const useCartContext = () =>{
    return useContext(CartContext);
}