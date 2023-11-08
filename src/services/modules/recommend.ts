import hyRequest from '@/services'

// 轮播图
export function getBanners() {
  return hyRequest.get({
    url: '/banner'
  })
}
