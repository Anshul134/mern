import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import './App.css';

import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>  
  );
}

export default App;
