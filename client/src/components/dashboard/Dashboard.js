import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

import LoadingSpinner from '../layout/LoadingSpinner/LoadingSpinner';

const Dashboard = ({ getCurrentProfile, auth, profile: { loading, profile } }) => {
	useEffect(() => {
		getCurrentProfile();
	}, []);

	if (loading && profile === null) {
		return <LoadingSpinner />;
	}

	return (
		<div>	
			<h1 className='text-4xl font-semibold text-teal-600'>
				Dashboard
			</h1>
			<p className='text-lg'>Welcome { auth.user && auth.user.name }</p>

			{ !profile ? 
			<Fragment>No</Fragment> : 
			<Fragment>Has</Fragment>
			}
		</div>
	);
};

Dashboard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getCurrentProfile }
)(Dashboard);
