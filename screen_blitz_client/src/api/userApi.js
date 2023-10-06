import user_baseURL from "./axiosUser";

const signUp = async (values) => {
  try {
    const response = await user_baseURL.post("auth/signup", values);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const findUserDetails = async (data) => {
  try {
    const response = await user_baseURL.get(`auth/finduser/${data}`);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const logIn = async (values) => {
  try {
    const response = await user_baseURL.post("auth/login", values);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const otpLogIn = async (values) => {
  try {
    console.log("values inside the otplogin", values);
    const response = await user_baseURL.post("auth/otplogin", values);

    return response?.data;
  } catch (error) {
    console.log("user Api  otp error", error);
  }
};

const googleLogIn = async (values) => {
  try {
    const response = await user_baseURL.post("auth/glogin", values);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const userProfileDetails = async (data) => {
  try {
    const response = await user_baseURL.get(`user/userprofile/${data}`);

    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const moviesFetchUser = async () => {
  try {
    const response = await user_baseURL.get("user/movielist");
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};

const movieSearch = async (textData) => {
  try {
    const response = await user_baseURL.post("user/searchmovie", textData);
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const getLocations = async () => {
  try {
    const response = await user_baseURL.get("user/locations");
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
const moviePageData = async (values) => {
  try {
    const response = await user_baseURL.post("user/movie", values);
    return response?.data;
  } catch (error) {
    console.log("user Api error", error);
  }
};
// const bookingData = async(values)=>{
//   try {
//     const response = await user_baseURL.post('user/booking',values)
//     return response?.data
//   } catch (error) {
//     console.log("user Api error booking", error);

//   }
// }
const movieInfoGet = async (id) => {
  try {
    const response = await user_baseURL.get(`user/movieinfo/${id}`);
    return response?.data;
  } catch (error) {
    console.log("user Api error movieinfo", error);
  }
};
const openPaymentGateway = async (data) => {
  try {
    const response = await user_baseURL.post("user/booking/paymentURL", data);
    return response?.data;
  } catch (error) {
    console.log("user Api error getGateway", error);
  }
};
const PaymentStatusReturn = async (data) => {
  try {
    const response = await user_baseURL.post("user/booking/confirmation", data);
    return response?.data;
  } catch (error) {
    console.log("user Api error at payment status passing", error);
  }
};
const PaymentStatusReturnCancel = async (data) => {
  try {
    const response = await user_baseURL.post("user/booking/confirmation", data);
    return response?.data;
  } catch (error) {
    console.log("user Api error at payment status passing", error);
  }
};
const getBookedSeats = async (data) => {
  try {
    const response = await user_baseURL.post("user/bookedseats", data);
    return response?.data;
  } catch (error) {
    console.log("user Api error at booked seats", error);
  }
}
const addProfilePic = async (userId,fileData) => {
  try {
    const formData = new FormData();
    formData.append('userProfileImage',fileData); // 'profileImage' should match your server's expected field name for the file
    formData.append('user', userId);

    const response = await user_baseURL.post("user/addprofilepic",formData,{headers:{'Content-Type':'multipart/form-data'}});
    return response?.data;
  } catch (error) {
    console.log("user Api error at add profile pic", error);
  }
}
const editUserProfile = async (formData) => {
  try {
    const response = await user_baseURL.post(`user/edituserprofile`,formData);
    return response?.data;
  } catch (error) {
    console.log("user Api error at userbookings ", error);
  }
}
const fetchUserBookings = async (id) => {
  try {
    const response = await user_baseURL.get(`user/userbookings/${id}`);
    return response?.data;
  } catch (error) {
    console.log("user Api error at userbookings ", error);
  }
}

export {
  signUp,
  otpLogIn,
  findUserDetails,
  logIn,
  userProfileDetails,
  googleLogIn,
  moviesFetchUser,
  movieSearch,
  getLocations,
  moviePageData,
  movieInfoGet,
  openPaymentGateway,
  PaymentStatusReturn,
  PaymentStatusReturnCancel,
  getBookedSeats,
  fetchUserBookings,
  addProfilePic,editUserProfile
};
