import React, { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';

import { CartContext } from '../store/CartContext';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
import Cashout from '../components/Cashout';
import { ProductDetailContext } from '../store/ProductDetailContext';
import { db } from '../config/Config';
import Message from './Message';

const CartLine = (props) => {
  const [state, dispatch] = useContext(CartContext);
  const [productPurchased, setProductPurchased] =
    useContext(ProductDetailContext);
  const [check, setCheck] = useState(
    // () =>
    // productPurchased.product !== ''
    //   ? [
    //       {
    //         total: productPurchased.total,
    //         product: {
    //           ProductName: productPurchased.product.ProductName,
    //           ProductImg: productPurchased.product.ProductImg,
    //           ProductPrice: productPurchased.product.ProductPrice,
    //           ProductCategory: productPurchased.product.ProductCategory,
    //         },
    //         productID: db.doc('Products/' + productPurchased.product.ProductID),
    //       },
    //     ]
    //   :
    []
  );
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    if (productPurchased.product !== '') {
      let product = {
        ProductName: productPurchased.product.ProductName,
        ProductImg: productPurchased.product.ProductImg,
        ProductPrice: productPurchased.product.ProductPrice,
        ProductCategory: productPurchased.product.ProductCategory,
      };

      setCheck((pre) => [
        ...pre,
        {
          product: product,
          total: productPurchased.total,
          productID: db.doc('Products/' + productPurchased.product.ProductID),
        },
      ]);

      // let id = db.doc('Products/' + productPurchased.product.ProductID);
      // db.collection('Cart')
      //   .where('UserID', '==', props.user.UserID)
      //   .get()
      //   .then((snapshot) => {
      //     db.collection('Cart')
      //       .doc(snapshot.docs[0].id)
      //       .collection('ProductList')
      //       .where('ProductID', '==', id)
      //       .get()
      //       .then((snap) =>
      //         snap.forEach((d) => {
      //           const { ProductID, Total } = d.data();
      //           if (ProductID) {
      //             ProductID.get().then((res) => {
      //               const {
      //                 ProductCategory,
      //                 ProductName,
      //                 ProductImg,
      //                 ProductPrice,
      //               } = res.data();
      //               setCheck((pre) => [
      //                 ...pre,
      //                 {
      //                   total: Total,
      //                   product: {
      //                     ProductCategory: ProductCategory,
      //                     ProductName: ProductName,
      //                     ProductImg: ProductImg,
      //                     ProductPrice: ProductPrice,
      //                   },
      //                   productID: ProductID,
      //                 },
      //               ]);
      //             });
      //           }
      //         })
      //       );
      //   });
    }
  }, []);

  useEffect(() => {
    const setTime = setTimeout(() => {
      setSuccess(false);
    }, 1000);
    return () => {
      clearTimeout(setTime);
    };
  }, [success]);

  // console.log('state', state);
  // console.log('productPurchased', productPurchased);
  // console.log('Check', check);

  const isCheck = (itemCart) => {
    let id = itemCart.productID.id;
    let ans = check.findIndex((item) => item.productID.id === id);
    // console.log(ans);
    return ans !== -1 ? true : false;
  };

  const handleCheck = (itemCart) => {
    setCheck((prev) => {
      const isChecked = isCheck(itemCart);
      // const isCheck = check.includes(itemCart);
      if (!isChecked) {
        return [...prev, itemCart];
      } else {
        return check.filter(
          (item) => item.productID.id !== itemCart.productID.id
        );
      }
    });
  };

  const handleTotalQuantity = () => {
    return (
      check.length !== 0 && check.reduce((total, item) => total + item.total, 0)
    );
  };
  const handleTotalAmount = () => {
    return (
      check.length !== 0 &&
      check.reduce(
        (total, item) => total + item.total * item.product.ProductPrice,
        0
      )
    );
  };
  const totalQuantity = handleTotalQuantity();
  const totalPrice = handleTotalAmount();

  // const handleIncrease = (product) =>{
  //   handleChangeTotal(product);
  // }
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState([]);
  // console.log(data);
  // useEffect(() => {
  //   dispatch({ type: 'show_products', payload: {userID:user.UserID} });
  // setProducts([]);
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
  // }, []);

  // useEffect(() => {
  //   setLoading(false);
  // }, [state.totalQuantity]);

  // const handleIncrease = (product) => {
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
  //                 .update({ Total: product.total +1});
  //             })
  //           );
  //       });
  //     });
  // //   // handleChangeTotal(product);
  // };
  return (
    <div className="cart-line">
      <h2 className="text-white text-center">Your cart</h2>
      <hr />
      {state.shoppingCart ? (
        // itemCart = { total, product, productID}
        state.shoppingCart.map((itemCart, index) =>
          itemCart !== null ? (
            <div
              className="row justify-content-center cart-line__wrap"
              key={index}
            >
              <div className="col-md-1 cart-line__wrap__checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  // checked={check.includes(itemCart)}
                  checked={isCheck(itemCart)}
                  value={itemCart.product}
                  onChange={() => handleCheck(itemCart)}
                ></input>
              </div>

              <div className="col-md-1 cart-line__wrap__img">
                <img src={itemCart.product.ProductImg} alt="product" />
              </div>

              <div className="col-md-2 cart-line__wrap__name my-auto">
                <span>{itemCart.product.ProductName}</span>
              </div>

              <div className="col-md-2 cart-line__wrap__price my-auto text-warning">
                <span>Đơn giá: {itemCart.product.ProductPrice} Đ</span>
              </div>

              <div className="col-md-2 cart-line__wrap__quantity my-auto">
                <span
                  onClick={() => {
                    // console.log('increase');
                    dispatch({
                      type: 'increase',
                      userID: props.user.UserID,
                      payload: {
                        total: itemCart.total + 1,
                        product: itemCart.product,
                        productID: itemCart.productID,
                      },
                    });
                  }}
                >
                  <BsPlusSquare />
                </span>

                {itemCart.total}

                <span
                  onClick={() =>
                    itemCart.total > 1
                      ? dispatch({
                          type: 'decrease',
                          userID: props.user.UserID,
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
                      user: props.user.UserID,
                      payload: {
                        total: itemCart.total,
                        product: itemCart.product,
                        productID: itemCart.productID,
                      },
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
        <h3 className="ms-3">There are no products in the cart!</h3>
      )}

      {check.length !== 0 && (
        <Cashout data={check} user={props.user} className="cashout" />
      )}

      {
        <div className="row justify-content-center cart-line__wrap">
          <div className="col-md-4 cart-line__wrap__summary">
            <div className="cover">
              <h3 className="ps-4">Cart Summary</h3>
              <div className="ps-4">
                Total quantity:{check.length > 0 ? totalQuantity : 0}
              </div>
              <div className="ps-4">
                Total price:
                {check.length > 0
                  ? totalPrice.toLocaleString('it-IT', {
                      style: 'currency',
                      currency: 'VND',
                    })
                  : 0}
              </div>
              {/* <Link to="/cashout" className="button">Mua hàng</Link> */}
              <button
                className="button ms-4"
                onClick={() => {
                  dispatch({
                    type: 'cashout',
                    payload: { listProduct: check, amount: totalPrice },
                    userID: props.user.UserID,
                  });
                  setCheck([]);
                  setProductPurchased({ product: '', total: 0 });
                  setSuccess(true);
                }}
              >
                Mua hàng
              </button>
            </div>
          </div>
        </div>
      }

      <div className={success ? 'active' : 'non-active'}>
        <Message />
      </div>
    </div>
  );
};

export default CartLine;
