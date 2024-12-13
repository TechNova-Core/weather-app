import { getWeather } from 'shared/api/weatherService';
import {create} from 'zustand';

export const useStore = create((set,get) => ({
  city: "Tehran",
  weatherType: "Fog",
  weather: '',
  getWeather: () => get().weather,
  weatherDegree: 3,
  allWeatherTypes:[
    "Mostly Clear",
    "Clear",
    "Fog",
    "Heavy Snow",
    "Snowy",
    "Thunder",
    "Rainy",
    "Cloudy",
    "Sunny",
    "Partly Cloudy"
  ]
}));