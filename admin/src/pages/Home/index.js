import React from 'react';
import { useGlobalContext } from '../../context';
import './home.css';
import Product from '../../components/product';
import Location from '../../components/location';
import Order from '../../components/order';
import User from '../../components/user';
import Coupon from '../../components/coupon';

const Home = () => {
    const {currentTab} = useGlobalContext();
    
    if(currentTab === 'product'){
        return(
            <div className="home page">
                <Product/>
            </div>
        )
    }
    if(currentTab === 'order'){
        return (
            <div className="home page">
                <Order/>
            </div>
        )
    }
    if(currentTab === 'user'){
        return (
            <div className="home page">
                <User/>
            </div>
        )
    }
    if(currentTab === 'location'){
        return (
            <div className="home page">
                <Location/>
            </div>
        )
    }
    if(currentTab === 'coupon'){
        return(
            <div className="home page">
                <Coupon/>
            </div>
        )
    }
}

export default Home