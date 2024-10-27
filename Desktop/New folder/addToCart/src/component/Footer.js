import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      {/* About Section */}
      <div className="footer-about">
        <h3>DummyStore</h3>
        <p>Your one-stop shop for all things awesome! From electronics to fashion, we've got you covered with the best deals and exclusive offers.</p>
      </div>

      {/* Quick Links Section */}
      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Shop</a></li>
          <li><a href="#">About Us</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>

      {/* Contact Section */}
      <div className="footer-contact">
        <h4>Contact Us</h4>
        <p>Email: <a href="mailto:support@dummystore.com">support@dummystore.com</a></p>
        <p>Phone: +123 456 789</p>
        <p>Location: 123 Dummy St, Fake City, FC 12345</p>
      </div>

      {/* Social Media Section */}
      <div className="footer-social">
        <h4>Follow Us</h4>
        <a href="#"><i className="fab fa-facebook-f"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-linkedin-in"></i></a>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 DummyStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
