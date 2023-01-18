import { configureStore } from '@reduxjs/toolkit'
import mainReducer from './MainSlice'

export default configureStore({
  reducer: {
    main : mainReducer
  },
})