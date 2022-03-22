import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Advertise = (props) => {
  const data = props.data;
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => setOffsetY(window.pageYOffset);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () =>{
      window.removeEventListener("scroll", handleScroll);
    }
  },[]);
  // console.log(data);
  return (
    <div className="advertise container">
      <div className="row" style={{transform: `translateY(${offsetY*0.2}px)`}}>
        {data.map((item, index) => (
          <div className="col-lg-4 advertise__item" key={index}>
            <div className="advertise__item__cover">
              <div className="content">
                <div className="advertise__item__cover__title">
                  {item.title}
                </div>
                <div className="advertise__item__cover__des">{item.des}</div>
                <div className="advertise__item__cover__btn">
                  <Link to={item.path} className="text-decoration-none">
                    <button>Mua ngay</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Advertise.propTypes = {
  data: PropTypes.array,
};

export default Advertise;
