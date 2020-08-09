import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
	return (
		<section className='flex justify-center items-center self-center h-screen'>
			<div className='flex flex-col items-center'>
				<h1>Gamedev Connect</h1>
				<p>Connect with other developers and designers who share a common passion!</p>
				<div className='flex justify-around self-stretch'>
					<Link to="/register">Sign up</Link>
					<Link to="/login">Login</Link>
				</div>
			</div>
		</section>
	);
};

export default Landing;
