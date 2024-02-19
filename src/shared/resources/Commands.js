import { Constants as AppConstants } from './Constants';

export class Commands {
	static API_URL_A_3 = { name: ['...'], url: AppConstants.API_URL + "signout", type: 'POST' };
	static API_URL_A_2 = { name: ['...'], url: AppConstants.API_URL + "map/lanes", type: 'GET' };
	static API_URL_A_1 = { name: ['...'], url: AppConstants.API_URL + "users/me", type: 'PATCH' };
	static API_URL_A_4 = { name: ['...'], url: AppConstants.API_URL + "offices/agents/me", type: 'DELETE' };
};

