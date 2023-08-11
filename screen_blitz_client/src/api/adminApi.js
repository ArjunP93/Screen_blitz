import admin_baseURL from "./axiosAdmin";


const adminLogIn = async (values)=>{
    console.log('valus in sign in admin api',values)
    const response = await admin_baseURL.post('auth/admin/login',values)
    console.log('res inside api post adminsignin',response);
    return response?.data

}

export  {adminLogIn};