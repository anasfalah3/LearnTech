import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
      persist(
            (set, get) => ({
                  cartItems: [],
                  sidebarOpen: false,
                  toastOpen: false,
                  toastMessage: '',

                  addToCart: (course) => {
                        const exists = get().cartItems.some((item) => item.id === course.id)
                        if (exists) {
                              set({ sidebarOpen: true, toastOpen: true, toastMessage: 'Course is already in your cart' })
                              return
                        }

                        set((state) => ({
                              cartItems: [...state.cartItems, course],
                              sidebarOpen: true,
                              toastOpen: true,
                              toastMessage: 'Course added to cart successfully'
                        }))
                  },

                  removeFromCart: (courseId) =>
                        set((state) => ({
                              cartItems: state.cartItems.filter((item) => item.id !== courseId)
                        })),

                  clearCart: () => set({ cartItems: [] }),

                  openSidebar: () => set({ sidebarOpen: true }),
                  closeSidebar: () => set({ sidebarOpen: false }),

                  showToast: (message) => set({ toastOpen: true, toastMessage: message }),
                  closeToast: () => set({ toastOpen: false })
            }),
            {
                  name: 'cart-storage'
            }
      )
)
