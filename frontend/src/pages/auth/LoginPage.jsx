import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function LoginPage() {
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [error, setError] = useState('')
      const [loading, setLoading] = useState(false)

      const { login } = useAuth()
      const navigate = useNavigate()
      const location = useLocation()

      const from = location.state?.from?.pathname || '/dashboard'

      const handleSubmit = async (e) => {
            e.preventDefault()
            setLoading(true)
            setError('')

            const result = await login(email, password)
            setLoading(false)

            if (result.success) {
                  navigate(from, { replace: true })
            } else {
                  setError(result.error)
            }
      }

      return (
            <>
                  {/* Login Start */}
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                                    <h6 className="section-title bg-white text-center text-primary px-3">Log In</h6>
                                    <h1 className="mb-5">Log In to Your Account</h1>
                              </div>
                              <div className="row justify-content-center">
                                    <div className="col-lg-6 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                          <form onSubmit={handleSubmit}>
                                                <div className="row g-3">
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
                                                      {error && (
                                                            <div className="col-md-12">
                                                                  <div className="alert alert-danger">{error}</div>
                                                            </div>
                                                      )}
                                                      <div className="col-12">
                                                            <button className="btn btn-primary w-100 py-3" type="submit" disabled={loading}>
                                                                  {loading ? 'Logging In...' : 'Log In'}
                                                            </button>
                                                      </div>
                                                </div>
                                                <div className="col-12">
                                                      <p className="mt-3 mb-0">Don't have an account? <a href="/register">Click Here</a></p>
                                                </div>
                                          </form>
                                    </div>
                              </div>
                        </div>
                  </div>
                  {/* Login End */}
            </>
      )
}

export default LoginPage