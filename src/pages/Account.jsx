import React, { useState } from 'react';
import Order from '../components/Order';
import User from '../components/User';
import { db, storage } from '../config/Config';
// import { db } from '../config/Config';

const Account = (props) => {
  console.log(props.user.UserID);
  const [active, setActive] = useState('personal-infor');
  const [selectUserImg, setSelectedUserImg] = useState(null);

  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  const handleUploadImg = (e) => {
    let selectFile = e.target.files[0];
    if (selectFile && types.includes(selectFile.type)) {
      setSelectedUserImg(selectFile);
    } 
  };

  const saveEdit = (e) => {
    e.preventDefault();
    const uploadTask = storage
      .ref(`/user-images/${selectUserImg.name}`)
      .put(selectUserImg);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
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
              .then(() => {
                setSelectedUserImg(null);
              })
              .catch((err) => console.log(err.message));
          });
      }
    );
  };
  return (
    <div className="account container">
      <div className="row">
        <div className="col-md-3">
          {selectUserImg && (
            <div className="img-user">
              <img
                // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU"
                src={URL.createObjectURL(selectUserImg)}
                alt="user"
              />
            </div>
          )}
          <input type="file" 
          onChange={handleUploadImg} 
          />

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
          <button onClick={saveEdit}>Save</button>
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
