import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
interface IProps {
  children?: ReactNode
}
const Song: FC<IProps> = () => {
  return <div>Song</div>
}

export default memo(Song)
