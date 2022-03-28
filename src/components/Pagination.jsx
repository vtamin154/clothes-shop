import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductLine from './ProductLine';

// Pagination.propTypes = {
// pagination: PropTypes.object.isRequired,
// onChangePage: PropTypes.func
// };

function Pagination(props) {
  const [productList, setProductList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  const productPerPage = 12;
  const pageVisited = pageNumber;
  const displayProducts = props.data.slice(
    pageVisited * productPerPage - 12,
    pageVisited * productPerPage
  );
  // console.log(displayProducts);
  // console.log("prLine", props.data);

  useEffect(() => {
    setProductList(displayProducts);
  }, [pageNumber]);

  const handleNext = () => {
    if (pageNumber < Math.ceil(props.data.length / productPerPage)) {
      setPageNumber(pageNumber + 1);
    } else {
      alert("that's all");
    }
  };

  const handlePre = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    } else {
      alert("that's all");
    }
  };

  return (
    <div className="pagination">
      {/* <div className="row"> */}
        <ProductLine
          data={productList.length > 0 ? productList : displayProducts}
        />
      {/* </div> */}
      {/* <div className="row"> */}
        <div className="pagination__btn">
          <button onClick={() => handlePre()}>Pre</button>
          <button onClick={() => handleNext()}>Next</button>
        </div>
      {/* </div> */}
    </div>
  );
}

export default Pagination;
