import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';

import Login from './components/Login.js';
import Register from './components/Register';
import Jokes from './components/Jokes';
import api from './helpers/api';

import './App.css';

class App extends React.Component {
	state = {
		users: {
			username: '',
			password: ''
		}
	};

	async componentDidMount() {
		try {
			const result = await api.get('/users');

			this.setState({
				users: result.data
			});
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div className="App">
				<nav>
					<h1>Dad Jokes</h1>
					<Link to="/Login">Login</Link>
					<Link to="/Register">Register</Link>
					<Link to="/Jokes">Jokes</Link>
				</nav>
				<Route path="/Login" component={Login} />
				<Route path="/Register" component={Register} />
				<Route path="/Jokes" component={Jokes} />
			</div>
		);
	}
}

export default withRouter(App);
