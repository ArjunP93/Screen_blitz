import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    guestMovieSearch:[]
}

const guestSlice = createSlice({
    name: "guestdetails",
    initialState,
    reducers: {
        setGuestMovieSearch:(state,action)=>{
            state.guestMovieSearch = action.payload
        }

    }
})
export const {setGuestMovieSearch} = guestSlice.actions
export default guestSlice.reducer