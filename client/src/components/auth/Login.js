import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
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
		login({ email, password });
	};

	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='flex flex-col 
						shadow-md rounded 
						px-8 pt-2 pb-8 my-auto'
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
					<input 
						className='bg-blue-500 text-white font-bold rounded 
									px-4 py-2
									transition duration-200 ease-in-out hover:bg-blue-400
									rounded focus:outline-none focus:shadow-outline'
						type='submit'
						value='Login'
					/>
				</div>
			</form>
		</div>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps,
	{ login }
)(Login);
