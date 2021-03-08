import { createSlice } from '@reduxjs/toolkit'

const initialState = { 
    video:{
        id:null,
        percentage:0,
        videoUrl:"",
    }
 }

const messages = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setUploadingVideoProgrees(state, action) {
      state.video.id = action.payload.id;
      state.video.percentage = action.payload.percentage;
      if(action.payload.percentage >= 100)
      state.video.videoUrl = action.payload.videoUrl;
    },
  },
})

export const { setUploadingVideoProgrees } = messages.actions
export default messages.reducer