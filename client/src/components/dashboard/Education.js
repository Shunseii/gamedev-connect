import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { BsTrash2Fill } from 'react-icons/bs';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ deleteEducation, education }) => {
	const onClick = (e, id) => {
		e.preventDefault();

		if (window.confirm('Delete education?')) {
			deleteEducation(id);
		}
	};

	return (
		<div className='flex flex-col bg-gray-100 px-6 py-4 rounded shadow-md'>
			<h2 className='text-2xl self-center font-semibold'>Education</h2>

			{education.sort((ed1, ed2) => {
				if (ed1.from < ed2.from) 
					return 1;

				if (ed1.from > ed2.from) 
					return -1;

				return 0;
			}).map(ed => (
				<Fragment key={ed._id}>
					<div className='flex flex-col my-4'>
						<div className='flex flex-row justify-between'>
							<span className='flex flex-row items-baseline'>
								<h3 className='text-xl font-medium'>{ed.school}</h3>
								<BsTrash2Fill 
									onClick={e => onClick(e, ed._id)} 
									className='text-sm ml-2 cursor-pointer' 
								/>
							</span>
							<span className='self-center'>
								<Moment format='MMM YYYY'>{ed.from}</Moment> 
								-
								{!ed.current && ed.to ? 
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
	education: PropTypes.array.isRequired,
	deleteEducation: PropTypes.func.isRequired
};

export default connect(
	null,
	{ deleteEducation }
)(Education);
