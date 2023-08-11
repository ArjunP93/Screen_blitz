import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../redux/userSlice'
import theaterSlice from '../redux/theaterSlice'
import adminSlice from '../redux/adminSlice'


export const store = configureStore({
  reducer: {
    user:userSlice,
    admin:adminSlice,
    theater:theaterSlice

  },
})