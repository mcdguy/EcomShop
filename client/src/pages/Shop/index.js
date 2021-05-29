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
            {filteredProducts.length?
                <div className="shop" onClick={()=>setShowFilters(false)}>
                        <div className="shop__filter center">
                            <span className={`${filterName==='none'?'shop__filter__indicator':'shop__filter__indicator show'}`}></span>
                            <span className="filter__icon button__effect" onClick={(e)=>{e.stopPropagation();setShowFilters(!showFilters)}}><AiFillFilter/></span>
                            <div className={`${showFilters?'filter__options show': 'filter__options'}`}>
                                <span onClick={()=>setFilter('none')}>none</span>
                                <span className={`${filterName==='featured'?'active':null}`} onClick={()=>setFilter('featured')}>featured</span>
                                <span className={`${filterName==='coffee'?'active':null}`} onClick={()=>setFilter('coffee')}>coffee</span>
                                <span className={`${filterName==='brewing equipment'?'active':null}`} onClick={()=>setFilter('brewing equipment')}>brewing equipment</span>
                                <span className={`${filterName==='accompaniment'?'active':null}`} onClick={()=>setFilter('accompaniment')}>accompaniment</span>
                            </div>
                            <div className="filter__click__handler"></div>
                        </div>
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
