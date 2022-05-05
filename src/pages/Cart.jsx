import React, { useEffect} from 'react';
import CartLine from '../components/CartLine';
import Helmet from '../components/Helmet';
import { useHistory } from 'react-router-dom';
const Cart = ({ user }) => {
  const history = useHistory();

  // const [products, setProducts] = useState([]);
  // const handleChangeTotal = (product) => {
  //   db.collection('Cart')
  //     .where('UserID', '==', user.UserID)
  //     .get()
  //     .then((snapshot) => {
  //       snapshot.forEach((doc) => {
  //         db.collection('Cart')
  //           .doc(doc.id)
  //           .collection('ProductList')
  //           .where('ProductID', '==', product.productID)
  //           .get()
  //           .then((snap) =>
  //             snap.forEach((d) => {
  //               db.collection('Cart')
  //                 .doc(doc.id)
  //                 .collection('ProductList')
  //                 .doc(d.id)
  //                 .update({ Total: product.total ++ });
  //                 // setLoading(false);
  //                 // console.log(loading);
  //             })
  //           );
  //       });
  //     });
  // };

  useEffect(() => {
    if (!user) {
      history.push('/login');
    }
    // const getData = () => {
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
    //                     setProducts((pre) => [
    //                       ...pre,
    //                       {
    //                         total: item.Total,
    //                         product: item.productData,
    //                         productID: item.ProductID,
    //                       },
    //                     ]);
    //                   })
    //                   .catch((err) => console.log(err));
    //               }
    //             });
    //           })
    //           .catch((err) => console.log(err));
    //       });
    //     });
    // };
    // getData();
  }, []);

  return (
    <Helmet title = "Giỏ hàng">
      <CartLine
        user={user}
        // data={products}
        // handleChangeTotal={handleChangeTotal}
      />
    </Helmet>
  );
};

export default Cart;
