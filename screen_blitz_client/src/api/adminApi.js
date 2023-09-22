import admin_baseURL from "./axiosAdmin";

const adminLogIn = async (values) => {
  try {
    console.log("valus in sign in admin api", values);
    const response = await admin_baseURL.post("auth/admin/login", values);
    console.log("res inside api post adminsignin", response);
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};

const userFetch = async () => {
  try {
    const response = await admin_baseURL.get("admin/userlist");
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};

const TheaterFetch = async () => {
  try {
    const response = await admin_baseURL.get("admin/theaterlist");
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};
const movieFetch = async () => {
  try {
    const response = await admin_baseURL.get("admin/allmovies");
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};
const addLocation = async (locdata) => {
  try {
    const response = await admin_baseURL.post("admin/addlocation",locdata);
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};
const allLocations = async()=>{
  try {
    const response = await admin_baseURL.get("admin/locations");
    
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
}
const deleteLocation = async(id)=>{
  try {
    const response = await admin_baseURL.delete(`admin/removelocation/${id}`)
    return response?.data;
  } catch (error) {
    console.log('api error admin',error)
  }
}
const theaterApprove = async (info) => {
  try {
    const response = await admin_baseURL.put(
      "admin/theaterlist/approval",
      info
    );
    console.log("res inside api get theaterapprove", response);
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};
const theaterBlock = async (info) => {
  try {
    const response = await admin_baseURL.put("admin/theaterlist/block", info);
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};
const userApprove = async (info) => {
  try {
    const response = await admin_baseURL.put("admin/userlist/approval", info);
    console.log("res inside api get userapprove", response);
    return response?.data;
  } catch (error) {
    console.log("admin Api error", error);
  }
};

export {
  adminLogIn,
  userFetch,
  TheaterFetch,
  theaterApprove,
  userApprove,
  theaterBlock,
  movieFetch,
  addLocation,allLocations,deleteLocation
};
