import { configureStore } from "@reduxjs/toolkit"
import { bookApi } from "../features/Books/BookApi"
import { borrowApi } from "../features/Borrow/borrowApi"


export const store = configureStore({
  reducer:{
    [bookApi.reducerPath]: bookApi.reducer,
    [borrowApi.reducerPath]:borrowApi.reducer
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
   .concat(bookApi.middleware)
  .concat(borrowApi.middleware)
})
