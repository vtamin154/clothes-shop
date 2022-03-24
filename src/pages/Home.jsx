import React from 'react';
import Advertise from '../components/Advertise';
import Helmet from '../components/Helmet';
import Slider from '../components/Slider';
import sliderData from '../assets/fake-data/slider';

import advertise from '../assets/fake-data/advertise';
import Products from '../components/Products';
import About from '../components/About';
import NewProducts from '../components/NewProducts';
import Style from '../components/Style';
import Policy from '../components/Policy';
const Home = () => {
  return (
    <Helmet title="Trang chủ" className="container-fluid">
      <Slider control auto timeOut={5000} data = {sliderData} />
      <Advertise data = {advertise}/>
      <Products/>
      <About/>
      <NewProducts/>
      <Style/>
      <Policy/>
    </Helmet>
  );
};

export default Home;
