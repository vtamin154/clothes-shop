import React, { useEffect, useState } from 'react';
import { db } from '../config/Config';

const Order = (props) => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const handleGetOrders = () => {
      db.collection('Orders')
        .where('UserID', '==', props.user.UserID)
        .get()
        .then((snapshot) => {
          snapshot.docs.map((doc) => {
            // console.log('doc', doc.data());
            let data = [];
            db.collection('Orders')
              .doc(doc.id)
              .collection('ListItem')
              .get()
              .then((snap) => {
                snap.docs.map((d) => {
                  const { ProductID, Total } = d.data();

                  if (ProductID) {
                    ProductID.get().then((res) => {
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
                    });
                  }
                  // data.push({ ProductID: ProductID, Total: Total });
                });
              });
            setOrder((pre) => [
              ...pre,
              {
                order: data,
                amount: doc.data().Amount,
              },
            ]);
          });
        });
    };
    handleGetOrders();
  }, []);
  //   console.log(order);
  return (
    <div className={`order ${props.active ? 'active' : 'non-active'}`}>
      {order.map((item, index) => (
        <div className="order__line" key={index}>
          {item.order.map((i, s) => (
            <ul className="d-flex justify-content-between" key={s}>
              <li>{i.product.ProductName}</li>
              <li><span>Số lượng: </span>{i.total}</li>
            </ul>
          ))}
          <div className="text-end amount"><span>Tổng số tiền:</span> 
            {item.amount.toLocaleString('vi',{
                style:'currency',
                currency:'VND'
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
