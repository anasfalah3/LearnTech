import { useCartStore } from '../store/cartStore'

export const useCart = () => {
      const cartItems = useCartStore((state) => state.cartItems)
      const addToCart = useCartStore((state) => state.addToCart)
      const removeFromCart = useCartStore((state) => state.removeFromCart)
      const clearCart = useCartStore((state) => state.clearCart)
      const openSidebar = useCartStore((state) => state.openSidebar)
      const closeSidebar = useCartStore((state) => state.closeSidebar)
      const showToast = useCartStore((state) => state.showToast)
      const closeToast = useCartStore((state) => state.closeToast)
      const sidebarOpen = useCartStore((state) => state.sidebarOpen)
      const toastOpen = useCartStore((state) => state.toastOpen)
      const toastMessage = useCartStore((state) => state.toastMessage)

      const totalItems = cartItems.length
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

      return {
            cartItems,
            addToCart,
            removeFromCart,
            clearCart,
            openSidebar,
            closeSidebar,
            showToast,
            closeToast,
            sidebarOpen,
            toastOpen,
            toastMessage,
            totalItems,
            totalPrice
      }
}
