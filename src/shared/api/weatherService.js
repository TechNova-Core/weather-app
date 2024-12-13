import axiosInstance from "./axiosInstance";

const getWeather = (lat, lon) => {
    return axiosInstance.get('/current.json', {
        params: {
            q:lat,lon
        }
    })
}

const getDailyWeather = (lat, lon, numOfDays) => {
    if((numOfDays <= 14 && numOfDays >= 1) || numOfDays == null){
        return axiosInstance.get('/forecast.json', {
            params: {
                q:`${lat+','+lon}`,
                days: numOfDays
            }
        })
    } else {
        return console.error('API REQUEST ERROR: Number of days can not be more that 14 or less than 1');
    }
}

const getHourlyWeather = (lat, lon, specificHour) => {
    if(specificHour == null || (specificHour < 24 && specificHour > 0)){
        return axiosInstance.get('/forecast.json', {
            params: {
                q:`${lat+','+lon}`,
                hour: specificHour
            }
        })
    } else {
        return console.error('API REQUEST ERROR: Number of specific hour can not be more that 23 or less than 0');
    }
}


export {
    getWeather,
    getHourlyWeather,
    getDailyWeather,
}