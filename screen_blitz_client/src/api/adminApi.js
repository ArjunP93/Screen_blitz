import admin_baseURL from "./axiosAdmin";


const adminLogIn = async (values)=>{
    console.log('valus in sign in admin api',values)
    const response = await admin_baseURL.post('auth/admin/login',values)
    console.log('res inside api post adminsignin',response);
    return response?.data

}

const userFetch = async()=>{
    
    const response = await admin_baseURL.get('admin/userlist')
    return response?.data
}

const TheaterFetch = async()=>{
    
    const response = await admin_baseURL.get('admin/theaterlist')
    return response?.data
}
const theaterApprove = async(info)=>{
    console.log('hello this is admin api theaterapprove',info)
    const response = await admin_baseURL.put('admin/theaterlist/approval',info)
    console.log('res inside api get theaterapprove',response)
    return response?.data
}
const userApprove = async (info)=>{
    console.log('valus in sign in admin api userapprove',info)
    const response = await admin_baseURL.put('admin/userlist/approval',info)
    console.log('res inside api get userapprove',response)
    return response?.data

}


export  {adminLogIn,userFetch,TheaterFetch,theaterApprove,userApprove};