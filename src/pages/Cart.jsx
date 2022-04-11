import React, { useEffect, useState } from 'react';
import CartLine from '../components/CartLine';
import { useHistory } from 'react-router-dom';
// import { db } from '../config/Config';
const Cart = ({ user }) => {
  const history = useHistory();

  // const [products, setProducts] = useState([]);
  // const getData = () => {
  //   let data = [];
  //   db.collection('Cart')
  //     .where('UserID', '==', user.UserID)
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         db.collection('Cart')
  //           .doc(doc.id)
  //           .collection('ProductList')
  //           .get()
  //           .then((snap) => {
  //             snap.forEach((d) => {
  //               let item = d.data(); //product id, total
  //               if (item.ProductID) {
  //                 item.ProductID.get()
  //                   .then((res) => {
  //                     item.productData = res.data(); //product infor
  //                     data.push({
  //                       total: item.Total,
  //                       product: item.productData,
  //                     });
  //                   })
  //                   .catch((err) => console.log(err));
  //               }
  //             });
  //           })
  //           .catch((err) => console.log(err));
  //       });
  //     });
  //   return data;
  // };

  useEffect(() => {
    if (!user) {
      history.push('/login');
    } 
    // else {
    //   const data = getData();
    //   setProducts(data);
    //   console.log("product",products);

      // setProducts([
      //   {
      //     total: 1,
      //     product: {
      //       ProductName: 'Áo khoác túi nút',
      //       ProductImg:
      //         'https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2F1625549605a7b5c6fd63af9dfa02a0869e50144521_thumbnail_600x.jpg?alt=media&token=8e97c12d-5456-48d5-934f-5dca2fbe82ef',
      //       ProductPrice: 234000,
      //     },
      //   },
      // ]);
    }
  // }
  , []);

  return (
    <div>
      <CartLine user={user}/>
    </div>
  );
};

export default Cart;
