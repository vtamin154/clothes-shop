import React, { useState , useEffect} from 'react';
import Message from '../Message';

import { storage, db } from '../../config/Config';

const AddProducts = (props) => {
  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState(0);
  const [productImg, setProductImg] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const types = ['image/png', 'image/jpeg', 'image/jpg'];

  useEffect(() => {
    const setTime = setTimeout(() => {
      setSuccess(false);
    },1000);
    return () => {
      clearTimeout(setTime);
    }
  }, [success])
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

  const handleCancel = () => {
    props.toggleModal('');
  };

  //add product event
  const addProduct = (e) => {
    e.preventDefault();

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
            let imgArray = [];
            imgArray.push(url);
            db.collection('Products')
              .add({
                ProductName: productName,
                ProductCategory: productCategory,
                ProductPrice: Number(productPrice),
                ProductImg: imgArray,
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

    handleCancel();
    // setSuccess(true);
  };

  return (
    <div className="form-product container-fluid">
      <div className="row form-product__cover">
        <div className="col-sm-10 col-lg-6 mx-auto px-4 form-product__cover__content">
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
            <select
              className="form-select"
              aria-label="Default select example"
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
              onChange={productImgHandle}
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
              <button type="submit" className="btn btn-success btn-md" onClick={() => setSuccess(true)}>
                Add
              </button>
            </div>
          </form>
          {error && <span>{error}</span>}
        </div>
      </div>
      <div className={success ? 'active' : 'non-active'}>
        <Message />
      </div>
    </div>
  );
};

export default AddProducts;
