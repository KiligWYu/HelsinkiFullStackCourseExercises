import { createSlice } from "@reduxjs/toolkit"

const filterReducer = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filter(state, action) {
      return state = action.payload
    }
  }
})

export const { filter } = filterReducer.actions
export default filterReducer.reducer
