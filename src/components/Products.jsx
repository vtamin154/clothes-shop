import React, { useContext, useEffect } from 'react';
import ProductLine from './ProductLine';
// import { ProductContextProvider } from './ProductContext';
// import Aos from 'aos';
const Products = () => {
  // const { products } = useContext(ProductContextProvider);
  // const productList = products.slice(0, 10);
  //   console.log("Sp" , products);

  // useEffect(() =>{
  //   Aos.init({duration:2000});
  // })

  return (
    <div className="product container-fluid">
        <h1 >Sản phẩm nổi bật</h1>
        <ProductLine/>
    </div>
  );
};

export default Products;
