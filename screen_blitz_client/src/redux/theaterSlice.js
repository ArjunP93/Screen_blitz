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
};

const theaterSlice = createSlice({
  name: "theaterdetails",
  initialState,
  reducers: {
    setTheater: (state, action) => {
      console.log("payload theater", action.payload);
      state.theaterRedux = action.payload;
    },
    logOut: (state) => {
      state.theaterRedux = {
        theaterToken: "",
        theaterId: "",
      };
    },
  },
});
export const { setTheater, logOut } = theaterSlice.actions;
export default theaterSlice.reducer;
