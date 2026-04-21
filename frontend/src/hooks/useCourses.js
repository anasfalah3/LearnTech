import { useState, useEffect } from 'react'
import { getCourses, getCourseBySlug } from '../api/coursesApi'
import { getCategories } from '../api/categoriesApi'

export const useCourses = () => {
      const [courses, setCourses] = useState([])
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

      const fetchCourses = async (params = {}) => {
            setLoading(true)
            setError(null)
            try {
                  const data = await getCourses(params)
                  setCourses(data || [])
            } catch (err) {
                  setError(err.message)
                  setCourses([])
            } finally {
                  setLoading(false)
            }
      }

      useEffect(() => {
            fetchCourses()
      }, [])

      return { courses, loading, error, fetchCourses }
}

export const useCategories = () => {
      const [categories, setCategories] = useState([])
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

      const fetchCategories = async () => {
            setLoading(true)
            setError(null)
            try {
                  const data = await getCategories()
                  setCategories(data || [])
            } catch (err) {
                  setError(err.message)
                  setCategories([])
            } finally {
                  setLoading(false)
            }
      }

      useEffect(() => {
            fetchCategories()
      }, [])

      return { categories, loading, error, fetchCategories }
}

export const useCourseDetail = (slug) => {
      const [course, setCourse] = useState(null)
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState(null)

      useEffect(() => {
            if (!slug) return

            const fetch = async () => {
                  setLoading(true)
                  setError(null)
                  try {
                        const data = await getCourseBySlug(slug)
                        setCourse(data)
                  } catch (err) {
                        setError(err.message)
                        setCourse(null)
                  } finally {
                        setLoading(false)
                  }
            }

            fetch()
      }, [slug])

      return { course, loading, error }
}
