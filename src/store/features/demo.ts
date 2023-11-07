import { createSlice } from '@reduxjs/toolkit'
const demoSlice = createSlice({
  name: 'demo',
  initialState: {
    count: 100,
    message: 'hello @redux/toolkit'
  },
  reducers: {}
})
export default demoSlice.reducer
