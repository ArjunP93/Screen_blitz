import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const usertkn = localStorage.getItem("userData");

  if (usertkn) {
    return JSON.parse(usertkn);
  } else {
    return { userToken: "", userId: "" };
  }
};

const initialState = {
  userRedux: checkToken(),
  movieData: [],
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
    logOut: (state) => {
      state.userRedux = {
        userToken: "",
        userId: "",
      };
    },
  },
});

export const { setUser, logOut, setMovieData } = userSlice.actions;
export default userSlice.reducer;
