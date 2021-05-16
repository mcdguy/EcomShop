import React,{useEffect,useState,useRef} from 'react';
import './home.css';
import {Link} from 'react-router-dom';
import { useGlobalContext } from '../../context';
import Product from '../../components/product';
// import {FaFacebook,FaEnvelope,FaInstagram,FaTwitterSquare} from "react-icons/fa";
// import {SiGmail} from "react-icons/si";
import {stores} from '../../data.js';
import Facebook from '../../assets/images/facebook.png';
import Instagram from '../../assets/images/instagram.png';
import Gmail from '../../assets/images/gmail.png';
import {GrPrevious,GrNext} from "react-icons/gr";
import Footer from '../../components/footer';
const Home = () => {
    const [currentImage,setCurrentImage] = useState(0);
    const {featuredProducts,setFilterName} = useGlobalContext();
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
                            <Link className="btn-locate btn" to="/findastore">find a store</Link>
                        </div>
                    </div>
                </div>
                {featuredProducts.length?<div className="slider__hidden">
                    <div className="center">
                        <div className="slider__head__wrapper">
                            <h1 className="slider__head">featured products</h1>
                            {/* <h1></h1> */}
                            <Link onClick={()=>setFilterName('featured')} className="btn-shopall" to="/shop">see all</Link>
                        </div>
                            <div>
                                {/* <h1 className="slider__">featured products</h1> */}
                                <div className="slider__wrapper">
                                    <span onClick={()=>{productsRef.current.scrollLeft -=250}} className="prev button__effect"><GrPrevious/></span>
                                        <div ref={productsRef} className="slider__products ">
                                            {featuredProducts.length ? featuredProducts.map(product =>{
                                                return <Product key={product._id} {...product}></Product>
                                            }):null}
                                        </div>
                                    <span onClick={()=>{productsRef.current.scrollLeft +=250}} className="next button__effect"><GrNext/></span>
                                </div>
                            </div>
                        {/* <div className="btn-wrapper">
                                <Link className="btn-shopall btn" to="/shop">shop all</Link>
                        </div> */}
                    </div>
                </div>:null}
            </section>
            
            <section className="home__stores">
                <div className="stores__center center">
                    
                    <div className="stores__text">
                        <div className="text__middle">
                            <h1>about us</h1>
                            <p>Sardar-Ji-Bakhsh, founded in 2015 as SardarBuksh Coffee & Coffee, is an Indian specialty coffee brand that aims to cater to every Indian coffee drinker’s taste.</p>
                            {/* <p>Since renaming the brand and becoming recognised as a specialty café for great coffee, SJB has continued to expand their experience, from their signature coffee to bottled cold brews, and of course expanding to locations around the country.</p> */}
                            <div className="about-btn-wrapper">
                                <Link className="btn__general" to="/about">know more</Link>
                            </div>
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
                <div className="home__logo__socials">
                    <h1>
                        Follow us
                    </h1>
                    <a href="_blank" href="https://www.facebook.com/sardarjibakhshcoffee/" target="_blank"> <img src={Facebook} alt=""/></a>
                    <a href="" target="_blank"> <img src={Gmail} alt=""/></a>
                    <a href="https://www.instagram.com/sardarjibakhshcoffee/?hl=en" target="_blank">  <img src={Instagram} alt=""/></a>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Home
