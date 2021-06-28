import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {BsBag} from 'react-icons/bs';
import { VscAccount } from "react-icons/vsc";
import { useGlobalContext } from '../../context';
import './navbar.css';
import axios from 'axios';
import Logo from '../../assets/images/logo.png';
const Navbar = () => {
    const {setFilterName,setLogout,setCart,isLoggedIn,setShowLoginModal} = useGlobalContext();
    const [openMenu,setOpenMenu] = useState(false);
    
    //logging out user
    const handleLogout = () =>{
        axios('/user/logout')
            .then(res =>{
                setLogout();
                //emptying cart   
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
                        <Link to="/shop" onClick={()=>setFilterName('cold brew')} >cold brew</Link>
                    </li>
                    <li className="nav__brew">
                        <Link to="/shop" onClick={()=>setFilterName('coffee')} >BREWYourOwn!</Link>
                    </li>
                    <li>
                        <Link to="/findastore">stores</Link>
                    </li>
                    {/* <li className="gallery__link">
                        <Link to="/video-gallery">gallery</Link>
                    </li> */}
                    <li>
                        <Link to="/about">about</Link>
                    </li>
                    <li className="nav__ico">
                        <Link to="/cart">
                            <BsBag/>
                            <span>cart</span>
                        </Link>
                    </li>
                    {isLoggedIn?
                        <>
                            <li className="nav__ico">
                                <Link to = '/account'>
                                    <VscAccount/>
                                    <span>account</span>
                                </Link>
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
