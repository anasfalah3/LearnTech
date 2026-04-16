import axiosClient from './axiosClient'

export const createOrder = async (token) => {
      const response = await axiosClient('/orders', {
            method: 'POST',
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
