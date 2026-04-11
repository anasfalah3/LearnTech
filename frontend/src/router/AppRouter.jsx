import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import ProtectedRoute from '../components/common/ProtectedRoute'
// import AdminRoute from '../components/common/AdminRoute'
import MainLayout from '../layouts/MainLayout'
// import AdminLayout from '../layouts/AdminLayout'
import PageLoader from '../components/common/PageLoader'

// ── Public pages ──────────────────────────────────────────────
const HomePage = lazy(() => import('../pages/public/HomePage'))
const AboutPage = lazy(() => import('../pages/public/AboutPage'))
const CoursesPage = lazy(() => import('../pages/public/CoursesPage'))
// const CourseDetailPage   = lazy(() => import('../pages/public/CourseDetailPage'))
// const CategoryPage       = lazy(() => import('../pages/public/CategoryPage'))
const ContactPage = lazy(() => import('../pages/public/ContactPage'))
const LoginPage = lazy(() => import('../pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'))
const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'))

// ── User pages (authenticated) ────────────────────────────────
// const DashboardPage      = lazy(() => import('../pages/user/DashboardPage'))
// const MyCoursesPage      = lazy(() => import('../pages/user/MyCoursesPage'))
// const CoursePlayerPage   = lazy(() => import('../pages/user/CoursePlayerPage'))
// const ProfilePage        = lazy(() => import('../pages/user/ProfilePage'))
// const CartPage           = lazy(() => import('../pages/cart/CartPage'))
// const CheckoutPage       = lazy(() => import('../pages/cart/CheckoutPage'))
// const OrderDetailPage    = lazy(() => import('../pages/user/OrderDetailPage'))

// ── Admin pages ───────────────────────────────────────────────
// const AdminDashboard     = lazy(() => import('../pages/admin/AdminDashboard'))
// const ManageUsers        = lazy(() => import('../pages/admin/ManageUsers'))
// const ManageCategories   = lazy(() => import('../pages/admin/ManageCategories'))
// const ManageCourses      = lazy(() => import('../pages/admin/ManageCourses'))
// const ManageLessons      = lazy(() => import('../pages/admin/ManageLessons'))
// const SalesReports       = lazy(() => import('../pages/admin/SalesReports'))

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* ── Public routes (inside MainLayout) ── */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            {/* <Route path="/courses/:slug"     element={<CourseDetailPage />} /> */}
            {/* <Route path="/categories/:slug"  element={<CategoryPage />} /> */}
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* ── Authenticated user routes ── */}
          {/* <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard"       element={<DashboardPage />} />
              <Route path="/my-courses"      element={<MyCoursesPage />} />
              <Route path="/learn/:slug"     element={<CoursePlayerPage />} />
              <Route path="/profile"         element={<ProfilePage />} />
              <Route path="/cart"            element={<CartPage />} />
              <Route path="/checkout"        element={<CheckoutPage />} />
              <Route path="/orders/:id"      element={<OrderDetailPage />} />
            </Route>
          </Route> */}

          {/* ── Admin routes ── */}
          {/* <Route element={<AdminRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin"                         element={<AdminDashboard />} />
              <Route path="/admin/users"                   element={<ManageUsers />} />
              <Route path="/admin/categories"              element={<ManageCategories />} />
              <Route path="/admin/courses"                 element={<ManageCourses />} />
              <Route path="/admin/courses/:id/lessons"     element={<ManageLessons />} />
              <Route path="/admin/sales"                   element={<SalesReports />} />
            </Route>
          </Route> */}

          {/* ── 404 ── */}
          <Route path="*" element={<NotFoundPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}