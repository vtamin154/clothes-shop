import React, { useState } from 'react';
import { storage, db } from '../../config/Config';
const EditProduct = (props) => {
  const [productName, setProductName] = useState(props.data.ProductName);
  const [productImg, setProductImg] = useState('');
  const [productCategory, setProductCategory] = useState(
    props.data.ProductCategory
  );
  const [productPrice, setProductPrice] = useState(props.data.ProductPrice);
  // console.log(props.data)
  const handleCancel = () => {
    props.toggleModal('');
  };

  const handleEdit = (e) => {
    e.preventDefault();
    // const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
    // uploadTask.on('state_changed', snapshot => {
    //   const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log(progress);
    // },
    // () => {
    //   storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
    db.collection('Products')
      .doc(props.data.ProductID)
      .update({
        ProductName: productName,
        ProductCategory: productCategory,
        ProductPrice: Number(productPrice),
        // ProductImg: url ? url : props.data.ProductImg
      })
      .then(() => {
        props.toggleModal(false);
      });
    //   }).catch(err => console.log(err.message))
    // }
    // )
    console.log('save');
  };

  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const productImgHandle = (e) => {
    let selectFile = e.target.files[0];
    if (selectFile && types.includes(selectFile.type)) {
      setProductImg(selectFile);
      // setError('');
    } else {
      setProductImg(null);
      // setError('Please select a valid image type png or jpeg or jpg');
    }
  };

  return (
    <div className="form-product container-fluid ">
      <div className="row form-product__cover">
        <div className="col-sm-10 col-lg-5 px-4 mx-auto form-product__cover__content">
          <h2>Edit Product</h2>
          <form
            action=""
            autoComplete="off"
            className="form-group"
            onSubmit={handleEdit}
          >
            <label htmlFor="product-name">Product name</label>
            <br />
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setProductName(e.target.value)}
              value={productName}
            />
            <br />
            <select
              className="form-select"
              aria-label="Default select example"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option defaultValue>Thể loại</option>
              <option value="Váy">Váy</option>
              <option value="Áo khoác">Áo khoác</option>
              <option value="Áo sơ mi">Áo sơ mi</option>
              <option value="Thu đông">Thu đông</option>
              <option value="Quần">Quần</option>
              <option value="Áo phông">Áo phông</option>
            </select>
            <br />
            <label htmlFor="product-price">Price</label>
            <br />
            <input
              type="number"
              onChange={(e) => setProductPrice(e.target.value)}
              value={productPrice}
              className="form-control"
              required
            />
            <br />
            <label htmlFor="product-img">Image</label>
            <br />
            <input
              type="file"
              className="form-control"
              // onChange={productImgHandle}
            />
            <br />
            <hr />
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary btn-md me-4"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>
              <button className="btn btn-success btn-md" type="submit">
                Save
              </button>
            </div>
          </form>
          {/* {error && <span>{error}</span>} */}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
