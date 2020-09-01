import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div className='flex flex-col my-auto'>
			<h1 className='flex self-center text-4xl font-bold'>Gamedev Connect</h1>
			<p>Connect with other developers and designers who share a common passion!</p>
			<div className='flex justify-around items-center mt-3'>
				<Link 
					className='bg-blue-500 text-white font-bold rounded 
								px-4 py-2
								transition duration-200 ease-in-out hover:bg-blue-400' 
					to="/register"
				>
					Register
				</Link>
				<Link 
					className='bg-blue-500 text-white font-bold rounded 
								px-4 py-2
								transition duration-200 ease-in-out hover:bg-blue-400' 
					to="/login"
				>
					Login
				</Link>
			</div>
		</div>
	);
};

Landing.propTypes = {
	isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
});

export default connect(
	mapStateToProps
)(Landing);
