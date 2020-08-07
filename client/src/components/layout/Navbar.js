import React from 'react' 
import { Link } from 'react-router-dom'

import '../../tailwind.output.css';

const Navbar = () => {
	return (
		<nav className='flex justify-between 
						px-8 py-5
						border-solid border-b-2 border-gray-200
						shadow-inner bg-gray-100'
		>
			<h1 className=''>
				<Link className='text-xl font-bold' to='/'>Gamedev Connect</Link>
			</h1>
			<ul className='inline-flex w-1/4 justify-around'>
				<li className=''><Link to="/">Devs</Link></li>
				<li className=''><Link to="/register">Register</Link></li>
				<li className=''><Link to="/login">Login</Link></li>
			</ul>
		</nav>
	);
};

export default Navbar;
