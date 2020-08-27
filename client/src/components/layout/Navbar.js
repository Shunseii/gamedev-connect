import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { HiCode } from 'react-icons/hi';
import { logout } from '../../actions/auth';

import '../../tailwind.output.css';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
	return (
		<nav className='fixed w-full flex justify-between 
						px-8 py-5 top-0 left-0
						border-solid border-b-2 border-gray-200
						shadow-inner bg-teal-600 text-white'
		>
			<h1>
				<Link className='text-xl flex items-center' to='/'>
					<HiCode className='inline mr-2 text-3xl' />
					<span className='font-bold'>Gamedev Connect</span>
				</Link>
			</h1>
			<ul className='inline-flex w-1/4 justify-around'>
				<li className='hover:text-gray-300 font-semibold'><Link to="/">People</Link></li>
				{ isAuthenticated ? 		
				<Fragment>
					<li className='hover:text-gray-300 font-semibold'><Link to='/dashboard'>Profile</Link></li>
					<li className='hover:text-gray-300 font-semibold'><Link to='/login' onClick={logout}> Logout</Link></li>
				</Fragment> :
				<Fragment>
					<li className='hover:text-gray-300 font-semibold'><Link to="/register">Register</Link></li>
					<li className='hover:text-gray-300 font-semibold'><Link to="/login">Login</Link></li>
				</Fragment>
				}
				</ul>
			</nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ logout }
)(Navbar);
