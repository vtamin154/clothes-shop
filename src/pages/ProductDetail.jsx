import React, { useEffect, useState, useContext } from 'react';
import { db } from '../config/Config';
import Helmet from '../components/Helmet';
import { BsPlusSquare, BsDashSquare, BsTruck } from 'react-icons/bs';
import { CartContext } from '../store/CartContext';
import { MdPolicy } from 'react-icons/md';
import { Link, useHistory } from 'react-router-dom';
import { ProductDetailContext } from '../store/ProductDetailContext';

import ProductLine from '../components/ProductLine';
import Message from '../components/Message';
const ProductDetail = (props) => {
  const [quantity, setQuantity] = useState(1);
  const [success, setSuccess] = useState(false);
  const [, dispatch] = useContext(CartContext);
  const [productPurchased, setProductPurchased] =
    useContext(ProductDetailContext);

  const [active, setActive] = useState('XS');
  // console.log(product);
  let id = window.location.pathname.split('/')[2];
  const [product, setProduct] = useState({
    ProductID: '',
    ProductImg: '',
    ProductName: '',
    ProductCategory: '',
    ProductPrice: '',
  });

  const [viewImg, setViewImg] = useState('');

  const [productRecommend, setProductRecommend] = useState([]);
  useEffect(() => {
    // setViewImg(product.ProductImg[0]);
    const getProduct = (id) => {
      db.collection('Products')
        .doc(id)
        .get()
        .then((snap) => {
          const { ProductImg, ProductName, ProductCategory, ProductPrice } =
            snap.data();
          setProduct({
            ProductID: id,
            ProductImg: ProductImg,
            ProductName: ProductName,
            ProductCategory: ProductCategory,
            ProductPrice: ProductPrice,
          });
          setViewImg(ProductImg[0]);
        });
    };
    getProduct(id);
  }, []);

  useEffect(() => {
    db.collection('Products')
      .where('ProductCategory', '==', product.ProductCategory)
      .get()
      .then((snap) =>
        snap.docs.forEach((item) =>
          setProductRecommend((pre) => [...pre, item.data()])
        )
      );
  }, [product.ProductCategory]);
  const history = useHistory();
  const addToCart = (product, quantity) => {
    if (props.user) {
      dispatch({
        type: 'add_product',
        userID: props.user.UserID,
        payload: {
          total: quantity,
          product: {
            ProductImg: product.ProductImg,
            ProductName: product.ProductName,
            ProductCategory: product.ProductCategory,
            ProductPrice: product.ProductPrice,
          },
          productID: product.ProductID,
        },
      });
    } else {
      history.push('/login');
    }
  };

  useEffect(() => {
    const setTime = setTimeout(() => {
      setSuccess(false);
    }, 1000);
    return () => {
      clearTimeout(setTime);
    };
  }, [success]);

  const checkOut = (product, quantity) => {
    setProductPurchased({ product: product, total: quantity });
    addToCart(product, quantity);

    history.push('/cart');
    setSuccess(true);
    // console.log([{...product, total: quantity}]);
    // dispatch({
    //   type: 'checkout',
    //   payload: { product: product , total: quantity, amount: product.ProductPrice * quantity },
    //   userID: props.user.UserID,
    // })
  };
  return (
    <Helmet title="S???n ph???m">
      <div className="product-detail container">
        <div className="product-detail__product row justify-content-center">
          <div className="product-detail__product__img col-md-1">
            <div
              className="img-item mb-2"
              onClick={() => setViewImg(product.ProductImg[0])}
            >
              <img src={product.ProductImg[0]} alt=""></img>
            </div>
            <div
              className="img-item"
              onClick={() => setViewImg(product.ProductImg[1])}
            >
              <img src={product.ProductImg[1]} alt="" />
            </div>
          </div>
          <div className="product-detail__product__main col-md-4">
            <img src={viewImg} alt="" />
          </div>
          <div className="product-detail__product__cover col-md-5">
            <div className="product-infor">
              <div className="product-name">{product.ProductName}</div>
              <div className="product-price mt-3">
                ????n gi??{' '}
                {product.ProductPrice.toLocaleString('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                })}
              </div>
              <div className="product-quantity mt-3">
                S??? l?????ng
                <span
                  className="mx-4"
                  onClick={() =>
                    setQuantity((pre) => (quantity > 1 ? pre - 1 : 1))
                  }
                >
                  <BsDashSquare />
                </span>
                {quantity}
                <span
                  className="ms-4"
                  onClick={() => setQuantity((pre) => pre + 1)}
                >
                  <BsPlusSquare />
                </span>
              </div>
              <div className="product-size">
                <span
                  className={active === 'XS' ? 'active-size' : ''}
                  onClick={() => setActive('XS')}
                >
                  XS(2)
                </span>
                <span
                  className={active === 'S' ? 'active-size' : ''}
                  onClick={() => setActive('S')}
                >
                  S(4)
                </span>
                <span
                  className={active === 'M' ? 'active-size' : ''}
                  onClick={() => setActive('M')}
                >
                  M(6)
                </span>
                <span
                  className={active === 'L' ? 'active-size' : ''}
                  onClick={() => setActive('L')}
                >
                  L(8)
                </span>
              </div>
              <div className="btn-cart">
                <button
                  className="btn mt-4"
                  onClick={() => addToCart(product, quantity)}
                >
                  Th??m v??o gi???
                </button>
                <button
                  className="btn mt-4 ms-5"
                  onClick={() => checkOut(product, quantity)}
                >
                  Mua ngay
                </button>
              </div>
              <div className="product-policy">
                <div className="transport">
                  <BsTruck className="fs-3 text-success" />
                  <span>Mi???n ph?? v???n chuy???n</span>
                  <br />
                  <span className="ms-5">
                    Giao h??ng mi???n ph?? v???i m???c gi?? c??? ?????nh cho ????n h??ng t???
                    499.000??
                  </span>
                </div>
                <div className="policy-return" aria-label="Ch??nh s??ch ho??n tr???">
                  <MdPolicy className="fs-3 text-success" />
                  <span>Ch??nh s??ch ho??n tr???</span>
                  <br />
                  <span className="ms-5">T??m hi???u th??m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="product-same">
          <h3>S???n ph???m t????ng t???</h3>
        </div>
        <ProductLine data={productRecommend} />

        <div className="product-intro">
          <Link to="/catalog" className="text-decoration-none btn">
            Xem th??m
            {/* <button className="btn">Xem th??m</button> */}
          </Link>
          <div className="product-intro__slide">
            <div className="slogan">
              <h4>Wendies</h4>
              <p>not just any girl</p>
              <span>New fashion</span>
            </div>
          </div>
        </div>
        <div className={success ? 'active' : 'non-active'}>
          <Message />
        </div>
      </div>
    </Helmet>
  );
};

export default ProductDetail;
