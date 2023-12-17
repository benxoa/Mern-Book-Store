import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-logo">
      <img src="logo.png" alt="Logo" className="logo"/>
    </div>
    <div className="footer-info">
      <h3>Contact Us</h3>
      <p>Email: info@example.com</p>
      <p>Phone: +123456789</p>
    </div>
    <div className="footer-links">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About Us</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer
