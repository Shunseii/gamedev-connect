import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
	const [formData, setFormData] = useState({
		company: '',
		title: '',
		location: '',
		from: '',
		to: '',
		current: false,
		description: ''
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { 
		company, 
		title, 
		location, 
		from, 
		to, 
		current, 
		description 
	} = formData;

	const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault()
		addExperience(formData, history);
	};

	return (
		<div className='flex flex-col 
						shadow-md rounded 
						px-8 pt-2 pb-8 my-auto'
		>
			<h2 className='pb-1 text-4xl text-bold'>
				Add an Experience
			</h2>
			<hr className='mb-4 border-gray-400' />
			<p className='text-sm text-gray-500 mb-4'>* is a required field</p>

			<form onSubmit={e => onSubmit(e)}>
				<div className='mb-4'>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='*Job Title' 
						name='title'
						id='title'
						value={title}
						onChange={e => onChange(e)}
						required
					/>
					<p
						className='block text-gray-700 font-semibold text-sm mt-2'
					>
						*Enter your job title
					</p>
				</div>
				<div className='flex flex-row mb-4'>
					<div className='mr-8'>
						<input 
							className='w-full py-2 px-3
										shadow border rounded 
										appearance-none 
										text-gray-700
										focus:outline-none focus:shadow-outline'
							type='text' 
							placeholder='*Company' 
							name='company'
							id='company'
							required
							value={company}
							onChange={e => onChange(e)}
						/>
						<p
							className='block text-gray-700 text-sm font-semibold mt-2'
						>
							*Company name
						</p>
					</div>
					<div>
						<input 
							className='w-full py-2 px-3
										shadow border rounded 
										appearance-none 
										text-gray-700
										focus:outline-none focus:shadow-outline'
							type='text' 
							placeholder='Location' 
							name='location'
							id='location'
							value={location}
							onChange={e => onChange(e)}
						/>
						<p
							className='block text-gray-700 text-sm mt-2'
						>
							Company location
						</p>
					</div>
				</div>
				<div className='flex flex-row mb-4'>
					<div className='mr-8'>
						<input 
							className='w-full py-2 px-4
										shadow border rounded 
										appearance-none 
										text-gray-700
										focus:outline-none focus:shadow-outline'
							type='date' 
							name='from'
							id='from'
							required
							value={from}
							onChange={e => onChange(e)}
						/>
						<p
							className='block text-gray-700 text-sm font-semibold mt-2'
						>
							*From Date
						</p>
					</div>
					<div className='flex flex-col' disabled>
						<input 
							className='w-full py-2 px-5
										shadow border rounded 
										appearance-none
										text-gray-700
										focus:outline-none focus:shadow-outline'
							type='date'
							name='to'
							id='to'
							value={to}
							disabled={toDateDisabled}
							onChange={e => onChange(e)}
						/>
						<p
							className='block text-gray-700 text-sm mt-2'
						>
							To Date
						</p>
						<label>
							<input
								className='mr-2'
								type='checkbox'
								name='current'
								id='current'
								value={current}
								onChange={e => {
									setFormData({ ...formData, current: !current });
									toggleDisabled(!toDateDisabled);
								}}
							/>
							Currently working here
						</label>
					</div>
				</div>
				<div className='mb-4'>
					<textarea 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='Job description' 
						name='description'
						id='description'
						value={description}
						onChange={e => onChange(e)}
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						Describe your job
					</p>
				</div>
				<div className='flex items-center'>
					<input 
						className='bg-blue-500 text-white font-bold rounded 
									px-4 py-2
									transition duration-200 ease-in-out hover:bg-blue-400
									rounded cursor-pointer focus:outline-none focus:shadow-outline'
						type='submit'
						value='Submit'
					/>
				</div>
			</form>
		</div>
	);
};

AddExperience.propTypes = {
	addExperience: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
};

export default connect(
	null, 
	{ addExperience }
)(withRouter(AddExperience));
