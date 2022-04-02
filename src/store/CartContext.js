import { createContext, useReducer } from 'react';
import cartReducer, { initState } from './CartReducer';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
