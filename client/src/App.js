import React from 'react';
import { Link, Route } from 'react-router-dom';

import Login from './components/Login.js';
import Register from './components/Register';

import './App.css';

function App() {
	return (
		<div className="App">
			<nav>
				<h1>Dad Jokes</h1>
				<Link to="/Login">Login</Link>
				<Link to="/Register">Register</Link>
			</nav>
			<Route path="/Login" component={Login} />
			<Route path="/Register" component={Register} />
		</div>
	);
}

export default App;
