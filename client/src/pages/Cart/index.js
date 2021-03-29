import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../../context';
import CartItem from '../../components/cartItem';
import './cart.css';
import { Link } from 'react-router-dom';
//will have to put an in stock indicator for the cart item
const Cart = () => {
    const {cart,products,setCartTotalAmount,cartTotalItems,cartTotalAmount} = useGlobalContext();
    const [cartProducts,setCartProducts] = useState([]);
    useEffect(()=>{
        // setCartProducts([]);
        if(cart.length){//if cart has something only then i need to run this
            let newCartProducts= cart.map(item=>{
                let newItem = null;// in case item id doesnot match with any product (which will happen if someone deltes the product from database and when product is not fetched but local storage has items)
                const {productId,pqty} = item;
                for(let i=0;i<products.length;i++){//now i will check if any product id matches with this cart item
                    if(products[i]._id === productId){
                        newItem = {...products[i],pqty};
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
        cartProducts.forEach(item =>{
            totalAmount += item.pqty * item.price;
        })
        setCartTotalAmount(totalAmount);
    },[cartProducts]);

    if(!cart.length){
        return(
            <div className="cart__empty">
                <p>There is nothing in cart </p>
            </div>
        )
    }

    return (
        <div className="cart">
            <div className="cart__center center">
                    {/* <div className="cart__products__number">
                        total items ({cartTotalItems})
                    </div> */}
                    
                    <div className="cart__content">
                        <div className="cart__products">
                            {cartProducts.length ? cartProducts.map(item=>{
                                return(
                                    <CartItem key={item._id} {...item}/>
                                )
                            }):null}
                        </div>

                        <div className="cart__summary">
                            <h1>order summary</h1>
                            <div className="cart__summary__info">
                                <div className="cart__summary__details">
                                    <p>items</p>
                                    <p>{cartTotalItems}</p>
                                </div>
                                <div className="cart__summary__details">
                                    <p>amount</p>
                                    <p>&#8377; {cartTotalAmount}</p>
                                </div>
                            </div>
                            {/* <div className="cart__products__number">items : {cartTotalItems}</div>
                            <div className="cart__summary__details">
                            </div>
                            <div>total: &#8377; {cartTotalAmount}</div> */}
                            <button className="btn-checkout">checkout</button>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default Cart
