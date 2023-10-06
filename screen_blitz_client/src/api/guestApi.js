import guest_baseURL from "./axiosGuest";


const moviesFetchGuest = async () => {
  try {
    const response = await guest_baseURL.get("guest/movielist");
    return response?.data;
  } catch (error) {
    console.log("guest Api error", error);
  }
};

const guestMovieSearch = async (textData) => {
  try {
    console.log('inside guest search ',textData)
    const response = await guest_baseURL.post("guest/searchmovie", textData);
    return response?.data;
  } catch (error) {
    console.log("guest Api error", error);
  }
};
// const getLocations = async () => {
//   try {
//     const response = await guest_baseURL.get("guest/locations");
//     return response?.data;
//   } catch (error) {
//     console.log("guest Api error", error);
//   }
// };


  





export { moviesFetchGuest,guestMovieSearch };
