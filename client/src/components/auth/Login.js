import React, { Fragment, useState } from 'react'
import axios from 'axios';

const Login = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = e => setFormData(
		{ ...formData, [e.target.name]: e.target.value }
	);
	
	const onSubmit = async e => {
		e.preventDefault();
		console.log('Logging in...');

		const userToLogin = {
			email,
			password
		};

		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const body = JSON.stringify(userToLogin);
			const res = await axios.post('api/auth', body, config);

			console.log(res.data);
		} catch (err) {
			console.error(err.response.data);
		}
	};

	return (
		<Fragment>
			<h1>Login</h1>
			<p>Login to an existing account</p>

			<form onSubmit={e => onSubmit(e)}>
				<input 
					type='email' 
					placeholder='Email Address' 
					name='email'
					value={email}
					onChange={e => onChange(e)}
					required
				/>
				<input 
					type='password' 
					placeholder='Password' 
					name='password'
					value={password}
					onChange={e => onChange(e)}
					required
				/>
				<input type='submit' value='Login' />
			</form>
		</Fragment>
	);
};

export default Login;
