import axios from "axios";


function guestResponseInterceptor(axiosInstance) {



    axiosInstance.interceptors.response.use(
      (response) => {
        console.log('response guest in resposnse interceptor',response)
    
        return response;
      },
      (error) => {
        // Handle any errors that may occur during the response.

        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          const status = error.response.status;
          if (status === 404) {
           window.location.href = '/404'
          }
          // Add more checks for other status codes if needed
        } else if (error.request) {
          window.location.href = '/404'
          // The request was made but no response was received
          console.error('Network Error:', error.request);
          window.location.href = '/404'

         // Render the custom 404 page
        } else {
          window.location.href = '/oops'
          // Something happened in setting up the request that triggered an Error
          console.error('Error:', error.message);
           // Render the custom 404 page
        }
       
    
   
    
    
    
    
    
    
        return Promise.reject(error);
      }
    );
  }
  
  export default guestResponseInterceptor;
  