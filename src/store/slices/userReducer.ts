import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
    AddressType,
    AllValuesType,
    AuthPayload,
    CountryType,
    ImgUrlType,
    profileAPI,
    ProviderType,
    UploadImgUrlType
} from "@/api/profileAPI";
import {Session, User} from "@supabase/supabase-js";
import {supabase} from "@/supaBase.config";
import {StatusType} from "@/components/alert/AlertComponent";


const initialState = {
    login: {} as User,
    registration: {} as User,
    user: {} as User,
    userAddress: {} as AddressType,
    userCountries: [] as Array<CountryType>,
    isRegister: false,
    isAuth: false,
    session: {
        user: {
            user_metadata: {}
        }
    } as Session,
    isLoading: false,
    value: {} as AllValuesType,
    imgUrl: '',
    isUpdateProfile: "info" as StatusType,
    language: "en",
    message: ""
};

export const loginTC = createAsyncThunk("/auth/loginTC", async ({email, password}: AuthPayload, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.loginWithPass(email, password)
        if (error) {
            console.error(error);
            return thunkAPI.rejectWithValue(error);
        }
        return data.user
    } catch (e: any) {
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
});

export const loginWithOtpTC = createAsyncThunk("/auth/loginWithOtpTC", async (email: string, thunkAPI) => {
    try {
        const {data, error} = await supabase.auth.signInWithOtp({email});
        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }

        return data.user
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e)
    }
});

export const signInWithProviderTC = createAsyncThunk("/auth/signInWithGoogleTC", async (provider: ProviderType, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.signInWithProvider(provider);
        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
        return data
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e)
    }
});

export const loginWithPhoneOtpTC = createAsyncThunk("/auth/loginWithPhoneOtpTC", async ({
                                                                                            phone,
                                                                                            password
                                                                                        }: AuthPayload, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.loginWithPhone(phone as string, password);
        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
        // return data.user
    } catch (e: any) {
        return thunkAPI.rejectWithValue(e)
    }
});

export const registerTC = createAsyncThunk("/auth/registerTC", async ({
                                                                          email,
                                                                          password,
                                                                          firstName,
                                                                          lastName
                                                                      }: AuthPayload, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.registration({email, password, firstName, lastName})

        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
        return data.user
    } catch (e: any) {
        console.log(e)
    }
});

export const logoutTC = createAsyncThunk("/auth/logoutTC", async (_, thunkAPI) => {
    try {
        const {error} = await profileAPI.logOut()
        if (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error);
        }

    } catch (e) {
        console.log(e)
    }
});

export const getUserFromDBTC = createAsyncThunk("/auth/getUserFromDBTC", async (userId:string, thunkAPI) => {
    try {
        thunkAPI.dispatch(userActions.isLoading(true))
        let {data, error, status} = await profileAPI.getValue(userId)
        if (error && status !== 406) {
            console.log(error)
        }
        if (data) {
            return data
        }
    } catch (error: any) {
        alert(error.message)
    } finally {
        thunkAPI.dispatch(userActions.isLoading(false))
    }
});
export const getAddressProfileTC = createAsyncThunk("/auth/getAddressProfileTC", async (userId: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(userActions.isLoading(true))
        const {data, error, status} = await profileAPI.getUserAddress(userId)
        if (error) {
            console.log(error);
            console.log(status);
            return thunkAPI.rejectWithValue(error);
        }
        if (data) {
            //console.log(data)
            return data[0]
        }
    } catch (e: any) {
        thunkAPI.rejectWithValue(e.message)
    }finally {
        thunkAPI.dispatch(userActions.isLoading(false))
    }
})
export const getAllCountriesTC = createAsyncThunk("/auth/getAllCountriesTC", async (_, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.getAllCountries();
        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
        if (data) {
            //console.log(data)
            return data
        }
    } catch (e: any) {
        thunkAPI.rejectWithValue(e.message)
    }
})
export const downloadImgFromDBTC = createAsyncThunk("/auth/downloadImgFromDBTC", async (imgValue: ImgUrlType, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.downloadImgFromDB(imgValue)
        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
        if (data) {
            return URL.createObjectURL(data)
        }
    } catch (error: any) {
        console.log('Error downloading image: ', error.message)
    }
})

export const uploadImgToDBTC = createAsyncThunk("/auth/uploadImgToDBTC", async (imgValue: UploadImgUrlType, thunkAPI) => {
    try {
        const {error} = await profileAPI.uploadImgFromDB(imgValue)
        if (error) {
            console.log(error)
            return thunkAPI.rejectWithValue(error);
        }
    } catch (error: any) {
        thunkAPI.rejectWithValue(error.message)
    }
})

