import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    fetcher:fetchReducer,
  }
  
})
