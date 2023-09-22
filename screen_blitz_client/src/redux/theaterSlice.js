import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const theatertkn = localStorage.getItem("theaterData");
  if (theatertkn) {
    return JSON.parse(theatertkn);
  } else {
    return { theaterToken: "", theaterId: "", theaterName:"" ,
    approvalStatus:""};
  }
};
const checkTheaterData=()=>{
  const localdata = localStorage.getItem("theaterData")

  if(localdata) {
    return JSON.parse(localdata)
  } else{
    return {theaterToken: "", theaterId: "", theaterName:"" ,
    approvalStatus:""}
  }
}



const initialState = {
  theaterRedux: checkToken(),
  theaterData: checkTheaterData(),
  allMovieList:[],
  allScreenList:[]
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
    setAllScreenlist:(state,action)=>{
      state.allScreenList = action.payload
    },
    logOut: (state) => {
      state.theaterRedux = {
        theaterToken: "",
        theaterId: "",
      };
      state.theaterData = {theaterToken: "", theaterId: "", theaterName:"" ,
      approvalStatus:""};
    },
  },
});
export const { setTheater, logOut, setTheaterData,setAllMovielist,setAllScreenlist } = theaterSlice.actions;
export default theaterSlice.reducer;
