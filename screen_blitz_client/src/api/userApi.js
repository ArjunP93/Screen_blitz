import user_baseURL from "./axiosUser";

const signUp = async (values) => {
  try {
    const response = await user_baseURL.post("auth/signup", values);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const logIn = async (values) => {
  try {
    const response = await user_baseURL.post("auth/login", values);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const googleLogIn = async (values) => {
  try {
    const response = await user_baseURL.post("auth/glogin", values);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const moviesFetchUser = async () => {
  try {
    const response = await user_baseURL.get("user/movielist");
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const movieSearch = async (textData) => {
  try {
    const response = await user_baseURL.post("user/searchmovie", textData);
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const getLocations = async () => {
  try {
    const response = await user_baseURL.get("user/locations");
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const moviePageData = async (values) => {
  try {
    const response = await user_baseURL.post("user/movie",values);
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};


export { signUp, logIn, googleLogIn, moviesFetchUser, movieSearch,getLocations,moviePageData };
