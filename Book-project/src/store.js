import { configureStore } from '@reduxjs/toolkit'
import booksReducer from './slices/Books'
export const store = configureStore({
  reducer: {
    books: booksReducer,
  },
})
