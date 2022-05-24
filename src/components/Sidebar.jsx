import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
} from 'react';
import {AiOutlineFilter} from 'react-icons/ai'
import FilterByPrice from './FilterByPrice';

const Sidebar = (props) => {
  const [filterCategory, setFilterCategory] = useState([]);

  const [filterByPrice, setFilterByPrice] = useState([100, 500]);
  const inputRef = useRef();
  // const { products } = useContext(ProductContextProvider);
  const products = props.data;

  let category = [];
  category = products
    .map((product) => product.ProductCategory)
    .filter((item) => {
      return category.includes(item) ? '' : category.push(item);
    });

  // console.log("sidebar",products);

  const handleCheck = (item) => {
    setFilterCategory((prev) => {
      if (!filterCategory.includes(item)) {
        return [...prev, item];
      } else {
        return filterCategory.filter((i) => i !== item);
      }
    });
  };

  const filterProducts = useCallback(() => {
    let listProduct = products;
    if (filterCategory.length > 0) {
      listProduct = listProduct.filter((item) =>
        filterCategory.includes(item.ProductCategory)
      );
    }
    if(filterByPrice[0] > 100 || filterByPrice[1] < 500){
      listProduct = listProduct.filter(item => (item.ProductPrice < filterByPrice[1]*1000 && item.ProductPrice > filterByPrice[0]*1000))
    }
    props.receiveProducts(listProduct);
    // console.log(listProduct);
  }, [filterCategory, filterByPrice]);

  useEffect(() => {
    filterProducts();
  }, [filterCategory, filterByPrice]);

  // console.log(filterByPrice[1]);

  const minDistance = 50;
  const handleFilterByPrice = (event, value) =>{
    // let value = e.target.value;
    // console.log(value);
    setFilterByPrice([Math.min(filterByPrice[1] - minDistance, value[0]), value[1]]);
  } 
  return (
    <div className="sidebar">
      {/* <div className="sidebar__search">
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className=""
            aria-label="Search"
          />
        </Form>
      </div> */}
      
      <h2><span><AiOutlineFilter/></span> Bộ lọc tìm kiếm</h2>
      
      <div className="sidebar__filter-category mt-3">
        <span className="fs-5">Theo danh mục</span>
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

        <span className="fs-5 mt-4">Theo giá sản phẩm</span>
        <FilterByPrice value={filterByPrice} changePrice = {handleFilterByPrice} />
      </div>
    </div>
  );
};

export default Sidebar;
