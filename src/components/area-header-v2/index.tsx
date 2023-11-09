import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { AreaHeaderWrapper } from './style'
interface IProps {
  children?: ReactNode
  title?: string
  moreLink?: string
  moreTitle?: string
}
const AreaHeader: FC<IProps> = (props) => {
  const { title = '默认标题', moreLink, moreTitle } = props
  return (
    <AreaHeaderWrapper>
      <h3 className="title">{title}</h3>
      {moreLink && moreTitle && <a href="#/discover/artist">查看全部&gt;</a>}
    </AreaHeaderWrapper>
  )
}

export default memo(AreaHeader)
