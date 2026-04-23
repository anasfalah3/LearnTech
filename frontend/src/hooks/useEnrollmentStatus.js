import { useEffect, useState } from 'react'
import { useAuth } from './useAuth'
import { checkEnrollment } from '../api/ordersApi'

export const useEnrollmentStatus = (courseId) => {
      const { token } = useAuth()
      const [isEnrolled, setIsEnrolled] = useState(false)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)

      useEffect(() => {
            if (!courseId || !token) {
                  setLoading(false)
                  return
            }

            const fetchEnrollmentStatus = async () => {
                  try {
                        setLoading(true)
                        const data = await checkEnrollment(courseId, token)
                        setIsEnrolled(data.isEnrolled)
                        setError(null)
                  } catch (err) {
                        setError(err.message)
                        setIsEnrolled(false)
                  } finally {
                        setLoading(false)
                  }
            }

            fetchEnrollmentStatus()
      }, [courseId, token])

      return { isEnrolled, loading, error }
}
