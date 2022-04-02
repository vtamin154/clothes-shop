import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import AddProducts from '../pages/admin/AddProducts';
import CartLine from '../components/CartLine';

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home}></Route>
      <Route path="/catalog/:slug" component={Product}></Route>
      <Route path="/catalog" exact component={Catalog}></Route>
      <Route path="/cart" exact component={Cart}></Route>
      <Route path = "/addProducts" exact component={AddProducts}/>
    </Switch>
  );
}

export default Routes;
