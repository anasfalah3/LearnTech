import React from 'react'
import { useAuth } from '../../hooks/useAuth'

function DashboardPage() {
      const { user } = useAuth()

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Dashboard</h6>
                              <h1 className="mb-5">Welcome back, {user.firstName}!</h1>
                        </div>
                        <div className="row g-4">
                              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-book fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">My Courses</h5>
                                                <p className="card-text">View and manage your enrolled courses</p>
                                                <a href="/my-courses" className="btn btn-primary">Go to Courses</a>
                                          </div>
                                    </div>
                              </div>
                              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-shopping-cart fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">Cart</h5>
                                                <p className="card-text">Check your shopping cart</p>
                                                <a href="/cart" className="btn btn-primary">View Cart</a>
                                          </div>
                                    </div>
                              </div>
                              <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-user fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">Profile</h5>
                                                <p className="card-text">Update your profile information</p>
                                                <a href="/profile" className="btn btn-primary">Edit Profile</a>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default DashboardPage