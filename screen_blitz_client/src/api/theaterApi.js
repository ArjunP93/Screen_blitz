import theater_baseURL from "./axiosTheater";

const theaterSignup = async (values) => {
    console.log('valuetheaterapi',values)
    const response= await theater_baseURL.post("auth/theater/signup", values)
    console.log('res inside api post theatersignup',response);


return response?.data
}

const theaterLogIn = async (values)=>{
    console.log('valus in sign in theater api',values)
    const response = await theater_baseURL.post('auth/theater/login',values)
    console.log('res inside api post theatersignin',response);
    return response?.data

}

export  {theaterSignup,theaterLogIn};