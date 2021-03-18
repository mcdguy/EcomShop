import React,{useEffect,useState,useRef} from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../../context';
import Product from '../../components/product';
import {FaFacebookSquare,FaInstagramSquare,FaTwitterSquare} from "react-icons/fa";
import {stores} from '../../data.js';
import {GrPrevious,GrNext} from "react-icons/gr";

const Home = () => {
    const [currentImage,setCurrentImage] = useState(0);
    const {featuredProducts} = useGlobalContext();
    const sliderRef = useRef(null);
    const productsRef = useRef(null)
    useEffect(()=>{
        const sliderObserver = new IntersectionObserver((entries,sliderObserver)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){
                    sliderRef.current.classList.add('visible');
                }else{
                    if(sliderRef.current){//it was becoming null when i changed page and causing error
                        sliderRef.current.classList.remove('visible');
                    }
                }
            })
        },{threshold: 0.5})
        sliderObserver.observe(sliderRef.current);
    },[]);

    useEffect(()=>{
        // if(currentImage < 0){
        //     setCurrentImage(stores.length - 1);
        // }
        if(currentImage > stores.length-1){
            setCurrentImage(0);
        }
    },[currentImage]);
    useEffect(()=>{
        let x = setInterval(()=>{setCurrentImage(currentImage+1)},5000);
        return()=>{
            clearInterval(x);
        }
    }); 
    return (
        <div className="home">
            <section className="home__hero">
                <div className="hero__img"></div>
            </section>

            <section className="home__slider slider">
                <div className="slider__cup">
                    <div className="cup__wrapper">
                        <div ref={sliderRef} className="cup__img "></div>
                        <div className="btn-wrapper">
                            <Link className="btn-locate btn" to="/findalocation">find a location</Link>
                        </div>
                    </div>
                </div>
                <div className="slider__hidden">
                    <div className="center">
                        {/* <h1 className="slider__head">featured products</h1> */}
                            <div>
                                <div className="slider__wrapper">
                                    <span onClick={()=>{productsRef.current.scrollLeft -=250}} className="prev"><GrPrevious/></span>
                                        <div ref={productsRef} className="slider__products ">
                                            {featuredProducts.length ? featuredProducts.map(product =>{
                                                return <Product key={product._id} {...product}></Product>
                                            }):null}
                                        </div>
                                    <span onClick={()=>{productsRef.current.scrollLeft +=250}} className="next"><GrNext/></span>
                                </div>
                            </div>
                        <div className="btn-wrapper">
                                <Link className="btn-shopall btn" to="/shop">shop all</Link>
                            </div>
                    </div>
                </div>
            </section>
            
            <section className="home__stores">
                <div className="stores__center center">
                    
                    <div className="stores__text">
                        <div className="text__middle">
                            <h1>our stores</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum est alias, iure quam numquam qui sit in? Ducimus praesentium nemo esse saepe, sapiente doloribus maiores harum veniam laboriosam, quos dolore a at tempora doloremque vel. Aspernatur, hic magnam. Aliquid, eligendi.</p>
                        </div>
                    </div>
                    
                    <div className="stores__images">
                            
                            {/* <div className="stores__slider"> */}
                                <div className="stores__slider__wrapper">
                                  {stores.length > 0? stores.map((store,index)=>{
                                      let slideClass = 'next-slide'; 
                                      if(index === currentImage){
                                          slideClass = 'active-slide';
                                      }
                                      if(index === currentImage-1 || ((currentImage === 0) && (index === stores.length-1))){//the second condition means if the index is 0 and we are currently on last slide in the array we are going to make it the lastSlide
                                          slideClass = 'last-slide';
                                      }
                                      return (
                                        <div key={index} className={`store__slider__img ${slideClass}`}>
                                            <img src={store} alt=""/>
                                        </div>
                                      )
                                  }):null}
                                </div>
                            {/* </div> */}

                    </div>
                </div>
            </section>
            <section className="home__logo__display">
                <div className="logo__img"></div>
            </section>
            
            <footer className="home__footer">
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
                            <a target="_blank" href="https://www.instagram.com/sardarjibakhshcoffee/?hl=en"><FaInstagramSquare/> <span>instagram</span> </a>
                            <a target="_blank" href="https://www.facebook.com/sardarjibakhshcoffee/"><FaFacebookSquare/> <span>facebook</span> </a>
                        </div>
                    </div>

                </div>
            </footer>
            {/* <footer className="home__footer">
                <div className="footer__content center">
                    <div className="legal">
                        <div className="legal__pages">
                            <Link to="/termsandconditions">terms and conditions</Link>
                            <Link to="/privacypolicy">privacy policy</Link>
                            <Link to="/cookie policy">cookie policy</Link>
                        </div>
                    </div>
                    <div className="social">
                        <div className="social__links">
                        <Link to="/findalocation">find a location</Link>
                            <span>follow us on</span>
                            <div className="social__links__bar">
                                <a target="_blank" href="https://www.instagram.com/sardarjibakhshcoffee/?hl=en"><FaInstagramSquare/></a>
                                <a target="_blank" href="https://www.facebook.com/sardarjibakhshcoffee/"><FaFacebookSquare/></a>
                                
                            </div>
                        </div>
                    </div>
                    <div className="contact">
                        <div className="contact__details">
                            <span>contact us</span>
                            <span className="contact__email">sardarjibuksh@gmail.com</span>
                            <span className="contact__no">+911 111111111</span>
                        </div>
                        <span>all rights reserved <sup>&#xa9;</sup></span>
                    </div>
                </div>
            </footer> */}



            {/* <footer className="home__footer">

                <div className="footer__legal">
                    <Link to="/termsandconditions">terms and conditions</Link>
                    <Link to="/privacypolicy">privacy policy</Link>
                    <Link to="/cookie policy">cookie policy</Link>
                </div>
            </footer> */}
            {/* <section className="home__intro">
                <span>beans</span>
            </section>

            <section className="home__slider">
                <article ref={sliderRef} className="home__slider__text">
                    <p>that will drive you</p>
                    <p>nuts</p>
                    <Link className="btn-shop btn" to="/shop">shop now</Link>
                </article>
                <div className="home__slider__hidden">
                   <div className="home__slider__img"></div>
                </div>
            </section>

            <section className="home__about">
                <div className="home__about__center center">
                    <div className="home__about__info">
                        <div>
                            <h1> best arabica coffee</h1>
                            <p>
                                Serving you the best arabica coffee since 2016
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed sapiente quos ex accusamus fuga, ducimus, eos laboriosam reiciendis sequi aperiam non id ut inventore autem, adipisci sit similique. Incidunt amet neque libero quisquam velit mollitia fugiat quaerat ad, obcaecati itaque!  
                            </p>
                        </div>
                    </div>
                    <div className="home__about__imgwrapper">
                        <div className="home__about__img"></div>
                    </div>
                </div>
            </section>
            <footer className="home__footer">
                <div className="home__footer__center center">
                    <div className="contact">
                        <h1>contact us</h1>
                        <p className="contact__gmail">
                            baksh@gmail.com
                        </p>
                        <p className="contact__no">+91 82948982234</p>
                        <div className="legal">
                            <div>
                                <Link to="/howtobrew">cookie policy</Link>
                                <Link to="/howtobrew">privacy policy</Link>
                            </div>
                            <Link to="/howtobrew">terms and conditions</Link>
                        </div>

                    </div>
                </div>
            </footer> */}

        </div>
    )
}

export default Home
