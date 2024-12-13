const handleError = (error) => {
    // Log error to an external service
    console.error('API Error:', error);
    // Customize error handling logic
    return Promise.reject(error);
  };
  
  export default handleError;