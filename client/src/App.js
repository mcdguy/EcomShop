import React,{Suspense , lazy} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './pages/Navbar';
import Home from './pages/Home';
import Loader from './components/loader';
import Login from './components/login';
import Error from './pages/Error';
import ScrollToTop from './components/scrollToTop';
import Shop from './pages/Shop';
const Gallery = lazy(()=>import('./pages/Gallery'));
const Cart = lazy(()=> import('./pages/Cart'));
const About = lazy(()=> import('./pages/About'));
const Location = lazy(()=> import('./pages/Location'));
const Checkout = lazy(()=> import('./pages/Checkout'));
const SingleProduct = lazy(()=> import('./pages/SingleProduct'));
const Account = lazy(()=> import('./pages/Account'));
const Forgot = lazy(()=> import('./pages/Forgot'));
// const Shop = lazy(()=> import('./pages/Shop'));
// import SingleProduct from './pages/SingleProduct';
// import Account from './pages/Account';
// import Forgot from './pages/Forgot';
// import Cart from './pages/Cart';
// import About from './pages/About';
// import Location from './pages/Location';
// import Checkout from './pages/Checkout';
// import Gallery from './pages/Gallery';

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar></Navbar>
      <Login></Login>
            <Suspense fallback={<Loader/>}>
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

                <Route path="/video-gallery" exact>
                  <Gallery/>
                </Route>
                
                <Route path="/cart" exact>
                  <Cart/>
                </Route>

                <Route path="/checkout" exact>
                  <Checkout/>
                </Route>

                <Route path="/findastore" exact>
                  <Location/>
                </Route>

                <Route path="/shop/:id" children={<SingleProduct/>} exact></Route>
                
                <Route path="/reset-password/:id/:token" children={<Forgot/>} exact></Route>
                
                <Route path="/account" exact>
                  <Account/>
                </Route>
              <Route path="*">
                <Error/>
              </Route>
          </Switch>
            </Suspense>

    </Router>
  )
}

export default App;
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  // useEffect(()=>{
  //   axios.get('/blog')
  //     .then(res => console.log(res.data))
  //     .catch(err => console.log(err));
  // });
