import React, { useEffect, useState } from 'react';
import useData from '../component/useData';
import './Food.css'; 
import Footer from '../component/Footer';
import Search from '../component/Search';
import Shimmer from '../component/Shimmer';
import Modal from 'react-modal';

const Food = () => {
    const [foodApi, setFoodApi] = useState({ categories: [] }); 
    const [filteredFood, setFilteredFood] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [selectedFood, setSelectedFood] = useState(null); 
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php"; 
    const { datas } = useData(url); 

    const foodSearchText = (val) => {
        const filtered = foodApi.categories.filter(item =>
            item.strCategory.toLowerCase().includes(val.toLowerCase())
        );
        setFilteredFood(filtered);
    };

    useEffect(() => {
        if (datas) {
            setFoodApi(datas);
            setLoading(false);
        } else {
            setLoading(false); 
        }
    }, [datas]);

    const openModal = (category) => {
        setSelectedFood(category); 
        setIsModalOpen(true); 
    };

    const closeModal = () => {
        setIsModalOpen(false); 
        setSelectedFood(null); 
    };

    if (loading) {
        return <Shimmer />; 
    }

    const displayFood = filteredFood.length > 0 ? filteredFood : foodApi.categories;

    return (
        <>
            <Search foodSearchText={foodSearchText} condition={true} />
            <div className="food-container">
                {displayFood?.map((v, i) => (
                    <div key={i} className="food-card">
                        <img src={v.strCategoryThumb} alt={v.strCategory} className="food-img" />
                        <h3 className="food-title">{v.strCategory}</h3>
                        <p className="food-description">
                            {v.strCategoryDescription.slice(0, 100)}...
                        </p>
                        <div className="food-buttons">
                            <button onClick={() => openModal(v)} className="food-button">View Details</button>
                            <a href="#" className="food-button add-to-cart">Add to Cart</a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal for showing food details */}
            <Modal 
                isOpen={isModalOpen} 
                onRequestClose={closeModal} 
                contentLabel="Food Details"
                className="food-modal" 
                overlayClassName="food-modal-overlay" 
            >
                {selectedFood && (
                    <>
                        <h2 className="modal-title">{selectedFood.strCategory}</h2>
                        <img src={selectedFood.strCategoryThumb} alt={selectedFood.strCategory} className="modal-img" />
                        <p className="modal-description">{selectedFood.strCategoryDescription}</p>
                        <button onClick={closeModal} className="modal-close-button">Close</button>
                    </>
                )}
            </Modal>

            <Footer />
        </>
    );
};

export default Food;
