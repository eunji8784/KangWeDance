import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  num: 0,
}

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    photoNum(state, actions){
      state.num = state.num - 1
    },
  },
})

export const {photoNum} = photoSlice.actions
export default photoSlice.reducer
