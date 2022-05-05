import React, { useEffect, useState, useContext } from 'react';
import { db } from '../config/Config';
import Helmet from '../components/Helmet';
import { BsPlusSquare, BsDashSquare, BsTruck } from 'react-icons/bs';
import { CartContext } from '../store/CartContext';
import { MdPolicy } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import { ProductDetailContext } from '../store/ProductDetailContext';

const ProductDetail = (props) => {
  const [quantity, setQuantity] = useState(1);

  const [, dispatch] = useContext(CartContext);
  const [productPurchased, setProductPurchased] = useContext(ProductDetailContext);
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

  const history = useHistory();
  const addToCart = (product, quantity) => {
    if (props.user) {
      dispatch({
        type: 'add_product',
        user: props.user.UserID,
        payload: {
          total: quantity,
          product: {
            ProductImg:product.ProductImg,
            ProductName: product.ProductName,
            ProductCategory: product.ProductCategory,
            ProductPrice: product.ProductPrice
          },
          productID: product.ProductID,
        },
      });
    } else {
      history.push('/login');
    }
  };

  const checkOut = (product, quantity) => {
    setProductPurchased({product: product, total: quantity})
    addToCart(product, quantity);

    history.push('/cart');
    // console.log([{...product, total: quantity}]);
    // dispatch({
    //   type: 'checkout',
    //   payload: { product: product , total: quantity, amount: product.ProductPrice * quantity },
    //   userID: props.user.UserID,
    // })
  }
  return (
    <Helmet title="Sản phẩm">
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
              <div className="product-name fs-2">{product.ProductName}</div>
              <div className="product-price mt-3">
                Đơn giá {product.ProductPrice}Đ
              </div>
              <div className="product-quantity mt-3">
                Số lượng
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
                  onClick={() => setQuantity(pre => pre + 1)}
                >
                  <BsPlusSquare />
                </span>
              </div>
              <div className="product-size">
                <span>XS(2)</span>
                <span>S(4)</span>
                <span>M(6)</span>
                <span>L(8)</span>
              </div>
              <div className="btn-cart">
                <button
                  className="btn mt-4"
                  onClick={() => addToCart(product, quantity)}
                >
                  Thêm vào giỏ
                </button>
                <button className="btn mt-4 ms-5" onClick={() => checkOut(product, quantity)}>Mua ngay</button>
              </div>
              <div className="product-policy">
                <div className="transport">
                  <BsTruck className="fs-3 text-success" />
                  <span>Miễn phí vận chuyển</span>
                  <br />
                  <span className="ms-5">
                    Giao hàng miễn phí với mức giá cố định cho đơn hàng từ
                    499.000đ
                  </span>
                </div>
                <div className="policy-return" aria-label="Chính sách hoàn trả">
                  <MdPolicy className="fs-3 text-success" />
                  <span>Chính sách hoàn trả</span>
                  <br />
                  <span className="ms-5">Tìm hiểu thêm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ProductDetail;
