import theater_baseURL from "./axiosTheater";

const theaterSignup = async (values) => {
  try {
    console.log("valuetheaterapi", values);
    const response = await theater_baseURL.post("auth/theater/signup", values);
    console.log("res inside api post theatersignup", response);

    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};

const theaterLogIn = async (values) => {
  try {
    console.log("valus in sign in theater api", values);
    const response = await theater_baseURL.post("auth/theater/login", values);
    console.log("res inside api post theatersignin", response);
    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};

const addMovie = async (values) => {
  try {
    console.log("valus in addMovie theater api", values);

    const response = await theater_baseURL.post("theater/addmovie", values);

    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};
const addScreen = async (values) => {
  try {
    console.log("valus in add screen theater api", values);

    const response = await theater_baseURL.post("theater/addscreen", values);

    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};
const deleteMovie = async (data) => {
  try {
    const response = await theater_baseURL.delete(`theater/deletemovie/${data.moviId}/${data.theater}`);
    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};
const deleteScreen = async (id) => {
  try {
    const response = await theater_baseURL.delete(`theater/deletescreen/${id}`);
    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};

const fetchMovies = async (id) => {
  try {
    
    const response = await theater_baseURL.get(`theater/movieslist/${id}`);

    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};
const fetchScreens = async (id) => {
  try {
    const response = await theater_baseURL.get(`theater/screenlist/${id}`);
    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};
const movieScreenAllocate =async (values)=>{
  try {
    const response= await theater_baseURL.post('theater/movieallocate',values)
    return response?.data
  } catch (error) {
    console.log("theater Api error", error);

  }
}
const addProfilePic = async (theaterId,fileData) => {
  try {
  
    const formData = new FormData();
    formData.append('theaterProfileImage',fileData); // 'profileImage' should match your server's expected field name for the file
    formData.append('theater', theaterId);

    const response = await theater_baseURL.post("theater/addprofilepic",formData,{headers:{'Content-Type':'multipart/form-data'}});
    return response?.data;
  } catch (error) {
    console.log("theater Api error at add profile pic", error);
  }
}



export {
  theaterSignup,
  theaterLogIn,
  addMovie,
  fetchMovies,
  fetchScreens,
  deleteMovie,
  addScreen,
  deleteScreen,
  movieScreenAllocate,
  addProfilePic
};
