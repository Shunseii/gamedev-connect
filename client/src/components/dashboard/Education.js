import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';

const Education = ({ education }) => {
	return (
		<div className='flex flex-col bg-gray-100 px-6 py-4 rounded shadow-md'>
			<h2 className='text-2xl self-center font-semibold'>Education</h2>

			{education.map(ed => (
				<Fragment key={ed._id}>
					<div className='flex flex-col my-4'>
						<div className='flex flex-row justify-between'>
							<h3 className='text-xl font-medium'>{ed.school}</h3>
							<span className='self-center'>
								<Moment format='MMM YYYY'>{ed.from}</Moment> 
								-
								{ed.current ? 
									<Moment format='MMM YYYY'>{ed.to}</Moment> 
									: 
									<span>Current</span>
								}
							</span>
						</div>
						<h4 className=''>{ed.fieldOfStudy} | {ed.degree}</h4>
						<p className='my-2 text-sm font-light'>{ed.location}</p>
						<p className='text-sm'>{ed.description}</p>
					</div>
					<hr />
				</Fragment>
			))}
		</div>
	);
};

Education.propTypes = {
	education: PropTypes.array.isRequired
};

export default connect()(Education);
