import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import './product.css'
import ProductRow from '../productRow';
import { useGlobalContext } from '../../context';

const Product = () => {
    const {product} = useGlobalContext();

    if(!product.length){
        return null;
    }
    return (
        <div className="read__products action__read">
            <nav className="locations__nav control__nav">
                <Link to="/create" className="btn">create</Link>
            </nav>
            {product.length?
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
                        {product.map(p=>{
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
