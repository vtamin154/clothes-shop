const initState = {
  shoppingCart: [],
  totalPrice: 0,
  totalQuantity: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'add_product':
      const check = state.shoppingCart.find(product => product.ProductID === action.payload.ProductID);
      if(check){
          console.log("Product is already in your cart !");
          return state;
      }
      else{
          // console.log(action.payload);
          return {
              shoppingCart: [...state.shoppingCart, action.payload],
              totalQuantity: state.totalQuantity + 1,
              totalPrice: state.totalPrice + action.payload.ProductPrice
          }
      }
    default:
      throw new Error('Invalid action!');
  }
}

export {initState};
export default cartReducer;
