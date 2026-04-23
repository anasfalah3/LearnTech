import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getOrder } from '../../api/ordersApi'

function OrderDetailsPage() {
      const { orderId } = useParams()
      const navigate = useNavigate()
      const { token } = useAuth()
      const [order, setOrder] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)

      useEffect(() => {
            const fetchOrder = async () => {
                  try {
                        setLoading(true)
                        const data = await getOrder(orderId, token)
                        setOrder(data.data)
                        setError(null)
                  } catch (err) {
                        setError('Failed to load order details')
                        console.error('Error fetching order:', err)
                  } finally {
                        setLoading(false)
                  }
            }

            if (token && orderId) {
                  fetchOrder()
            }
      }, [token, orderId])

      if (loading) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="alert alert-info">
                                    <i className="fa fa-spinner fa-spin me-2"></i>Loading order details...
                              </div>
                        </div>
                  </div>
            )
      }

      if (error || !order) {
            return (
                  <div className="container-xxl py-5">
                        <div className="container">
                              <div className="alert alert-danger">
                                    {error || 'Order not found'}
                              </div>
                              <Link to="/my-courses" className="btn btn-primary">Back to My Courses</Link>
                        </div>
                  </div>
            )
      }

      const handlePrint = () => {
            window.print()
      }

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="row mb-4">
                              <div className="col-12">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                          <h2>Order Receipt #{order.id}</h2>
                                          <div className="d-flex gap-2">
                                                <button className="btn btn-outline-primary" onClick={handlePrint}>
                                                      <i className="fa fa-print me-2"></i>Print
                                                </button>
                                                <Link to="/my-courses" className="btn btn-outline-secondary">
                                                      Back
                                                </Link>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <div className="row g-4">
                              <div className="col-lg-8">
                                    <div className="card mb-4">
                                          <div className="card-body">
                                                <div className="row mb-4">
                                                      <div className="col-md-6">
                                                            <h6 className="text-muted mb-2">Order Information</h6>
                                                            <p className="mb-1">
                                                                  <strong>Order ID:</strong> #{order.id}
                                                            </p>
                                                            <p className="mb-1">
                                                                  <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
                                                            </p>
                                                            <p className="mb-0">
                                                                  <strong>Status:</strong>{' '}
                                                                  <span className={`badge ${order.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                                                                        {order.status}
                                                                  </span>
                                                            </p>
                                                      </div>
                                                      <div className="col-md-6">
                                                            <h6 className="text-muted mb-2">Payment Reference</h6>
                                                            <p className="mb-0 font-monospace">{order.payment_ref}</p>
                                                      </div>
                                                </div>

                                                <hr />

                                                <h6 className="mb-3">Items</h6>
                                                <div className="table-responsive">
                                                      <table className="table table-sm">
                                                            <thead className="table-light">
                                                                  <tr>
                                                                        <th>Course</th>
                                                                        <th className="text-end">Price</th>
                                                                  </tr>
                                                            </thead>
                                                            <tbody>
                                                                  {order.items && order.items.map((item) => (
                                                                        <tr key={item.id}>
                                                                              <td>
                                                                                    {item.course?.title || 'Course'}
                                                                              </td>
                                                                              <td className="text-end">
                                                                                    ${parseFloat(item.price).toFixed(2)}
                                                                              </td>
                                                                        </tr>
                                                                  ))}
                                                            </tbody>
                                                      </table>
                                                </div>
                                          </div>
                                    </div>
                              </div>

                              <div className="col-lg-4">
                                    <div className="card">
                                          <div className="card-body">
                                                <h6 className="card-title mb-3">Order Total</h6>
                                                <div className="d-flex justify-content-between mb-2">
                                                      <span>Subtotal</span>
                                                      <span>${parseFloat(order.total).toFixed(2)}</span>
                                                </div>
                                                <div className="d-flex justify-content-between mb-2">
                                                      <span>Tax</span>
                                                      <span>$0.00</span>
                                                </div>
                                                <hr />
                                                <div className="d-flex justify-content-between">
                                                      <strong>Total</strong>
                                                      <strong className="text-primary fs-5">
                                                            ${parseFloat(order.total).toFixed(2)}
                                                      </strong>
                                                </div>

                                                <hr className="my-4" />

                                                <h6 className="mb-2">Enrolled Courses</h6>
                                                <div className="list-group list-group-flush">
                                                      {order.items && order.items.map((item) => (
                                                            <Link
                                                                  key={item.id}
                                                                  to={`/courses/${item.course?.slug}`}
                                                                  className="list-group-item list-group-item-action"
                                                            >
                                                                  <small>{item.course?.title}</small>
                                                                  <i className="fa fa-arrow-right float-end text-primary"></i>
                                                            </Link>
                                                      ))}
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default OrderDetailsPage
