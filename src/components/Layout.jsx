import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Routes from '../routes/Routes';
import ProductContext from './ProductContext';
import CartProvider from '../store/CartContext';
import { auth, db } from '../config/Config';
import ProductDetailProvider from '../store/ProductDetailContext';
// import Slider from './Slider';
const Layout = () => {
  const [user, setUser] = useState(null);
  const [filterSearch, setFilterSearch] = useState('');
  const handleFilterSearch = (value) => {
    setFilterSearch(value);
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        db.collection('UserAccount')
          .doc(user.uid)
          .get()
          .then((snapShot) => {
            setUser({
              UserID: user.uid,
              ...snapShot.data(),
            });
            // console.log(user);
          });
      }
    });
  }, []);
  return (
    <ProductContext>
      <CartProvider>
        <ProductDetailProvider>
          <BrowserRouter>
            <Route
              render={() => (
                <div>
                  <Header user={user} onSearch={handleFilterSearch} />
                  <div className="main">
                    <Routes user={user} filterSearch={filterSearch} />
                    {/* <Slider /> */}
                  </div>
                  <Footer />
                </div>
              )}
            />
          </BrowserRouter>
        </ProductDetailProvider>
      </CartProvider>
    </ProductContext>
  );
};

export default Layout;
