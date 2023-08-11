import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const usertkn = localStorage.getItem("userData");

  console.log("userdata", JSON.parse(usertkn));
  if (usertkn) {
    return JSON.parse(usertkn);
  } else {
    return { userToken: "", userId: "" };
  }
};

const initialState = {
  userRedux: checkToken(),
};

const userSlice = createSlice({
  name: "userdetails",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("payload", action.payload);
      state.userRedux = action.payload;
    },
    logOut: (state) => {
      state.userRedux = {
        userToken: "",
        userId: "",
      };
    },
  },
});
export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;
