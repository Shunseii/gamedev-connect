import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { BsTrash2Fill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { deleteExperience } from '../../actions/profile';

const Experience = ({ deleteExperience, experience }) => {
	const onClick = (e, id) => {
		e.preventDefault();

		if (window.confirm('Delete experience?')) {
			deleteExperience(id);
		}
	};

	return (
		<div className='flex flex-col bg-gray-100 px-6 py-4 rounded shadow-md'>
			<h2 className='text-2xl self-center font-semibold'>Experience</h2>

			{experience.map(exp => (
				<Fragment key={exp._id}>
					<div className='flex flex-col my-4'>
						<div className='flex flex-row justify-between'>
							<span className='flex flex-row items-baseline'>
								<h3 className='text-xl font-medium'>{exp.title} at {exp.company}</h3>
								<BsTrash2Fill 
									onClick={e => onClick(e, exp._id)} 
									className='text-sm ml-2 cursor-pointer' 
								/>
							</span>
							<span className='self-center'>
								<Moment format='MMM YYYY'>{exp.from}</Moment> 
								-
								{exp.current ? 
									<Moment format='MMM YYYY'>{exp.to}</Moment> 
									: 
									<span>Current</span>
								}
							</span>
						</div>
						<p className='my-2 text-sm font-light'>{exp.location}</p>
						<p className='text-sm'>{exp.description}</p>
					</div>
					<hr />
				</Fragment>
			))}
		</div>
	);
};

Experience.propTypes = {
	experience: PropTypes.array.isRequired,
	deleteExperience: PropTypes.func.isRequired
};

export default connect(
	null, 
	{ deleteExperience }
)(Experience);
