import React from 'react';
import { IoEarthOutline } from 'react-icons/io5';
import { FaMedal } from 'react-icons/fa';
import { GiReceiveMoney } from 'react-icons/gi';
const policy = () => {
  return (
    <div className="policy container">
      <div className="row justify-content-between">
        <div className="col-lg-4 policy__cover">
          <div className="policy__cover__icon">
            <IoEarthOutline />
          </div>
          <h4>Ship toàn quốc</h4>
          <p>
            Freeship cho các đơn hàng trong nội thành Hà Nội và các đơn hàng có
            giá trị từ 650k trở lên
          </p>
        </div>
        <div className="col-lg-4 policy__cover">
          <div className="policy__cover__icon">
            <FaMedal />
          </div>
          <h4>Chất lượng</h4>
          <p>
            Chúng tôi cam kết với quý khách hàng sản phẩm chính hãng, đúng với
            mẫu quảng cáo
          </p>
        </div>
        <div className="col-lg-4 policy__cover">
          <div className="policy__cover__icon">
            <GiReceiveMoney />
          </div>
          <h4>Hoàn tiền</h4>
          <p>
            Quý khách sẽ được hoàn tiền trong vòng 2 tuần nếu sản phẩm không đạt
            tiêu chuẩn
          </p>
        </div>
      </div>
    </div>
  );
};

export default policy;
