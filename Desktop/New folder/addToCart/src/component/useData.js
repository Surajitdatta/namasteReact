// useData.js
import React, { useState, useEffect } from 'react';

const useData = (url) => {
  const [datas, setDatas] = useState([]);
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    if (!online) {
      setDatas([{}]);
      return;
    } else if (online && url) {
      const fetchData = async () => {
        try {
          const response = await fetch(url);
          const data = await response.json();
          setDatas(data);
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      };
      fetchData();
    }
  }, [online, url]);

  return { datas };
};

export default useData;
