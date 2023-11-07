import React, { Suspense } from 'react'
import { Link, useRoutes } from 'react-router-dom'
import { shallowEqual } from 'react-redux'
import { useAppSelector } from '@/store'
import routes from './router'

function App() {
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.demo.count,
      message: state.demo.message
    }),
    shallowEqual
  )
  return (
    <div className="App">
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的</Link>
        <Link to="/focus">关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <h2>
        {count}-{message}
      </h2>
      <div className="main">
        <Suspense fallback="loading">{useRoutes(routes)}</Suspense>
      </div>
    </div>
  )
}

export default App
