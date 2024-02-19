
export class Constants {


	static APP_NAME = "_WEATHER_";

	// static SERVER_IP_PORT = "127.0.0.1:9127"; static LOCAL_HOST = true; static DEVELOPMENT_MODE = true;
	// static SERVER_IP_PORT = "192.168.1.90:9127"; static LOCAL_HOST = true; static DEVELOPMENT_MODE = true;
	// static SERVER_IP_PORT = "192.168.31.166:9127"; static LOCAL_HOST = true; static DEVELOPMENT_MODE = true;
	// static SERVER_IP_PORT = "5.160.178.134:20280"; static LOCAL_HOST = true; static DEVELOPMENT_MODE = true;
	static SERVER_IP_PORT = "...."; static LOCAL_HOST = true; static DEVELOPMENT_MODE = true;
	// static DEVELOPMENT_MODE = true;

	static API_URL = Constants?.LOCAL_HOST ? ("http://" + Constants?.SERVER_IP_PORT + "/api/") : "/api/";

	static UPLOAD_SERVER = { localServer: true, url: Constants?.API_URL + 'upload' };

	static LOADER_COLOR = '#17B2E7';

	static LANGUAGE_INDEX = 0;
	static tokens = [];

	static LANGUAGES = [{
		dateName: 'SHAMSI',
		lang: 'fa',
		htmlDir: 'rtl',
		img: 'ir.svg',
		dateFormat: "jYYYY/jMM/jDD",
		dateFormatStr: "jDD jMMMM jYYYY",
		dateTimeFormat: "jYYYY/jMM/jDD HH:mm",
		dateTimeFormat2: "HH:mm jYYYY/jMM/jDD",
		dateTimeFormatShort: "jYY/jMM/jDD HH:mm",
		dateTimeFormatShort2: "HH:mm jYY/jMM/jDD",
		dateFullTimeFormat: "jYYYY/jMM/jDD HH:mm a",
		dateFullTimeFormatStr: "jDD jMMMM jYYYY HH:mm a",
		monthName: "jMMMM jYYYY",
		monthField: "jMonth",
		monthFieldSmall: "jmonth",
		weekDays: ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنج‌شنبه', 'جمعه'],
		appName: 'Weather System',
	}, {
		dateName: 'MILADY',
		lang: 'en',
		htmlDir: 'ltr',
		img: 'us.svg',
		dateFormat: "MM/DD/YYYY",
		dateFormatStr: "YYYY MMMM DD",
		dateFormatStr2: "DD MMMM YYYY",
		dateTimeFormatStr: "MM/DD/YYYY HH:mm",
		dateTimeFormatShort: "MM/DD/YY HH:mm",
		dateFullTimeFormat: "MM/DD/YYYY HH:mm",
		dateFullTimeFormatStr: "YYYY MMMM DD HH:mm",
		monthName: "MMMM YYYY",
		monthField: "month",
		monthFieldSmall: "month",
		weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		appName: 'Weather System',
	}];
	static ACTIVE_LANGUAGE = Constants?.LANGUAGES[Constants?.LANGUAGE_INDEX];


}
