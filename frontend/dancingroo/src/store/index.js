import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import stageSlice from "./stageSlice"

const store = configureStore({
  reducer: {
    userState: userSlice,
    stage: stageSlice,
  },
})

export default store