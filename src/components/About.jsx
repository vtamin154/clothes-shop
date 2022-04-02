import React, { useEffect, useRef, useState } from 'react';
// import Aos from "aos";
// import "aos/dist/aos.css";

const About = () => {
    
    // useEffect(() =>{
    //     Aos.init({duration: 2000});
    // },[]);

// const imgRef = useRef();
// const [isVisible, setVisible] = useState();
//   useEffect(() => {
//     const observer = new IntersectionObserver((entries) =>
//       entries.forEach((entry) => entry.isIntersecting && setVisible(true))
//     );

//     observer.observe(imgRef.current);

//     return () => observer.unobserve(imgRef.current);
//   }, []);

  return (
    <div className="about container-fluid">
      <div className="row justify-content-between">
        <div
        //   ref={imgRef}
          // data-aos="fade-right"
          className="about__img col-lg-3"
        //   className={`about__img col-lg-3 
        //   fade-in-section ${
        //     isVisible ? 'is-visible' : ''
        //   }
        //   `}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2Fopgekv9lh8ae8v8jsrmr.jpg?alt=media&token=2d1a0a20-ea36-4f26-90f4-dc7faf12b454"
            alt=""
          />
        </div>
        <div className="about__content col-lg-5">
          <h2 data-aos="fade-up">Mọi sản phẩm do chúng tôi thiết kế</h2>
          <button data-aos="fade-down"className="about__content__btn">Mua ngay</button>
        </div>
        <div 
        // data-aos="fade-left" 
        className="about__img col-lg-3">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/e-commerce-7dd93.appspot.com/o/product-images%2Fa8o0upyejvpfikgyw7q9.jpg?alt=media&token=11472fa1-614c-4fcc-8b95-4b6c4cfa359d"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default About;
// https://stackoverflow.com/questions/59595700/how-to-make-a-react-component-fade-in-on-scroll-using-intersectionobserver-but