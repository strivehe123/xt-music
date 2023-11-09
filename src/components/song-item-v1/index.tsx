import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { formatCount, getImageSize } from '@/utils/format'
import { SongItemWrapper } from './style'
interface IProps {
  children?: ReactNode
  itemData: any
}
const SongItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <SongItemWrapper>
      <div className="cover-top">
        <img src={getImageSize(itemData.picUrl, 140)} alt="" />
        <div className="cover sprite_covor">
          <div className="info sprite_covor">
            <span>
              <i className="sprite_icon headset"></i>
              <span className="count">{formatCount(itemData.playCount)}</span>
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="cover-bottom">{itemData.name}</div>
    </SongItemWrapper>
  )
}

export default memo(SongItem)
