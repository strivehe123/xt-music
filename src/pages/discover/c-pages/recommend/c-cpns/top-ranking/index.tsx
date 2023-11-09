import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { TopRankingWrapper } from './style'
import AreaHeaderV1 from '@/components/area-header-v1'
import { useAppSelector } from '@/store'
import TopRankingItem from '../top-ranking-item'
import { shallowEqual } from 'react-redux'
interface IProps {
  children?: ReactNode
}
const TopRanking: FC<IProps> = () => {
  // 定义内部数据
  const { ranklist = [] } = useAppSelector(
    (state) => ({
      ranklist: state.recommend.ranklist
    }),
    shallowEqual
  )
  return (
    <TopRankingWrapper>
      <AreaHeaderV1 title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {ranklist.map((item) => (
          <TopRankingItem key={item?.id} itemData={item} />
        ))}
      </div>
    </TopRankingWrapper>
  )
}

export default memo(TopRanking)
