import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../config/Config';

const Order = (props) => {
  const [order, setOrder] = useState([]);
  useEffect(() => {

    // const handleGetOrders = async () => {
    //   try {
    //     let snapshot = await db
    //       .collection('Orders')
    //       .where('UserID', '==', props.user.UserID)
    //       .get();
    //     // console.log(snapshot);
    //     snapshot.docs.forEach(async (doc) => {
    //       let data = [];
    //       let snap = await db
    //         .collection('Orders')
    //         .doc(doc.id)
    //         .collection('ListItem')
    //         .get();

    //       let count = 0;
    //       snap.docs.forEach(async (d) => {
    //         const { ProductID, Total } = d.data();
    //         if (ProductID) {
    //           let res = await ProductID.get();
    //           if (res) {
    //             count++;
    //             console.log(count);
    //           }
    //           // console.log(res.data());
    //           const { ProductName, ProductCategory, ProductPrice, ProductImg } =
    //             res.data();
    //           data.push({
    //             product: {
    //               ProductName: ProductName,
    //               ProductCategory: ProductCategory,
    //               ProductPrice: ProductPrice,
    //               ProductImg: ProductImg,
    //             },
    //             total: Total,
    //           });
    //           if (count === snap.docs.length) {
    //             setOrder((pre) => [
    //               ...pre,
    //               {
    //                 order: data,
    //                 amount: doc.data().Amount,
    //               },
    //             ]);
    //           }
    //         }
    //       });
    //     });
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    const handleGetOrders = () => {
      // let data = [];

      db.collection('Orders')
        .where('UserID', '==', props.user.UserID)
        .get()
        .then((snapshot) => {
          snapshot.docs.forEach((doc) => {//so don
            // console.log('doc', doc.data());
            let data = [];
            db.collection('Orders')
              .doc(doc.id)
              .collection('ListItem')
              .get()
              .then((snap) => {
                let count = 0;
                snap.docs.forEach((d) => {//so loai sp moi don
                  const { ProductID, Total } = d.data();
                  if (ProductID) {
                    ProductID.get().then((res) => {
                      count++;
                      // console.log(count);
                      // console.log(res.data());
                      const {
                        ProductName,
                        ProductCategory,
                        ProductPrice,
                        ProductImg,
                      } = res.data();
                      data.push({
                        product: {
                          ProductName: ProductName,
                          ProductCategory: ProductCategory,
                          ProductPrice: ProductPrice,
                          ProductImg: ProductImg,
                        },
                        total: Total,
                      });
                      // console.log('count', count);
                      if (count === snap.docs.length) {
                        // console.log(data);
                        setOrder((pre) => [
                          ...pre,
                          {
                            order: data,
                            amount: doc.data().Amount,
                          },
                        ]);
                      }
                    });
                  }
                });
                // console.log(data);
              });
          });
        });
    };

    if (!props.loading) {
      handleGetOrders();
    }
  }, []);
  // console.log(order);
  return (
    <>
      {props.loading && (
        <div className="spinner-border text-dark loading" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {!props.loading && (
        <div className={`order ${props.active ? 'active' : 'non-active'}`}>
          <ul className='row'>
                  <li className="col-md-2 text-center">S???n ph???m</li>
                  <li className="col-md-3 text-center"></li>
                  <li className="col-md-3 text-center">Danh m???c</li>
                  <li className="col-md-1 text-center">????n gi??</li>
                  <li className="col-md-3 text-center">S??? l?????ng</li>
                </ul>
          {order.length !== 0 ? (
            order.map((item, index) => (
              <div className="order__line" key={index}>
                {item.order.map((i, s) => (
                  <ul className="row" key={s}>
                    <li className="img-product col-md-2 my-auto text-center">
                      <img src={i.product.ProductImg} alt="" />
                    </li>
                    <li className="col-md-3 my-auto text-center">
                      {i.product.ProductName}
                    </li>
                    <li className="col-md-3 my-auto text-center">
                      {i.product.ProductCategory}
                    </li>
                    <li className="col-md-1 my-auto text-center">
                      {i.product.ProductPrice.toLocaleString('VI', {
                        style:'currency',
                        currency:'VND',
                      })}
                    </li>
                    <li className="col-md-3 my-auto text-center">
                      <span>S??? l?????ng: </span>
                      {i.total}
                    </li>
                  </ul>
                ))}
                <div className="text-end amount mx-4">
                  <span>T???ng s??? ti???n:</span>
                  {item.amount.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </div>
              </div>
            ))
          ) : (
            <div>
              <h1>B???n ch??a c?? ????n n??o !</h1>
              <Link to="/catalog" className="btn btn-dark mt-3">
                Quay l???i c???a h??ng
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Order;
