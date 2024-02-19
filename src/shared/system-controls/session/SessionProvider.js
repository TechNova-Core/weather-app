import axios from 'axios';
import { createContext, memo, useCallback, useEffect, useReducer } from "react";
import SessionReducer from './SessionReducer';
// import moment from 'moment-jalaali';

export const SessionContext = createContext();
const SessionProvider = memo(({ sessionName, children }) => {
	const [session, dispatch] = useReducer(SessionReducer, undefined);
	const { token } = session || {};

	//------------------------------------
	// const _axios = useCallback(() => {
	// 	axios.defaults.headers.common['Authorization'] = session.token;
	// 	axios.interceptors.response.use((response) => {
	// 		console.log(response);
	// 		// Do something with response data
	// 		return response;
	// 	}, function (error) {
	// 		console.log(error);
	// 		// Do something with response error
	// 		return Promise.reject(error);
	// 	});
	// 	return axios;
	// }, [session]);

	//------------------------------------
	const setItem = useCallback((key, value) => localStorage.setItem(key, JSON.stringify(value || {})), []);

	//------------------------------------
	const getItem = useCallback((key) => JSON.parse(localStorage.getItem(key)), []);

	//------------------------------------
	const clearSession = useCallback(() => {
		localStorage.removeItem(sessionName + '_dat');
		localStorage.removeItem(sessionName + '_tkn');
		dispatch({ type: 'CLEAR_SESSION' });
	}, [sessionName]);

	//------------------------------------
	const setSessionData = useCallback((sessionData) => {
		setItem(sessionName + '_dat', sessionData);
		dispatch({ type: 'SET_SESSION_DATA', payload: sessionData });
	}, [setItem, sessionName]);

	//------------------------------------
	const openSession = useCallback(({ token, sessionData, deviceID }) => {
		if (!token) {
			throw new Error("Server is wrong!");
		}

		let jwt = token.split(".");
		let payload = jwt[1] && JSON.parse(atob(jwt[1]));
		token = { jwt: token, systemID: payload?.sys, userID: payload?.usr };

		setItem(sessionName + '_tkn', token);
		setItem(sessionName + '_dat', sessionData);

		const curDeviceID = getItem(sessionName + '_devid');
		// console.log(curDeviceID, !curDeviceID, deviceID);
		(!curDeviceID || ['undefined', 'null'].includes(curDeviceID)) && deviceID && setItem(sessionName + '_devid', deviceID);

		dispatch({ type: 'SET_SESSION', payload: { sessionData: sessionData || {}, token: token } });
	}, [setItem, getItem, sessionName]);

	//------------------------------------
	const hasAccess = useCallback((requestedAccess, bpAccessList) => {
		if (!token) {
			return false;
		}

		let jwt = token.jwt?.split(".");
		let payload = jwt[1] && JSON.parse(atob(jwt[1]));

		// if (new Date(payload.exp).getTime() <= new moment(window.serverTime).utcOffset(window.utcOffset || 0).valueOf()) {
		// 	//throw 'TOKEN_EXPIRED'
		// }
		let accessList = (payload?.sub && payload?.sub[requestedAccess?.service.toLowerCase()]) || [];
		let hasAccess = (requestedAccess.index < accessList.length) && (accessList[requestedAccess.index] & requestedAccess.value);

		if (!hasAccess && bpAccessList && requestedAccess.index < bpAccessList.length) {
			hasAccess = bpAccessList[requestedAccess.index] & requestedAccess.value;
		}
		return hasAccess ? true : false;
	}, [token]);

	//------------------------------------
	const asyncServiceCall = useCallback(async (service, p, file, formData, config, cmdToken, signal) => {
		if (!p) {
			p = {};
		}
		let _token = cmdToken ? { jwt: cmdToken } : token;
		if (_token?.jwt) {
			axios.defaults.headers.common["Authorization"] = 'Bearer ' + _token?.jwt;
		}
		else {
			delete axios.defaults.headers.common['Authorization'];
		}
		let deviceID = getItem(sessionName + '_devid');
		if (deviceID && !['undefined', 'null'].includes(deviceID)) {
			axios.defaults.headers.common['devid'] = deviceID;
		}
		else {
			delete axios.defaults.headers.common['devid'];
		}
		// console.log(deviceID, ['undefined', 'null'].includes(deviceID), deviceID === null, axios.defaults.headers.common['devid']);
		if (!service.name) {
			console.log('ServiceAPI missing service name', service);
		}
		let res;
		// console.log(axios.defaults.headers.common["Authorization"]);
		try {
			switch (service.type) {
				default:
				case 'HEAD':
					res = await axios.head(service.url);
					break;

				case 'GET':
					res = await axios.get(service.url, { params: p, signal: signal });
					break;

				case 'POST':
					if (formData) {
						// formData.append('JWT', token.jwt);
						res = await axios.post(service.url, formData, config);
						break;
					}
					res = await axios.post(service.url, p);
					break;

				case 'PATCH':
					res = await axios.patch(service.url, p);
					break;

				case 'DELETE':
					res = await axios.delete(service.url, { params: p });
					break;

				case 'PUT':
					res = await axios.put(service.url, p);
					break;

				// case 'PUT':
				// 	if (file) {
				// 		res = await request.put(service.url).attach(file.title, file.data, file.name);
				// 	}
				// 	else {
				// 		res = getBlob === true ? await request.put(service.url).send({ params: p }).responseType('blob') : await axios.put(service.url, { params: p });
				// 	}
				// 	break;
			}
			if (res.data.err && res.data.err === 'ACCESS') {
				throw new Error('ACCESS');
			}
			if (['TOKEN_EXPIRED', 'JWT_MISSING', 'INVALID TOKEN'].includes(res.data.err)) {
				clearSession();
			}
			if (res.data.err) {
				console.error(service, res.data.err);
				throw res.data.err;
			}
		}
		catch (err) {
			let message = err.response?.data?.message || (err + "");
			if (message === 'ACCESS') {
				throw new Error('ACCESS');
			}
			if (message === 'INVALID TOKEN') {
				clearSession();
			}
			if (['TOKEN_EXPIRED', 'JWT_MISSING', 'INVALID TOKEN'].includes(message)) {
				clearSession();
			}
			throw err.response ? err : message;
		}
		let message = res?.err || res?.data?.err;
		if (message) {
			if (['TOKEN_EXPIRED', 'JWT_MISSING', 'INVALID TOKEN'].includes(message)) {
				clearSession();
			}
			throw message;
		}

		window.serverTime = res?.headers?.date;
		window.utcOffset = 210;
		window.systemTime = new Date().getTime();
		return res?.data;
	}, [clearSession, token, getItem, sessionName])

	//------------------------------------
	useEffect(() => {
		const sessionData = getItem(sessionName + '_dat');
		const token = getItem(sessionName + '_tkn');
		dispatch({ type: 'SET_SESSION', payload: { sessionData: sessionData, token: token } });
	}, [getItem, sessionName]);

	// console.log(session);
	return (
		<SessionContext.Provider value={{
			session,
			...session,
			...session?.sessionData,
			dispatch,
			hasAccess,
			openSession,
			clearSession,
			setSessionData,
			asyncServiceCall,
			sessionActive: session?.token ? true : false,
		}}>
			{children}
		</SessionContext.Provider>
	)
})

export default SessionProvider;
