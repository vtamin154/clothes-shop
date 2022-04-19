import React from 'react';
import { FaMapMarkerAlt, FaFacebook } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { BsPhone, BsInstagram, BsPinterest } from 'react-icons/bs';
const Contact = () => {
  return (
    <div className="contact container-fluid">
      <div className="row contact__cover  justify-content-center">
        <div className="col-md-4 contact__cover__contactInfor">
          <div>
            <h2>Thông tin liên hệ</h2>
            <div>
              <span>
                <FaMapMarkerAlt className="me-2" />
                Km10 Nguyễn Trãi, Hà Đông, Hà Nội
              </span>
            </div>
            <div>
              <span>
                <FiMail className="me-2" />
                wendies@gmail.com
              </span>
            </div>
            <div>
              <span>
                <BsPhone className="me-2" />
                0987-654-321
              </span>
            </div>
            <div className="social">
              <FaFacebook />
              <BsInstagram className="ms-3" />
              <BsPinterest className="ms-3" />
            </div>
          </div>
        </div>
        <div className="col-md-7 contact__cover__mess py-4">
          <h2>Liên hệ</h2>
          <form>
            <div className="form-input">
              <input type="text" placeholder="Tên" />
              <input type="text" placeholder="Họ" />
            </div>
            <div className="form-input">
              <input type="email" placeholder="Email" />
              <input type="text" placeholder="Số điện thoại" />
            </div>

            <label className="mt-3">Nội dung</label>
            <br />
            <textarea rows="1"></textarea>
            <button className="button mt-3">Gửi</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
