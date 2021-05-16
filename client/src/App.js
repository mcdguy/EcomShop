import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import Brew from './pages/Brew';
import SingleProduct from './pages/SingleProduct';
import Cart from './pages/Cart';
import Login from './components/login';
import Error from './pages/Error';
import ScrollToTop from './components/scrollToTop';
import Account from './pages/Account';
import Checkout from './pages/Checkout';
import Location from './pages/Location';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Forgot from './pages/Forgot';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar></Navbar>
      <Login></Login>
      <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>

          <Route path="/shop" exact>
            <Shop/>
          </Route>

          <Route path="/about" exact>
            <About/>
          </Route>

          <Route path="/contact" exact>
            <Contact/>
          </Route>

          <Route path="/video-gallery" exact>
            <Gallery/>
          </Route>
          
          <Route path="/howtobrew" exact>
            <Brew/>
          </Route>

          <Route path="/reset-password/:id/:token" children={<Forgot/>} exact></Route>
          
          <Route path="/shop/:id" children={<SingleProduct/>} exact></Route>

          <Route path="/cart" exact>
            <Cart/>
          </Route>

          <Route path="/account" exact>
            <Account/>
          </Route>

          <Route path="/checkout" exact>
            <Checkout/>
          </Route>

          <Route path="/findastore" exact>
            <Location/>
          </Route>
          {/* <Route path="/signin">
            <Login/>
          </Route> */}

          <Route path="*">
            <Error/>
          </Route>
      </Switch>
    </Router>
  )
}

export default App;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // useEffect(()=>{
  //   axios.get('/blog')
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // });
