import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./userSlice"
import stageSlice from "./stageSlice"
import photoSlice from "./photoSlice"

const store = configureStore({
  reducer: {
    userState: userSlice,
    stage: stageSlice,
    photo: photoSlice,
  },
})

export default store