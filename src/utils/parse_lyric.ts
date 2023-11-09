interface ILyric {
  time: number
  text: string
}
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export function parse_lyric(current: string) {
  const lyric_list: ILyric[] = []
  const _ = current.split('\n')
  for (const line of _) {
    const result = timeRegExp.exec(line)
    if (!result) continue
    const m_time = Number(result[1]) * 60 * 1000
    const s_time = Number(result[2]) * 1000
    const ms_time = result[3].length === 3 ? Number(result[3]) : Number(result[3]) * 10
    const time = m_time + s_time + ms_time
    const text = line.replace(timeRegExp, '')
    lyric_list.push({ time, text })
  }
  return lyric_list
}
