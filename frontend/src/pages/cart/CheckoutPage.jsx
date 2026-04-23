import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { createOrder } from '../../api/ordersApi'
import { addToCart as addToCartAPI } from '../../api/cartApi'
import Avatar from '../../components/common/Avatar'

function CheckoutPage() {
      const { cartItems, totalItems, totalPrice, clearCart, showToast } = useCart()
      const { user, token, isAuthenticated, refreshUser } = useAuth()
      const navigate = useNavigate()
      const location = useLocation()
      const [isProcessing, setIsProcessing] = useState(false)
      const [error, setError] = useState(null)
      const [isSyncing, setIsSyncing] = useState(false)

      useEffect(() => {
            if (!isAuthenticated) {
                  showToast('Please log in to continue to checkout.')
                  navigate('/login', { state: { from: location }, replace: true })
            }
      }, [isAuthenticated, navigate, location, showToast])

      // Sync frontend cart to backend before checkout
      const syncCartToBackend = async () => {
            if (cartItems.length === 0) return true

            setIsSyncing(true)
            try {
                  for (const item of cartItems) {
                        try {
                              await addToCartAPI(item.id, token)
                        } catch (error) {
                              // If course is already in cart (409), that's fine - continue
                              if (error?.payload?.message?.includes('already in cart') ||
                                    error?.payload?.message?.includes('already enrolled')) {
                                    continue
                              }
                              // For other errors, re-throw
                              throw error
                        }
                  }
                  return true
            } catch (err) {
                  console.error('Error syncing cart:', err)
                  return false
            } finally {
                  setIsSyncing(false)
            }
      }

      const handlePurchase = async () => {
            if (isProcessing || isSyncing) return

            setIsProcessing(true)
            setError(null)

            try {
                  // First, sync cart items to backend database
                  const syncSuccess = await syncCartToBackend()
                  if (!syncSuccess && cartItems.length > 0) {
                        throw new Error('Failed to sync cart items. Please refresh and try again.')
                  }

                  // Then create order
                  const response = await createOrder(token)

                  // Clear cart after successful order
                  clearCart()

                  // Refresh user to get updated enrollments
                  await refreshUser()

                  showToast('Payment successful! You have been enrolled in your courses.')
                  navigate('/my-courses')
            } catch (err) {
                  const errorMessage = err?.payload?.message || err.message || 'Checkout failed. Please try again.'
                  setError(errorMessage)
                  showToast(errorMessage)
                  console.error('Checkout error:', err)
            } finally {
                  setIsProcessing(false)
            }
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
                                                                        <span>${parseFloat(item.price).toFixed(2)}</span>
                                                                  </li>
                                                            ))}
                                                      </ul>
                                                </div>
                                          </div>
                                          <div className="card mb-4">
                                                <div className="card-header bg-light">
                                                      <h5 className="card-title mb-0">
                                                            <i className="fa fa-user me-2"></i>
                                                            Billing Information
                                                      </h5>
                                                </div>
                                                <div className="card-body">
                                                      <div className="row mb-4">
                                                            <div className="col-12">
                                                                  <div className="d-flex align-items-center gap-3 mb-3">
                                                                        <Avatar user={user} size="md" />
                                                                        <div>
                                                                              <h6 className="mb-1">
                                                                                    {user?.first_name} {user?.last_name}
                                                                              </h6>
                                                                              <small className="text-muted">
                                                                                    <i className="fa fa-envelope me-1"></i>
                                                                                    {user?.email}
                                                                              </small>
                                                                              <br />
                                                                              <small className="text-muted">
                                                                                    <i className="fa fa-shield me-1"></i>
                                                                                    Role: <span className="badge bg-info">{user?.role}</span>
                                                                              </small>
                                                                        </div>
                                                                  </div>
                                                                  <hr />
                                                            </div>
                                                      </div>
                                                      <div className="mb-3">
                                                            <label className="form-label">Full Name</label>
                                                            <input
                                                                  type="text"
                                                                  className="form-control"
                                                                  placeholder="Full Name"
                                                                  value={user?.first_name ? `${user.first_name} ${user.last_name}` : ''}
                                                                  disabled
                                                            />
                                                      </div>
                                                      <div className="mb-3">
                                                            <label className="form-label">Email Address</label>
                                                            <input
                                                                  type="email"
                                                                  className="form-control"
                                                                  placeholder="Email Address"
                                                                  value={user?.email || ''}
                                                                  disabled
                                                            />
                                                      </div>
                                                      <p className="text-muted">
                                                            <i className="fa fa-lock me-2"></i>
                                                            This is a demo checkout. Your information is secure.
                                                      </p>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="col-lg-4">
                                          <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                                                <div className="card-body">
                                                      <h5 className="card-title">
                                                            <i className="fa fa-shopping-cart me-2"></i>
                                                            Payment Total
                                                      </h5>
                                                      <div className="mb-3">
                                                            <div className="d-flex justify-content-between mb-2">
                                                                  <span>Subtotal:</span>
                                                                  <span>${totalPrice.toFixed(2)}</span>
                                                            </div>
                                                            <div className="d-flex justify-content-between mb-2">
                                                                  <span>Items:</span>
                                                                  <span>{totalItems}</span>
                                                            </div>
                                                            <hr />
                                                            <div className="d-flex justify-content-between fw-bold fs-5">
                                                                  <span>Total:</span>
                                                                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                                                            </div>
                                                      </div>
                                                      {error && (
                                                            <div className="alert alert-danger mb-3" role="alert">
                                                                  <small>{error}</small>
                                                            </div>
                                                      )}
                                                      <button
                                                            className="btn btn-primary w-100 mb-2"
                                                            onClick={handlePurchase}
                                                            disabled={isProcessing || isSyncing}
                                                      >
                                                            {isProcessing || isSyncing ? (
                                                                  <>
                                                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                                        {isSyncing ? 'Syncing...' : 'Processing...'}
                                                                  </>
                                                            ) : (
                                                                  <>
                                                                        <i className="fa fa-lock me-2"></i>
                                                                        Complete Purchase
                                                                  </>
                                                            )}
                                                      </button>
                                                      <Link to="/courses" className="btn btn-secondary w-100">
                                                            Continue Shopping
                                                      </Link>
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