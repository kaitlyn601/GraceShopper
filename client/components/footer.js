import React from "react";
import { SocialIcon } from "react-social-icons";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container grid--footer">
        <div className="logo-col">
          <a href="#" className="footer-logo">
            <img
              className="logo"
              alt="Godiva logo"
              src="https://images-platform.99static.com//fiBHQGzCOM4ttyZ7rpwTwhXP4yw=/178x0:1183x1006/fit-in/500x500/99designs-contests-attachments/89/89528/attachment_89528749"
            />
          </a>

          <ul className="social-links">
            <li>
              <a className="footer-link" href="#">
                <ion-icon
                  className="social-icon"
                  name="logo-instagram"
                ></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <ion-icon
                  className="social-icon"
                  name="logo-facebook"
                ></ion-icon>
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                <ion-icon
                  className="social-icon"
                  name="logo-twitter"
                ></ion-icon>
              </a>
            </li>
          </ul>
          <p className="copyright">
            Copyright &copy; <span className="year">2022</span> by Totodile,
            Inc. All rights reserved.
          </p>
        </div>

        <div className="address-col">
          <p className="footer-heading">Contact us</p>
          <address className="contacts">
            <p className="address">
              5 Hanover Square 11th floor, New York, NY 10004
            </p>
            <p>
              <a className="footer-link" href="tel:415-201-6370">
                800-201-6370
              </a>
              <br />
              <a className="footer-link" href="mailto:hello@omnifood.com">
                hello@totodile.com
              </a>
            </p>
          </address>
        </div>

        <nav className="nav-col">
          <p className="footer-heading">Account</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                Create account
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Sign in
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                iOS app
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Android app
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Customer Service</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                Order Tracking
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Shipping Info
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Return Policy
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                FAQs
              </a>
            </li>
          </ul>
        </nav>

        <nav className="nav-col">
          <p className="footer-heading">Resources</p>
          <ul className="footer-nav">
            <li>
              <a className="footer-link" href="#">
                Godiva Newsroom
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Help center
              </a>
            </li>
            <li>
              <a className="footer-link" href="#">
                Privacy & terms
              </a>
            </li>
            <li>
              <SocialIcon url="https://github.com/TotodileTamers/GraceShopper" />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
