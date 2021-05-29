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
import Login from './pages/Login';
import Loader from './components/loader';
import Forgot from './pages/Forgot';
import { Redirect } from 'react-router';

import { useGlobalContext } from './context';

function App() {
  const {isLoggedIn,showMainLoader} = useGlobalContext();
  if(showMainLoader){
    return(
      <div className="main__loader">
        <Loader/>
      </div>
    );
  }

  // if(!isLoggedIn){
  //   return  <Login/>;
  // }

  return (
    <Router>

      {isLoggedIn?<Sidebar></Sidebar>:null}
      <Switch>
        {/* <Route path="/" exact>
          <Home/>
        </Route>

        <Route path="/create">
          <Create/>
        </Route>
        
        <Route path="/edit/:id" children={<Edit/>} exact></Route>
        
        <Route path="/view/:id" children={<View/>} exact></Route>

        <Route path="/reset-password/:id/:token" children={<Forgot/>} exact></Route>
        
        <Route path="*">
            <Error/>
        </Route> */}

        <Route path="/" exact>
          {!isLoggedIn?<Redirect to='/login'/>:<Home/>}
        </Route>

        <Route path="/create">
         {!isLoggedIn?<Redirect to='/login'/>:<Create/>}
        </Route>
        
        <Route path="/edit/:id" children={<Edit/>} exact></Route>
        
        <Route path="/view/:id" children={<View/>} exact></Route>

        <Route path="/login" exact>
          <Login/>
        </Route>

        <Route path="/reset-password/:id/:token" children={<Forgot/>} exact></Route>
       
        <Route path="*">
            {!isLoggedIn?<Redirect to='/login'/>:<Error/>}
        </Route>

      </Switch>
    </Router>
  );
}

export default App;
