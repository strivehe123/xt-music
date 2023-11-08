import { configureStore } from '@reduxjs/toolkit'
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'
import demoReducer from './features/demo'
import recommendReducer from './features/recommend'
const store = configureStore({
  reducer: {
    demo: demoReducer,
    recommend: recommendReducer
  }
})
type GetStateFnType = typeof store.getState
type IRootState = ReturnType<GetStateFnType>
type DispatchType = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector
export const useAppDispatch: () => DispatchType = useDispatch
export default store
