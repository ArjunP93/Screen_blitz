import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const theatertkn = localStorage.getItem("theaterData");
  if (theatertkn) {
    return JSON.parse(theatertkn);
  } else {
    return { theaterToken: "", theaterId: "" };
  }
};
const initialState = {
  theaterRedux: checkToken(),
  theaterData: {},
  allMovieList:[]
};

const theaterSlice = createSlice({
  name: "theaterdetails",
  initialState,
  reducers: {
    setTheater: (state, action) => {
      state.theaterRedux = action.payload;
    },
    setTheaterData: (state, action) => {
      state.theaterData = action.payload;
    },
    setAllMovielist:(state,action)=>{
      state.allMovieList = action.payload
    },
    logOut: (state) => {
      state.theaterRedux = {
        theaterToken: "",
        theaterId: "",
      };
      state.theaterData = {};
    },
  },
});
export const { setTheater, logOut, setTheaterData,setAllMovielist } = theaterSlice.actions;
export default theaterSlice.reducer;
