import React, { Suspense, memo } from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from './c-cpns/nav-bar'
const Discover = memo(() => {
  return (
    <div>
      <NavBar />
      <Suspense fallback="">
        <Outlet />
      </Suspense>
    </div>
  )
})
Discover.displayName = 'Discover'
export default Discover
