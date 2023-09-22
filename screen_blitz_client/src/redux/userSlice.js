import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const usertkn = localStorage.getItem("userData");

  if (usertkn) {
    return JSON.parse(usertkn);
  } else {
    return { userToken: "", userId: "" };
  }
};
const checkLocation = ()=>{
  const loc = localStorage.getItem('location')
  if (loc) {
    return loc
    
  }else{
    return ''
  }
}
const checkOperations =()=>{
  const operations = localStorage.getItem('userOperationsData')
  if(operations){
    return JSON.parse(operations)
  }
  else{
    return {
      movieId:''

    }
  }
}
const initialState = {
  userRedux: checkToken(),
  movieData: [],
  userOperationsData:checkOperations(),
  locationData:[],
  choosenLocation:checkLocation()
};

const userSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userRedux = action.payload;
    },
    setMovieData: (state, action) => {
      state.movieData = action.payload;

    },
    setuserOperationsData:(state,action)=>{
      state.userOperationsData = action.payload

    },
    setLocationData:(state,action)=>{
      state.locationData = action.payload
    },
    setChoosenLocation:(state,action)=>{
      state.choosenLocation= action.payload
    },
    logOut: (state) => {
      state.userRedux = {
        userToken: "",
        userId: "",
      };
      state.choosenLocation=''
      state.userOperationsData={
        movieId:''
      }
    },
  },
});

export const { setUser, logOut, setMovieData,setChoosenLocation,setLocationData,setuserOperationsData } = userSlice.actions;
export default userSlice.reducer;
