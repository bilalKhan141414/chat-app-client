import { createSlice } from '@reduxjs/toolkit'
import Helpers from './../../shared/Helpers/general';


const initialState = { 
    isLoggedIn: Helpers.isUserLoggedIn() ? true : false,
 }

const authenticaton = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setAuthentication(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
})

export const { setAuthentication } = authenticaton.actions
export default authenticaton.reducer