import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  stageItem: null,
  recommendation: null,
}

const stageSlice = createSlice({
  name: "stage",
  initialState,
  reducers: {
    setStageItem(state, action) {
      state.stageItem = action.payload
      console.log("플레이 정보 저장 완료")
    },
    setRecommendation(state, action) {
      state.recommendation = action.payload
      console.log("추천 놀이 저장 완료")
    }
  },
})

export const { setStageItem, setRecommendation} = stageSlice.actions
export default stageSlice.reducer
