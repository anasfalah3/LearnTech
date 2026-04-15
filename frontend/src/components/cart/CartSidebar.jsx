import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'

export default function CartSidebar() {
      const { cartItems, sidebarOpen, closeSidebar, totalPrice, removeFromCart } = useCart()

      return (
            <div
                  className={`cart-sidebar position-fixed top-0 end-0 h-100 bg-white shadow-lg overflow-auto ${sidebarOpen ? 'open' : ''}`}
                  style={{
                        width: '320px',
                        transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
                        transition: 'transform 0.25s ease-in-out',
                        zIndex: 1050
                  }}
            >
                  <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                              <h5 className="mb-0">Your Cart</h5>
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={closeSidebar}>
                                    Close
                              </button>
                        </div>
                        {cartItems.length === 0 ? (
                              <div className="alert alert-secondary">Your cart is empty.</div>
                        ) : (
                              <>
                                    <div className="list-group mb-4">
                                          {cartItems.map((item) => (
                                                <div key={item.id} className="list-group-item d-flex justify-content-between align-items-start">
                                                      <div>
                                                            <h6 className="mb-1">{item.title}</h6>
                                                            <small className="text-muted">{item.priceLabel}</small>
                                                      </div>
                                                      <button className="btn btn-sm btn-outline-danger" onClick={() => removeFromCart(item.id)}>
                                                            Remove
                                                      </button>
                                                </div>
                                          ))}
                                    </div>
                                    <div className="mb-4">
                                          <div className="d-flex justify-content-between mb-2">
                                                <span className="fw-semibold">Total</span>
                                                <span className="fw-bold">${totalPrice.toFixed(2)}</span>
                                          </div>
                                          <Link to="/checkout" className="btn btn-primary w-100" onClick={closeSidebar}>
                                                Proceed to Checkout
                                          </Link>
                                    </div>
                              </>
                        )}
                  </div>
            </div>
      )
}
