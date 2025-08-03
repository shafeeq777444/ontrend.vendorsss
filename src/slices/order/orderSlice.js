import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "../../app/actions/appActions";
const initialState= {
    activeTab: "Pending",
    pageIndex: 0,
    invoice: null,

}

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setActiveTab: (state, action) => {
            state.activeTab = action.payload;
            state.pageIndex = 0;
        },
        setPageIndex: (state, action) => {
            state.pageIndex += action.payload; 
        },
         setInvoice: (state, action) => {
      state.invoice = action.payload; // ✅ Fix typo here
    },
    },
extraReducers: (builder) => {
    builder.addCase(resetApp, () => initialState);
  }
});

export const { setActiveTab ,setPageIndex,setInvoice} = orderSlice.actions;
export default orderSlice.reducer;
