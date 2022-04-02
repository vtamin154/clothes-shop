import React, { useContext } from 'react';
import { CartContext } from '../store/CartContext';
import { BsPlusSquare, BsDashSquare } from 'react-icons/bs';
import { FaTrashAlt } from 'react-icons/fa';
const CartLine = () => {
  const [state] = useContext(CartContext);
  console.log(state);
  return (
    <div className="cart-line">
      <h2>Your cart</h2>
      <hr />
      {state.shoppingCart.length > 0 ? (
        state.shoppingCart.map((product) => (
          <div
            className="row justify-content-center cart-line__wrap"
            key={product.ProductID}
          >
            <div className="col-md-2 cart-line__wrap__img">
              <img src={product.ProductImg} alt="" />
            </div>
            <div className="col-md-2 cart-line__wrap__name my-auto">
              <span>{product.ProductName}</span>
            </div>
            <div className="col-md-2 cart-line__wrap__price my-auto text-warning">
              <span>Đơn giá: {product.ProductPrice} Đ</span>
            </div>
            <div className="col-md-3 cart-line__wrap__quantity my-auto">
              <span>
                <BsPlusSquare />
              </span>
              1
              <span>
                <BsDashSquare />
              </span>
            </div>
            <div className="col-md-1 cart-line__wrap__remove my-auto">
              <span className="text-danger">
                <FaTrashAlt />
              </span>
            </div>
            <hr className="w-75 my-3" />
          </div>
        ))
      ) : (
        <h3>There are no products in the cart!</h3>
      )}
      {state.shoppingCart.length && (
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
