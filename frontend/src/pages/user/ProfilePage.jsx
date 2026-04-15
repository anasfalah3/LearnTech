import React from 'react'
import { useAuth } from '../../hooks/useAuth'

function ProfilePage() {
      const { user } = useAuth()

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Profile</h6>
                              <h1 className="mb-5">Your Profile</h1>
                        </div>
                        <div className="row justify-content-center">
                              <div className="col-lg-6">
                                    <div className="card">
                                          <div className="card-body">
                                                <h5 className="card-title">Profile Information</h5>
                                                <p><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                                                <p><strong>Email:</strong> {user.email}</p>
                                                <p><strong>Role:</strong> {user.role}</p>
                                                <button className="btn btn-primary">Edit Profile</button>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default ProfilePage