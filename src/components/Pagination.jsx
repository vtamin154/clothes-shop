import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { db } from '../config/Config';
import ProductLine from './ProductLine';
import { Table, Button, ButtonGroup } from 'react-bootstrap';

// Pagination.propTypes = {
  // pagination: PropTypes.object.isRequired,
  // onChangePage: PropTypes.func
// };

function Pagination(props) {
  const [productList, setProductList] = useState(props.data);
  const [pageNumber, setPageNumber] = useState(1);

  const productPerPage = 4;
  const pageVisited = pageNumber;
  const displayProducts = props.data.slice(pageVisited, pageVisited + productPerPage);

  console.log("pagination", productList);
  // console.log("pageVisited", pageVisited, "productList", displayProducts);
  useEffect(() => {
      setProductList(displayProducts);
  },[pageNumber]);

  const handleNext = () =>{
      if(pageNumber < Math.ceil( props.data.length/productPerPage)){
        setPageNumber(pageNumber + 1);
      }
      else{
          alert("that's all");
      }
  }
  const handlePre = () =>{
      if(pageNumber > 1 ){
        setPageNumber(pageNumber - 1);
      }
      else{
          alert("that's all");
      }
  }
  return (
    <div>
      <ProductLine data = {productList}/>
      <button onClick={() => handlePre()}>Pre</button>
      <button onClick={() => handleNext()}>Next</button>
    </div>
  );
}

export default Pagination;
