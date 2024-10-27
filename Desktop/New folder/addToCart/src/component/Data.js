// Data.js
import React, { useState, useEffect } from 'react';
import useData from './useData'; 
import './Data.css';  
import Search from './Search';
import Shimmer from './Shimmer';
import Offline from './Offline';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import { addItem } from '../redux/Cartslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import Profile from '../profile/Profile';

const Data = () => {
  const [status, setStatus] = useState(navigator.onLine);
  const [products, setProducts] = useState([]);
  const [filterSearch, setFilterSearch] = useState([]);

  
  const { datas } = useData('https://fakestoreapi.com/products');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setProducts(datas);
    setFilterSearch(datas);
  }, [datas]);

  const getSearch = (val) => {
    const filtered = filterSearch.filter((v) =>
      v.description.toLowerCase().includes(val.trim().toLowerCase())
    );
    setProducts(filtered);
  };

  const getPrice = (p) => {
    const arr = p.split('-');
    const filtered = filterSearch.filter((v) =>
      v.price >= +arr[0] && v.price <= +arr[1]
    );
    setProducts(filtered);
  };

  const view = (v) => {
    navigate('/api/view', { state: { v } });
  };

  // Add to cart function
  const addToCart = (cartItem) => {
    const login = localStorage.getItem('token');

    if (!login) {
      navigate('/api/login');
    } else {
      dispatch(addItem(cartItem));
      toast.success('Cart has been added');
    }
  };

  return status ? (
    <>
      <Profile />
      <Search data={getSearch} priceData={getPrice} />
      <div className="container">
        <div className="product-grid">
          {products.length > 0 ? (
            products.map((v) => (
              <div className="product-card" key={v.id}>
                <img src={v?.image} alt={v?.title} className="product-image" />
                <h3 className="product-title">{v?.title}</h3>
                <p className="product-category">{v?.category}</p>
                <p className="product-description">{v?.description}</p>
                <p className="product-price">${v?.price}</p>
                <p className="product-rating">
                  Rating: {v?.rating?.rate} ({v?.rating?.count} reviews)
                </p>
                
             
                <div className="button-container">
                  <button className="view-button" onClick={() => view(v)}>View Product</button>
                  <button className="cart-button" onClick={() => addToCart(v)}>Add to Cart</button>
                </div>
              </div>
            ))
          ) : (
            <Shimmer />
          )}
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Offline />
  );
};

export default Data;
