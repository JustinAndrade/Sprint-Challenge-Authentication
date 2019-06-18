import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import api from '../helpers/api';

class Jokes extends Component {
	state = {
		jokes: []
	};
	async componentDidMount() {
		try {
			const result = await api.get('/jokes');
			this.setState({
				jokes: result.data
			});
			// console.log(this.state.jokes);
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		return (
			<div>
				<h3>List of Jokes</h3>
				<ul>
					{this.state.jokes.map((joke, id) => {
						return <li key={joke.id}>{joke.joke}</li>;
					})}
				</ul>
			</div>
		);
	}
}

export default withRouter(Jokes);
