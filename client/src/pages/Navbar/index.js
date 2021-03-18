import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [openMenu,setOpenMenu] = useState(false);
    return (
        <nav className="nav">
            <div className="nav__center center">
                <a href="/" className="nav__logo">baksh</a>
                
                <ul onClick={()=>setOpenMenu(false)} className={`${openMenu?'nav__links open':'nav__links'}`}>
                    <li>
                        <Link to="/shop">shop</Link>
                    </li>
                    {/* <li>
                        <Link to="/contact">contact</Link>
                    </li> */}
                    <li>
                        <Link to="/cart">find a location</Link>
                    </li>
                    <li>
                        <Link to="/howtobrew">how to brew</Link>
                    </li>
                    <li>
                        <Link to="/cart">cart</Link>
                    </li>
                </ul>
            <div onClick={()=>setOpenMenu(!openMenu)} className={`${openMenu?'nav__hamburger open': 'nav__hamburger'}`}>
                <span className="nav__ham__bar"></span>
            </div>
            </div>

        </nav>
    )
}

export default Navbar
