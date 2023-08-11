import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const admintkn = localStorage.getItem("adminData");
  if (admintkn) {
    return JSON.parse(admintkn);
  } else {
    return { adminToken: "", adminId: "" };
  }
};

const initialState = {
  adminRedux: checkToken(),
};

const adminSlice = createSlice({
  name: "admindetails",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      state.adminRedux = action.payload;
    },
    logOut: (state) => {
      state.adminRedux = {
        adminToken: "",
        adminId: "",
      };
    },
  },
});
export const { setAdmin, logOut } = adminSlice.actions;
export default adminSlice.reducer;
