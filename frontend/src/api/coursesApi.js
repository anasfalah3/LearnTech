import axiosClient from './axiosClient'

export const getCourses = async (params = {}) => {
      const query = new URLSearchParams(params).toString()
      const path = query ? `/courses?${query}` : '/courses'

      const response = await axiosClient(path)
      return response.data
}

export const getCourseBySlug = async (slug) => {
      const response = await axiosClient(`/courses/${slug}`)
      return response.data
}
