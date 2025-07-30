import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        activeTab: "Pending",
        pageIndex: 0,
        invoice: null,

    },
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
});

export const { setActiveTab ,setPageIndex,setInvoice} = orderSlice.actions;
export default orderSlice.reducer;
