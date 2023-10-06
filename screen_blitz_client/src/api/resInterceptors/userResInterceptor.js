import axios from "axios";


function userResponseInterceptor(axiosInstance) {



    axiosInstance.interceptors.response.use(
      (response) => {
        console.log('response in resposnse interceptor',response)
    
        if (response.data && response.data.isBlocked) {

        function logoutUser(){
            localStorage.removeItem('userOperationsData')
            localStorage.removeItem('userData')
            localStorage.removeItem('stripeId')
            localStorage.removeItem('location')
            window.location.href = '/user'
            

        

        }
        logoutUser()
        }
        return response;
      },
      (error) => {
        // Handle any errors that may occur during the response.
        return Promise.reject(error);
      }
    );
  }
  
  export default userResponseInterceptor;
  