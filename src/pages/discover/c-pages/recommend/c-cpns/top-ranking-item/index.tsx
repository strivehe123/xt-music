import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
import { useAppDispatch } from '@/store'
import { fetchSongDetail } from '@/store/features/player'
interface IProps {
  children?: ReactNode
  itemData: any
}
const TopRankingItem: FC<IProps> = (props) => {
  const { itemData } = props
  const { tracks = [] } = itemData
  const dispatch = useAppDispatch()
  function handlePlay(id: number) {
    dispatch(fetchSongDetail(id))
  }
  return (
    <TopRankingItemWrapper>
      <div className="header">
        <div className="image">
          <img src={getImageSize(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_cover"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <div className="sprite_02 btn play"></div>
            <div className="sprite_02 btn favor"></div>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks?.slice(0, 10).map((item: any, index: number) => (
          <div className="list-item" key={item.id}>
            <div className="rank">{index + 1}</div>
            <div className="info">
              <div className="name">{item.name}</div>
              <div className="operate">
                <div className="btn sprite_02 play" onClick={() => handlePlay(item.id)}></div>
                <div className="btn sprite_icon2 addto"></div>
                <div className="btn sprite_02 favor"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="footer">
        <a href="/#/discover/ranking">查看全部&gt;</a>
      </div>
    </TopRankingItemWrapper>
  )
}

export default memo(TopRankingItem)
