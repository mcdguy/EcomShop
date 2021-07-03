import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Footer from '../../components/footer';
import {FaAsterisk} from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
    const [alert,setAlert] = useState({show:false,msg:'could not save email',type:''})
    const [subEmail,setSubEmail]= useState('');
    const [subName,setSubName] = useState('');

    const saveEmail = () =>{
        setAlert(alert => {return({...alert,show:false ,msg:''})});
        axios.post('/subscribe',{email:subEmail,name:subName})
            .then(res =>{
                if(res.data.success){
                    setAlert(alert => {return({...alert,show:true ,msg:'subscription successful',type: 'success'})});

                }
                if(res.data.error){
                    setAlert(alert => {return({...alert,show:true ,msg:res.data.error,type: 'error'})});
                }
            })
            .catch(err =>{
                console.log('an error occurred');
            })
    }
    return (
        <div className="home">
            <section className="home-sec home__hero">
                <div className="home__banner">
                    <div className="home__banner__img"></div>
                </div>
            </section>

            <section className="home-sec home__stores">
                <div className="home-sec-flex">
                    <div className="home-sec-flex-text">
                        <div>
                            <p>
                                Back in 2015,naivety & love for Indian coffee made these two guys start a coffee culture that includes everyone. 
                            </p>
                            <div>
                                <Link className="home__btn find__store__btn" to='/findastore'>find stores</Link>
                            </div>
                        </div>
                    </div>
                    <div className="home-sec-flex-img">

                    </div>
                </div>
            </section>

            <section className="home-sec home__menu">
                <div className="home-sec-flex">
                    <div className="home-sec-flex-img">
                        <div className="img__height__control"></div>
                        <div className="img1 home__menu__img">
                            <div className="home__menu__cro__img menu--im"></div>
                        </div>
                        <div className="img2 home__menu__img">
                            <div className="home__menu__cof__img menu--im"></div>
                        </div>
                    </div>
                    <div className="home-sec-flex-text">
                        <div>
                            <p>
                                Sip on to our cold brew and lattes, order in beans & learn how to brew or best come to ours Cafes, we love coffee and coffee drinkers alike. 
                            </p>
                            <div className="link__wrapper">
                                <Link className="home__btn" to='/menu'>see menus</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className="home-sec home-sub home__sub__1">
                <div className="home-sec-flex">
                    <div className="home-sec-flex-img"></div>
                    <div className="home-sec-flex-text">
                        <div>
                            <p>Save big as you go hassle-free, coffee delivered to your doorstep, on REG!</p>
                            <div className="division">
                                <FaAsterisk/>
                                <FaAsterisk/>
                                <FaAsterisk/>
                                <FaAsterisk/>
                                <FaAsterisk/>
                            </div>
                            <button className="coming__soon">coming soon</button>
                            {/* <h1>cold brew</h1>
                            <div></div>
                            <h1>subscription</h1> */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="home-sec home-sub home__sub__2">
                <div className="home-sec-flex">
                    <div className="home-sec-flex-text">
                        <div>
                            <p>Hot! Brews err... coffee news right into your inboxes, sign up for our newsletters</p>
                                <div>
                                    <input type="text" value={subName} onChange={e=>{setSubName(e.target.value)}} placeholder="name"/>
                                </div>
                                <div>
                                    <input type="text"value={subEmail} onChange={(e)=>{setSubEmail(e.target.value)}} placeholder="email"/>
                                </div>
                                <button onClick={saveEmail} className="home__btn home__sub__btn">subscribe</button>
                                {alert.show?<div className={`${alert.type==='success'?'sub__error success':'sub__error'}`}>{ alert.msg}</div>:null} 
                        </div>
                    </div>
                    <div className="home-sec-flex-img"></div>
                </div>
            </section>

            <section className="home__inf__txt">
                <div>use code <span className="code">sjb30</span> on your order to get 30% off</div>
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;use offer code <span className="code">sjb30</span> on your order to get 30% off&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> */}
                {/* <div>use offer code <span className="code">sjb30</span> on your order to get 30% off&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;use offer code <span className="code">sjb30</span> on your order to get 30% off&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div> */}
            </section>
            <Footer/>
        </div>
    )
}

export default Home
