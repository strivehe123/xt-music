import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NewAlbumItemWrapper } from './style'
import { getImageSize } from '@/utils/format'
interface IProps {
  children?: ReactNode
  itemData: any
}
const NewAlbumItem: FC<IProps> = (props) => {
  // 定义内部数据
  const { itemData } = props
  return (
    <NewAlbumItemWrapper>
      <div className="album-image">
        <img src={getImageSize(itemData.picUrl, 100)} alt="" />
        <a href="" className="cover sprite_covor"></a>
      </div>
      <div className="album-info">
        <span className="name">{itemData.name}</span>
        <span className="artist">{itemData.artist.name}</span>
      </div>
    </NewAlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
