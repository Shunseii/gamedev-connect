import React, { useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';

const Register = (props) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const { name, email, password, password2 } = formData;

	const onChange = e => setFormData(
		{ ...formData, [e.target.name]: e.target.value }
	);
	
	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			props.setAlert('Passwords do not match.', 'failure');
		} else {
			const newUser = {
				name,
				email,
				password
			};

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};

				const body = JSON.stringify(newUser);
				const res = await axios.post('/api/users', body, config);

				console.log(res.data);
			} catch (err) {
				console.error(err.response.data);
			}
		}
	};

	return (
		<div className='flex flex-col
						shadow-md rounded
						px-8 pt-2 pb-8 mb-4'
		>
			<h4 className='text-sm'>New users</h4>
			<h2 className='pb-4 text-4xl text-bold'>Register</h2>

			<form onSubmit={e => onSubmit(e)}>
				<div className='mb-4'>
					<label 
						className='block text-gray-700 text-sm font-bold mb-2' 
						htmlFor='name'
					>
						Name:
					</label>
					<input 
						className='w-full py-2 px-3
									shadow border rounded
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='Name' 
						name='name'
						id='name'
						value={name} 
						onChange={e => onChange(e)}
						required 
					/>
				</div>
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
				<div className='mb-4'>
					<label 
						className='block text-gray-700 text-sm font-bold mb-2' 
						htmlFor='password'
					>
						Password:
					</label>
					<input 
						className='w-full py-2 px-3
									shadow border rounded
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='password' 
						placeholder='*******' 
						name='password' 
						id='password'
						minLength='6'
						value={password}
						onChange={e => onChange(e)}
						required
					/>
				</div>
				<div className='mb-6'>
					<label 
						className='block text-gray-700 text-sm font-bold mb-2' 
						htmlFor='password2'
					>
						Re-enter your password:
					</label>
					<input 
						className='w-full py-2 px-3
									shadow border rounded
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='password' 
						placeholder='********' 
						name='password2'
						id='password2'
						minLength='6'
						value={password2}
						onChange={e => onChange(e)}
						required 
					/>
				</div>
				<div className='flex items-center'>
					<input 
						className='bg-blue-500 text-white font-bold rounded 
									px-4 py-2
									transition duration-200 ease-in-out hover:bg-blue-400
									rounded focus:outline-none focus:shadow-outline'
						type='submit'
						value='Register'
					/>
				</div>
			</form>
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func
};

export default connect(null, { setAlert })(Register);
