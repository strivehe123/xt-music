import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import { BannerControl, BannerLeft, BannerRight, TopBannerSwipper } from './style'
import { useAppSelector } from '@/store'
interface IProps {
  children?: ReactNode
}
const TopBanner: FC<IProps> = () => {
  // 定义内部数据
  const [currentIndex, setCurrentIndex] = useState(0)
  const bannerRef = useRef<ElementRef<typeof Carousel>>(null)
  // 从存储中获取数据
  const { banners } = useAppSelector((state) => ({
    banners: state.recommend.banners
  }))
  // 定义事件处理的方法
  function handlePrev() {
    bannerRef.current?.prev()
  }
  function handleNext() {
    bannerRef.current?.next()
  }
  function handleChange(current: number) {
    setCurrentIndex(current)
  }
  // 获取背景图片

  let bgImageUrl = ''
  if (banners?.length > 0) {
    bgImageUrl = banners[currentIndex] && banners[currentIndex].imageUrl
  }

  if (bgImageUrl) {
    bgImageUrl = bgImageUrl + '?imageView&blur=40x20'
  }
  return (
    <TopBannerSwipper style={{ background: `url(${bgImageUrl}) center center / 6000px` }}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel autoplay ref={bannerRef} effect="fade" afterChange={handleChange} dots={false}>
            {banners?.map((item) => (
              <div className="banner-item" key={item.imageUrl}>
                <img className="image" src={item.imageUrl} alt={item.typeTitle} />
              </div>
            ))}
          </Carousel>
          <ul className="dots">
            {banners?.map((item) => (
              <li key={item.imageUrl}>
                <span className="item"></span>
              </li>
            ))}
          </ul>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={handlePrev}></button>
          <button className="btn right" onClick={handleNext}></button>
        </BannerControl>
      </div>
    </TopBannerSwipper>
  )
}

export default memo(TopBanner)
