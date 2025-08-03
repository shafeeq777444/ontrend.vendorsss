
import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "../../app/actions/appActions";

const initialState= {
        location: { lat: "", lng: "" },
        locationName: "Tap Here to Set Location",
        wishlistIds: [],
        userId: null,
        language: "english",
    }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
          setUserID: (state, action) => {
            state.userId = action.payload;
        },
        setLocationName: (state, action) => {
            state.locationName = action.payload;
        },
        setWhishListIds: (state, action) => {
            state.wishlistIds = action.payload;
        },
    },
extraReducers: (builder) => {
    builder.addCase(resetApp, () => initialState);
  }
});

export const { setLocation, setLocationName, setWhishListIds,setUserID } = userSlice.actions;
export default userSlice.reducer;
