import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {productAPI, ProductObjType} from "../../api/productAPI";
import {ImgUrlType, profileAPI, UploadImgUrlType} from "../../api/profileAPI";


export type InitialProductStateType = {

    created_att: string
    five_star: null
    four_star: null
    gif_url: string
    gif_url_2: string
    gif_url_3: string
    id: number
    locations: { _latitude: number, _longitude: number }
    pickup_time: string
    post_address: string
    post_arranged: boolean
    post_description: string
    post_like_counter: number
    post_metro_station: string
    post_name: string
    post_type: string
    post_unpublished: boolean
    post_views: number
    user: string
}

const initialState = {
    products: [] as Array<InitialProductStateType>,
    currentUserProducts: [] as Array<InitialProductStateType>,
    isUpdatedProductsList: false,
    postImgUrl: '',//сюда прийдет массив а не строка
    isPostImgUpload: false
};

export const getAllProductsTC = createAsyncThunk("/product/getAllProducts", async (arg, thunkAPI) => {
    try {
        const {data, error} = await productAPI.getAllProducts();
        if (error) throw error;
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getProductTC = createAsyncThunk("/getProduct", async (productType: string, thunkAPI) => {
    try {
        const {data, error} = await productAPI.getProduct(productType);
        if (error) throw error;
        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const getCurrentUserProductsTC = createAsyncThunk('/getCurrentUserProducts', async (userID: string, thunkAPI) => {
    try {
        const {data, error} = await productAPI.getCurrentUserProduct(userID);

        if (error) throw error;

        return data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const createProductTC = createAsyncThunk('/createProductTC', async (productObj: ProductObjType, thunkAPI) => {
    try {
        const {error} = await productAPI.createProduct(productObj)
        // if (error) {
        //     throw error;
        // }
        return error;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});

export const deleteProductTC = createAsyncThunk('/deleteProductTC', async (productID: number, thunkAPI) => {
    try {
        const {error} = await productAPI.deleteProduct(productID);
        return error;
    } catch (e) {
        return thunkAPI.rejectWithValue(e);
    }
});
export const downloadPostImgFromDBTC = createAsyncThunk("/auth/downloadPostImgFromDBTC", async (imgValue: ImgUrlType) => {
    try {
        const {data, error} = await profileAPI.downloadImgFromDB(imgValue)
        if (error) {
            throw error
        }
        console.log(URL.createObjectURL(data))
        return URL.createObjectURL(data)
    } catch (error: any) {
        console.log('Error downloading image: ', error.message)
    }
})

export const uploadPostImgToDBTC = createAsyncThunk("/auth/uploadPostImgToDBTC", async (imgValue: UploadImgUrlType, thunkAPI) => {
    try {

        const {error} = await profileAPI.uploadImgFromDB(imgValue)
        if (error) {
            throw error
        }
    } catch (error: any) {
        thunkAPI.rejectWithValue(error.message)
    }
})
export const updateProductTC = createAsyncThunk("/auth/updateProductTC", async (updates: ProductObjType, thunkAPI) => {
    try {
        let {error} = await productAPI.updateProduct(updates)
        return error
    } catch (error: any) {
        thunkAPI.rejectWithValue(error.message)
    }
})
const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProductsTC.fulfilled, (state, action) => {
            state.products = action.payload;
        });
        builder.addCase(getProductTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.products = action.payload;
            }
        });
        builder.addCase(getCurrentUserProductsTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.currentUserProducts = action.payload;
            }
        });
        builder.addCase(createProductTC.fulfilled, (state, action) => {
            if (!action.payload?.message) {
                state.isUpdatedProductsList = !state.isUpdatedProductsList;
            }

            // create error handler to show error  ////////////////////////////////

            // state.isCreated = true;
            // console.log('true')
            // if (!action.payload?.message) {
            //     state.isCreated = true;
            //     console.log('true')
            // }
        });
        builder.addCase(downloadPostImgFromDBTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.postImgUrl = action.payload
            }
        });
        builder.addCase(uploadPostImgToDBTC.fulfilled, (state) => {
            state.isPostImgUpload = true

        });
        builder.addCase(deleteProductTC.fulfilled, (state, action) => {
            if (!action.payload?.message) {
                state.isUpdatedProductsList = !state.isUpdatedProductsList;
            }
        });
        builder.addCase(updateProductTC.fulfilled, (state, action) => {
            if (!action.payload?.message) {
                state.isUpdatedProductsList = !state.isUpdatedProductsList;
            }
        });

    }
})

export const productReducer = productSlice.reducer;