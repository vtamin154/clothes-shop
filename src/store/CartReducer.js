import { auth, db } from '../config/Config';

const initState = {
  // shoppingCart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

function getData(uid) {
  let data = [];
  let sumQuantity = 0;
  let sumPrice = 0;
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

                    data.push({
                      total: Total,
                      product: {
                        ProductName: ProductName,
                        ProductCategory: ProductCategory,
                        ProductPrice: ProductPrice,
                        ProductImg: ProductImg,
                      },
                    });
                    // console.log('productData', ProductName);
                    sumQuantity += Total;
                    // sumPrice += item.Total * item.productData.ProductPrice;
                    // console.log("quantity",sumQuantity)
                  })
                  .catch((err) => console.log(err));
              }
              // console.log(data);
            });
          })
          .catch((err) => console.log(err));
      });
    });

  // sumQuantity = data.reduce((total, curVal) => total+curVal.total)
  // console.log(data)
  console.log('sumQuantity', sumQuantity);
  // const {data, totalQuantity, totalPrice};
  return { data, totalPrice: sumPrice, totalQuantity: sumQuantity };
}

const handleChangeTotal = (state, action) => {
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
          .then((snap) =>
            snap.forEach((d) => {
              db.collection('Cart')
                .doc(doc.id)
                .collection('ProductList')
                .doc(d.id)
                .update({ Total: action.payload.total});
            })
          );
      });
    });
  return {
    totalQuantity: state.totalQuantity + 1,
    totalPrice: state.totalPrice + action.payload.product.ProductPrice,
  };
};

function cartReducer(state, action) {
  switch (action.type) {
    // case 'show_products':
    //   const cartLine = getData(auth.currentUser.uid);
    //   // console.log('cartLine', cartLine);
    //   const { data, totalQuantity, totalPrice } = cartLine;
    //   console.log(data);
    //   return {
    //     shoppingCart: data,
    //     totalQuantity: totalQuantity,
    //     totalPrice: totalPrice,
    //   };
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

      db.collection('Cart')
        .where('UserID', '==', auth.currentUser.uid)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            db.collection('Cart')
              .doc(doc.id)
              .collection('ProductList')
              .add({
                ProductID: db.doc(
                  'Products/' + action.payload.product.ProductID
                ),
                Total: action.payload.total,
              });
            // console.log(doc.id);
          });
        });

      // db.collection("Cart").add({
      //   UserID: action.user,
      // }).then((doc) => {
      //   db.collection("Cart").doc(doc.id).collection("ProductList").add({
      //     ProductID: action.payload.product.ProductID,
      //     Total: action.payload.total
      //   })
      // })
      return {
        // shoppingCart: [...state.shoppingCart, action.payload.product],
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + action.payload.product.ProductPrice,
      };

    // }

    case 'increase':
      return handleChangeTotal(state, action);
      // const cartLine = getData(action.user);
      // console.log(cartLine);
      // return {
      //   // shoppingCart: getData(action.user),
      //   totalQuantity: state.totalQuantity + 1,
      //   totalPrice: state.totalPrice + action.payload.product.ProductPrice,
      // };

    case 'decrease':
      return handleChangeTotal(state, action);
      // return {
      //   // shoppingCart: [...state.shoppingCart],
      //   totalQuantity: state.totalQuantity - 1,
      //   totalPrice: state.totalPrice - action.payload.product.ProductPrice,
      // };

    case 'remove':
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
              .then((snap) =>
                snap.forEach((d) =>
                  db
                    .collection('Cart')
                    .doc(doc.id)
                    .collection('ProductList')
                    .doc(d.id)
                    .delete()
                )
              );
          });
        });
      return {
        totalQuantity: state.totalQuantity - action.payload.total,
        totalPrice:
          state.totalPrice -
          action.payload.product.ProductPrice * action.payload.total,
      };
    default:
      throw new Error('Invalid action!');
  }
}

export { initState };
export default cartReducer;
