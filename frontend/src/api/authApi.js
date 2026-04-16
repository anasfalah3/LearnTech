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
