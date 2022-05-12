import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';

const Slider = (props) => {
  const [activeSlider, setActiveSlider] = useState(0);
  const data = props.data;
  // console.log(data);

  const timeOut = props.timeOut ? props.timeOut : 3000;

  const nextSlide = useCallback(() => {
    const index = activeSlider < 2 ? activeSlider + 1 : 0;
    setActiveSlider(index);
  }, [activeSlider, data]);

  const preSlide = useCallback(() => {
    const index = activeSlider > 0 ? activeSlider - 1 : 2;
    setActiveSlider(index);
  }, [activeSlider, data]);

  useEffect(() => {
    if (props.auto) {
      const slideAuto = setInterval(() => {
        nextSlide();
      }, timeOut);

      return () => {
        clearInterval(slideAuto);
      };
    }
  });

  return (
    <div className="slider">
      {data.map((item, index) => (
        <SliderItem key={index} item={item} active={index === activeSlider} />
      ))}
      {props.control ? (
        <div className="slider__control">
          <div className="slider__control__item">
            <IoChevronBackOutline onClick={preSlide} />
          </div>
          <div className="slider__control__item">
            <div className="index">
              {activeSlider + 1}/{data.length}
            </div>
          </div>
          <div className="slider__control__item">
            <IoChevronForwardOutline onClick={nextSlide} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

Slider.propTypes = {
  data: PropTypes.array,
  control: PropTypes.bool,
  auto: PropTypes.bool,
  timeOut: PropTypes.number,
};

const SliderItem = (props) => (
  <div className={`slider__item ${props.active ? 'active' : ''}`}>
    <div className="slider__item__infor col-lg-6">
      <div className="slider__item__infor__title">
        <span>{props.item.title}</span>
      </div>
      <div className="slider__item__infor__des">
        <span>{props.item.des}</span>
      </div>
      <div className="slider__item__infor__detail">
        <span>{props.item.detail}</span>
      </div>
      <div className="slider__item__infor__btn">
        <Link to="/catalog">
          <button>Mua ngay</button>
        </Link>
      </div>
    </div>

    <div className="slider__item__img">
      <img src={props.item.img} alt="" width="100%" />
      <div className="overlay"></div>
    </div>
  </div>
);
export default Slider;
