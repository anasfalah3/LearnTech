import React, { useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'

function CheckoutPage() {
      const { cartItems, totalItems, totalPrice, clearCart, showToast } = useCart()
      const { enrollCourses, isAuthenticated } = useAuth()
      const navigate = useNavigate()
      const location = useLocation()

      useEffect(() => {
            if (!isAuthenticated) {
                  showToast('Please log in to continue to checkout.')
                  navigate('/login', { state: { from: location }, replace: true })
            }
      }, [isAuthenticated, navigate, location, showToast])

      const handlePurchase = () => {
            enrollCourses(cartItems)
            clearCart()
            showToast('Payment successful! Courses have been added to your dashboard.')
            navigate('/my-courses')
      }

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Checkout</h6>
                              <h1 className="mb-5">Complete Your Purchase</h1>
                        </div>
                        {cartItems.length === 0 ? (
                              <div className="row">
                                    <div className="col-12">
                                          <div className="alert alert-info">
                                                <h5>Your cart is empty</h5>
                                                <p>Add courses before checking out.</p>
                                                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                                          </div>
                                    </div>
                              </div>
                        ) : (
                              <div className="row g-4">
                                    <div className="col-lg-8">
                                          <div className="card mb-4">
                                                <div className="card-body">
                                                      <h5 className="card-title">Order Summary</h5>
                                                      <p className="card-text">You are purchasing {totalItems} course(s).</p>
                                                      <ul className="list-group list-group-flush">
                                                            {cartItems.map((item) => (
                                                                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                                                        <span>{item.title}</span>
                                                                        <span>{item.priceLabel}</span>
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>
                                          </div>
                                          <div className="card mb-4">
                                                <div className="card-body">
                                                      <h5 className="card-title">Billing Information</h5>
                                                      <div className="mb-3">
                                                            <input type="text" className="form-control" placeholder="Full Name" />
                                                      </div>
                                                      <div className="mb-3">
                                                            <input type="email" className="form-control" placeholder="Email Address" />
                                                      </div>
                                                      <div className="mb-3">
                                                            <input type="text" className="form-control" placeholder="Card Number" />
                                                      </div>
                                                      <div className="row g-3">
                                                            <div className="col-sm-6">
                                                                  <input type="text" className="form-control" placeholder="Expiry" />
                                                            </div>
                                                            <div className="col-sm-6">
                                                                  <input type="text" className="form-control" placeholder="CVC" />
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="col-lg-4">
                                          <div className="card shadow-sm">
                                                <div className="card-body">
                                                      <h5 className="card-title">Payment Total</h5>
                                                      <p className="card-text">Subtotal: ${totalPrice.toFixed(2)}</p>
                                                      <p className="card-text fw-bold">Total: ${totalPrice.toFixed(2)}</p>
                                                      <button className="btn btn-primary w-100" onClick={handlePurchase}>
                                                            Complete Purchase
                                                      </button>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      )
}

export default CheckoutPage