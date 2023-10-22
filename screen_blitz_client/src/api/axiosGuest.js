import axios from "axios";
import guestResponseInterceptor from "./resInterceptors/guestResInterceptor";


// const BaseUrl = "http://localhost:4000/api/";
const BaseUrl = "https://screenblitz.online/api/";


const guest_baseURL = axios.create({
  baseURL: BaseUrl,
});


guestResponseInterceptor(guest_baseURL)


export default guest_baseURL;
