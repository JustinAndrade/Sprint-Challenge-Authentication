import React, { Component } from 'react';
import api from '../helpers/api';

class Register extends Component {
	state = {
		username: '',
		password: ''
	};

	changeHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	submitHandler = async (e) => {
		e.preventDefault();
		console.log(this.state);

		try {
			const { username, password } = this.state;

			const result = await api.post('/register', {
				username,
				password
			});

			localStorage.setItem('token', result.data.token);
		} catch (err) {
			console.log(err);
		}
	};

	render() {
		return (
			<div>
				<h3>Register</h3>
				<form onSubmit={this.submitHandler}>
					<input
						type="text"
						placeholder="Username"
						name="username"
						value={this.state.username}
						onChange={this.changeHandler}
					/>
					<input
						type="password"
						placeholder="Password"
						name="password"
						value={this.state.password}
						onChange={this.changeHandler}
					/>
					<button type="submit">Sign Up</button>
				</form>
			</div>
		);
	}
}

export default Register;
