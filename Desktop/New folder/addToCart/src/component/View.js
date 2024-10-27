import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './View.css'; 
import useData from "./useData";
import Shimmer from './Shimmer';
import Footer from './Footer';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../redux/Cartslice';
import { toast } from 'react-toastify'; 
import 'react-toastify/ReactToastify.css';  

const View = () => {
  const [viewProduct, setViewProduct] = useState({});
  const cart = useSelector((store) => store.cart.items);
  const location = useLocation();
  const navigate = useNavigate();
  const { v } = location.state || {};
  const [quantity, setQuantity] = useState(1); 
  const { datas } = useData("https://fakestoreapi.com/products");
  const dispatch = useDispatch();

  useEffect(() => {
    setViewProduct(v);
  }, [v]);


  if (!v) {
    toast.error("No product data found!"); 
    return <div className="view-error-message">No product data found!</div>;
  }

  const handleBack = () => {
    navigate(-1); 
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  const view = (item) => {
    setViewProduct(item);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const addToCart = (id) => {
    const x = localStorage.getItem("token")
    if(x){
      const filtered = datas.filter((v) => v.id === id);
    
      if (filtered.length > 0) {
        const x = {
          ...filtered[0],
          quantity: quantity,
        };
        dispatch(addItem(x));
        toast.success("Item added to cart!"); 
      } 

    }else{
      navigate("/api/login")
    }

  };

  return (
    <>
      <div className="view-page-container">
        {/* Header Section */}
        <header className="view-header">
          <button className="view-back-btn-header" onClick={handleBack}>⬅ Back</button>
          <h1 className="view-header-title">Product Details</h1>
          <nav className="view-nav">
            <a href="/" className="view-nav-link">Home</a>
          </nav>
        </header>

        {/* Product Card Section */}
        <div className="view-product-container">
          <div className="view-product-card">
            <img src={viewProduct.image} alt={viewProduct.title} className="view-product-image" />
            <div className="view-product-info">
              <h2 className="view-product-title">{viewProduct.title}</h2>
              <p className="view-product-category">Category: {viewProduct.category}</p>
              <p className="view-product-price">Price: <span>${viewProduct.price}</span></p>
              <p className="view-product-description">{viewProduct.description}</p>
              <p className="view-product-rating">
                Rating: <span>{viewProduct.rating?.rate}</span> ({viewProduct.rating?.count} reviews)
              </p>

              <div className="view-cart-section">
                <div className="view-quantity-controller">
                </div>
                <button className="view-add-to-cart-btn" onClick={() => addToCart(viewProduct.id)}>Add to Cart</button>
              </div>

              <button className="view-back-btn" onClick={handleBack}>Back</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="product-grid">
          {datas.length > 0 ? datas.map((v) => {
            return (
              <div className="product-card" key={v.id}>
                <img src={v.image} alt={v.title} className="product-image" />
                <h3 className="product-title">{v.title}</h3>
                <p className="product-category">{v.category}</p>
                <p className="product-description">{v.description}</p>
                <p className="product-price">${v.price}</p>
                <p className="product-rating">Rating: {v.rating.rate} ({v.rating.count} reviews)</p>

                {/* Add Buttons */}
                <div className="button-container">
                  <button className="view-button" onClick={() => view(v)}>View Product</button>
                  <button className="cart-button" onClick={() => addToCart(v.id)}>Add to Cart</button>
                </div>
              </div>
            );
          }) : <Shimmer />}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default View;
