import { auth, db } from '../config/Config';
const initState = {
  shoppingCart: [], // có nên cho mảng vào ko
  totalPrice: 0,
  totalQuantity: 0,
};

let product;
let index;
const handleChangeTotal = (state, action) => {
  product = action.payload;
  index = state.shoppingCart.findIndex(
    (itemCart) => itemCart.product.ProductID === product.product.ProductID
  );
  state.shoppingCart[index] = product;
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'add_product':
      const check = state.shoppingCart.find(
        (product) =>
          product.product.ProductID === action.payload.product.ProductID
      );
      if (check) {
        console.log('Product is already in your cart !');
        return state;
      } else {
        db.collection('Cart')
          .where('UserID', '==', auth.currentUser.uid)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              db.collection('Cart').doc(doc.id).collection('ProductList').add({
                ProductID: action.payload.product.ProductID,
                Total: action.payload.total,
              });
              // console.log(doc.id)
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
          shoppingCart: [...state.shoppingCart, action.payload],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + action.payload.product.ProductPrice,
        };
      }

    case 'increase':
      handleChangeTotal(state, action);
      return {
        shoppingCart: [...state.shoppingCart],
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + product.product.ProductPrice,
      };

    case 'decrease':
      handleChangeTotal(state, action);
      return {
        shoppingCart: [...state.shoppingCart],
        totalQuantity: state.totalQuantity - 1,
        totalPrice: state.totalPrice - product.product.ProductPrice,
      };

    case 'remove':
      index = state.shoppingCart.findIndex(
        (item) => item.product.ProductID === action.payload
      );
      let newList = [...state.shoppingCart];
      newList.splice(index, 1);
      return {
        shoppingCart: newList,
        totalQuantity: state.totalQuantity - state.shoppingCart[index].total,
        totalPrice:
          state.totalPrice -
          state.shoppingCart[index].total *
            state.shoppingCart[index].product.ProductPrice,
      };
    default:
      throw new Error('Invalid action!');
  }
}

export { initState };
export default cartReducer;
