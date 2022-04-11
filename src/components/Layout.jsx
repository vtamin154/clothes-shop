import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Routes from '../routes/Routes';
import ProductContext from './ProductContext';
import CartProvider from '../store/CartContext';
import { auth, db } from '../config/Config';
// import Slider from './Slider';
const Layout = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('UserAccount')
          .doc(user.uid)
          .get()
          .then((snapShot) => {
            setUser({
              UserID: user.uid,
              ...snapShot.data()
            });
            // console.log(user);
          });
      }
    });
  },[]);
  return (
    <ProductContext>
      <CartProvider>
        <BrowserRouter>
          <Route
            render={() => (
              <div>
                <Header user={user} />
                <div className="main">
                  <Routes user={user} />
                  {/* <Slider /> */}
                </div>
                <Footer />
              </div>
            )}
          />
        </BrowserRouter>
      </CartProvider>
    </ProductContext>
  );
};

export default Layout;
