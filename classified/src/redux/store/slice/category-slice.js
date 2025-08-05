import { createSlice } from "@reduxjs/toolkit";
import {
  getCategory,
  getSubcategory,
  getAllSubCategory,
} from "../actions/category-action";

const initialState = {
  categories: [],
  subcategories: [],
  loading: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategory.pending, (state) => {
        state.loading = "Loading..";
      })
      .addCase(getCategory.fulfilled, (state, action) => {
        state.loading = "";
        state.categories = action.payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = "Loading failed";
      })
      .addCase(getSubcategory.pending, (state) => {
        state.loading = "Loading..";
      })
      .addCase(getSubcategory.fulfilled, (state, action) => {
        state.loading = "";
        state.subcategories = action.payload;
      })
      .addCase(getSubcategory.rejected, (state) => {
        state.loading = "Loading failed";
      })
      .addCase(getAllSubCategory.pending, (state) => {
        state.loading = "Loading..";
      })
      .addCase(getAllSubCategory.fulfilled, (state, action) => {
        state.loading = "";
        state.subcategories = action.payload;
      })
      .addCase(getAllSubCategory.rejected, (state) => {
        state.loading = "Loading failed";
      });
  },
});

export default categorySlice.reducer;
