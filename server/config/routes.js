const axios = require('axios');
const bcrypt = require('bcryptjs');
const Users = require('../users/userModel.js');
const jwt = require('jsonwebtoken');

const { authenticate, jwtKey } = require('../auth/authenticate');

module.exports = (server) => {
	server.post('/api/register', register);
	server.post('/api/login', login);
	server.get('/api/jokes', authenticate, getJokes);
	server.get('/api/users', getUsers);
};

function generateToken(user) {
	return jwt.sign(
		{
			userId: user.id
		},
		jwtKey,
		{
			expiresIn: '1h'
		}
	);
}

async function getUsers(req, res) {
	Users.find()
		.then((users) => {
			res.status(200).json(users);
		})
		.catch((err) => {
			res.status(404).json({ message: err });
		});
}

function register(req, res) {
	// implement user registration
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
	user.password = hash;

	Users.add(user)
		.then((saveUser) => {
			const token = generateToken(saveUser);
			res.status(200).json({ message: `Welcome ${user.username}`, token });
		})
		.catch((error) => {
			res.status(500).json(error);
		});
}

function login(req, res) {
	// implement user login
	let { username, password } = req.body;

	Users.findBy({ username }).first().then((user) => {
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = generateToken(user);
			res.status(200).json({
				message: `Welcome back ${user.username}`,
				token
			});
		} else {
			res.status(401).json({ message: 'Invalid Info' });
		}
	});
}

function getJokes(req, res) {
	const requestOptions = {
		headers: { accept: 'application/json' }
	};

	axios
		.get('https://icanhazdadjoke.com/search', requestOptions)
		.then((response) => {
			res.status(200).json(response.data.results);
		})
		.catch((err) => {
			res.status(500).json({ message: 'Error Fetching Jokes', error: err });
		});
}
