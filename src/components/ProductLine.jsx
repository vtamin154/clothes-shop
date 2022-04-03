import React, { useContext } from 'react';
import { ProductContextProvider } from './ProductContext';
import { CartContext } from '../store/CartContext';

const ProductLine = (props) => {
  const { products } = useContext(ProductContextProvider);
  const data = props.data;
  // console.log("data", data);
  const listProduct = data ? data : products.slice(0, 10);

  const [,dispatch] = useContext(CartContext);
  return (
    <div className="product-line container">
      <div className="row">
        {listProduct.map((product) => (
          <div
            className="product-line__card col-md-3 col-lg-2"
            key={product.ProductID}
          >
            <div className="product-line__card__img">
              <img src={product.ProductImg} alt="" />
              <div className="product-line__card__img__cart">
                <button onClick={() => dispatch({type:"add_product" , payload:{total: 1,product: product} })}>Add to cart</button>
              </div>
            </div>
            <div className="product-content">
              <a
                href="/"
                className="product__card__name text-dark text-decoration-none"
              >
                {product.ProductName}
              </a>
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
    </div>
  );
};

export default ProductLine;
