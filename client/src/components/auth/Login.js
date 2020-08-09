import React, { useState } from 'react'
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
		<div className='flex flex-col 
						shadow-md rounded 
						px-8 pt-2 pb-8 mb-4'
		>
			<h4 className='text-sm'>Existing users</h4>
			<h2 className='pb-4 text-4xl text-bold'>
				Login 
			</h2>

			<form onSubmit={e => onSubmit(e)}>
				<div className='mb-4'>
					<label 
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='email'
					>
						Email Address:
					</label>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='email' 
						placeholder='Email Address' 
						name='email'
						id='email'
						value={email}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='mb-6'>
					<label 
						className='block text-gray-700 text-sm font-bold mb-2'
						htmlFor='password'
					>
						Password:
					</label>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='password' 
						placeholder='********' 
						name='password'
						id='password'
						value={password}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='flex items-center'>
					<button 
						className='bg-blue-500 text-white font-bold rounded 
									px-4 py-2
									transition duration-200 ease-in-out hover:bg-blue-400
									rounded focus:outline-none focus:shadow-outline'
						type='button'
					>
						Login
					</button>
				</div>
			</form>
		</div>
	);
};

export default Login;
