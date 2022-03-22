import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Routes from '../routes/Routes';
import ProductContext from './ProductContext';
// import Slider from './Slider';
const Layout = () => {
  return (
    <ProductContext>
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <Header {...props} />
            <div>
              <div className="main">
                <Routes />
                {/* <Slider /> */}
              </div>
            </div>
            <Footer />
          </div>
        )}
      />
    </BrowserRouter>
    </ProductContext>
  );
};

export default Layout;
