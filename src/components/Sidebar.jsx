import React, { useRef, useContext, useState, useCallback, useEffect } from 'react';
import { Form, FormControl } from 'react-bootstrap';
// import { ProductContextProvider } from './ProductContext';

const Sidebar = (props) => {
  const [filterCategory, setFilterCategory] = useState([]);
  const inputRef = useRef();
  // const { products } = useContext(ProductContextProvider);
  const products = props.data;

  console.log("sidebar",products);

  const handleCheck = (item) => {
    setFilterCategory(prev => {
      if(!filterCategory.includes(item)){
        return [...prev, item];
      }
      else{
        return filterCategory.filter(i => i !== item)
      }
    })
  };

  const filterProducts = useCallback(() => {
    let listProduct = products;
    if(filterCategory.length > 0){
      listProduct = listProduct.filter(item => filterCategory.includes(item.ProductCategory));
    }
    props.receiveProducts(listProduct);
  },[filterCategory]);

  useEffect(() =>{
    filterProducts();
  },[filterCategory]);

  let category = [];
  category = products
    .map((product) => product.ProductCategory)
    .filter((item) => {
      return category.includes(item) ? '' : category.push(item);
    });

  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className=""
            aria-label="Search"
          />
        </Form>
      </div>
      <div className="sidebar__filter-category mt-3">
        {category.map((item, index) => (
          <div key={index} className="sidebar__filter-category__checkbox">
            <label htmlFor="">
              <input
                type="checkbox"
                ref={inputRef}
                onChange={() => handleCheck(item)}
                checked={filterCategory.includes(item)}
              />
              <span className="content ms-2">
                <i className="bx bx-check"></i>
              </span>
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
