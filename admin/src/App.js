import './App.css';
import { Link } from 'react-router-dom';
import react,{useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Sidebar from './components/sidebar';
import Home from './pages/Home';
import Error from './pages/Error';
import Edit from './pages/Edit';
import View from './pages/View';
import Create from './pages/Create';
// import CreateCoupon from './pages/createCoupon';
// import CreateLocation from './pages/createLocation';
// import CreateProduct from '../src/components/createProduct';
function App() {
  const [currentTab,setCurrentTab] = useState('product');
  return (
    <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>

        <Route path="/create">
          <Create/>
        </Route>
        

        {/* <Route path="/product/create" exact>
          <CreateProduct/>
        </Route> */}
        
        {/* 
        <Route path="/create/coupon" exact>
          <CreateCoupon/>
        </Route>
        <Route path="/create/location" exact>
          <CreateLocation/>
        </Route> */}

        <Route path="/edit/:id" children={<Edit/>} exact></Route>
        <Route path="/view/:id" children={<View/>} exact></Route>

        <Route path="*">
            <Error/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
