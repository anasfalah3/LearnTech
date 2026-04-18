import { useEffect } from 'react'
import AppRouter from './router/AppRouter'
import { useAuth } from './hooks/useAuth'

export default function App() {
  const { token, refreshUser } = useAuth()

  useEffect(() => {
    if (token) {
      refreshUser()
    }
  }, [token])

  return <AppRouter />
}