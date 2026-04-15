import { Outlet, NavLink } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

const links = [
  { to: '/admin',             label: 'Dashboard' },
  { to: '/admin/users',       label: 'Users' },
  { to: '/admin/categories',  label: 'Categories' },
  { to: '/admin/courses',     label: 'Courses' },
  { to: '/admin/sales',       label: 'Sales' },
]

export default function AdminLayout() {
  const { user, logout } = useAuthStore()

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-56 border-r border-gray-200 flex flex-col px-4 py-6 gap-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Admin panel</p>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === '/admin'}
            className={({ isActive }) =>
              `px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
        <div className="mt-auto border-t pt-4">
          <p className="text-sm text-gray-700 font-medium">{user?.name}</p>
          <button
            onClick={logout}
            className="text-xs text-gray-400 hover:text-red-500 mt-1"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}