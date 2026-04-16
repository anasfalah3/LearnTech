import axiosClient from './axiosClient'

export const getCart = async (token) => {
      const response = await axiosClient('/cart', { token })
      return response.data
}

export const addToCart = async (courseId, token) => {
      const response = await axiosClient('/cart/add', {
            method: 'POST',
            token,
            body: { course_id: courseId },
      })
      return response
}

export const removeFromCart = async (courseId, token) => {
      const response = await axiosClient(`/cart/remove/${courseId}`, {
            method: 'DELETE',
            token,
      })
      return response
}
