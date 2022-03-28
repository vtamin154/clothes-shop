import React from 'react';
import Aos from 'aos';

const Style = () => {
  return (
    <div className="container-fluid style">
      <div className="row justify-content-between">
        <div className="col-md-3 style__content" data-aos="fade-up">
          <h2 data-aos="fade-up">Thay đổi bản thân</h2>
          <p className="fs-3" data-aos="fade-up">Phong cách ấn tượng</p>
          <p className="fs-5" data-aos="fade-up">
            Mỗi ngày là khác nhau để chúng ta có thể để cho mình một cái nhìn
            mới sau một ngày. Wendies luôn đem đến sự lựa chọn tốt nhất.
          </p>
          <a href="/" data-aos="fade-up" className="style__content__btn text-decoration-none">
            Xem thêm
          </a>
        </div>
        <div className="col-md-2 style__img" data-aos="fade-up">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2Fphoto-1583744946564-b52ac1c389c8.jpg?alt=media&token=433e0489-e99a-4233-91f7-67dea1ce57ff"
            alt=""
            style={{ height: '300px' }}
          />
        </div>
        <div className="col-md-2 style__img" data-aos="fade-up">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2FD02G055-F17-22399-650px-964px.jpg?alt=media&token=361a2b22-03d7-4775-82e3-d8dbf06f981b"
            alt=""
            style={{ height: '420px' }}
          />
        </div>
        <div className="col-md-2 style__img" data-aos="fade-up">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2Fa764ee3600916b0e519bf9e8b340d42d.jpg?alt=media&token=0c32e554-a859-48b9-ae5e-8bf504976901"
            alt=""
          />
        </div>
        <div className="col-md-2 style__img" data-aos="fade-up">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2F1627637404--womens-odin-pull-on-trouser-in-camel-brown-2.jpg?alt=media&token=bb71ca38-6dc2-4162-b415-3bca4f186405"
            alt=""
            style={{ height: '380px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default Style;
