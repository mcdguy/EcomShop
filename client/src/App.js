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

          <Route path="/contact" exact>
            <Contact/>
          </Route>

          <Route path="/howtobrew" exact>
            <Brew/>
          </Route>

          <Route path="/shop/:id" children={<SingleProduct/>} exact></Route>

          <Route path="/cart">
            <Cart/>
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
