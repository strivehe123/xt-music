import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { HeaderLeft, HeaderWrapper, HeaderRight } from './style'
import headerTitles from '@/assets/data/header-title.json'
interface IProps {
  children?: ReactNode
}
const AppHeader: FC<IProps> = () => {
  function showItem(item: any) {
    if (item.type === 'path') {
      return (
        <NavLink to={item.link}>
          {item.title}
          <i className="icon sprite_01"></i>
        </NavLink>
      )
    } else {
      return <a href={item.link}>{item.title}</a>
    }
  }
  return (
    <HeaderWrapper>
      <div className="content wrap-v1">
        <HeaderLeft>
          <a href="/" className="logo sprite_01">
            网易云音乐
          </a>
          <div className="select-list">
            {headerTitles.map((item) => {
              return (
                <div className="select-item " key={item.title}>
                  {showItem(item)}
                </div>
              )
            })}
          </div>
        </HeaderLeft>
        <HeaderRight>
          <Input prefix={<SearchOutlined />} placeholder="音乐/视频/电台" className="search" />
          <span className="center">创作中心</span>
          <span>登录</span>
        </HeaderRight>
      </div>
    </HeaderWrapper>
  )
}

export default memo(AppHeader)
