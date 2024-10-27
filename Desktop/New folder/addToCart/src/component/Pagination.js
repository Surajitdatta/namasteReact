import React, { useEffect, useState } from 'react';
import useData from './useData';
import './Pagination.css';
import { useSelector } from 'react-redux';
import { addItem } from '../redux/Cartslice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Pagination = ({viewFunction}) => {
  const [api, setApi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const { datas } = useData("https://fakestoreapi.com/products");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    setApi(datas);
  }, [datas]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = api.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => {
    if (currentPage < Math.ceil(api.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //View product function
  const view = (product)=>{
    viewFunction(product)

  }

  //Add to cart
  const addToCart=(item)=>{
    const token = localStorage.getItem("token")
    if(token){
      dispatch(addItem(item))
      toast.success("Cart has been added")

    }else{
      navigate("/api/login")
    }


  }

  return (
    <div className="pagination-container">
      <div className="items-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="item-card">
            <img src={item.image} alt={item.title} className="item-image" />
            <h4 className="item-title">{item.title}</h4>
            <div className="button-group"> 
              <button className="view-btn" onClick={()=>view(item)}>View</button> 
              <button className="add-to-cart-btn" onClick={()=>addToCart(item)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination-controls">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-btn">
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {Math.ceil(api.length / itemsPerPage)}
        </span>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(api.length / itemsPerPage)} className="pagination-btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
