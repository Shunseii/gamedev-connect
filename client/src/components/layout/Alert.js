import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {	
	
	if (alerts === null || alerts.length <= 0) {
		return false;
	}

	return (
		<div className='flex flex-col w-full'>
			{ alerts.map(alert => {
				const success = alert.type === 'success';

				return (
				<div 
					key={ alert.id }
					className={`flex justify-center 
								mx-8 py-2 my-2 
								${success ? 'bg-green-500' : 'bg-red-500'} 
								text-white text-lg text-bold 
								rounded shadow-md`}
				>
					{ alert.msg }
				</div>);
				})
			}
		</div>
	);
};

Alert.propTypes = {
	alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
	alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
