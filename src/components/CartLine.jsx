import React, { useContext, useEffect, useState } from 'react';
import { db } from '../config/Config';
import { CartContext } from '../store/CartContext';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';

const CartLine = ({ user }) => {
  const [state, dispatch] = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // dispatch({type: 'show_products', payload:''});
    const getData = () => {
      db.collection('Cart')
        .where('UserID', '==', user.UserID)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('Cart')
              .doc(doc.id)
              .collection('ProductList')
              .get()
              .then((snap) => {
                snap.forEach((d) => {
                  let item = d.data(); //product id, total
                  if (item.ProductID) {
                    item.ProductID.get()
                      .then((res) => {
                        item.productData = res.data(); //product infor
                        setProducts((pre) => [
                          ...pre,
                          {
                            total: item.Total,
                            product: item.productData,
                            productID: item.ProductID,
                          },
                        ]);
                      })
                      .catch((err) => console.log(err));
                  }
                });
              })
              .catch((err) => console.log(err));
          });
        });
    };
    getData();
  }, []);

  return (
    <div className="cart-line">
      <h2 className="text-white text-center">Your cart</h2>
      <hr />
      {products ? (
        products.map((itemCart, index) =>
          itemCart !== null ? (
            <div
              className="row justify-content-center cart-line__wrap"
              key={index}
            >
              <div className="col-md-2 cart-line__wrap__img">
                <img src={itemCart.product.ProductImg} alt="" />
              </div>
              <div className="col-md-2 cart-line__wrap__name my-auto">
                <span>{itemCart.product.ProductName}</span>
              </div>
              <div className="col-md-2 cart-line__wrap__price my-auto text-warning">
                <span>Đơn giá: {itemCart.product.ProductPrice} Đ</span>
              </div>
              <div className="col-md-3 cart-line__wrap__quantity my-auto">
                <span
                  onClick={() =>
                    dispatch({
                      type: 'increase',
                      user: user.UserID,
                      payload: {
                        total: itemCart.total + 1,
                        product: itemCart.product,
                        productID: itemCart.productID,
                      },
                    })
                  }
                >
                  <BsPlusSquare />
                </span>

                {itemCart.total}

                <span
                  onClick={() =>
                    itemCart.total > 1
                      ? dispatch({
                          type: 'decrease',
                          user: user.UserID,
                          payload: {
                            total: itemCart.total - 1,
                            product: itemCart.product,
                            productID: itemCart.productID,
                          },
                        })
                      : ''
                  }
                >
                  <BsDashSquare />
                </span>
              </div>
              <div className="col-md-1 cart-line__wrap__remove my-auto">
                <span
                  className="text-danger"
                  onClick={() =>
                    dispatch({
                      type: 'remove',
                      payload: itemCart.product.ProductID,
                    })
                  }
                >
                  <FaTrashAlt />
                </span>
              </div>
              <hr className="w-75 my-3" />
            </div>
          ) : (
            ''
          )
        )
      ) : (
        <h3>There are no products in the cart!</h3>
      )}

      {products.length !== 0 && (
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3>Cart Summary</h3>
            <hr />
            <div>Total quantity: {state.totalQuantity}</div>
            <div>
              Total price:
              {state.totalPrice.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartLine;
