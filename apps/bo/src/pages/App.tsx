import { Route, Routes, Navigate, useRoutes } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import { useSessionStore } from '../stores/session'
import { createRoutes } from '../routes'
import { Suspense } from 'react'

const App = () => {
  const token = useSessionStore(state => state.token)
  const routes = useRoutes(createRoutes(token))

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {routes}
    </Suspense>
  )
}

export default App
