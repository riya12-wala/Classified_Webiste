import { createSlice } from "@reduxjs/toolkit";
import { addReview, getReview, getReviewAvgCount, getReviewByBusiness, getReviewByUserId } from "../actions/review-action";

const initialState = {
  reviewbyid: [],
  avgRatingById: [],
  ratingCountById: [],
  messagebyId: [],
  addreviews: [],
  reviews: [],
  count:" -- ",
  loading: true,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = "Pending";
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.addreviews = action.payload.data;
        state.error = action.payload.message;
        console.log(action.payload.data.message)
      })
      .addCase(addReview.rejected, (state) => {
        state.loading = false;
        state.error = "Something Went Wrong";
      })
      .addCase(getReview.pending, (state) => {
        state.loading = true;
        state.error = "Pending";
      })
      .addCase(getReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
        state.error = action.payload.message;
      })
      .addCase(getReview.rejected, (state) => {
        state.loading = false;
        state.error = "Something Went Wrong";
      })
      .addCase(getReviewByBusiness.pending, (state) => {
        state.message = null;
      })
      .addCase(getReviewByBusiness.fulfilled, (state, action) => {
        const { businessId, reviews,  message } =
          action.payload;
        state.reviewbyid[businessId] = reviews;
        state.messagebyId[businessId] = message;
      })
      .addCase(getReviewByBusiness.rejected, (state, action) => {
        state.message = "";
      })
     .addCase(getReviewAvgCount.pending, (state) => {
        state.message = '';
      })
      .addCase(getReviewAvgCount.fulfilled, (state, action) => {
        const { businessId, avgRating,  ratingCount } =
          action.payload;
    state.avgRatingById[businessId] = avgRating;
  state.ratingCountById[businessId] = ratingCount;
      })
      .addCase(getReviewAvgCount.rejected, (state, action) => {
        state.message = "";
      })
      .addCase(getReviewByUserId.pending, (state) => {
        state.message = null;
      })
    .addCase(getReviewByUserId.fulfilled, (state, action) => {
        state.loading = false;
      state.reviews = action.payload.data;
      state.count = action.payload.count;
        state.error = action.payload.message;
      })
      .addCase(getReviewByUserId.rejected, (state) => {
        state.loading = false;
        state.error = "Something Went Wrong";
      })
      
  },
});

export default reviewSlice.reducer;
