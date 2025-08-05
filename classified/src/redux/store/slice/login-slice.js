import { createSlice } from "@reduxjs/toolkit";
import { login } from "../actions/login-action";
import {
  addAddress,
  getSaved,
  getUser,
  Saved,
  updateUser,
  updateAdd,
  deleteAdd,
  updateFriend,
  deleteSaved
} from "../actions/user-action";
const initialState = {
  isLogged: localStorage.getItem("user") ? true : false,
  users: JSON.parse(localStorage.getItem("user")),
  allUsers: [],
  token: localStorage.getItem("token"),
  error: null,
  loading: false,
  message: "",
  filepath: localStorage.getItem("filepath"),
  phone: "",
    save: [],
  updatemsg:'',
  savedmsg:''
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout(state) {
      state.isLogged = false;
      console.log("Log out function is working...");
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.loading = false;
      state.message = "";
      state.users= null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.isLogged = false;
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogged = true;
        localStorage.getItem("state.users");
        state.token = localStorage.getItem("token");
        state.filepath = localStorage.getItem("filepath");
        state.users = action.payload.data.data;
        state.filepath = action.payload.data.filepath;
        state.error = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLogged = false;
        localStorage.removeItem("users");
        localStorage.removeItem("token");
        state.error = action.payload;
        state.loading = false;
        state.message = "";
      })
      .addCase(Saved.pending, (state) => {
        
        state.savedmsg="Pending..."
      })
      .addCase(Saved.fulfilled, (state, action) => {
        state.save = action.payload;
        state.savedmsg = "Business saved successfully !!";
        state.token = localStorage.getItem("token");
      })
      .addCase(Saved.rejected, (state, action) => {
        state.savedmsg = "Business already saved !!";
      })
      .addCase(getSaved.pending, (state) => {
        state.savedmsg = "Pending...";
        state.save = [];
      })
      .addCase(getSaved.fulfilled, (state, action) => {
        state.save = action.payload;
        state.token = localStorage.getItem("token");
        state.savedmsg = "Saved fetched Successfully !!";
        console.log(state.savedmsg);
      })
      .addCase(getSaved.rejected, (state, action) => {
        (state.save = []), (state.savedmsg = "Error Fetching...");
      })
       .addCase(deleteSaved.pending, (state) => {
        state.savedmsg = "Pending...";
        
      })
      .addCase(deleteSaved.fulfilled, (state, action) => {
        state.save = action.payload.saved;
        state.token = localStorage.getItem("token");
        state.savedmsg = action.payload.message
        console.log(state.savedmsg);
      })
      .addCase(deleteSaved.rejected, (state, action) => {
         state.savedmsg = "Error Fetching...";
      })
      .addCase(updateUser.pending, (state) => {
        state.updatemsg = "Pending...";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLogged = true;
        state.token = localStorage.getItem("token");
        state.users = action.payload
        state.updatemsg = "Data updated Successfully !!";

        // localStorage.setItem("user", JSON.stringify(state.users));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updatemsg = "Error Fetching...";
      })
      .addCase(addAddress.pending, (state) => {
        state.error ="Pending.."
      })
      .addCase(addAddress.fulfilled, (state, action) => {

          state.users = action.payload
        localStorage.setItem("user", JSON.stringify(state.users));
      })
      .addCase(addAddress.rejected, (state) => {
        state.users = null;
      })
      .addCase(updateAdd.pending, (state) => {
        state.error = null;
      })
      .addCase(updateAdd.fulfilled, (state, action) => {

          state.users = action.payload
        // localStorage.setItem("user", JSON.stringify(state.users));
      })
      .addCase(updateAdd.rejected, (state) => {
        state.users = null;
      })
       .addCase(updateFriend.pending, (state) => {
        // state.users = null;
      })
      .addCase(updateFriend.fulfilled, (state, action) => {

          state.users = action.payload
        // localStorage.setItem("user", JSON.stringify(state.users));
      })
      .addCase(updateFriend.rejected, (state) => {
        state.users = null;
      })
      .addCase(deleteAdd.pending, (state) => {
        // state.users = null;
      })
      .addCase(deleteAdd.fulfilled, (state, action) => {

          state.users = action.payload
        // localStorage.setItem("user", JSON.stringify(state.users));
      })
      .addCase(deleteAdd.rejected, (state) => {
        state.users = null;
      })
      .addCase(getUser.pending, (state) => {
        state.allUsers = [];
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.allUsers = action.payload.data;
      })
      .addCase(getUser.rejected, (state) => {
        state.allUsers = [];
      });
  },
});

// export const loginActions = loginSlice.actions;

export const { logout } = loginSlice.actions;

export default loginSlice.reducer;
