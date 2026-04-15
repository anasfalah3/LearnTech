import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

function Navbar() {
    const { isAuthenticated, isAdmin, logout, user } = useAuth()
    const { totalItems, openSidebar } = useCart()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <Link to="/" className="navbar-brand d-flex align-items-center px-4 px-lg-5">
                <h2 className="m-0 text-primary"><i className="fa fa-book me-3"></i>eLEARNING</h2>
            </Link>
            <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
                <div className="navbar-nav ms-auto p-4 p-lg-0">
                    <Link to="/" className="nav-item nav-link">Home</Link>
                    <Link to="/about" className="nav-item nav-link">About</Link>
                    <Link to="/courses" className="nav-item nav-link">Courses</Link>
                    <Link to="/categories" className="nav-item nav-link">Categories</Link>
                    <Link to="/contact" className="nav-item nav-link">Contact</Link>
                    {isAuthenticated && (
                        <>
                            <Link to="/dashboard" className="nav-item nav-link">Dashboard</Link>
                            {isAdmin && <Link to="/admin" className="nav-item nav-link">Admin</Link>}
                        </>
                    )}
                </div>
                <div className="d-flex align-items-center px-4 px-lg-5">
                    <button type="button" onClick={openSidebar} className="btn btn-outline-secondary position-relative d-flex align-items-center py-2 px-3 me-3">
                        <i className="fa fa-shopping-cart me-2"></i>
                        {totalItems > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {totalItems}
                            </span>
                        )}
                    </button>
                    {isAuthenticated ? (
                        <div className="d-flex align-items-center gap-2">
                            <span className="me-3 d-none d-lg-block">Welcome, {user.firstName}!</span>
                            <button onClick={handleLogout} className="btn btn-outline-primary py-2 px-3">
                                Logout
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn btn-primary py-4 px-lg-5 d-none d-lg-block">
                            Join Now<i className="fa fa-arrow-right ms-3"></i>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar