import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  num: 0,
  pageNum:1
}

const photoSlice = createSlice({
  name: "photo",
  initialState,
  reducers: {
    photoNum(state, actions){
      state.num = state.num - 1
    },
    photoPageNum(state, actions){
      state.pageNum = state.pageNum + 1
    }
  },
})

export const {photoNum, photoPageNum} = photoSlice.actions
export default photoSlice.reducer
