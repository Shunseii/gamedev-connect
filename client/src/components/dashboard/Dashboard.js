import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import LoadingSpinner from '../layout/LoadingSpinner/LoadingSpinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({ 
	deleteAccount, 
	getCurrentProfile, 
	auth, 
	profile: { loading, profile } 
}) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	if (loading && profile === null) {
		return <LoadingSpinner />;
	}

	return (
		<div className='w-2/5'>
			<div className='flex flex-row items-center justify-between'>
				<h1 className='text-4xl font-semibold text-teal-600'>
					My Dashboard
				</h1>
				<button 
					onClick={e => {
						e.preventDefault();
						deleteAccount();
					}} 
					className='text-white font-bold px-2 py-1 rounded bg-red-700
								transition-colors duration-200 ease-in-out hover:bg-red-800'
				>
					Delete account
				</button>
			</div>
			<p className='text-lg'>Welcome { auth.user && auth.user.name }</p>

			{profile === null ? 
				<div className='flex flex-col mt-6'>
					<p>You do not have a profile. Would you like to create one?</p>
					<Link 
						to='/create-profile'
						className='bg-blue-500 text-white font-semibold rounded
									px-4 py-2 mt-4 self-start
									transition duration-200 ease-in-out hover:bg-blue-400'
					>
						Create Profile
					</Link>
				</div> : 
				<Fragment>
					<DashboardActions />
					<Education education={profile.education} />
					<Experience experience={profile.experience} />
				</Fragment>
			}
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile, deleteAccount }
)(Dashboard);
