import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { SettleArtistWrapper } from './style'
import AreaHeaderV2 from '@/components/area-header-v2'
import { useAppSelector } from '@/store'
import { getImageSize } from '@/utils/format'
interface IProps {
  children?: ReactNode
}
const SettleArtist: FC<IProps> = () => {
  // 定义内部数据
  const { artists } = useAppSelector((state) => ({
    artists: state.recommend.artists
  }))
  return (
    <SettleArtistWrapper>
      <AreaHeaderV2 title="入驻歌手" moreLink="#/discover/artist" moreTitle="查看全部&gt" />
      <div className="singer-list">
        {artists.map((item) => {
          return (
            <a href="/singer" key={item.id} className="item">
              <img src={getImageSize(item.img1v1Url, 62)} alt="" />
              <div className="info">
                <div className="title">{item.alias.join('') || item.name}</div>
                <div className="name">{item.name}</div>
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply-for">
        <a href="/abc">申请成为网易音乐人</a>
      </div>
    </SettleArtistWrapper>
  )
}

export default memo(SettleArtist)
