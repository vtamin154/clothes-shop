import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Cart from '../pages/Cart';
import Product from '../pages/Product';
import AddProducts from '../pages/admin/AddProducts';
import CartLine from '../components/CartLine';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import Contact from '../pages/Contact';
import Cashout from '../components/Cashout';
import Account from '../pages/Account';
const Routes = (props) => {
  return (
    <Switch>
      <Route path="/" exact component={() => <Home user = {props.user}/>}></Route>
      {/* <Route path="/catalog/:slug" component={Product}></Route> */}
      <Route path="/catalog" exact component={() => <Catalog user={props.user}/>}></Route>
      <Route path="/cart" exact component={() => <Cart user = {props.user} />}></Route>
      <Route path = "/add-products" exact component={AddProducts}/>
      <Route path='/sign-up' exact component={SignUp}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/contact' exact component={Contact}/>
      <Route path='/cashout' exact component={() =>  <Cashout user = {props.user}/>} />
      <Route path='/account' exact component={() => <Account user = {props.user}/>} />
    </Switch>
  );
}

export default Routes;
