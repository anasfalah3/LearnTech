import axiosClient from './axiosClient'

export const createOrder = async (token) => {
      const response = await axiosClient('/orders', {
            method: 'POST',
            token,
      })
      return response.data
}

export const getOrders = async (token, page = 1) => {
      const response = await axiosClient(`/orders?page=${page}`, {
            token,
      })
      return response.data
}

export const getOrder = async (orderId, token) => {
      const response = await axiosClient(`/orders/${orderId}`, {
            token,
      })
      return response.data
}

export const checkEnrollment = async (courseId, token) => {
      const response = await axiosClient(`/enrollments/check/${courseId}`, {
            token,
      })
      return response.data
}

