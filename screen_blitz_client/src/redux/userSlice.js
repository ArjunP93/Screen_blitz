import { createSlice } from "@reduxjs/toolkit";

const checkToken = () => {
  const usertkn = localStorage.getItem("userData");

  if (usertkn) {
    return JSON.parse(usertkn);
  } else {
    return { userToken: "", userId: "" };
  }
};
const checkLocation = () => {
  const loc = localStorage.getItem("location");
  if (loc) {
    return loc;
  } else {
    return "";
  }
};
const checkStripe = () => {
  const stripePaymentId = localStorage.getItem("stripeId");
  if (stripePaymentId) {
    return stripePaymentId;
  } else {
    return "";
  }
};
const checkOperations = () => {
  const operations = localStorage.getItem("userOperationsData");
  if (operations) {
    return JSON.parse(operations);
  } else {
    return {
      movieId: "",
      selectedScreen: "",
      selectedShow: "",
      selectedTheater: "",
      showDate: "",
      screenId: "",
      screenRows: "",
      screenCols: "",
      movieName: "",
      ticketPrice: 0,
      selectedSeats: [],
      ticketCount: 0,
    };
  }
};
const initialState = {
  userRedux: checkToken(),
  movieData: [],
  userOperationsData: checkOperations(),
  locationData: [],
  choosenLocation: checkLocation(),
  choosenShowDate: "",
  userSelectedSeats: [],
  userSeatCount: 0,
  totalAmount: 0,
  stripePaymentURL:'',
  stripeId:checkStripe()
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
    setuserOperationsData: (state, action) => {
      state.userOperationsData = action.payload;
    },
    setLocationData: (state, action) => {
      state.locationData = action.payload;
    },
    setChoosenLocation: (state, action) => {
      state.choosenLocation = action.payload;
    },
    setChoosenShowDate: (state, action) => {
      state.choosenShowDate = action.payload;
    },
    setUserSelectedSeats: (state, action) => {
      state.userSelectedSeats = action.payload;
    },
    setUserSeatCount: (state, action) => {
      state.userSeatCount = state.userSeatCount + action.payload;
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
    setsStripePaymentURL: (state, action) => {
      state.totalAmount = action.payload;
    },
    setStripeId: (state, action) => {
      state.totalAmount = action.payload;
    },
    logOut: (state) => {
      state.userRedux = {
        userToken: "",
        userId: "",
      };
      state.userSelectedSeats = [];
      state.choosenLocation = "";
      state.userOperationsData = {
        movieId: "",
        selectedScreen: "",
        selectedShow: "",
        selectedTheater: "",
        showDate: "",
        screenId: "",
        screenRows: "",
        screenCols: "",
        movieName: "",
        ticketPrice: 0,
        selectedSeats: [],
        ticketCount: 0,
      };
    },
  },
});

export const {
  setUser,
  logOut,
  setMovieData,
  setChoosenLocation,
  setLocationData,
  setuserOperationsData,
  setChoosenShowDate,
  setUserSelectedSeats,
  setUserSeatCount,
  setTotalAmount,
  setsStripePaymentURL,
  setStripeId
} = userSlice.actions;
export default userSlice.reducer;
