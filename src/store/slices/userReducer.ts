import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";
import instance from "../../api/instance";

const initialState = {
  login: {
    items: {},
    status: "loading",
    error: null
  },
  registration: {
    items: {},
    status: "registration",
    error: null
  },
  authMe: {
    isAuth: false,
    status: "loading",
    error: null
  }
};
export const loginTC = createAsyncThunk("/auth/loginTC", async ({ email, password }, thunkAPI) => {
  try {
    const { data } = await UserApi.login(email, password);
    // const  resp  = await fetch("", {
    //   method: 'POST',
    //  body: JSON.stringify({ email,password })
    // });
    // return await resp.json();
    return data;
  } catch (e) {
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
export const registrationTC = createAsyncThunk("/auth/registrationTC", async ({
                                                                                email,
                                                                                password,
                                                                                fullName,
                                                                                avatarUrl
                                                                              }, thunkAPI) => {
  try {
    const { data } = await UserApi.registration({ email, password, fullName, avatarUrl });
    return data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data[0].msg);
  }

});
export const authMeTC = createAsyncThunk("/auth/authMe", async (_, { rejectWithValue }) => {
  try {
    const { data } = await UserApi.authMe();
    //console.log(data);
    return data;
  } catch (e) {
    //console.log(e.response.payload.data.message);
    return rejectWithValue(e.response);
  }

});
export const updateUserStateTC = createAsyncThunk("/auth/updateUserState", async ({
                                                                                    fullName,
                                                                                    avatarUrl
                                                                                  }, thunkAPI) => {
  thunkAPI.dispatch(updateUserStateAC({ fullName, avatarUrl }));
});

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    logoutAC(state, action) {
      state.login.items = {};
      state.login.status = action.payload;
      state.registration.status = "registration";
      state.authMe.isAuth = false;
    },
    updateUserStateAC(state, action) {
      state.login.items.fullName = action.payload.fullName;
      state.login.items.avatarUrl = action.payload.avatarUrl;
    }
  },
  extraReducers: {
    [registrationTC.pending]: (state) => {
      state.registration.items = {};
      state.registration.status = "registration";
    },
    [registrationTC.fulfilled]: (state, action) => {
      state.registration.items = action.payload;
      state.registration.status = "registered";
      state.authMe.isAuth = true;
    },
    [registrationTC.rejected]: (state, action) => {
      state.registration.items = {};
      state.registration.error = action.error.message;
      state.registration.status = action.payload;
    },
    [loginTC.pending]: (state) => {
      state.login.items = {};
      state.login.status = "loading";
    },
    [loginTC.fulfilled]: (state, action) => {
      state.login.items = action.payload;
      state.login.status = "success";
      state.authMe.isAuth = true;
    },
    [loginTC.rejected]: (state, action) => {
      state.login.items = {};
      state.login.status = action.payload;
      state.login.error = action.error.message;
    },
    [authMeTC.pending]: (state) => {
      state.login.items = {};
      state.login.status = "loading";
    },
    [authMeTC.fulfilled]: (state, action) => {
      state.login.items = action.payload;
      state.login.status = "success";
      state.authMe.isAuth = true;
    },
    [authMeTC.rejected]: (state) => {
      state.login.items = {};
      state.authMe.status = "error";
    }
  }
});


export const { logoutAC, updateUserStateAC } = userSlice.actions;
export const userReducer = userSlice.reducer;