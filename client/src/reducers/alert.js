import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

/* State will be populated with alert objects
 * alert: {
 *	id: 0,
 *	msg: 'Please log in',
 *	type: 'success'
 * }
 */ 

export default (state = initialState, action) => {
	const { type, payload } = action;

	switch (type) {
		case SET_ALERT:
			return [...state, payload];
		case REMOVE_ALERT:
			return state.filter(alert => alert.id !== payload);
		default: 
			return state;
	}
};
