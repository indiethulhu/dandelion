import { lazy, createElement } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Login = lazy(() => import('./pages/Login'))

export const createRoutes = (token: string | null): RouteObject[] => [
  {
    path: '/',
    element: token ? createElement(Navigate, { to: '/dashboard' }) : createElement(Login),
  },
  {
    path: '/dashboard',
    element: token ? createElement(Dashboard) : createElement(Navigate, { to: '/' }),
  }
]