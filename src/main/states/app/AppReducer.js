const reducer = (state, props) => {
	const { type, payload } = props || {};
	switch (type) {
		case 'SET_STATE_DATA':
			return {
				...state,
				...payload,
			}

		case 'CLEAR_STATE':
			return {}

		case "LOADING":
			return {
				...state,
				loading: true
			}
		case "LOADED":
			return {
				...state,
				loading: false,
				message: payload
			}

		case 'LOAD_FAILED':
			return {
				...state,
				loading: false,
				message: payload,
			}
		default:
			return state;

	}
}
export default reducer;
