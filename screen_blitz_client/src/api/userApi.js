import baseURL from "./axiosIntercept";

const signUp = async (values) => {
    console.log('valuesuserapi',values)
    const response= await baseURL.post("auth/signup", values)
    console.log('res inside api post usersignup',response);


return response?.data
}

const logIn = async (values)=>{
    console.log('valus in sign in user api',values)
    const response = await baseURL.post('auth/login',values)
    console.log('res inside api post usersignin',response);
    return response?.data

}

export  {signUp,logIn};