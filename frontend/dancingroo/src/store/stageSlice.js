import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  stageItem: null,
}

const stageSlice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    setStageItem(state, action) {
      state.stageItem = action.payload
      console.log("플레이 정보 저장 완료")
    },
  },
})

export const {setStageItem} = stageSlice.actions
export default stageSlice.reducer
