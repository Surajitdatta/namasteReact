import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Profile.css';
import image from "../image/portfolio.jpg"

const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true); 
  }, []);

  const handleRedirect = () => {
    window.location.href = 'https://surajitresponsive.netlify.app/'; 
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <Popup open={isOpen} onClose={closePopup} modal>
      <div className="popup-content">
        <img src={image} alt="Profile" className="popup-image" />
        <h3>Visit My Personal Portfolio</h3>
        <p>Explore my work and projects. Click below to visit my portfolio.</p>
        <button onClick={handleRedirect} className="visit-portfolio-btn">Visit My Portfolio</button>
        <button onClick={closePopup} className="close-popup-btn">Close</button>
      </div>
    </Popup>
  );
};

export default Profile;
