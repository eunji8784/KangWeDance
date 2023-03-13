import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  example: "example",
}

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    changeExample(state, action) {
      state.example = action.payload.exampleValue
    },
  },
})

export const exampleActions = exampleSlice.actions
export default exampleSlice.reducer
