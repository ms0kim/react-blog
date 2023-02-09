import { createSlice } from "@reduxjs/toolkit";

//state
const initialState = {
  toasts: []
};

const toastSlice = createSlice({
  name: 'toast',
  initialState: initialState,

  reducers: {
    addToast: (state, action) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(toast => {
        return toast.id !== action.payload;
      })
    }
  }
})

export const { addToast, removeToast } = toastSlice.actions;

export default toastSlice.reducer;