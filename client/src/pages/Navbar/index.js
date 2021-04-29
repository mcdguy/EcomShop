import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../../context';
import './navbar.css';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
const Navbar = () => {
    const {setFilterName,setLogout,setCart,isLoggedIn,setShowLoginModal} = useGlobalContext();
    const [openMenu,setOpenMenu] = useState(false);
    const handleLogout = () =>{
        //here i would like to send req to backend to logout
        //and after the success of the request
        axios('/user/logout')
            .then(res =>{
                // console.log(res.data);
                setLogout();   
                setCart([]);
            })
            .catch(err => console.log(err));
        
    }
    return (
        <nav className="nav">
            <div className="nav__center center">
                <a href="/" className="nav__logo"><img src={Logo} alt=""/></a>
                
                <ul onClick={()=>setOpenMenu(false)} className={`${openMenu?'nav__links open':'nav__links'}`}>
                    <li>
                        <Link to="/shop" onClick={()=>setFilterName('none')} >shop</Link>
                    </li>
                    <li>
                        <Link to="/findastore">find a store</Link>
                    </li>
                    <li className="gallery__link">
                        <Link to="/gallery">gallery</Link>
                    </li>
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    {/* <li>
                        <Link to="/howtobrew">brew guide</Link>
                    </li> */}
                    <li>
                        <Link to="/cart">cart</Link>
                    </li>
                    {isLoggedIn?
                        <>
                            <li>
                                <Link to = '/account'>account</Link>
                            </li>
                            <li>
                                <a onClick={handleLogout}>log out</a>
                            </li>
                        </>
                    :
                        <li>
                            <a onClick={setShowLoginModal}>Login</a>
                        </li>
                    }
                </ul>
            <div onClick={()=>setOpenMenu(!openMenu)} className={`${openMenu?'nav__hamburger open': 'nav__hamburger'}`}>
                <span className="nav__ham__bar"></span>
            </div>
            </div>

        </nav>
    )
}

export default Navbar
