import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import type { FC, ReactNode } from 'react'
import { AreaHeaderWrapper } from './style'
interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}
const AreaHeaderV1: FC<IProps> = (props) => {
  const { title = '默认标题', keywords = [], moreText = '更多', moreLink = '/' } = props
  return (
    <AreaHeaderWrapper className="sprite_02">
      <div className="left">
        <h3 className="title">{title}</h3>
        <div className="keyword">
          {keywords.map((item) => (
            <div className="item" key={item}>
              <span className="link">{item}</span>
              <span className="divider">|</span>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <Link to={moreLink} className="more">
          {moreText}
        </Link>
        <i className="sprite_02 icon"></i>
      </div>
    </AreaHeaderWrapper>
  )
}

export default memo(AreaHeaderV1)
