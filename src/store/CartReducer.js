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
        // console.log(action.payload);
        return {
          shoppingCart: [...state.shoppingCart, action.payload],
          totalQuantity: state.totalQuantity + 1,
          totalPrice: state.totalPrice + action.payload.product.ProductPrice,
        };
      }
    case 'increase':
      // product = action.payload;
      // product.total += 1;
      // index = state.shoppingCart.findIndex(
      //   (itemCart) => itemCart.product.ProductID === product.product.ProductID
      // );
      // state.shoppingCart[index] = product;
      handleChangeTotal(state, action);
      // console.log(state.shoppingCart[index]);
      return {
        shoppingCart: [...state.shoppingCart],
        totalQuantity: state.totalQuantity + 1,
        totalPrice: state.totalPrice + product.product.ProductPrice,
      };

    case 'decrease':
      // product = action.payload;
      // if(action.payload.total > 1){
      // index = state.shoppingCart.findIndex(
      //   (itemCart) => itemCart.product.ProductID === product.product.ProductID
      // );
      // state.shoppingCart[index] = product;
      handleChangeTotal(state, action);
      // console.log(state.shoppingCart[index]);
      // }
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
