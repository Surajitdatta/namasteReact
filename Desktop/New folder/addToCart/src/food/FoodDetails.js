// FoodDetails.js
import React from 'react';

const FoodDetails = ({ category }) => {
    return (
        <div className="food-details">
            <h2>{category.strCategory}</h2>
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <p>{category.strCategoryDescription}</p>
           
            <button onClick={() => window.history.back()}>Back</button>
        </div>
    );
};

export default FoodDetails;
