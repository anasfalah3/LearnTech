import axiosClient from './axiosClient'

export const login = async (email, password) => {
      const response = await axiosClient('/auth/login', {
            method: 'POST',
            body: { email, password },
      })

      return response
}

export const register = async (firstName, lastName, email, password) => {
      const response = await axiosClient('/auth/register', {
            method: 'POST',
            body: { firstName, lastName, email, password },
      })

      return response
}

export const logout = async (token) => {
      const response = await axiosClient('/auth/logout', {
            method: 'POST',
            token,
      })

      return response
}

export const me = async (token) => {
      const response = await axiosClient('/auth/me', {
            token,
      })

      return response
}
