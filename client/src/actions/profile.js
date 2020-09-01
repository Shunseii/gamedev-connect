import axios from 'axios';
import { setAlert } from './alert';

import { 
	GET_PROFILE,
	PROFILE_ERROR 
}
from './types';

// Get current user's profile
export const getCurrentProfile = () => async dispatch => {
	try {
		const res = await axios.get('/api/profile/me');

		dispatch({
			type: GET_PROFILE,
			payload: res.data
		});
	} catch (err) {
		console.log(err.response);
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.data.msg, status: err.response.status }
		});

		dispatch(setAlert(err.response.data.msg, 'failure'));
	}
};