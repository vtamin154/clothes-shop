import React from 'react';
import Helmet from '../components/Helmet';
import Slider from '../components/Slider';
// import sliderData from '../assets/fake-data/slider';

const Home = () => {
  return (
    <Helmet title="Trang chủ" className="container-fluid">
      <Slider control auto timeOut={5000}/>
    </Helmet>
  );
};

export default Home;
