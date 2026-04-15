import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function RegisterPage() {
      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)

      const { register } = useAuth()
      const navigate = useNavigate()

      const handleSubmit = async (e) => {
            e.preventDefault()
            setError('')

            if (password !== confirmPassword) {
                  setError('Passwords do not match')
                  return
            }

            setLoading(true)

            const result = await register(firstName, lastName, email, password)
            setLoading(false)

            if (result.success) {
                  navigate('/dashboard')
            } else {
                  setError(result.error)
            }
      }

      return (
            <>
                  {/* Register Start */}
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <h6 className="section-title bg-white text-center text-primary px-3">Register</h6>
                                    <h1 className="mb-5">Create Your Account</h1>
                              </div>
                              <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                          <form onSubmit={handleSubmit}>
                                                <div className="row g-3">
                                                      <div className="col-md-6">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="firstName"
                                                                        placeholder="First Name"
                                                                        value={firstName}
                                                                        onChange={(e) => setFirstName(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="firstName">First Name</label>
                                                            </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="lastName"
                                                                        placeholder="Last Name"
                                                                        value={lastName}
                                                                        onChange={(e) => setLastName(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="lastName">Last Name</label>
                                                            </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="email"
                                                                        placeholder="Your Email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="email">Your Email</label>
                                                            </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="password"
                                                                        placeholder="Your Password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="password">Your Password</label>
                                                            </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="confirmPassword"
                                                                        placeholder="Confirm Password"
                                                                        value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="confirmPassword">Confirm Password</label>
                                                            </div>
                                                      </div>
                                                      {error && (
                                                            <div className="col-md-12">
                                                                  <div className="alert alert-danger">{error}</div>
                                                            </div>
                                                      )}
                                                      <div className="col-12">
                                                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={loading}>
                                                                  {loading ? 'Registering...' : 'Register'}
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="col-12">
                                                      <p className="mt-3 mb-0">Already have an account? <a href="/login">Login Here</a></p>
                                                </div>
                                          </form>
                                    </div>
                              </div>
                        </div>
                  </div>
                  {/* Register End */}
            </>
      )
}

export default RegisterPage