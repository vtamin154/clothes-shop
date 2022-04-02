import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Routes from '../routes/Routes';
import ProductContext from './ProductContext';
import  CartProvider  from '../store/CartContext';
// import Slider from './Slider';
const Layout = () => {
  return (
    <ProductContext>
      <CartProvider>
        <BrowserRouter>
          <Route
            render={(props) => (
              <div>
                <Header {...props} />
                {/* <div> */}
                  <div className="main">
                    <Routes />
                    {/* <Slider /> */}
                  </div>
                {/* </div> */}
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
