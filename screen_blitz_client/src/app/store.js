import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/userSlice'
import theaterSlice from '../redux/theaterSlice'
import adminSlice from '../redux/adminSlice'
import guestSlice from '../redux/guestSlice'

export const store = configureStore({
  reducer: {
    user:userSlice,
    admin:adminSlice,
    theater:theaterSlice,
    guest:guestSlice

  },
})