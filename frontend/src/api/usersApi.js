import axios from 'axios'

const BASE_URL = 'http://localhost:8000/api'

export const getUsersApi = {
      // Get all users
      getAll: async (token) => {
            try {
                  const response = await axios.get(`${BASE_URL}/admin/users`, {
                        headers: { Authorization: `Bearer ${token}` },
                  })
                  return response.data.data
            } catch (error) {
                  throw error.response?.data || error
            }
      },

      // Get single user
      getById: async (id, token) => {
            try {
                  const response = await axios.get(`${BASE_URL}/admin/users/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                  })
                  return response.data.data
            } catch (error) {
                  throw error.response?.data || error
            }
      },

      // Create user
      create: async (userData, token) => {
            try {
                  const response = await axios.post(`${BASE_URL}/admin/users`, userData, {
                        headers: { Authorization: `Bearer ${token}` },
                  })
                  return response.data.data
            } catch (error) {
                  throw error.response?.data || error
            }
      },

      // Update user
      update: async (id, userData, token) => {
            try {
                  const response = await axios.put(`${BASE_URL}/admin/users/${id}`, userData, {
                        headers: { Authorization: `Bearer ${token}` },
                  })
                  return response.data.data
            } catch (error) {
                  throw error.response?.data || error
            }
      },

      // Delete user
      delete: async (id, token) => {
            try {
                  await axios.delete(`${BASE_URL}/admin/users/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                  })
                  return true
            } catch (error) {
                  throw error.response?.data || error
            }
      },
}
