import React, { useEffect, useState } from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './components/Home/Home';
import AuthMain from './components/Login/AuthMain';

function App(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token'))
      setIsLoggedIn(true);

  }, [])

  return (
    <>
      {isLoggedIn ?
        <Redirect from='/login' to='/' /> :
        <Redirect to='/login' />
      }
      <Switch>
        <Route path='/login' component={AuthMain} />
        <Route path='/' component={Home} />
      </Switch>
    </>
  );
}

export default App;
