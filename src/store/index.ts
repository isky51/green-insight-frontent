import { configureStore } from '@reduxjs/toolkit'
import authDataReducer from "./auth/authDataSlice"
import homeReducer from "./home/homeSlice"
import { logger } from 'redux-logger'

const middleware: any = []

middleware.push(logger)
const store = configureStore({
  reducer: {
    auth: authDataReducer,
    home: homeReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false
  }).concat(middleware),
},

)

export default store;