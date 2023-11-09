import { getBanners, getHotRecommend, getNewAlbum, getRankList } from '@/services/modules/recommend'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
interface IInitialState {
  banners: any[]
  hotRecommends: any[]
  newalbums: any[]
  ranklist: any[]
}
const initialState: IInitialState = {
  banners: [],
  hotRecommends: [],
  newalbums: [],
  ranklist: []
}
export const fetchRecommendDataAction = createAsyncThunk(
  'recommend/fetchdata',
  (args, { dispatch }) => {
    // 获取轮播图数据
    getBanners().then((res) => {
      dispatch(changeBannersAction(res.banners))
    })
    // 获取热门推荐数据
    getHotRecommend(8).then((res) => {
      dispatch(changeRecommendAction(res.result))
    })
    // 获取新碟数据
    getNewAlbum().then((res) => {
      dispatch(changeNewAlbumsAction(res.albums))
    })
  }
)
export const fethRankListDataAction = createAsyncThunk('fetchrankdata', (args, { dispatch }) => {
  const ids = ['19723756', '3779629', '2884035']
  const promise_list: Promise<any>[] = []
  for (const id of ids) {
    promise_list.push(getRankList(id))
  }
  Promise.all(promise_list).then((res) => {
    const playlist = res.map((item) => item.playlist)
    dispatch(changeRankingListAction(playlist))
  })
})
const recommendReducer = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannersAction(state, { payload }: PayloadAction<any[]>) {
      state.banners = payload
    },
    changeRecommendAction(state, { payload }: PayloadAction<any[]>) {
      state.hotRecommends = payload
    },
    changeNewAlbumsAction(state, { payload }) {
      state.newalbums = payload
    },
    changeRankingListAction(state, { payload }) {
      state.ranklist = payload
    }
  }
})
export const {
  changeBannersAction,
  changeRecommendAction,
  changeNewAlbumsAction,
  changeRankingListAction
} = recommendReducer.actions
export default recommendReducer.reducer
