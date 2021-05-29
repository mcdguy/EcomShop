import React from 'react';
import { Link } from 'react-router-dom';
import {FaFacebookSquare,FaInstagramSquare,FaTwitterSquare} from "react-icons/fa";
import './footer.css';
const Footer = () => {
    return (
        <footer className="footer">
                <div className="footer__center center">
                    
                    <div className="footer__legal footer-col">
                        <span className="legal__head head">legal</span>
                        <div className="legal__links">
                            <Link to="/termsandconditions">terms and conditions</Link>
                            <div>
                                <Link to="/privacypolicy">privacy policy</Link>
                                <Link to="/cookiepolicy">cookie policy</Link>
                            </div>
                                <span>all right reserved &#169;</span>
                        </div>
                    </div>
                    
                    <div className="footer__contact footer-col">
                        <span className="contact__head head">contact</span>
                        <div className="contact__info">
                                    <span className="contact__detail__info"> H 8, Opposite NDPL Office, Vijay Nagar, New Delhi</span>
                                    <span className="contact__detail__info">Ph: +911 11111111</span>
                                    <span className="contact__detail__info contact__email">sardarjibaksh@gmail.com</span>
                        </div>
                    </div>

                    <div className="footer__social footer-col">
                        <span className="social__head head">follow us on</span>
                        <div className="social__info">
                            <a target="_blank" rel="noreferrer" href="https://www.instagram.com/sardarjibakhshcoffee/?hl=en"><FaInstagramSquare/> <span>instagram</span> </a>
                            <a target="_blank" rel="noreferrer" href="https://www.facebook.com/sardarjibakhshcoffee/"><FaFacebookSquare/> <span>facebook</span> </a>
                        </div>
                    </div>

                </div>
            </footer>
    )
}

export default Footer
