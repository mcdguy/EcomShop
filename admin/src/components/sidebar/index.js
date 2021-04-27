import React from 'react';
import { useGlobalContext } from '../../context';
import './sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const {currentTab,setCurrentTab} = useGlobalContext();
    return (
        <div className="sidebar">
        <Link to="/" className={`${currentTab==='product'?'active':'null'}`} onClick={()=>setCurrentTab('product')}>product</Link>
        <Link to="/" className={`${currentTab==='order'?'active':'null'}`} onClick={()=>setCurrentTab('order')}>order</Link>
        <Link to="/" className={`${currentTab==='user'?'active':'null'}`} onClick={()=>setCurrentTab('user')}>user</Link>
        <Link to="/" className={`${currentTab==='location'?'active':'null'}`} onClick={()=>setCurrentTab('location')}>location</Link>
        <Link to="/" className={`${currentTab==='coupon'?'active':'null'}`} onClick={()=>setCurrentTab('coupon')}>coupon</Link>
        <Link to="/" className={`${currentTab==='gallery'?'active':'null'}`} onClick={()=>setCurrentTab('gallery')}>gallery</Link>
      </div>
    )
}

export default Sidebar
