import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '@/services/modules/player'
import { parse_lyric } from '@/utils/parse_lyric'
import type { IRootState } from '@/store'
interface IPlayerInitialState {
  currentSong: any
  currentLyric: any
  currentLyricIndex: number
  playList: any[]
  playListIndex: number
  playMode: number
}
const initialState: IPlayerInitialState = {
  currentSong: {},
  currentLyric: [],
  currentLyricIndex: -1,
  playList: [],
  playListIndex: -1,
  playMode: 0 //0： 顺序 1： 随机 2：单曲
}

const playSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSong(state, { payload }) {
      state.currentSong = payload
    },
    changeCurrentLyric(state, { payload }) {
      state.currentLyric = payload
    },
    changeCurrentLyricIndex(state, { payload }) {
      state.currentLyricIndex = payload
    },
    changePlayListIndex(state, { payload }) {
      state.playListIndex = payload
    },
    changePlayList(state, { payload }) {
      state.playList = payload
    },
    changePlayMode(state, { payload }) {
      state.playMode = payload
    }
  }
})
export const fetchSongDetail = createAsyncThunk<void, number, { state: IRootState }>(
  'player/currentSong',
  (ids, { dispatch, getState }) => {
    // 0 查看当前歌曲是否在播放列表中
    const playSongList = getState().player.playList
    const finexIndex = playSongList.findIndex((item) => item.id === ids)
    if (finexIndex === -1) {
      // 获取歌曲信息
      getSongDetail(ids).then((res) => {
        const song = res.songs[0]
        // 将 song 放到playlist 中
        const newPlayList = [...playSongList]
        newPlayList.push(song)
        dispatch(changePlayList(newPlayList))
        dispatch(changeCurrentSong(song))
        dispatch(changePlayListIndex(newPlayList.length - 1))
      })
    } else {
      const song = playSongList[finexIndex]
      dispatch(changeCurrentSong(song))
      dispatch(changePlayListIndex(finexIndex))
    }
    // 获取歌词信息
    getSongLyric(ids).then((res) => {
      if (res.lrc && res.lrc.lyric) {
        const lyric = res.lrc.lyric
        const _ = parse_lyric(lyric)
        dispatch(changeCurrentLyric(_))
      }
    })
  }
)
export const changeCurrentSongAction = createAsyncThunk<void, boolean, { state: IRootState }>(
  'player/changeCurrentSong',
  (isNext, { dispatch, getState }) => {
    // 1 获取state中的数据
    const player = getState().player
    const playMode = player.playMode
    const songIndex = player.playListIndex
    const songList = player.playList
    // 2 根据不同的播放模式 计算下一首歌曲的索引
    let newIndex = songIndex

    if (playMode === 1) {
      // 随机播放
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex = isNext ? newIndex + 1 : newIndex - 1
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }
    // 3 获取当前的歌曲
    const song = songList[newIndex]

    dispatch(changeCurrentSong(song))
    dispatch(changePlayListIndex(newIndex))
    // 4 请求新的歌词
    getSongLyric(song.id).then((res) => {
      if (res.lrc && res.lrc.lyric) {
        const lyric = res.lrc.lyric
        const _ = parse_lyric(lyric)
        dispatch(changeCurrentLyric(_))
      }
    })
  }
)
export const {
  changeCurrentSong,
  changeCurrentLyric,
  changeCurrentLyricIndex,
  changePlayListIndex,
  changePlayList,
  changePlayMode
} = playSlice.actions
export default playSlice.reducer
