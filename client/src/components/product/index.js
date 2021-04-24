import React,{useEffect,useRef} from 'react'
import './product.css';
import { Link } from 'react-router-dom';
import {formatPrice} from '../../utils/formatPrice';

const Product = ({img,name,price,stock,_id}) => {
    const productRef = useRef(null);
    useEffect(()=>{
        const productObserver = new IntersectionObserver((entries,productObserver)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    productRef.current.classList.toggle('visible');
                    productObserver.disconnect();
                }
            })
        },{threshold: 0.2})
        productObserver.observe(productRef.current);
    },[])
    
    return (
        <Link to={`/shop/${_id}`} ref={productRef} className="product">
            <article className="product__content">
                <div className="product__img__container">
                    <img className="product__img" src={`/${img[0]}`} alt={name}/>
                    {!stock?<div className="product__outofstock"><p>out of stock</p></div>:null}
                </div>
                <div className="product__info">
                    <h1 className="product__name">{name}</h1>
                    <h2 className="product__price">PRICE: {formatPrice(price)}</h2>
                </div>
            </article>
        </Link>
    )
}

export default Product
