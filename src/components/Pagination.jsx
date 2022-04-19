import React, { useEffect, useState } from 'react';

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
  // console.log("displayPr",displayProducts);
  // console.log("prLine1", productList);
  useEffect(() => {
    setProductList(displayProducts);
  }, [pageNumber]);
  
  // console.log("prLine2", productList);
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
        <ProductLine user = {props.user}
          data={ displayProducts}
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
