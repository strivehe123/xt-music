import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { fetchRecommendDataAction } from '@/store/features/recommend'
import { RecommendWrapper } from './style'
import TopBanner from './c-cpns/top-banner'
interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommendDataAction())
  }, [])

  return (
    <RecommendWrapper>
      <TopBanner />
    </RecommendWrapper>
  )
}

export default memo(Recommend)
