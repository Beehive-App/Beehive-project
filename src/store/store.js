import { configureStore } from '@reduxjs/toolkit'
import {authSlice} from './auth'
import { tasksSlice } from './Tasks'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    tasks:  tasksSlice.reducer,
  },
})