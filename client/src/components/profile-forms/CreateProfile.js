import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
	FaYoutube, 
	FaTwitter, 
	FaLinkedin, 
	FaInstagram, 
	FaFacebook,
	FaPlus,
	FaMinus
} from 'react-icons/fa';

const CreateProfile = () => {
	const [formData, setFormData] = useState({ 
		company: '',
		website: '',
		status: '',
		location: '',
		skills: '',
		githubUser: '',
		bio: '',
		twitter: '',
		facebook: '',
		linkedin: '',
		youtube: '',
		instagram: ''
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

	const {
		company,
		website,
		status,
		location,
		skills,
		githubUser,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram
	} = formData;

	return (
		<div className='flex flex-col 
						shadow-md rounded 
						px-8 pt-2 pb-8 my-auto'
		>
			<h2 className='pb-1 text-4xl text-bold'>
				Create a Profile
			</h2>
			<hr className='mb-4 border-gray-400' />
			<form>
				<div className='mb-4'>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='Company Name' 
						name='company'
						id='company'
						value={company}
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						Current company
					</p>
				</div>
				<div className='mb-4'>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='Website URL' 
						name='website'
						id='website'
						value={website}
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						Personal or company website
					</p>
				</div>
				<div className='mb-4'>
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
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						City and Province (ex. Toronto, ON)
					</p>
				</div>
				<div className='mb-4'>
					<select 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						name='status'
						id='status'
						value={status}
						required
					>
						<option value='0' disabled className='text-gray-600'>--Select your Profession--</option>
						<option value='Developer'>Developer</option>
						<option value='Audio Engineer'>Audio Engineer</option>
						<option value='Graphics Designer'>Graphics Designer</option>
						<option value='Student or Learning'>Student or Learning</option>
						<option value='Other'>Other</option>
					</select>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						*Specify your job/role
					</p>
				</div>
				<div className='mb-4'>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='*Skills' 
						name='skills'
						id='skills'
						value={skills}
						required
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						*Enter your skills (ex. HTML, CSS, Javascript)
					</p>
				</div>
				<div className='mb-4'>
					<input 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='Github Username' 
						name='githubUser'
						id='githubUser'
						value={githubUser}
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						Your Github username 
					</p>
				</div>
				<div className='mb-4'>
					<textarea 
						className='w-full py-2 px-3
									shadow border rounded 
									appearance-none 
									text-gray-700
									focus:outline-none focus:shadow-outline'
						type='text' 
						placeholder='Describe yourself' 
						name='bio'
						id='bio'
						value={bio}
					/>
					<p
						className='block text-gray-700 text-sm mt-2'
					>
						Write a short description of yourself
					</p>
				</div>
				<div className='flex flex-row items-baseline justify-between'>
					<h1 className='text-xl text-semibold text-gray-600'>Social Media</h1>
					<button 
						onClick={(e) => {
							e.preventDefault();
							return toggleSocialInputs(!displaySocialInputs);
						}}
						className='focus:outline-none'
					>
						{!displaySocialInputs ? 
							<FaPlus 
								className='text-white text-sm bg-teal-400 rounded p-px
											transition duration-200 ease-in-out hover:bg-teal-300 rounded'
							/>
							:
							<FaMinus
								className='text-white text-sm bg-red-400 rounded p-px
											transition duration-200 ease-in-out hover:bg-red-300 rounded'
							/>
						}
					</button>
				</div>
				{displaySocialInputs &&
					<Fragment>
						<div className='flex flex-col mt-4'>
							<div className='flex flex-row items-center'>
								<FaYoutube className='text-3xl mr-3' />
								<input 
									className='w-full py-1 px-2
												shadow border rounded 
												appearance-none 
												text-gray-700
												focus:outline-none focus:shadow-outline'
									type='text' 
									placeholder='Youtube URL' 
									name='youtube'
									id='youtube'
									value={youtube}
								/>
							</div>
							<div className='flex flex-row mt-3 items-center'>
								<FaTwitter className='text-3xl mr-3' />
								<input 
									className='w-full py-1 px-2
												shadow border rounded 
												appearance-none 
												text-gray-700
												focus:outline-none focus:shadow-outline'
									type='text' 
									placeholder='Twitter URL' 
									name='twitter'
									id='twitter'
									value={twitter}
								/>
							</div>
							<div className='flex flex-row mt-3 items-center'>
								<FaFacebook className='text-3xl mr-3' />
								<input 
									className='w-full py-1 px-2
												shadow border rounded 
												appearance-none 
												text-gray-700
												focus:outline-none focus:shadow-outline'
									type='text' 
									placeholder='Facebook URL' 
									name='facebook'
									id='facebook'
									value={facebook}
								/>
							</div>
							<div className='flex flex-row mt-3 items-center'>
								<FaInstagram className='text-3xl mr-3' />
								<input 
									className='w-full py-1 px-2
												shadow border rounded 
												appearance-none 
												text-gray-700
												focus:outline-none focus:shadow-outline'
									type='text' 
									placeholder='Instagram URL' 
									name='instagram'
									id='instagram'
									value={instagram}
								/>
							</div>
							<div className='flex flex-row mt-3 items-center'>
								<FaLinkedin className='text-3xl mr-3' />
								<input 
									className='w-full py-1 px-2
												shadow border rounded 
												appearance-none 
												text-gray-700
												focus:outline-none focus:shadow-outline'
									type='text' 
									placeholder='LinkedIn URL' 
									name='linkedin'
									id='linkedin'
									value={linkedin}
								/>
							</div>
						</div>
					</Fragment>
				}
				<hr className='my-4 border-gray-400' />
				<div className='flex items-center'>
					<input 
						className='bg-blue-500 text-white font-bold rounded 
									px-4 py-2
									transition duration-200 ease-in-out hover:bg-blue-400
									rounded focus:outline-none focus:shadow-outline'
						type='submit'
						value='Submit'
					/>
				</div>
			</form>
		</div>
	);
};

CreateProfile.propTypes = {
	
};

export default CreateProfile;
