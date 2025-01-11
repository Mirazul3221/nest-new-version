import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
const BcsLayout = () => {
    const settings2 = {
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        centerPadding: "60px",
        slidesToScroll: 1,
        autoplay: true,
        rtl: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
  return (
    <div>
      {/* <Slider {...settings2}>
        jdghd
      </Slider> */}
    <Slider {...settings2}>
        gfd
    </Slider>
    </div>
  )
}

export default BcsLayout
