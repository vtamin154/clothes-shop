import React from 'react';
import { db } from '../../config/Config';

const RemoveProduct = (props) => {
  const handleCancel = () => {
    props.toggleModal('');
  };

  const handleRemoveProduct = (e) => {
    e.preventDefault();
    // console.log(props.data.ProductID);
    db.collection("Products").doc(props.data.ProductID).delete();
    handleCancel();
  }
  return (
    <div className="form-product container-fluid">
      <div className="row form-product__cover">
        <div className="col-md-10 col-lg-5 form-product__cover__content px-4 mx-auto">
          <h2>Remove product</h2>
          <form action="" autoComplete="off" className="form-group" onSubmit={handleRemoveProduct}>
            <label htmlFor="">Are you sure remove this product ?</label>
            <hr />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary btn-md me-4"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-success">
                Ok
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RemoveProduct;
