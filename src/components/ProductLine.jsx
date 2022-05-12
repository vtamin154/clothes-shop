import React, { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { ProductContextProvider } from './ProductContext';
import { CartContext } from '../store/CartContext';
import Message from './Message';
// import { ProductDetailContext } from '../store/ProductDetailContext';

const ProductLine = (props) => {
  const { products } = useContext(ProductContextProvider);
  const [success, setSuccess] = useState(false);
  // const [product, setProduct] = useContext(ProductDetailContext);
  const data = props.data;
  // console.log("data", data);
  const listProduct = data ? data : products.slice(0, 10);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setSuccess(false);
    }, 1000);
    return () => {
      clearTimeout(setTime);
    };
  },[success])

  const history = useHistory();
  const addToCart = (product) => {
    if (props.user) {
      dispatch({
        type: 'add_product',
        userID: props.user.UserID,
        payload: { total: 1, product: product, productID: product.ProductID },
      });
      setSuccess(true);
      // console.log(product.ProductID);
    } else {
      // auth.onAuthStateChanged(user => {
      //   if(!user){
      history.push('/login');
      //   }
      // })
    }
  };

  const goToProductDetail = (id) => {
    // setProduct(product);// ProductID, ProductImg[], ProductName, ProductCategory, ProductPrice
    history.push(`/product-detail/${id}`);
  };

  const [, dispatch] = useContext(CartContext);
  return (
    <div className="product-line container">
      <div className="row">
        {listProduct.map((product, index) => (
          <div
            className="product-line__card col-md-3 col-lg-2"
            // key={product.ProductID}
            key={index}
          >
            <div className="product-line__card__img">
              <img
                onClick={() => goToProductDetail(product.ProductID)}
                src={product.ProductImg[0]}
                alt={product.ProductName}
              />
              <div className="product-line__card__img__cart">
                <button onClick={() => addToCart(product)}>Add to cart</button>
              </div>
            </div>

            <div className="product-content">
              <Link
                to={`/product-detail/${product.ProductID}`}
                className="product-line__card__name text-dark text-decoration-none"
              >
                {product.ProductName}
              </Link>
              <div className="product-line__card__category">
                {product.ProductCategory}
              </div>
              <div className="product-line__card__price">
                {new Intl.NumberFormat('it-IT', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.ProductPrice)}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={success ? 'active' : 'non-active'}>
        <Message />
      </div>
    </div>
  );
};

export default ProductLine;
