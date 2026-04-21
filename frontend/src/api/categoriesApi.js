import axiosClient from './axiosClient'

export const getCategories = async () => {
      const response = await axiosClient('/categories')
      return response.data
}
