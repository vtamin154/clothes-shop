import React, { useState, useContext } from 'react';
import Helmet from '../components/Helmet';
import Pagination from '../components/Pagination';
// import ProductLine from '../components/ProductLine';
import Sidebar from '../components/Sidebar';
import { ProductContextProvider } from '../components/ProductContext';

const Catalog = ({user}) => {
  const  { products }  = useContext(ProductContextProvider);
  const [productList, setProductList] = useState([]);

  // console.log('parent', products);
  const receiveProducts = (data) => {
    setProductList(data);
  };
  // console.log('parent2', productList);

  return (
    <Helmet title="Cửa hàng">
      <div className="catalog container">
        <div className="row">
          <div className="catalog__filter col-lg-3">
            <Sidebar receiveProducts={receiveProducts} data={products} />
          </div>
          <div className="catalog__products col-lg-9">
            {/* <ProductLine data={productList} /> */}
            <Pagination data = {productList.length > 0 ? productList : products} user = {user}/>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
