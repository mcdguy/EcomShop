import React from 'react';
import { useGlobalContext } from '../../context';
import './sidebar.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const {currentTab,setCurrentTab,setIsLoggedIn,setType,setAdmin,type} = useGlobalContext();
    const setLogout = () =>{
      axios.post('/admin/logout')
        .then(res=>{
          if(res.data.success){
            setIsLoggedIn(false);
            setType('read admin');
            setAdmin([]);
          }
        })
        .catch(err =>{
          console.log(err);
        })    
    }
    return (
        <div className="sidebar">
        <Link to="/" className={`${currentTab==='product'?'active':'null'}`} onClick={()=>setCurrentTab('product')}>product</Link>
        <Link to="/" className={`${currentTab==='order'?'active':'null'}`} onClick={()=>setCurrentTab('order')}>order</Link>
        <Link to="/" className={`${currentTab==='user'?'active':'null'}`} onClick={()=>setCurrentTab('user')}>user</Link>
        <Link to="/" className={`${currentTab==='location'?'active':'null'}`} onClick={()=>setCurrentTab('location')}>location</Link>
        <Link to="/" className={`${currentTab==='coupon'?'active':'null'}`} onClick={()=>setCurrentTab('coupon')}>coupon</Link>
        <Link to="/" className={`${currentTab==='gallery'?'active':'null'}`} onClick={()=>setCurrentTab('gallery')}>gallery</Link>
        {type==='admin'?<Link to="/" className={`${currentTab==='admin'?'active':'null'}`} onClick={()=>setCurrentTab('admin')}>admin</Link>:null}
        {/* <Link to="/" className={`${currentTab==='admin'?'active':'null'}`} onClick={()=>setCurrentTab('admin')}>admin</Link> */}
        <button to="/" className={`${currentTab==='admin'?'active':'null'}`} onClick={setLogout}>LOGOUT</button>
      </div>
    )
}

export default Sidebar
