import { createSlice, PayloadAction } from '@reduxjs/toolkit'
interface IInitialState {
  count: number
  message: string
  direction: 'left' | 'right' | 'up' | 'down'
}
const initialState: IInitialState = {
  count: 100,
  message: 'hellow',
  direction: 'left'
}
const demoSlice = createSlice({
  name: 'demo',
  initialState,
  reducers: {
    changeMessageAction(state, { payload }: PayloadAction<string>) {
      state.message = payload
    }
  }
})
export const { changeMessageAction } = demoSlice.actions
export default demoSlice.reducer
