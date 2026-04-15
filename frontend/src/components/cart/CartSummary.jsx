import React from 'react'
import { Link } from 'react-router-dom'

export default function CartSummary({ totalItems, totalPrice, onClear }) {
      return (
            <div className="card shadow-sm">
                  <div className="card-body">
                        <h5 className="card-title">Order Summary</h5>
                        <p className="card-text">Courses: {totalItems}</p>
                        <p className="card-text fw-bold">Total: ${totalPrice.toFixed(2)}</p>
                        <div className="d-grid gap-2">
                              <Link to="/checkout" className="btn btn-primary">
                                    Continue to Checkout
                              </Link>
                              <button type="button" className="btn btn-outline-danger" onClick={onClear}>
                                    Clear Cart
                              </button>
                        </div>
                  </div>
            </div>
      )
}
