import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './product.css'
import ProductRow from '../productRow';
import { useGlobalContext } from '../../context';
import Loader from '../loader';
import Error from '../error';
import { useFilterContext } from '../../filterContext';

const Product = () => {
    const {product,isProductLoading,productError,type} = useGlobalContext();
    const {productFilter,setProductFilter,productQuery,setProductQuery} = useFilterContext();
    // const [filter,setFilter] = useState('name');
    // const [query,setQuery] = useState('');
    const [filteredProducts,setFilteredProducts] = useState([]);
    useEffect(()=>{
        if(productQuery===''){
            setFilteredProducts(product);
            return;
        }
        let newProducts = product.filter(p =>{
            return(p[productFilter].toString().toLowerCase().indexOf(productQuery.toLowerCase())>=0)
        })
        setFilteredProducts(newProducts);
    },[productQuery,product,productFilter])

    if(isProductLoading){
        return <Loader/>
    }
    if(productError){
        return <Error/>
    }
    if(!product.length){
        return null;
    }
    return (
        <div className="read__products action__read">
            <nav className="locations__nav control__nav">
                <div>
                    <input className="search"  autoComplete="off" type="text" value={productQuery} onChange={(e)=>setProductQuery
                        (e.target.value)} name="search" placeholder="search"/>
                    <select className="search__options" value={productFilter} onChange={(e)=>{setProductFilter(e.target.value)}}>
                        <option value="name">name</option>
                        <option value="stock">stock</option>
                        <option value="category">category</option>
                        <option value="featured">featured</option>
                        <option value="description">description</option>
                        <option value="productId">product id</option>
                    </select>
                </div>
                {type!=='read admin'?<Link to="/create" className="btn">create</Link>:null}
            </nav>
            {filteredProducts.length?
                <table className="read__table product__table">
                    <thead>
                        <tr>
                            <th>
                                <div>id</div>
                            </th>
                            <th>
                                <div>name</div>
                            </th>
                            <th>
                                <div>price</div>
                            </th>
                            <th className="product__table__stock">
                                <div>stock</div>
                            </th>
                            <th className="product__table__weight">
                                <div>weight</div>
                            </th>
                            <th>
                                <div>category</div>
                            </th>
                            <th className={`${type !== 'read admin'?"read__table__edit":"read__table__show"}`}></th>
                            {type!=='read admin'?<th className="read__table__delete"></th>:null}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(p=>{
                            return(
                                <ProductRow key={p._id} {...p}/>
                            );
                        })}
                    </tbody>
                </table>
            :null}
        </div>
    )
}

export default Product
