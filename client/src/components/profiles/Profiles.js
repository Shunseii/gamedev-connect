import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoadingSpinner from '../layout/LoadingSpinner/LoadingSpinner';
import { getAllProfiles } from '../../actions/profile';

const Profiles = ({ getAllProfiles, profile: { profiles, loading } }) => {
	useEffect(() => {
		getAllProfiles();
	}, []);

	if (loading) {
		return <LoadingSpinner />
	}

	return (
		<div>
			{profiles.map(profile => (
				<div className='flex flex-col' key={profile._id}>
					<img 
						className='rounded-full'
						src={profile.user.avatar} 
					/>
				</div>
			))}
		</div>
	);
};

Profiles.propTypes = {
	getAllProfiles: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile
});

export default connect(
	mapStateToProps,
	{ getAllProfiles }
)(Profiles);
