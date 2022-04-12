import { auth, db } from '../config/Config';
const initState = {
  // shoppingCart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

let product;
let index;

// function getData(uid) {
//   let data = [];
//   let sumQuantity = 0;
//   let sumPrice = 0;
//   db.collection('Cart')
//     .where('UserID', '==', uid)
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
//                     item.productData = res.data(); //pd infor
//                     data.push({ total: item.Total, product: item.productData });
//                     // console.log("productData",item.productData);
//                     sumQuantity += item.Total;
//                     sumPrice += item.Total * item.productData.ProductPrice;
//                     // console.log("quantity",sumQuantity)
//                   })
//                   .catch((err) => console.log(err));
//               }
//               // console.log(data);
//             });
//           })
//           .catch((err) => console.log(err));
//       });
//     });

//   return { data: data, totalPrice: sumPrice, totalQuantity: sumQuantity };
// }

const handleChangeTotal = (state, action) => {
  db.collection("Cart").where("UserID", "==", action.user).get().then((snapshot) => {
    snapshot.forEach(doc => {
      db.collection("Cart").doc(doc.id).collection("ProductList").where("ProductID", "==", action.payload.productID).get().then(snap => snap.forEach(d => {       
        db.collection("Cart").doc(doc.id).collection("ProductList").doc(d.id).update({Total: action.payload.total})
      }))
    })
  })
};

function cartReducer(state, action) {
  switch (action.type) {
    // case 'show_products':
    //   const cartLine = getData(auth.currentUser.uid);

    //   return {
    //     shoppingCart: cartLine.data,
    //     totalQuantity: cartLine.totalQuantity,
    //     totalPrice: cartLine.totalPrice,
    //   }
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
      handleChangeTotal(state, action);
      return {
        // shoppingCart: [...state.shoppingCart],
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + action.payload.product.ProductPrice,
      };

    case 'decrease':
      handleChangeTotal(state, action);
      return {
        // shoppingCart: [...state.shoppingCart],
        totalQuantity: state.totalQuantity - 1,
        totalPrice: state.totalPrice - action.payload.product.ProductPrice,
      };

    // case 'remove':
    //   index = state.shoppingCart.findIndex(
    //     (item) => item.product.ProductID === action.payload
    //   );
    //   let newList = [...state.shoppingCart];
    //   newList.splice(index, 1);
    //   return {
    //     shoppingCart: newList,
    //     totalQuantity: state.totalQuantity - state.shoppingCart[index].total,
    //     totalPrice:
    //       state.totalPrice -
    //       state.shoppingCart[index].total *
    //         state.shoppingCart[index].product.ProductPrice,
    //   };
    default:
      throw new Error('Invalid action!');
  }
}

export { initState };
export default cartReducer;
