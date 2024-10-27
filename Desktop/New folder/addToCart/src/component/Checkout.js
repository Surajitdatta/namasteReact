import React from 'react';
import './Checkout.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.data || [];

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 5.99; 
  const total = subtotal + shipping;

  const handleCheckout = () => {
    toast.success('Your order has been placed successfully!');
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="checkout-wrapper">
      <ToastContainer />
      <div className="checkout-card">
        <div className="checkout-cart-summary">
          <h2>Cart Summary</h2>
          {cart.map((item) => (
            <div className="checkout-item" key={item.id}>
              <img
                className="checkout-item-image"
                src={item.image}
                alt={item.title}
              />
              <div className="checkout-item-details">
                <p>{item.title}</p>
                <p className="checkout-price">
                  ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout-order-summary">
          <h2>Order Summary</h2>
          <div className="checkout-summary-item">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-item">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
