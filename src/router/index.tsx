import React, { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
const Discover = lazy(() => import('@/pages/discover'))
const Focus = lazy(() => import('@/pages/focus'))
const Download = lazy(() => import('@/pages/download'))
const Mine = lazy(() => import('@/pages/mine'))
const Album = lazy(() => import('@/pages/discover/c-pages/album'))
const Songs = lazy(() => import('@/pages/discover/c-pages/songs'))
const Artist = lazy(() => import('@/pages/discover/c-pages/artist'))
const Recommend = lazy(() => import('@/pages/discover/c-pages/recommend'))
const Djradio = lazy(() => import('@/pages/discover/c-pages/djradio'))
const routes: RouteObject[] = [
  { path: '/', element: <Navigate to="/discover" /> },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />
      },
      {
        path: '/discover/recommend',
        element: <Recommend />
      },
      {
        path: '/discover/album',
        element: <Album />
      },
      {
        path: '/discover/artist',
        element: <Artist />
      },
      {
        path: '/discover/songs',
        element: <Songs />
      },
      {
        path: '/discover/djradio',
        element: <Djradio />
      }
    ]
  },
  { path: '/focus', element: <Focus /> },
  { path: '/download', element: <Download /> },
  { path: '/mine', element: <Mine /> }
]
export default routes
