import { configureStore } from "@reduxjs/toolkit";
import { todoSlice } from "../components/Todo/TodoSlice";

export const store = configureStore({
  reducer: {
    totos: todoSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
