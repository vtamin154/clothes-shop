import React, { useContext } from 'react';
import {useHistory, Link} from 'react-router-dom';
import { ProductContextProvider } from './ProductContext';
import { CartContext } from '../store/CartContext';
// import { ProductDetailContext } from '../store/ProductDetailContext';

const ProductLine = (props) => {
  const { products } = useContext(ProductContextProvider);
  // const [product, setProduct] = useContext(ProductDetailContext);
  const data = props.data;
  // console.log("data", data);
  const listProduct = data ? data : products.slice(0, 10);

  const history = useHistory();
  const addToCart = (product) => {
    if(props.user){
      dispatch({type:"add_product" , user: props.user.UserID, payload:{total: 1, product: product, productID: product.ProductID} })
      // console.log(product.ProductID);
    }
    else{
      // auth.onAuthStateChanged(user => {
      //   if(!user){
          history.push('/login');
      //   }
      // })
    }
  }

  const goToProductDetail = (id) =>{
    // setProduct(product);// ProductID, ProductImg[], ProductName, ProductCategory, ProductPrice
    history.push(`/product-detail/${id}`);
  }
  
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
              <img onClick={() => goToProductDetail(product.ProductID)} src={product.ProductImg[0]} alt="" />
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
    </div>
  );
};

export default ProductLine;
