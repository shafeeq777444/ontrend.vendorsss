
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        location: { lat: "", lng: "" },
        locationName: "Tap Here to Set Location",
        wishlistIds: [],
        userId: null,
        language: "english",
    },
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
});

export const { setLocation, setLocationName, setWhishListIds,setUserID } = userSlice.actions;
export default userSlice.reducer;
