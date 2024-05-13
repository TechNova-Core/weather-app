/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    spacing: {
      6: '32px',
      7: '40px'
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#EEEEEE',
      'natural': {
        100: '#EEEEEE',
        200: '#CECECE',
        300: '#BDCCD4EB',
        400: '#AEC6D4B2',
        500: '#CECECE8A',
        600: '#6E767A',
        700: '#8B9093',
        800: '#7D7D7E',
        900: '#75716E',
        1000: '#818A99',
        2000: '#484645EB'
      },
      'light-blue': {
        100: '#A5DDFC',
        200: '#73C0EB',
        300: '#66B3DE',
        400: '#52B1BE',
        500: '#7D9DB0',
        600: '#7896AB',
        700: '#7697AACF'
      },
      'dark-blue': {
        100: '#032F84BD',
        200: '#001768',
        300: '#001768E3',
        400: '#001753'
      },
      'blue-gray': {
        100: '#7486A8EB',
        200: '#ABBCDBB2',
        300: '#7388AF',
        400: '#5E748B',
        500: '#59728BC7'
      },
      'gray': {
        100: '#363B4E',
        200: '#3F4354',
        300: '#53565F80',
        400: '#2F323EE3',
        500: '#6E767A8A'
      }
    },
    extend: {
      fontFamily: {
        'segoe': [' ', 'sans-serif'],
      },
      fontSize: {
        'body-1': '12px',
        'body': '14px',
        'body-3': '16px',
        'h1':'32px',
        'h2':'24px',
        'h3':'20px'
      },
      borderRadius: {
        'rounded-1' : '10px',
        'rounded-2' : '15px',
        'rounded-3' : '20px'
      }
    },
  },
  plugins: [],
}

