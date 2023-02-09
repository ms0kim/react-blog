import { configureStore } from "@reduxjs/toolkit";
import toastReducer from "./toastSlice";
import authReducer from "./authSlice";


//리덕스 기본 사용법
export const store = configureStore({
  reducer: {
    toast: toastReducer,
    auth: authReducer
  },
})