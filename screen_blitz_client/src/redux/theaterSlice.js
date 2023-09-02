import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const theatertkn = localStorage.getItem("theaterData");
  console.log("theaterdar", theatertkn);
  if (theatertkn) {
    return JSON.parse(theatertkn);
  } else {
    return { theaterToken: "", theaterId: "" };
  }
};
const initialState = {
  theaterRedux: checkToken(),
  theaterData: {}
};

const theaterSlice = createSlice({
  name: "theaterdetails",
  initialState,
  reducers: {
    setTheater: (state, action) => {
      state.theaterRedux = action.payload;
    },
    setTheaterData:(state,action)=>{
      state.theaterData = action.payload



    },
    logOut: (state) => {
      state.theaterRedux = {
        theaterToken: "",
        theaterId: "",
      };
      state.theaterData = {}
    },
  },
});
export const { setTheater, logOut,setTheaterData } = theaterSlice.actions;
export default theaterSlice.reducer;
