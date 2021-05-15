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
  //just manipulating this can expose a lot of data which is easy
  //what i can do is seperate all routes in admin and then lock them
  //keeping routes open for frontend is not good
  //try commenting the below condition and see
  if(!isLoggedIn){
    return  <Login/>;
  }

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
