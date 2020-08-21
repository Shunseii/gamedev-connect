import React from 'react' 
import { Link } from 'react-router-dom'

import '../../tailwind.output.css';

const Navbar = () => {
	return (
		<nav className='fixed w-full flex justify-between 
						px-8 py-5 top-0 left-0
						border-solid border-b-2 border-gray-200
						shadow-inner bg-gray-100'
		>
			<h1>
				<Link className='text-xl font-semibold' to='/'>Gamedev Connect</Link>
			</h1>
			<ul className='inline-flex w-1/4 justify-around'>
				<li className='hover:text-gray-700'><Link to="/">Devs</Link></li>
				<li className='hover:text-gray-700'><Link to="/register">Register</Link></li>
				<li className='hover:text-gray-700'><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
};

export default Navbar;
