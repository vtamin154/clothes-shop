import React, { useState } from 'react';
import { useContext } from 'react';
import { ProductContextProvider } from '../../components/ProductContext';
import AddProducts from '../../components/admin/AddProducts';
import EditProduct from '../../components/admin/EditProduct';
import RemoveProduct from '../../components/admin/RemoveProduct';
import { db } from '../../config/Config';

const ManageProducts = () => {
  const [toggleModal, setToggleModal] = useState('');
  const [product, setProduct] = useState({});
  const { products } = useContext(ProductContextProvider);
  const handleToggleModal = (content) => {
    setToggleModal(content);
  };

  const handleAdd = () => {
    setToggleModal("add");
  };

  const handleEdit = (product) => {
    setToggleModal('edit');
    // console.log(toggleModal)
    setProduct(product);
  };

  const handleRemove = (product) => {
    setToggleModal('remove');
    setProduct(product);
  };
  // console.log(toggleModal);
  return (
    <div className="manage-products container">
      <div className="row">
        <div className="text-end">
          <button className="btn btn-primary" onClick={() => handleAdd()}>
            Add product
          </button>
        </div>
        <table className="table list-products">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Ảnh</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Danh mục</th>
              <th scope="col">Giá bán</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td className="img-product">
                  <img src={item.ProductImg} alt="" />
                </td>
                <td>{item.ProductName}</td>
                <td>{item.ProductCategory}</td>
                <td>
                  {item.ProductPrice.toLocaleString('it-IT', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleRemove(item)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {toggleModal === 'edit' ? (
          <EditProduct toggleModal={handleToggleModal} data={product} />
        ) : (
          ''
        )}
      </div>

      <div>
        {toggleModal === 'remove' ? (
          <RemoveProduct toggleModal={handleToggleModal}  data={product} />
        ) : (
          ''
        )}
      </div>

      <div>
        {toggleModal === "add" ? <AddProducts toggleModal = {handleToggleModal} /> : ''}
      </div>
    </div>
  );
};

export default ManageProducts;
