import axios from "axios";


const BaseUrl = "http://localhost:4000/api/";

const baseURL =axios.create({
    baseURL: BaseUrl
})
// console.log("baseURL",baseURL)
 
baseURL.interceptors.request.use(
    config=> {
        const token = localStorage.getItem("token");
// console.log("userAxios",token)
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }else{
            delete config.headers["Authorization"]
        }
        return config
    
},
error=>{
    console.log('interceptor error')
    return Promise.reject(error)
}
)

export default baseURL;
