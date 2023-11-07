import { configureStore } from '@reduxjs/toolkit'
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import demoReducer from './features/demo'
const store = configureStore({
  reducer: {
    demo: demoReducer
  }
})
type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export default store
