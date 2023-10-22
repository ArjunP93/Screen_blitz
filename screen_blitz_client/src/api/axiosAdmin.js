import axios from "axios";
import adminResponseInterceptor from "./resInterceptors/adminResInterceptor";

// const BaseUrl = "http://localhost:4000/api/";
const BaseUrl = "https://screenblitz.online/api/";


const admin_baseURL = axios.create({
  baseURL: BaseUrl,
});

admin_baseURL.interceptors.request.use(
  (config) => {
    const RawtokenData = localStorage.getItem("adminData");
    const adminData = JSON.parse(RawtokenData)
    const token = adminData?.adminToken
  
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  (error) => {
    console.log("admin interceptor error");
    return Promise.reject(error);
  }
);




adminResponseInterceptor(admin_baseURL)

export default admin_baseURL;
