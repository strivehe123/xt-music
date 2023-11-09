import React, { memo, useRef, useEffect, useState, useCallback } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqual } from 'react-redux'
import { AppPlayerBarWrapper, BarControl, BarInfo, BarOperator } from './style'
import { Link } from 'react-router-dom'
import { Slider, message } from 'antd'
import { useAppDispatch, useAppSelector } from '@/store'
import { formatTime, getImageSize, getPlayUrl } from '@/utils/format'

import {
  changeCurrentLyricIndex,
  changePlayMode,
  changeCurrentSongAction
} from '@/store/features/player'

interface IProps {
  children?: ReactNode
}
const AppPlayerBar: FC<IProps> = () => {
  // 定义内部数据
  const { currentSong, currentLyric, currentLyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      currentLyric: state.player.currentLyric,
      currentLyricIndex: state.player.currentLyricIndex,
      playMode: state.player.playMode
    }),
    shallowEqual
  )
  const dispatch = useAppDispatch()
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  useEffect(() => {
    audioRef.current!.src = getPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
    // 2 获取播放音乐的总时长
    setDuration(currentSong?.dt)
  }, [currentSong])
  // 控制播放和暂停
  const play = useCallback(() => {
    setIsPlaying(!isPlaying)
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch((err) => {
          console.log(err)
          setIsPlaying(false)
        })
  }, [isPlaying])
  function handleTimeUpdate() {
    // 1 获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000

    if (!isSliding) {
      // 2 计算播放进度
      const progress = Math.floor((currentTime / duration) * 100)
      // 3 设置进度条 和 当前播放时间
      setProgress(progress)
      setCurrentTime(currentTime)
      // 4 根据当前播放时间 匹配歌词
      let index = currentLyric.length - 1
      for (let i = 0; i < currentLyric.length; i++) {
        if (currentLyric[i].time > currentTime) {
          index = i - 1
          break
        }
      }
      if (index == currentLyricIndex || index == -1) return
      dispatch(changeCurrentLyricIndex(index))
      // 5 显示歌词
      message.open({
        key: 'lyric',
        duration: 0,
        content: currentLyric[index].text
      })
    }
  }
  function handleSlideChange(current: number) {
    // 1 获取点击位置的时间
    const currentTime = (current / 100) * duration
    // 2 设置当前播放时间
    audioRef.current!.currentTime = currentTime / 1000
    // 3 设置进度条
    setProgress(current)
    // 4 设置是否是拖拽状态
    setIsSliding(false)
  }
  function handleSlideChanging(current: number) {
    setIsSliding(true)
    setProgress(current)
  }
  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayMode(newPlayMode))
  }
  // 处理切换歌曲
  function handleChangeSong(isNext = true) {
    dispatch(changeCurrentSongAction(isNext))
  }
  // 处理歌曲播放完成后
  function handleTimeEnded() {
    if (playMode === 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeSong(true)
    }
  }
  return (
    <AppPlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isplaying={isPlaying}>
          <button
            className="sprite_playbar btn prev"
            onClick={() => handleChangeSong(false)}
          ></button>
          <button className="sprite_playbar btn play" onClick={play}></button>
          <button className="sprite_playbar btn next" onClick={() => handleChangeSong()}></button>
        </BarControl>
        <BarInfo>
          <Link to="/discover/player">
            <img className="image" alt="" src={getImageSize(currentSong?.al?.picUrl, 50)} />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
              <span className="sprite_playbar singer-link"></span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                step={0.5}
                onAfterChange={handleSlideChange}
                onChange={handleSlideChanging}
              />
              <div className="time">
                <span className="now-time">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="total-time">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarInfo>
        <BarOperator playmode={playMode}>
          <div className="left">
            <button className="btn pip icn-pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop" onClick={handleChangePlayMode}></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} onEnded={handleTimeEnded} />
    </AppPlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)
