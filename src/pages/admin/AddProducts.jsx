import React from 'react';
import { useState } from 'react';

import { storage, db } from '../../config/Config';

const AddProducts = () => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  //img product handle
  const productImgHandle = (e) => {
    let selectFile = e.target.files[0];
    if (selectFile && types.includes(selectFile.type)) {
      setProductImg(selectFile);
      setError('');
    } else {
      setProductImg(null);
      setError('Please select a valid image type png or jpeg or jpg');
    }
  };

  //add product event
  const addProduct = (e) => {
    e.preventDefault();
      // console.log(productName, productCategory,productPrice, productImg );

    //storing img
    const uploadTask = storage
      .ref(`product-images/${productImg.name}`)
      .put(productImg);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (err) => {
        setError(err.message);
      },
      () => {
        storage
          .ref('product-images')
          .child(productImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('Products')
              .add({
                ProductName: productName,
                ProductCategory: productCategory,
                ProductPrice: Number(productPrice),
                ProductImg: url,
              })
              .then(() => {
                setProductName('');
                setProductCategory('');
                setProductPrice('');
                setProductImg(null);
                setError('');
                document.getElementById('file').value = '';
              })
              .catch((err) => setError(err.message));
          });
      }
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-10 col-lg-6 mx-auto">
          <h2>Add Product</h2>
          <form
            action=""
            autoComplete="off"
            className="form-group"
            onSubmit={addProduct}
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
            <select className="form-select" aria-label="Default select example" onChange={(e) => setProductCategory(e.target.value)}>
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
              onChange={productImgHandle}
            />
            <br />
            <button className="btn btn-success btn-md">Add</button>
          </form>
          {error && <span>{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
