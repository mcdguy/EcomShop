import React from 'react';
import './about.css';
import AboutHero from '../../assets/images/aboutHero.jpg';
import RowImage1 from '../../assets/images/8F4A7703.jpg';
import RowImage2 from '../../assets/images/8F4A7728.jpg';
import RowImage3 from '../../assets/images/Cappuchino.jpg';
import Employee1 from '../../assets/images/8F4A7754.jpg';
import Employee2 from '../../assets/images/8F4A7750.jpg';
import Footer from '../../components/footer';
const About = () => {
    return (
        <div className="about">
            <div className="about__hero">
                <div className="about__hero__cont center">
                    <div className="about__hero__img__wrapper img-design">
                        <img src={AboutHero}/>
                    </div>
                </div>
            </div>
            <div className="center">
                <div className="about__employee">
                    <div className="about__employee__container">
                        <div className="employee employee1">
                            <img src={Employee1} alt=""/>
                            <h1>sanmeet</h1>
                            <h3>singh kalra</h3>
                            <p> Since renaming the brand and becoming recognised as a specialty café for great coffee, SJB has continued to expand their experience, from their signature coffee to bottled cold brews, and of course expanding to locations around the country.</p>
                        </div>
                        <div className="employee employee2">
                            <img src={Employee2} alt=""/>
                            <h1>rohit</h1>
                            <h3>kamboj</h3>
                            <p> Since renaming the brand and becoming recognised as a specialty café for great coffee, SJB has continued to expand their experience, from their signature coffee to bottled cold brews, and of course expanding to locations around the country.</p>
                        </div>
                    </div>
                </div>

                <div className="about__row">
                    <div className="about__row__container">
                        <div className="about__img__row">
                            <div>
                                <img src={RowImage1} alt=""/>
                            </div>
                            <div>
                                <img src={RowImage2} alt=""/>
                            </div>
                            <div>
                                <img src={RowImage3} alt=""/>
                            </div>
                        </div>
                        <div className="about__row__content">
                        <p> Sardar-Ji-Bakhsh, founded in 2015 as SardarBuksh Coffee & Coffee, is an Indian specialty coffee brand that aims to cater to every Indian coffee drinker’s taste.</p>
                        </div>
                    </div>
                </div>

                <div className="about__flex">
                    <div className="about__flex__text">
                        <p>Sardar-Ji-Bakhsh, founded in 2015 as SardarBuksh Coffee & Coffee, is an Indian specialty cofee brand that aims to cater to every Indian coffee drinker’s taste.</p>
                        <p>Since renaming the brand and becoming recognised as a specialty café for great coffee, SJB has continued to expand their experience, from their signature coffee to bottled cold brews, and of course expanding to locations around the country</p>
                    </div>
                    <div className="about__flex__img">
                        <div className="img-design">
                            <img src={AboutHero}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default About
