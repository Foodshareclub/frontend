import {combineReducers, configureStore} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
export type StateAppType = ReturnType<typeof reducersBox>
const reducersBox = combineReducers({

})
const store =configureStore({
    reducer:reducersBox,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppDispatch = typeof store.dispatch

export default store