// Use throughout your app instead of plain `useDispatch` and `useSelector`
import {AppDispatch, StateAppType} from "../store/redux-store";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<StateAppType> = useSelector