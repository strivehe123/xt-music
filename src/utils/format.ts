export function formatCount(current: number) {
  if (current > 1000000000) {
    return `${Math.floor(current / 100000000)}亿`
  } else if (current > 100000) {
    return `${Math.floor(current / 10000)}万`
  } else {
    return current
  }
}
export function getImageSize(imgUrl: string, width: number, height: number = width) {
  return imgUrl + `?param=${width}x${height}`
}
export function getPlayUrl(id: string) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
export function formatTime(current: number) {
  const currentSeconds = current / 1000
  const minute = Math.floor(currentSeconds / 60) + ''
  const second = (Math.floor(currentSeconds) % 60) + ''
  return `${minute.padStart(2, '0')}:${second.padStart(2, '0')}`
}
