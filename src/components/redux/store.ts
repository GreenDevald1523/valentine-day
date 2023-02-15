import { combineReducers, configureStore } from "@reduxjs/toolkit"
import testSlice from "./slices/testSlice"
// ...

export const store = configureStore({
  reducer: {
    testSlice: testSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
