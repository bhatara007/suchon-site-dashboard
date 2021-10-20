import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import  Monitor  from './pages/monitor'
import  Dashboard from './pages/dashboard'

function App() {
  
  return (
    <Switch> {/* The Switch decides which component to show based on the current URL.*/}
      <Route exact path='/monitor' component={Monitor}></Route>
      <Route exact path='/dashboard' component={Dashboard}></Route>
    </Switch>
  );
}

export default App;


  