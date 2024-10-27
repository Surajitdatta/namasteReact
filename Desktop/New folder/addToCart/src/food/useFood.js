import React from 'react'
import { useState, useEffect } from 'react';
const useFood = (url) => {
    const [food, setFood] = useState([])
    useEffect(()=>{
      const foodData = async()=>{
        const data = await fetch(url)
        const jsonData = await data.json()
        setFood(jsonData)
        
      }
      foodData()
      

    },[url])
    
  return{food}
}

export default useFood;