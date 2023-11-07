import React, { Suspense, memo } from 'react'
import { Link, Outlet } from 'react-router-dom'

const Discover = memo(() => {
  return (
    <div>
      <h2>discover</h2>
      <Link to="/discover/recommend">推荐</Link>
      <Link to="/discover/songs">歌曲</Link>
      <Link to="/discover/album">唱片</Link>
      <Link to="/discover/artist">歌手</Link>
      <Link to="/discover/djradio">dj电台</Link>
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
})
Discover.displayName = 'Discover'
export default Discover
