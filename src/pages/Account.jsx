import React, { useState } from 'react';
import Order from '../components/Order';
import User from '../components/User';
import { db, storage } from '../config/Config';
// import { db } from '../config/Config';

const Account = (props) => {
  // console.log(props.user.UserID);
  const [active, setActive] = useState('personal-infor');
  const [changeImg, setChangeImg] = useState(false);
  const [selectUserImg, setSelectedUserImg] = useState(() => {
    return props.user.UserImg !=='' ? props.user.UserImg : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU"
  });
  const [error, setError] = useState('');

  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const handleUploadImg = (e) => {
    let selectFile = e.target.files[0];
    setChangeImg(true);
    if (selectFile && types.includes(selectFile.type)) {
      setSelectedUserImg(selectFile);
      setError('');
    }
    else{
      // setSelectedUserImg(null);
      setError('Please select a valid image type png or jpeg or jpg');
    }
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const uploadTask = storage
      .ref(`user-images/${selectUserImg.name}`)
      .put(selectUserImg);
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
          .ref('user-images')
          .child(selectUserImg.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('UserAccount')
              .doc(props.user.UserID)
              .update({
                UserImg: url,
              })
              // .then(() => {
              //   setSelectedUserImg(null);
              // })
              // .catch((err) => console.log(err.message));
          }
          );
      }
    );
  };
  return (
    <div className="account container">
      <div className="row">
        <div className="col-md-3">
          <div className="img-user">
            {/* {selectUserImg && ( */}
            <img
              // src={`${
              //   selectUserImg === null
              //     ? 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU'
              //     : URL.createObjectURL(selectUserImg)
              // }`}
              src={`${changeImg? URL.createObjectURL(selectUserImg) : selectUserImg}`}
              alt="user"
            />
            {/* )} */}
          </div>
          <input type="file" onChange={handleUploadImg} />
          <button className="btn btn-dark mt-2" onClick={saveEdit}>Save</button>
          <hr />
          {error && <span>{error}</span>}
          <ul className="tab">
            <li
              className={`tab-item ${
                active === 'personal-infor' ? 'tab-active' : ''
              }`}
              onClick={() => setActive('personal-infor')}
            >
              Thông tin cá nhân
            </li>
            <li
              className={`tab-item ${active === 'orders' ? 'tab-active' : ''}`}
              onClick={() => setActive('orders')}
            >
              Đơn của tôi
            </li>
          </ul>
        </div>
        <div className="col-md-7">
          <User
            user={props.user}
            active={active === 'personal-infor' ? true : false}
          />
          <Order
            user={props.user}
            active={active === 'orders' ? true : false}
          />
        </div>
      </div>
    </div>
  );
};

export default Account;
