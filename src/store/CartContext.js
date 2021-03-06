import { createContext, useEffect, useReducer } from 'react';
import cartReducer,  { initState , getData} from './CartReducer';
import { auth, db } from '../config/Config';
export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initState);
  // const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('UserAccount')
          .doc(user.uid)
          .get()
          .then(() => {
            getData(state, user.uid);
          });
      }
    });
  },[]);

  return (
    <CartContext.Provider value={[state, dispatch]}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
