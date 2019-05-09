import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import './App.css';

import NavBar from './components/layout/NavBar';
import Dashboard from './components/dashboard/Dashboard';
import ProjectDetails from './components/projects/ProjectDetails';
import CreateProject from './components/projects/CreateProject';
import SignIn from './components/auth/SignIn';
import SignOn from './components/auth/SignOn';

import {createStore} from 'redux';
import rootReducer from './store/reducers/rootReducer'
import {Provider} from 'react-redux';

const store = createStore(rootReducer);

function App() {
  return (
  	<Provider store={store}>
	    <Router>
	      <NavBar/>
	      <Switch>
	        <Route exact path="/" component={Dashboard} />
	        <Route exact path="/project/:id" component={ProjectDetails} />
	        <Route exact path="/create" component={CreateProject} />
	        <Route exact path="/signIn" component={SignIn} />
	        <Route exact path="/signOn" component={SignOn} />
	      </Switch>
	    </Router>  
	</Provider>    
  );
}

export default App;
