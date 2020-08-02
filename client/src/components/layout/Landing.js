import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
	return (
		<section className="landing">
			<div>
				<div>
					<h1>Gamedev Connect</h1>
					<p>Connect with other developers and designers who share a common passion!</p>
					<div>
						<Link to="/register">Sign up</Link>
						<Link to="/login">Login</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Landing;
