import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import CartItem from '../../components/cart/CartItem'
import CartSummary from '../../components/cart/CartSummary'

function CartPage() {
      const { cartItems, removeFromCart, clearCart, totalItems, totalPrice } = useCart()

      return (
            <div className="container-xxl py-5">
                  <div className="container">
                        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                              <h6 className="section-title bg-white text-center text-primary px-3">Shopping Cart</h6>
                              <h1 className="mb-5">Your Cart</h1>
                        </div>
                        {cartItems.length === 0 ? (
                              <div className="row">
                                    <div className="col-12">
                                          <div className="alert alert-info">
                                                <h5>Your cart is empty</h5>
                                                <p>Add some courses to get started!</p>
                                                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
                                          </div>
                                    </div>
                              </div>
                        ) : (
                              <div className="row g-4">
                                    <div className="col-lg-8">
                                          {cartItems.map((item) => (
                                                <CartItem key={item.id} item={item} onRemove={removeFromCart} />
                                          ))}
                                    </div>
                                    <div className="col-lg-4">
                                          <CartSummary totalItems={totalItems} totalPrice={totalPrice} onClear={clearCart} />
                                    </div>
                              </div>
                        )}
                  </div>
            </div>
      )
}

export default CartPage