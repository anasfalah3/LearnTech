import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { getOrders } from '../../api/ordersApi'

function OrderHistory() {
      const { token } = useAuth()
      const [orders, setOrders] = useState([])
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)
      const [currentPage, setCurrentPage] = useState(1)

      useEffect(() => {
            const fetchOrders = async () => {
                  try {
                        setLoading(true)
                        const data = await getOrders(token, currentPage)
                        setOrders(data.data || [])
                        setError(null)
                  } catch (err) {
                        setError('Failed to load order history')
                        console.error('Error fetching orders:', err)
                  } finally {
                        setLoading(false)
                  }
            }

            if (token) {
                  fetchOrders()
            }
      }, [token, currentPage])

      if (loading) {
            return (
                  <div className="alert alert-info">
                        <i className="fa fa-spinner fa-spin me-2"></i>Loading order history...
                  </div>
            )
      }

      if (error) {
            return (
                  <div className="alert alert-danger">
                        {error}
                  </div>
            )
      }

      if (!orders || orders.length === 0) {
            return (
                  <div className="alert alert-info">
                        <h5>No orders yet</h5>
                        <p>You haven't made any purchases yet. <Link to="/courses">Browse courses</Link> to get started!</p>
                  </div>
            )
      }

      return (
            <div className="table-responsive">
                  <table className="table table-hover">
                        <thead className="table-light">
                              <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Courses</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                    <th>Action</th>
                              </tr>
                        </thead>
                        <tbody>
                              {orders.map((order) => (
                                    <tr key={order.id}>
                                          <td>#{order.id}</td>
                                          <td>{new Date(order.created_at).toLocaleDateString()}</td>
                                          <td>
                                                <span className="badge bg-info">{order.items?.length || 0} course(s)</span>
                                          </td>
                                          <td className="fw-bold">${parseFloat(order.total).toFixed(2)}</td>
                                          <td>
                                                <span className={`badge ${order.status === 'paid' ? 'bg-success' : 'bg-warning'}`}>
                                                      {order.status}
                                                </span>
                                          </td>
                                          <td>
                                                <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline-primary">
                                                      View Receipt
                                                </Link>
                                          </td>
                                    </tr>
                              ))}
                        </tbody>
                  </table>
            </div>
      )
}

export default OrderHistory
