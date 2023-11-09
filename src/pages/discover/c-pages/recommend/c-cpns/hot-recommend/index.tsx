import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { HotRecommendWrapper } from './style'
import { useAppSelector } from '@/store'
import AreaHeaderV1 from '@/components/area-header-v1'
import SongItemV1 from '@/components/song-item-v1'
interface IProps {
  children?: ReactNode
}
const HotRecommend: FC<IProps> = () => {
  const { hotRecommends } = useAppSelector((state) => ({
    hotRecommends: state.recommend.hotRecommends
  }))
  return (
    <HotRecommendWrapper>
      <AreaHeaderV1
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        title="热门推荐"
        moreLink="/discover/song"
      />
      <div className="recommend-list">
        {hotRecommends?.map((item) => <SongItemV1 key={item.id} itemData={item} />)}
      </div>
    </HotRecommendWrapper>
  )
}

export default memo(HotRecommend)
