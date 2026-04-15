import React from 'react'

function AdminDashboard() {
      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Admin Dashboard</h6>
                              <h1 className="mb-5">Welcome to Admin Panel</h1>
                        </div>
                        <div className="row g-4">
                              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-users fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">Manage Users</h5>
                                                <p className="card-text">View and manage all users</p>
                                                <a href="/admin/users" className="btn btn-primary">Manage Users</a>
                                          </div>
                                    </div>
                              </div>
                              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-book fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">Manage Courses</h5>
                                                <p className="card-text">Add and edit courses</p>
                                                <a href="/admin/courses" className="btn btn-primary">Manage Courses</a>
                                          </div>
                                    </div>
                              </div>
                              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-tags fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">Categories</h5>
                                                <p className="card-text">Manage course categories</p>
                                                <a href="/admin/categories" className="btn btn-primary">Manage Categories</a>
                                          </div>
                                    </div>
                              </div>
                              <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                                    <div className="card h-100">
                                          <div className="card-body text-center">
                                                <i className="fa fa-chart-line fa-3x text-primary mb-3"></i>
                                                <h5 className="card-title">Sales Reports</h5>
                                                <p className="card-text">View sales analytics</p>
                                                <a href="/admin/sales" className="btn btn-primary">View Reports</a>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default AdminDashboard