import { createSlice } from '@reduxjs/toolkit';


const foodSlice = createSlice({
  name: 'food',
  initialState: {
    //---------- food home ----------
    foodType:"All",
    categoryBar:"Nearby",

    //---------- vendor page ----------
    selectedVendorMealCategory:"All",

    //---------- category --------------
    searchTerm:"",
    sortOption:""
  },
  reducers: {
    setFoodType: (state,action) => {
      state.foodType=action.payload
      
    },
    setFoodCategory: (state,action) => {
      state.categoryBar=action.payload
    },
     setVendorMealCategory: (state,action) => {
      state.selectedVendorMealCategory=action.payload
      
    },
     setSearchTerm: (state,action) => {
      state.searchTerm=action.payload
      
    },
    setSortOption: (state,action) => {
      state.sortOption=action.payload
      
    },
  },
});

export const { setFoodType,setFoodCategory,setVendorMealCategory,setSearchTerm,setSortOption } = foodSlice.actions;
export default foodSlice.reducer;