export const updateProfileTC = createAsyncThunk("/auth/updateProfileTC", async (updates: AllValuesType, thunkAPI) => {
    try {
        thunkAPI.dispatch(userActions.isLoading(true))
        let {error} = await profileAPI.updateProfile(updates)
        if (error) {
            thunkAPI.dispatch(userActions.isUpdateProfile("error"));
            return thunkAPI.rejectWithValue(error);
        }
        // return "success"//
        return {isUpdateProfile: "success" as StatusType, message: "Profile is updated successful"}
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    } finally {
        thunkAPI.dispatch(userActions.isLoading(false))
    }
})
export const updateAddressTC = createAsyncThunk("/auth/updateAddressTC", async (addressObject:AddressType, thunkAPI) => {
    try {
        thunkAPI.dispatch(userActions.isLoading(true))
        let {error} = await profileAPI.updateAddress(addressObject)
        if (error) {
            thunkAPI.dispatch(userActions.isUpdateProfile("error"));
            return thunkAPI.rejectWithValue(error);
        }
        // return "success"//
        return {isUpdateProfile: "success" as StatusType, message: "Address is updated successful"}
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    } finally {
        thunkAPI.dispatch(userActions.isLoading(false))
    }
})

export const recoveryPasswordTC = createAsyncThunk("/auth/recoveryPasswordTC", async (email: string, thunkAPI) => {
    try {
        const {data, error} = await profileAPI.recoveryPassword(email);
        if (error) {
            console.error(error)
            return thunkAPI.rejectWithValue(error);
        }
        return data;
    } catch (e: any) {
        thunkAPI.rejectWithValue(e.message)
    }
})

export const senNewPasswordTC = createAsyncThunk("/senNewPasswordTC", async (password: string, thunkAPI) => {
    /// не вносил в extraReducers

    try {
        const {data, error} = await profileAPI.setNewPassword(password);
        if (error) {
            console.error(error)
            return thunkAPI.rejectWithValue(error);
        }
        return data;
    } catch (e: any) {
        thunkAPI.rejectWithValue(e.message)
    }

})

const userSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getSession: (state, action) => {
            if (action.payload) {
                state.isRegister = true
                state.isAuth = true
                state.session = action.payload
            }
        },
        isLoading: (state, action) => {
            state.isLoading = action.payload
        },
        isUpdateProfile: (state, action) => {
            state.isUpdateProfile = action.payload
        },
        changeLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuth = true
                state.isRegister = true
                state.login = action.payload
            }
        });
        builder.addCase(loginTC.rejected, (state, action) => {
            // @ts-ignore

        });
        builder.addCase(signInWithProviderTC.fulfilled, (state, action) => {
            console.log(action.payload)
        });
        builder.addCase(loginWithOtpTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isAuth = true
                state.isRegister = true
                state.login = action.payload

            }
        });
        builder.addCase(registerTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.isRegister = true
                state.registration = action.payload
            }
        });
        builder.addCase(getUserFromDBTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.value = action.payload
            }
        });
        builder.addCase(getAddressProfileTC.fulfilled, (state, action) => {
            state.userAddress = action.payload
        });
        builder.addCase(getAllCountriesTC.fulfilled, (state, action) => {
            // @ts-ignore
            state.userCountries = action.payload
        });
        builder.addCase(downloadImgFromDBTC.fulfilled, (state, action: PayloadAction<string | undefined, string, { arg: ImgUrlType; requestId: string; requestStatus: "fulfilled"; }, never>) => {
            if (action.payload) {
                if (action.payload) {
                    state.imgUrl = action.payload
                }
            }
        });
        builder.addCase(uploadImgToDBTC.fulfilled, (state) => {

        });
        builder.addCase(updateProfileTC.fulfilled, (state, action) => {
            state.isUpdateProfile = action.payload.isUpdateProfile;
            state.message = action.payload.message
        });
        builder.addCase(updateProfileTC.rejected, (state, action) => {
            state.message = "Something was wrong!"
        });
        builder.addCase(updateAddressTC.fulfilled, (state, action) => {
            state.isUpdateProfile = action.payload.isUpdateProfile;
            state.message = action.payload.message
        });
        builder.addCase(updateAddressTC.rejected, (state, action) => {
            state.message = "Something was wrong!"
        });

        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isAuth = false;
            state.isRegister = false;
            state.value = {} as AllValuesType
            state.login = {} as User
            state.registration = {} as User
            state.imgUrl = ''
        });
        builder.addCase(recoveryPasswordTC.fulfilled, (state, action) => {
            console.log(action.payload);
        })
    }
});
export const {reducer: userReducer, actions: userActions} = userSlice
