import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from './auth'
import {appSlice} from './App'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    app:  appSlice.reducer,
  },
})