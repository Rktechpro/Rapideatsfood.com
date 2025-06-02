import React from "react";
import "./Footer.css";
import {
  FacebookFilled,
  HomeFilled,
  InstagramFilled,
  MailOutlined,
  PhoneFilled,
  SecurityScanFilled,
  ShoppingFilled,
  TwitterCircleFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Footer = () => {
  const socialicon = [
    {
      icon: <FacebookFilled className="  fa-facebook" />,
    },
    {
      icon: <InstagramFilled className="  fa-instagram" />,
    },
    {
      icon: <TwitterCircleFilled className=" fa-twitter" />,
    },
  ];
  const Compnay = [
    {
      name: "Home",
      icon: <HomeFilled className="Home-co" />,
    },
    {
      name: "About us",
      icon: <UserOutlined className="About-co" />,
    },
    {
      name: "Delivery",
      icon: <ShoppingFilled className="Delivery-co" />,
    },
    {
      name: "Privacy Policy",
      icon: <SecurityScanFilled className="Privacy-co" />,
    },
  ];
  const contact = [
    {
      name: "rapideatsfood@email.com",
      icon: <MailOutlined className="email-co" />,
    },
    {
      name: "+9145-557-34-456",
      icon: <PhoneFilled className="phone-co" />,
    },
  ];
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <h1 className="logo-footer">
            Rapid<span className="logo-s-footer">eatsfood</span>
          </h1>
          Discover a world of culinary delights with our food website, featuring
          mouth-watering recipes, cooking tips, and gourmet inspirations to
          elevate your kitchen experience. Join us on a delicious journey today!
          <div className="social-media-icon">
            {socialicon.map((item, index) => {
              return (
                <div key={index} className="fa">
                  <Link>{item.icon}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="footer-content-center">
          <h1>Company</h1>
          <ul>
            {Compnay.map((item, index) => {
              return (
                <li key={index} className="company">
                  <Link>{item.icon}</Link>
                  <Link className="name-co">{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="footer-content-right">
          <h1>GET IN TOUCH</h1>
          <ul>
            {contact.map((item, index) => {
              return (
                <li key={index} className="flex">
                  <Link>{item.icon}</Link>
                  <Link className="name-co ">{item.name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <hr />
      <p className="copy-right-text">
        Copyright {new Date().getFullYear()} @ rapideatsfood.com - All Right
        Reserved.
      </p>
    </div>
  );
};

export default Footer;
