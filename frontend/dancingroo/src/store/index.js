import { configureStore } from "@reduxjs/toolkit"
import exampleSlice from "./exampleSlice"

const store = configureStore({
  reducer: {
    example: exampleSlice,
  },
})

export default store
