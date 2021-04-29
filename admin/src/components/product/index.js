import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './product.css'
import ProductRow from '../productRow';
import { useGlobalContext } from '../../context';

const Product = () => {
    const {product} = useGlobalContext();
    const [filter,setFilter] = useState('name');
    const [query,setQuery] = useState('');
    const [filteredProducts,setFilteredProducts] = useState([]);
    useEffect(()=>{
        if(query===''){
            setFilteredProducts(product);
        }
        let newProducts = product.filter(p =>{
            return(p[filter].toString().toLowerCase().indexOf(query.toLowerCase())>=0)
        })
        setFilteredProducts(newProducts);
    },[query,product])

    if(!product.length){
        return null;
    }
    return (
        <div className="read__products action__read">
            <nav className="locations__nav control__nav">
                <Link to="/create" className="btn">create</Link>
                <input autoComplete="off" type="text" value={query} onChange={(e)=>setQuery(e.target.value)} name="search" placeholder="search"/>
                <select value={filter} onChange={(e)=>{setFilter(e.target.value)}}>
                    <option value="name">name</option>
                    <option value="stock">stock</option>
                    <option value="category">category</option>
                    <option value="featured">featured</option>
                    <option value="description">description</option>
                    <option value="productId">product id</option>
                </select>
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
                            <th className="read__table__edit"></th>
                            <th className="read__table__delete"></th>
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
