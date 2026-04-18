import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

function RegisterPage() {
      const [firstName, setFirstName] = useState('')
      const [lastName, setLastName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [confirmPassword, setConfirmPassword] = useState('')
      const [serverError, setServerError] = useState('')
      const [validationErrors, setValidationErrors] = useState([])
      const [fieldErrors, setFieldErrors] = useState({})
      const [loading, setLoading] = useState(false)

      const { register } = useAuth()
      const navigate = useNavigate()

      const handleSubmit = async (e) => {
            e.preventDefault()
            setServerError('')
            setValidationErrors([])

            if (password !== confirmPassword) {
                  setServerError('Passwords do not match')
                  return
            }

            setLoading(true)

            const result = await register(firstName, lastName, email, password)
            setLoading(false)

            if (result.success) {
                  navigate('/dashboard')
            } else {
                  setServerError(result.error)
                  setValidationErrors(result.errors || [])
                  setFieldErrors(result.fieldErrors || {})
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
                                                                        className={`form-control ${fieldErrors.firstName ? 'is-invalid' : ''}`}
                                                                        id="firstName"
                                                                        placeholder="First Name"
                                                                        value={firstName}
                                                                        onChange={(e) => setFirstName(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="firstName">First Name</label>
                                                                  {fieldErrors.firstName?.map((message, index) => (
                                                                        <div key={index} className="invalid-feedback d-block">
                                                                              {message}
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="col-md-6">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="text"
                                                                        className={`form-control ${fieldErrors.lastName ? 'is-invalid' : ''}`}
                                                                        id="lastName"
                                                                        placeholder="Last Name"
                                                                        value={lastName}
                                                                        onChange={(e) => setLastName(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="lastName">Last Name</label>
                                                                  {fieldErrors.lastName?.map((message, index) => (
                                                                        <div key={index} className="invalid-feedback d-block">
                                                                              {message}
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="email"
                                                                        className={`form-control ${fieldErrors.email ? 'is-invalid' : ''}`}
                                                                        id="email"
                                                                        placeholder="Your Email"
                                                                        value={email}
                                                                        onChange={(e) => setEmail(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="email">Your Email</label>
                                                                  {fieldErrors.email?.map((message, index) => (
                                                                        <div key={index} className="invalid-feedback d-block">
                                                                              {message}
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="password"
                                                                        className={`form-control ${fieldErrors.password ? 'is-invalid' : ''}`}
                                                                        id="password"
                                                                        placeholder="Your Password"
                                                                        value={password}
                                                                        onChange={(e) => setPassword(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="password">Your Password</label>
                                                                  {fieldErrors.password?.map((message, index) => (
                                                                        <div key={index} className="invalid-feedback d-block">
                                                                              {message}
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      <div className="col-md-12">
                                                            <div className="form-floating">
                                                                  <input
                                                                        type="password"
                                                                        className={`form-control ${fieldErrors.confirmPassword ? 'is-invalid' : ''}`}
                                                                        id="confirmPassword"
                                                                        placeholder="Confirm Password"
                                                                        value={confirmPassword}
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                        required
                                                                  />
                                                                  <label htmlFor="confirmPassword">Confirm Password</label>
                                                                  {fieldErrors.confirmPassword?.map((message, index) => (
                                                                        <div key={index} className="invalid-feedback d-block">
                                                                              {message}
                                                                        </div>
                                                                  ))}
                                                            </div>
                                                      </div>
                                                      {serverError && (
                                                            <div className="col-md-12">
                                                                  <div className="alert alert-danger">{serverError}</div>
                                                            </div>
                                                      )}
                                                      {validationErrors.length > 0 && (
                                                            <div className="col-md-12">
                                                                  <div className="alert alert-danger">
                                                                        <ul className="mb-0 ps-3">
                                                                              {validationErrors.map((message, index) => (
                                                                                    <li key={index}>{message}</li>
                                                                              ))}
                                                                        </ul>
                                                                  </div>
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