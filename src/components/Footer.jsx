import React from 'react'
import { Link } from "react-router-dom";
import './Footer.css'
function Footer() {
    return (
        <div className='footer'>
            <footer id="picassoFooter">
                <div className="footer-navigation">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/about">About us</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-contact">
                    <h3>Contact Us</h3>
                    <p>Email: info@example.com</p>
                    <p>Phone: +123 456 7890</p>
                </div>
                <div className="footer-social">
                    <h3>Follow Us</h3>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank" className="social-icon">
                            FB
                        </a>
                        <a href="https://twitter.com" target="_blank" className="social-icon">
                            TW
                        </a>
                        <a href="https://instagram.com" target="_blank" className="social-icon">
                            IG
                        </a>
                    </div>
                </div>
                <div className="footer-art">
                    <canvas id="picassoCanvas" />
                </div>
            </footer>


        </div>
    )
}

export default Footer
