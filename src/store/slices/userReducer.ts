import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {AuthPayload, profileAPI} from "../../api/profileAPI";


const initialState = {
  login: {},
  isAuth:false

};
export const loginTC = createAsyncThunk("/auth/loginTC", async ({email,password}:AuthPayload, thunkAPI) => {
  try {
    const { data } = await profileAPI.login(email,password);

    return data;
  } catch (e:any) {
    if (e.response.data.message) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    } else {
      return thunkAPI.rejectWithValue(e.response.data[0].msg);
    }
  }

});
export const logoutTC = createAsyncThunk("/auth/logoutTC", async (arg, thunkAPI) => {
  await thunkAPI.dispatch(logoutAC("loading"));
});


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutAC(state, action) {
      state.login={}
      state.isAuth = false;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(loginTC.fulfilled, (state, action) => {
      if (action.payload) {
        state.isAuth = true
        state.login = action.payload
      }
    })
  }
});


export const { logoutAC } = userSlice.actions;
export const userReducer = userSlice.reducer;