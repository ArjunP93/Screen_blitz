import axios from "axios";


const BaseUrl = "http://localhost:4000/api/";

const guest_baseURL = axios.create({
  baseURL: BaseUrl,
});





export default guest_baseURL;
