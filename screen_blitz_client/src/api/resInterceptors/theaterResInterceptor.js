import axios from "axios";


function theaterResponseInterceptor(axiosInstance) {



    axiosInstance.interceptors.response.use(
      (response) => {
        console.log('response in resposnse interceptor',response)
    
        if (response.data && response.data.isBlocked) {

        function logoutTheater(){
            localStorage.removeItem('theaterData')
            
            window.location.href = '/theater'
            

        

        }
        logoutTheater()
        }
        return response;
      },
      (error) => {
        // Handle any errors that may occur during the response.
        return Promise.reject(error);
      }
    );
  }
  
  export default theaterResponseInterceptor;
  