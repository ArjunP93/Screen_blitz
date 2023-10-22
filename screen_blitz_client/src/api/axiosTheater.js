import axios from "axios";
import theaterResponseInterceptor from "./resInterceptors/theaterResInterceptor";

// const BaseUrl = "http://localhost:4000/api/";
const BaseUrl = "https://screenblitz.online/api/";
// 

const theater_baseURL = axios.create({
  baseURL: BaseUrl,
});


theater_baseURL.interceptors.request.use(
  (config) => {
    const RawtokenData = localStorage.getItem("theaterData");
    const theaterData = JSON.parse(RawtokenData)
    const token = theaterData?.theaterToken
 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    console.log("theater interceptor error");
    return Promise.reject(error);
  }
);



theaterResponseInterceptor(theater_baseURL)




export default theater_baseURL;
