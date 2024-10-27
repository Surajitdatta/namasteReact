import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './Carts.css';
import Modal from "react-modal";
import { addItem, removeItem, deleteItem } from '../redux/Cartslice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './Footer';
import Pagination from './Pagination';

// Set the app element for accessibility
Modal.setAppElement('#root');

const Carts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const cart = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  console.log(cart.length)
  const openModal = (item) => {
    setSelectedItem(item);
    // console.log(item)
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedItem(null); 
  };

  const handleRemoveItem = () => {
    if (selectedItem) {
      dispatch(removeItem(selectedItem.id));
      toast.success('Item removed from cart');
      closeModal();
    } else {
      toast.error('No item selected for removal');
    }
  };

  // Navigate to checkout page
  const checkoutPage = () => {
    const x = cart.length;
    console.log(x)
    if(x > 0){
      navigate("/api/checkout", { state: { data: cart } })

    }else{
      toast.error("No cart is added to checkout")

    }
  };

  // Function to add item to cart
  const addToCart = (item) => {
    const token = localStorage.getItem("token")
    if(token){
      dispatch(addItem(item));
      toast.success('Item added to cart');
      return

    }
    

  };

  // Remove item from cart
  const removeFromCart = (item) => {
    const token = localStorage.getItem("token")
    if(token){
      dispatch(removeItem(item));
      toast.info('Item quantity decreased');
      return

    }
    navigate("/api/login")


  };

  // Delete item
  const del = (del) => {
    dispatch(deleteItem(del));
    toast.success('Item deleted from cart');
  };

  return (
    <>
      <ToastContainer />
      <div className="cart-container">
        <div className="cart-header">
          <h2>Your Cart</h2>
          <ul className="nav">
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
        
        {
          cart.length === 0 ? <h2>No Cart is Added</h2> :
        
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="cart-item-image-container">
              <img src={item.image} alt={item.title} className="cart-item-image" />
            </div>
            <div className="cart-item-details">
              <h3 className="cart-item-title">{item.title}</h3>
              <span className="cart-item-price">${item.price}</span>
            </div>
            <div className="cart-item-quantity">
              <button className="quantity-btn" onClick={() => removeFromCart(item)}>-</button>
              <span className="quantity-value">{item.quantity}</span>
              <button className="quantity-btn" onClick={() => addToCart(item)}>+</button>
            </div>
            <div className="cart-item-buttons">
              <button onClick={() => openModal(item)} className="view-btn">View</button>
              <button className="remove-btn" onClick={() => del(item)}>Remove</button>
            </div>
          </div>
        ))}

        <div className="cart-total">
         
          <div>
            <h3>Total Price</h3>
          </div>
          <div className="total-underline"></div>
          <span className="total-price">${totalPrice.toFixed(2)}</span>
          <button className="checkout-btn" onClick={checkoutPage}>Checkout</button>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Item Details"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="modal-header">
          <h2>{selectedItem ? selectedItem.title : 'Item Details'}</h2>
          <button onClick={closeModal} className="close-modal-btn">✖</button>
        </div>
        {selectedItem && (
          <div className="modal-content">
            <img src={selectedItem.image} alt={selectedItem.title} className="modal-item-image" />
            <div className="modal-details">
              <p>Price: ${selectedItem.price}</p>
              <p>Description: {selectedItem.description || 'No description available'}</p>
              <p>Category: {selectedItem.category || 'Uncategorized'}</p>
              <p>Stock: {selectedItem.stock || 'N/A'}</p>
            </div>
          </div>
        )}
        <div className="modal-footer">
          <button onClick={handleRemoveItem} className="remove-btn">Close</button>
        </div>
      </Modal>
      <br/><br/>
      <Pagination viewFunction = {openModal}/>

      <Footer/>
    </>
  );
};

export default Carts;
