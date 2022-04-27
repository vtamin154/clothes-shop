import React from 'react';

const Cashout = ({ data, user }) => {
  // console.log("cashout",data);
  return (
    <div className="cashout container">
      <div className="row address">
        <div className="col-md-3 text-center">
          <div>Địa chỉ nhận hàng</div>
          <div>{user.Name}</div>
          <div>{user.Email}</div>
        </div>
        <div className="col-md-7 text-center">
          Km10, đường Trần Phú, Nguyễn Trãi, Hà Đông, Hà Nội, Phường Mộ Lao,
          Quận Hà Đông, Hà Nội
        </div>
        <div className="col-md-2 text-center">Thay đổi</div>
      </div>
      <div className="row list-product justify-content-center mt-4">
        <table>
          <thead>
            <tr>
              <th scope="col-md-1">Sản phẩm</th>
              <th scope="col-md-3">Tên</th>
              <th scope="col-md-2">Đơn giá</th>
              <th scope="col-md-2">Số lượng</th>
              <th scope="col-md-2">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="img-product">
                  <img src={item.product.ProductImg} alt="product" />
                </td>
                <td>{item.product.ProductName}</td>
                <td>
                  {item.product.ProductPrice.toLocaleString('vi', {
                    style: 'currency',
                    currency: 'VND',
                  })}
                </td>
                <td>{item.total}</td>
                <td className="text-danger">
                  {(item.product.ProductPrice *
                    item.total).toLocaleString('vi', {
                      style: 'currency',
                      currency: 'VND',
                    })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cashout;
