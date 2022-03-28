import React from 'react';
import { FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { AiFillPhone } from 'react-icons/ai';
import { BsInstagram, BsPinterest } from 'react-icons/bs';
const Footer = () => {
  return (
    <div className="footer container-fluid">
      <div className="row justify-content-around">
        <div className="col-md-3 footer__contact">
          <h3>Liên hệ</h3>
          <div>
            <FaMapMarkerAlt /> <span>Km10 Nguyễn Trãi, Hà Đông, Hà Nội</span>
          </div>
          <div>
            <FiMail /> <span>wedies@gmail.com</span>
          </div>
          <div>
            <AiFillPhone />
            <span>0987-654-321</span>
          </div>
          <div className="footer__contact__social">
            <FaFacebook />
            <BsInstagram />
            <BsPinterest />
          </div>
        </div>
        <div className="col-md-3 footer__category">
          <h3>Danh mục</h3>
          <a href="/" className="d-block text-decoration-none">
            Váy
          </a>
          <a href="/" className="d-block text-decoration-none">
            Quần
          </a>
          <a href="/" className="d-block text-decoration-none">
            Áo phông
          </a>
          <a href="/" className="d-block text-decoration-none">
            Áo sơ mi
          </a>
          <a href="/" className="d-block text-decoration-none">
            Thu đông
          </a>
        </div>
        <div className="col-md-5 footer__address">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.3024241108383!2d105.78573631424445!3d20.980510994801083!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdd8a1ad71%3A0xa2f9b16036648187!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IGNow61uaCB2aeG7hW4gdGjDtG5n!5e0!3m2!1sen!2s!4v1648176150435!5m2!1sen!2s"
            loading="lazy"
            // referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <div className="row">
        <div className="footer__menu">
          <a href="/">Trang chủ</a>
          <a href="/">Cửa hàng</a>
          <a href="/">Tài khoản </a>
          <a href="/">Liên hệ</a>
        </div>
        <p className="footer__copyright">Copyright © 2022 Wendies</p>
      </div>
    </div>
  );
};

export default Footer;
