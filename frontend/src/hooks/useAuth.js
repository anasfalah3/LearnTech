import { useAuthStore } from '../store/authStore'
import { login as apiLogin, register as apiRegister } from '../api/authApi'

export const useAuth = () => {
      const { user, token, setAuth, logout: storeLogout, enrollCourses } = useAuthStore()

      const login = async (email, password) => {
            try {
                  const { user, token } = await apiLogin(email, password)
                  setAuth(user, token)
                  return { success: true }
            } catch (error) {
                  return { success: false, error: error.message }
            }
      }

      const register = async (firstName, lastName, email, password) => {
            try {
                  const { user, token } = await apiRegister(firstName, lastName, email, password)
                  setAuth(user, token)
                  return { success: true }
            } catch (error) {
                  return { success: false, error: error.message }
            }
      }

      const logout = () => {
            storeLogout()
      }

      const isAuthenticated = !!user && !!token
      const isAdmin = user?.role === 'admin'

      return {
            user,
            token,
            login,
            register,
            logout,
            enrollCourses,
            isAuthenticated,
            isAdmin
      }
}