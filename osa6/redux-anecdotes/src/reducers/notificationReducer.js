import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notiSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNoti(state, action){
      state = action.payload

      return state
    },
    hideNoti(){
      return initialState
    }
  }
})

export const notificationHandler = (notification, time) => {
  return dispatch => {
    dispatch(showNoti(notification))
    setTimeout(() => {
      dispatch(hideNoti())
    },time*1000)
  }
}

export const { showNoti, hideNoti } = notiSlice.actions
export default notiSlice.reducer