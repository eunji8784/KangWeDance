import { configureStore } from "@reduxjs/toolkit"
import exampleSlice from "./exampleSlice"
import userSlice from "./userSlice"

const store = configureStore({
  reducer: {
    userState: userSlice,
  },
})

export default store