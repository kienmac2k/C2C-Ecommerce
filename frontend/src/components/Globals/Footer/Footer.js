import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";
import {
  link1,
  link2,
  link3,
  link4,
  socialicons,
} from "../../../constants/footerlinks";

import applestore from "../../../assets/img/appstoreimg.png";
import playstore from "../../../assets/img/playstoreimg.png";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="row row1">
          <div className="col-md-2">
            <h6>Get to know Us</h6>
            <ul>
              {link1.map((link, index) => (
                <li key={index}>
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={link.path}
                    to={link.path}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-2">
            <h6>Payment</h6>

            <ul>
              {link2.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-2">
            <h6>Let Us Help You</h6>

            <ul>
              {link3.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-2">
            <h6>Sell on Monkhey</h6>
            <ul>
              {link4.map((link, index) => (
                <li key={index}>
                  <Link to={link.path}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4 d-flex flex-column align-items-center">
            <ul className="d-md-flex flex-column justify-content-between appstores">
              <h4 className="center">Get the Monkhey app</h4>
              <li>
                <Link to="/">
                  <img src={applestore} alt="App Store" />
                </Link>
              </li>
              <li className="">
                <Link to="/">
                  <img src={playstore} alt="Play Store" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="row align-items-center row3">
          <div className="col-2 col-md-4">
            <h6>Get Connected</h6>
            <ul className="d-md-flex socials">
              {socialicons.map((icon, index) => (
                <li key={index}>
                  <Link to={icon.path}>
                    <img src={icon.Img} alt={icon.platform} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </footer>
      <div className="row row5 footer-bottom">
        <div className="col-md-12">
          <p>
            Copyright &copy; {new Date().getFullYear()} Monkhey Inc. All Right
            Reserved
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
