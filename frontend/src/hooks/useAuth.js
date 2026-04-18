import { useAuthStore } from '../store/authStore'
import {
      login as apiLogin,
      register as apiRegister,
      logout as apiLogout,
      me as apiGetCurrentUser,
} from '../api/authApi'

export const useAuth = () => {
      const { user, token, setAuth, logout: storeLogout, enrollCourses } = useAuthStore()

      const login = async (email, password) => {
            try {
                  const { user, token } = await apiLogin(email, password)
                  setAuth(user, token)
                  return { success: true }
            } catch (error) {
                  const payload = error?.payload
                  const message = payload?.message || error.message || 'Login failed'
                  const fieldErrors = payload?.errors || {}
                  const errors = Object.values(fieldErrors).flat()
                  return { success: false, error: message, errors, fieldErrors }
            }
      }

      const register = async (firstName, lastName, email, password) => {
            try {
                  const { user, token } = await apiRegister(firstName, lastName, email, password)
                  setAuth(user, token)
                  return { success: true }
            } catch (error) {
                  const payload = error?.payload
                  const message = payload?.message || error.message || 'Registration failed'
                  const fieldErrors = payload?.errors || {}
                  const errors = Object.values(fieldErrors).flat()
                  return { success: false, error: message, errors, fieldErrors }
            }
      }

      const logout = async () => {
            if (token) {
                  try {
                        await apiLogout(token)
                  } catch (error) {
                        // ignore backend logout errors and clear local state anyway
                  }
            }
            storeLogout()
      }

      const refreshUser = async () => {
            if (!token) {
                  return
            }

            try {
                  const currentUser = await apiGetCurrentUser(token)
                  setAuth(currentUser, token)
            } catch (error) {
                  storeLogout()
            }
      }

      const isAuthenticated = !!user && !!token
      const isAdmin = user?.role === 'admin'

      return {
            user,
            token,
            login,
            register,
            logout,
            refreshUser,
            enrollCourses,
            isAuthenticated,
            isAdmin
      }
}