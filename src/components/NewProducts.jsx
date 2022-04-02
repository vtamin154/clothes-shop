import React from 'react';
// import Aos from 'aos';

const NewProducts = () => {
  return (
    <div className="new-products container-fluid">
      <div className="row">
        <h1 data-aos="fade-down">Sản phẩm mới</h1>
        <p data-aos="fade-down">
          Các sản phẩm vẫn đang được thiết kế , bạn có thể đặt trước các mẫu
          thiết kế riêng.
        </p>
      </div>
      <div className="row">
        <div className="col-lg-8 new-products__img" data-aos="fade-right">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2F244b18e5-f06f-420e-9115-d8a817d5b7231604056047931-DILLINGER-Women-Tshirts-7201604056046427-1.jpg?alt=media&token=244a4f72-b7b1-475a-9c39-dd62fe89f81c"
            alt=""
          />
        </div>
        <div className="col-lg-4 new-products__content" >
          <h3 data-aos="fade-left">Áo phông</h3>
          <p data-aos="fade-left">Bạn có thể đặt trước các sản phẩm thiết kế riêng.</p>
          <a 
            href="/"
            className="new-products__content__btn text-decoration-none"
          >
            Đặt trước
          </a>
        </div>
      </div>
      <div className="row flex-row-reverse">
        <div className="col-lg-8  new-products__img" data-aos="fade-left">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2Ffashion.jpg?alt=media&token=44eac85c-39b0-4220-a3f8-e8481f6ea760"
            alt=""
          />
        </div>
        <div className="col-lg-4 new-products__content" >
          <h3 >Áo sơ mi</h3>
          <p >Bạn có thể đặt trước các sản phẩm thiết kế riêng.</p>
          <a 
            href="/"
            className="new-products__content__btn text-decoration-none"
          >
            Đặt trước
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
