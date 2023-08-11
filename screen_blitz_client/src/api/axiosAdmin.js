import axios from "axios";

const BaseUrl = "http://localhost:4000/api/";

const admin_baseURL = axios.create({
  baseURL: BaseUrl,
});
// console.log("baseURL",baseURL)

admin_baseURL.interceptors.request.use(
  (config) => {
    const RawtokenData = localStorage.getItem("adminData");
    const adminData = JSON.parse(RawtokenData)
    const token = adminData?.adminToken
    console.log("userAxios",token)
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

export default admin_baseURL;
