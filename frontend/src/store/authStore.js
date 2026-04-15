import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
      persist(
            (set) => ({
                  user: null,
                  token: null,

                  setAuth: (user, token) =>
                        set({ user: { ...user, myCourses: user.myCourses || [] }, token }),

                  logout: () => set({ user: null, token: null }),

                  updateUser: (updatedUser) =>
                        set((state) => ({ user: { ...state.user, ...updatedUser } })),

                  enrollCourses: (courses) =>
                        set((state) => {
                              if (!state.user) return {}
                              const existing = state.user.myCourses || []
                              const newCourses = courses.filter(
                                    (course) => !existing.some((item) => item.id === course.id)
                              )
                              return {
                                    user: {
                                          ...state.user,
                                          myCourses: [...existing, ...newCourses]
                                    }
                              }
                        })
            }),
            {
                  name: 'auth-storage', // key in localStorage
            }
      )
)