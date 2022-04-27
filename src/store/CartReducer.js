import { auth, db } from '../config/Config';

const initState = {
  shoppingCart: [],
  // listTotal:[]
  // totalPrice: 0,
  // totalQuantity: 0,
};

export function getData(state, uid) {
  db.collection('Cart')
    .where('UserID', '==', uid)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        db.collection('Cart')
          .doc(doc.id)
          .collection('ProductList')
          .get()
          .then((snap) => {
            snap.forEach((d) => {
              // let item = d.data(); //product id, total
              const { ProductID, Total } = d.data();
              // console.log("ProductID",ProductID.id);
              if (ProductID) {
                ProductID.get()
                  .then((res) => {
                    // item.productData = res.data(); //pd infor
                    const {
                      ProductName,
                      ProductCategory,
                      ProductPrice,
                      ProductImg,
                    } = res.data();

                    state.shoppingCart.push({
                      total: Total,
                      product: {
                        ProductName: ProductName,
                        ProductCategory: ProductCategory,
                        ProductPrice: ProductPrice,
                        ProductImg: ProductImg,
                      },
                      productID: ProductID,
                    });

                    // console.log('state', state.shoppingCart);
                  })
                  .catch((err) => console.log(err));
              }
              // console.log(data);
            });
          })
          .catch((err) => console.log(err));
      });
    });

  return state;
}

const handleChangeTotal = (state, action) => {
  db.collection('Cart')
    .where('UserID', '==', action.userID)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc);
        db.collection('Cart')
          .doc(doc.id)
          .collection('ProductList')
          .where('ProductID', '==', action.payload.productID)
          .get()
          .then((snap) => {
            snap.forEach((d) => {
              db.collection('Cart')
                .doc(doc.id)
                .collection('ProductList')
                .doc(d.id)
                .update({ Total: action.payload.total });
            });
            let index = state.shoppingCart.findIndex(
              (item) => item.productID === action.payload.productID
            );
            state.shoppingCart[index].total = action.payload.total;
          });
      });
    });
  return state.shoppingCart;
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'add_product':
      // const check = state.shoppingCart.find(
      //   (product) =>
      //     product.product.ProductID === action.payload.product.ProductID
      // );
      // if (check) {
      //   console.log('Product is already in your cart !');
      //   return state;
      // }
      // else {
      // console.log(action.payload.product.ProductID)
      db.collection('Cart')
        .where('UserID', '==', auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          db.collection('Cart')
            .doc(snapshot.docs[0].id)
            .collection('ProductList')
            .add({
              ProductID: db.doc('Products/' + action.payload.product.ProductID),
              Total: action.payload.total,
            });
        });

      return {
        shoppingCart: [
          ...state.shoppingCart,
          {
            total: action.payload.total,
            product: {
              ...action.payload.product,
            },
            // productID: action.payload.productID,
            productID: db.doc('Products/' + action.payload.productID)
          },
        ],
      };

    // }

    case 'increase':
      const increaseCart = handleChangeTotal(state, action);
      return {
        ...state,
        shoppingCart: increaseCart,
      };

    case 'decrease':
      const decreaseCart = handleChangeTotal(state, action);
      return {
        ...state,
        shoppingCart: decreaseCart,
      };

    case 'remove':
      const newShoppingCart = [...state.shoppingCart];
      db.collection('Cart')
        .where('UserID', '==', action.user)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('Cart')
              .doc(doc.id)
              .collection('ProductList')
              .where('ProductID', '==', action.payload.productID)
              .get()
              .then((snap) => {
                snap.forEach((d) =>
                  db
                    .collection('Cart')
                    .doc(doc.id)
                    .collection('ProductList')
                    .doc(d.id)
                    .delete()
                );
              });
          });
        });
      let index = state.shoppingCart.findIndex(
        (item) => item.productID === action.payload.productID
      );
      newShoppingCart.splice(index, 1);
      // console.log(newShoppingCart);
      return {
        shoppingCart: [...newShoppingCart],
      };

    case 'cashout':
      // action.payload.listProduct.map(item => console.log(item.productID.id))
      db.collection('Orders')
        .add({
          Amount: action.payload.amount,
          UserID: action.userID,
        })
        .then((doc) => {
          action.payload.listProduct.forEach((item) => {
            console.log(item.productID.id);
            db.collection('Orders')
              .doc(doc.id)
              .collection('ListItem')
              .add({
                ProductID: db.doc('Products/' + item.productID.id),
                Total: item.total,
              });
          });
        });

      db.collection('Cart')
        .where('UserID', '==', action.userID)
        .get()
        .then((snapshot) =>
          // console.log(snapshot.docs)
          action.payload.listProduct.forEach((item) =>
            db
              .collection('Cart')
              .doc(snapshot.docs[0].id)
              .collection('ProductList')
              .where('ProductID', '==', item.productID)
              .get()
              .then((snap) => {
                snap.forEach((d) =>
                  db
                    .collection('Cart')
                    .doc(snapshot.docs[0].id)
                    .collection('ProductList')
                    .doc(d.id)
                    .delete()
                );
              })
          )
        );

      //error
      // action.payload.listProduct.forEach(item => {
      //   newList = state.shoppingCart.filter(i => i.productID !== item.productID)
      //   console.log(newList)
      // })

      let newList = state.shoppingCart.filter((item) => {
        return !action.payload.listProduct.some(
          (i) => i.productID === item.productID
        );
      });

      // console.log(newList);
      return {
        shoppingCart: [...newList],
      };
    default:
      throw new Error('Invalid action!');
  }
}

export { initState };
export default cartReducer;
