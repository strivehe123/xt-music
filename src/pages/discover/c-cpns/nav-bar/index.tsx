import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavBarWrapper } from './style'
import { discoverMenu } from '@/assets/data/local-data'
import { NavLink } from 'react-router-dom'
interface IProps {
  children?: ReactNode
}
const NabBar: FC<IProps> = () => {
  return (
    <NavBarWrapper>
      <div className="nav wrap-v1">
        {discoverMenu.map((item) => (
          <div className="item" key={item.link}>
            <NavLink to={item.link}>{item.title}</NavLink>
          </div>
        ))}
      </div>
    </NavBarWrapper>
  )
}

export default memo(NabBar)
