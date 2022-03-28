import React, { useState, useContext } from 'react';
import Helmet from '../components/Helmet';
import Pagination from '../components/Pagination';
// import ProductLine from '../components/ProductLine';
import Sidebar from '../components/Sidebar';
import { ProductContextProvider } from '../components/ProductContext';

const Catalog = () => {
  const  { products }  = useContext(ProductContextProvider);
  const [productList, setProductList] = useState([]);

  // console.log('parent', products);
  // console.log('parent2', productList);
  const receiveProducts = (data) => {
    setProductList(data);
  };

  return (
    <Helmet title="Cửa hàng">
      <div className="catalog container">
        <div className="row">
          <div className="catalog__filter col-lg-3">
            <Sidebar receiveProducts={receiveProducts} data={products} />
          </div>
          <div className="catalog__products col-lg-9">
            {/* <ProductLine data={productList} /> */}
            <Pagination data = {productList.length > 0 ? productList : products}/>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Catalog;
