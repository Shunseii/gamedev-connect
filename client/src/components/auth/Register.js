import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register }) => {
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
			setAlert('Passwords do not match.', 'failure');
		} else {
			register({name, email, password});
		}
	};

	return (
		<div className='flex flex-col
						shadow-md rounded
						px-8 pt-2 pb-8 my-auto'
		>
			<h4 className='text-sm'>New users</h4>
			<h2 className='pb-4 text-4xl text-bold'>Register</h2>

			<form onSubmit={e => onSubmit(e)}>
				<div className='flex flex-row mb-4'>
					<div className='mr-5'>
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
						/>
					</div>
					<div>
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
						/>
					</div>
				</div>
				<div className='flex flex-row mb-4'>
					<div className='mr-5'>
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
							value={password}
							onChange={e => onChange(e)}
						/>
					</div>
					<div>
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
							value={password2}
							onChange={e => onChange(e)}
						/>
					</div>
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
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};

export default connect(
	null, 
	{ setAlert, register }
)(Register);
