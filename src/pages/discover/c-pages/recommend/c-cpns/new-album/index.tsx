import React, { memo, useRef } from 'react'
import type { ElementRef, FC, ReactNode } from 'react'
import { Carousel } from 'antd'
import { NewAlbumWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import NewAlbumItem from '@/components/new-album-item'
interface IProps {
  children?: ReactNode
}
const NewAlbum: FC<IProps> = () => {
  // 定义内部数据
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const { newalbums } = useAppSelector((store) => ({
    newalbums: store.recommend.newalbums
  }))
  // 事件处理
  function handlePreClick() {
    console.log('prev')
    carouselRef.current?.prev()
  }
  function handleNextClick() {
    console.log('next')
    carouselRef.current?.next()
  }
  return (
    <NewAlbumWrapper>
      <AreaHeaderV1 title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <div className="sprite_02 arrow arrow-left" onClick={handlePreClick}></div>
        <div className="album">
          <Carousel ref={carouselRef} dots={false} speed={2000}>
            {[0, 1].map((item) => (
              <div key={item} className="album-list">
                {newalbums.slice(item * 5, (item + 1) * 5).map((album) => (
                  <NewAlbumItem key={album.id} itemData={album} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        <div className="sprite_02 arrow arrow-right" onClick={handleNextClick}></div>
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)
