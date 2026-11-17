import React from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAuth } from '@mediahub/mediahub-ui/context/AuthContext'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isAuthChecked } = useAuth()
  const location = useLocation()

  if (!isAuthChecked) return null
  if (!user) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  return <>{children}</>
}

export default ProtectedRoute
