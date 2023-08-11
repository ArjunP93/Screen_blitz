import axios from "axios";

const BaseUrl = "http://localhost:4000/api/";

const user_baseURL = axios.create({
  baseURL: BaseUrl,
});


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
    console.log("theater interceptor error");
    return Promise.reject(error);
  }
);

export default user_baseURL;
