import React from 'react';
import { useGlobalContext } from '../../context';
import './home.css';
import Product from '../../components/product';
import Location from '../../components/location';
import Order from '../../components/order';
import User from '../../components/user';
import Coupon from '../../components/coupon';
import Video from '../../components/video';
import Admin from '../../components/admin';
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
    if(currentTab === 'gallery'){
        return(
            <div className="home page">
                <Video/>
            </div>
        )
    }
    if(currentTab === 'admin'){
        return(
            <div className="home page">
                <Admin/>
            </div>
        )
    }
    return null;
}

export default Home
