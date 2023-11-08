import { getBanners } from '@/services/modules/recommend'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface IInitialState {
  banners: any[]
}
const initialState: IInitialState = {
  banners: []
}
export const fetchRecommendDataAction = createAsyncThunk(
  'recommend/fetchdata',
  (args, { dispatch }) => {
    // 获取轮播图数据
    getBanners().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
  }
)
const recommendReducer = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }: PayloadAction<any[]>) {
      state.banners = payload
    }
  }
})
export const { changeBannersAction } = recommendReducer.actions
export default recommendReducer.reducer
