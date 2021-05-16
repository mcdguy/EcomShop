import React,{useState,useEffect} from 'react';
import { useGlobalContext } from '../../context';
import './shop.css';
import Product from '../../components/product';
import {AiFillFilter} from "react-icons/ai";
import Loader from '../../components/loader';
import Error from '../../components/error';

const Shop = () => {
    const {products,productError,productLoading,filterName,setFilterName} = useGlobalContext();
    const [showFilters,setShowFilters] = useState(false);
    const [filteredProducts,setFilteredProducts] = useState(false);
    const setFilter = (name) =>{
        setFilterName(name);
        setShowFilters(false);
    }
    useEffect(()=>{
        if(filterName === 'none'){
            setFilteredProducts(products);
            return;
        }
        if(filterName === 'featured'){
            let newProducts = products.filter(product =>product.featured === true);
            setFilteredProducts(newProducts);
            return;
        }
        let newProducts = products.filter(product =>product.category === filterName);
        setFilteredProducts(newProducts);

    },[filterName,products])

    if(productLoading){
        return <Loader/>
    }
    if(productError){
        return <Error/>
    }
    return (
        <>
            {/* <Loader/>
            <Error/> */}
            {filteredProducts.length?
                <div className="shop" onClick={()=>setShowFilters(false)}>
                        <div className="shop__filter center">
                            <span className={`${filterName==='none'?'shop__filter__indicator':'shop__filter__indicator show'}`}></span>
                            <span className="filter__icon" onClick={(e)=>{e.stopPropagation();setShowFilters(!showFilters)}}><AiFillFilter/></span>
                            <div className={`${showFilters?'filter__options show': 'filter__options'}`}>
                                <span onClick={()=>setFilter('none')}>none</span>
                                <span className={`${filterName==='featured'?'active':null}`} onClick={()=>setFilter('featured')}>featured</span>
                                <span className={`${filterName==='coffee'?'active':null}`} onClick={()=>setFilter('coffee')}>coffee</span>
                                <span className={`${filterName==='brewing equipment'?'active':null}`} onClick={()=>setFilter('brewing equipment')}>brewing equipment</span>
                                <span className={`${filterName==='accompaniment'?'active':null}`} onClick={()=>setFilter('accompaniment')}>accompaniment</span>
                            </div>
                            <div className="filter__click__handler"></div>
                        </div>
                    {/* <div className="shop__filter center">
                        <span>
                            <svg className="shop__filter__icon" fill="none" height="28" viewBox="0 0 28 28" width="28" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M4.40675 7.25H3C2.44772 7.25 2 6.80228 2 6.25C2 5.69772 2.44772 5.25 3 5.25H4.40675C4.82853 3.94437 6.05398 3 7.5 3C8.94602 3 10.1715 3.94437 10.5933 5.25H25C25.5523 5.25 26 5.69772 26 6.25C26 6.80228 25.5523 7.25 25 7.25H10.5933C10.1715 8.55563 8.94602 9.5 7.5 9.5C6.05398 9.5 4.82853 8.55563 4.40675 7.25ZM5.75 6.25C5.75 5.2835 6.5335 4.5 7.5 4.5C8.4665 4.5 9.25 5.2835 9.25 6.25C9.25 7.2165 8.4665 8 7.5 8C6.5335 8 5.75 7.2165 5.75 6.25Z" fill="black" fillRule="evenodd"/><path clipRule="evenodd" d="M3 15.25H17.4458C17.8676 16.5556 19.093 17.5 20.5391 17.5C21.9851 17.5 23.2105 16.5556 23.6323 15.25H25C25.5523 15.25 26 14.8023 26 14.25C26 13.6977 25.5523 13.25 25 13.25H23.6323C23.2105 11.9444 21.9851 11 20.5391 11C19.093 11 17.8676 11.9444 17.4458 13.25H3C2.44772 13.25 2 13.6977 2 14.25C2 14.8023 2.44772 15.25 3 15.25ZM20.5391 12.5C19.5726 12.5 18.7891 13.2835 18.7891 14.25C18.7891 15.2165 19.5726 16 20.5391 16C21.5056 16 22.2891 15.2165 22.2891 14.25C22.2891 13.2835 21.5056 12.5 20.5391 12.5Z" fill="black" fillRule="evenodd"/><path clipRule="evenodd" d="M10.4067 23.25H3C2.44772 23.25 2 22.8023 2 22.25C2 21.6977 2.44772 21.25 3 21.25H10.4067C10.8285 19.9444 12.054 19 13.5 19C14.946 19 16.1715 19.9444 16.5933 21.25H25C25.5523 21.25 26 21.6977 26 22.25C26 22.8023 25.5523 23.25 25 23.25H16.5933C16.1715 24.5556 14.946 25.5 13.5 25.5C12.054 25.5 10.8285 24.5556 10.4067 23.25ZM11.75 22.25C11.75 21.2835 12.5335 20.5 13.5 20.5C14.4665 20.5 15.25 21.2835 15.25 22.25C15.25 23.2165 14.4665 24 13.5 24C12.5335 24 11.75 23.2165 11.75 22.25Z" fill="black" fillRule="evenodd"/></svg>
                        </span>
                    </div> */}
                    <div className="shop__center center">
                        {filteredProducts.map(product=>{
                            return <Product key={product._id} {...product}></Product>
                        })}
                    </div>
                </div>
            :   <div className="shop-empty">
                    <div className="shop__empty__center center">
                        <h1>There are no items to display</h1>
                    </div>
                </div>
            }
        </>
    )
}

export default Shop
