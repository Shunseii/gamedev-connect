import React from 'react' 
import { Link } from 'react-router-dom'

import '../../tailwind.output.css';

const Navbar = () => {
	return (
		<nav 
			className='flex justify-between 
						px-8 py-8
						bg-blue-200'
		>
			<h1 className='flex'>
				<Link to='/'>Gamedev Connect</Link>
			</h1>
			<ul className='inline-flex'>
				<li className='mr-2'><Link to="/">Devs</Link></li>
				<li className='mr-2'><Link to="/register">Register</Link></li>
				<li className=''><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
};

export default Navbar;
