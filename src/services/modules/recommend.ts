import hyRequest from '@/services'

// 轮播图
export function getBanners() {
  return hyRequest.get({
    url: '/banner'
  })
}
// 热门推荐
export function getHotRecommend(limit = 30) {
  return hyRequest.get({
    url: '/personalized',
    params: {
      limit
    }
  })
}
// 新碟上架
export function getNewAlbum(limit = 10) {
  return hyRequest.get({
    url: '/album/newest',
    params: {
      limit
    }
  })
}

// 飙升榜
export function getRankList(id: string) {
  return hyRequest.get({
    url: '/playlist/detail',
    params: {
      id
    }
  })
}

// 获取歌手列表 5个
export function getArtistList(limit = 5) {
  return hyRequest.get({
    url: '/artist/list',
    params: {
      limit
    }
  })
}
