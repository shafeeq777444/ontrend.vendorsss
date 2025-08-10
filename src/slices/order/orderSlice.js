import { createSlice } from "@reduxjs/toolkit";
import { resetApp } from "../../app/actions/appActions";
const initialState= {
    activeTab: "Pending",
    pageIndex: 0,
    invoice: null,
    pendingOrders: 0,
    processingOrders: 0,
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
    setPendingOrders: (state, action) => {
      state.pendingOrders = action.payload;
    },
    setProcessingOrders: (state, action) => {
      state.processingOrders = action.payload;
    },
    },
extraReducers: (builder) => {
    builder.addCase(resetApp, () => initialState);
  }
});

export const { setActiveTab ,setPageIndex,setInvoice,setPendingOrders,setProcessingOrders} = orderSlice.actions;
export default orderSlice.reducer;
