import { createSlice } from "@reduxjs/toolkit"

const initialState = ""

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    newNotification(state, action) {
      return state = action.payload
    },
    clearNotification(state) {
      return state = ""
    }
  }
})

var timeoutID = 0

export const setNotification = (content, timeout) => {
  return dispatch => {
    dispatch(newNotification(content))
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}

export const { clearNotification, newNotification } = notificationSlice.actions
export default notificationSlice.reducer
