import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './pages/player/app-play-bar'
import { useAppDispatch } from './store'
import { fetchSongDetail } from './store/features/player'
function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchSongDetail(1501224498))
  }, [])
  return (
    <div className="App">
      <AppHeader />
      <div className="main">
        <Suspense fallback="loading">{useRoutes(routes)}</Suspense>
      </div>
      <AppFooter />
      <AppPlayerBar />
    </div>
  )
}

export default App
