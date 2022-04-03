import React, { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
const CartLine = () => {
  const [state, dispatch] = useContext(CartContext);
  // console.log(state);
  return (
    <div className="cart-line">
      <h2>Your cart</h2>
      <hr />
      {state.shoppingCart.length > 0 ? (
        state.shoppingCart.map((itemCart) => (
          itemCart!==null?
          <div
            className="row justify-content-center cart-line__wrap"
            key={itemCart.product.ProductID}
          >
            <div className="col-md-2 cart-line__wrap__img">
              <img src={itemCart.product.ProductImg} alt="" />
            </div>
            <div className="col-md-2 cart-line__wrap__name my-auto">
              <span>{itemCart.product.ProductName}</span>
            </div>
            <div className="col-md-2 cart-line__wrap__price my-auto text-warning">
              <span>Đơn giá: {itemCart.product.ProductPrice} Đ</span>
            </div>
            <div className="col-md-3 cart-line__wrap__quantity my-auto">
              <span onClick={() => dispatch({type:"increase", payload:{total: itemCart.total + 1, product:itemCart.product} })}>
                <BsPlusSquare />
              </span>

              {itemCart.total}

              <span onClick={() => itemCart.total > 1?
                dispatch({type:"decrease", payload: {total: itemCart.total-1, product: itemCart.product}}): ''}>
                <BsDashSquare />
              </span>
            </div>
            <div className="col-md-1 cart-line__wrap__remove my-auto">
              <span className="text-danger" onClick={() => dispatch({type:'remove',payload:itemCart.product.ProductID})}>
                <FaTrashAlt />
              </span>
            </div>
            <hr className="w-75 my-3" />
          </div>
        : ''))
      ) : (
        <h3>There are no products in the cart!</h3>
      )}
      {state.shoppingCart.length !== 0 && (
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3>Cart Summary</h3>
            <hr />
            <div>Total quantity: {state.totalQuantity}</div>
            <div>
              Total price:
              {state.totalPrice.toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartLine;
