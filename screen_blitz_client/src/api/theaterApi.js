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
const deleteMovie = async (id) => {
  try {
    const response = await theater_baseURL.delete(`theater/deletemovie/${id}`);
    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};

const fetchMovies = async () => {
  try {
    const response = await theater_baseURL.get("theater/movieslist");

    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};
const fetchScreens = async () => {
  try {
    const response = await theater_baseURL.get("theater/screenlist");
    return response?.data;
  } catch (error) {
    console.log("theater Api error", error);
  }
};

export {
  theaterSignup,
  theaterLogIn,
  addMovie,
  fetchMovies,
  fetchScreens,
  deleteMovie,
};
