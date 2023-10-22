import axios from "axios";
import userResponseInterceptor from "./resInterceptors/userResInterceptor";


// const BaseUrl = "http://localhost:4000/api/";
const BaseUrl = "https://screenblitz.online/api/";


const user_baseURL = axios.create({
  baseURL: BaseUrl,
});

//user req interceptor
user_baseURL.interceptors.request.use(
  (config) => {
    const RawtokenData = localStorage.getItem("userData");
    const userData = JSON.parse(RawtokenData)
    const token = userData?.userToken
 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    console.log("user interceptor error");
    return Promise.reject(error);
  }
);

console.log('response jjjjjjjjjjkjkjkjkjkjkjk interceptor')

//user response interceptor

userResponseInterceptor(user_baseURL)









export default user_baseURL;
