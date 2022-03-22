import React, { useContext } from 'react';
import { ProductContextProvider } from './ProductContext';
const Products = () => {
  const { products } = useContext(ProductContextProvider);
  const productList = products.slice(0,10);
//   console.log("Sp" , products);
  return (
    <div className="product container-fluid">
      <div className="row justify-content-between product-cover">
        {products.length !== 0 && <h1>Sản phẩm nổi bật</h1>}
        {/* {products.length === 0 && (
            <div>slow internet...no products to display</div>
          )} */}
        {productList.map((product) => (
          <div
            className="product__card col-sm-4 col-lg-2"
            key={product.ProductID}
          >
            <a href="/" className="product__card__img">
              <img src={product.ProductImg} alt=""/>
              <div className="product__card__img__cart">
                <button>Add to cart</button>
              </div>
            </a>
            <div className="product-content">
              <a
                href="/"
                className="product__card__name text-dark text-decoration-none"
              >
                {product.ProductName}
              </a>
              <div className="product__card__category">
                {product.ProductCategory}
              </div>
              <div className="product__card__price">{ new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'VND' }).format(product.ProductPrice)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
