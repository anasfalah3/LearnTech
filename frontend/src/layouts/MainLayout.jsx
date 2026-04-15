import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import CartSidebar from '../components/cart/CartSidebar'
import Toast from '../components/common/Toast'

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <CartSidebar />
      <Toast />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}