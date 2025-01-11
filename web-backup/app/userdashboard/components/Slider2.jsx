import React from "react";
import { FaBookReader } from "react-icons/fa";
import Slider from "react-slick";

const Bcs = () => {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#bfbdbd",
          borderRadius: "20px",
        }}
        onClick={onClick}
      />
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          display: "block",
          background: "#bfbdbd",
          borderRadius: "20px",
        }}
        onClick={onClick}
      />
    );
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    centerPadding: "60px",
    slidesToScroll: 1,
    autoplay: true,
    rtl: false,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  //   var settings = {
  //     dots: true,
  //     infinite: true,
  //     speed: 500,
  //     slidesToShow: 1,
  //     slidesToScroll: 1
  //   };
  return (
    <div className="md:mb-0 mb-20">
      <Slider {...settings}>
        <div className="p-1">
          <div className="border rounded-md">
            <div className="flex justify-between rounded-t-md items-center mb-2 bg-white p-4">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
            <div className="flex mt-2 justify-between rounded-b-md items-center bg-white p-4 ">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="border rounded-md">
            <div className="flex justify-between rounded-t-md items-center mb-2 bg-white p-4">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
            <div className="flex mt-2 justify-between rounded-b-md items-center bg-white p-4 ">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="border rounded-md">
            <div className="flex justify-between rounded-t-md items-center mb-2 bg-white p-4">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
            <div className="flex mt-2 justify-between rounded-b-md items-center bg-white p-4 ">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
          </div>
        </div>
        <div className="p-1">
          <div className="border rounded-md">
            <div className="flex justify-between rounded-t-md items-center mb-2 bg-white p-4">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
            <div className="flex mt-2 justify-between rounded-b-md items-center bg-white p-4 ">
              <div>
                <h3 className="rounded-md font-bold text-gray-600">46th BCS</h3>
                <p className="text-sm">Coming soon</p>
              </div>
              <FaBookReader color="#706e6e" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Bcs;
