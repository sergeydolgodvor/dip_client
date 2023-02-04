import React from 'react';
import { Carousel } from 'antd';

import firstImage from 'images/home/1.png';
import secondImage from 'images/home/2.jpg';
import thirdImage from 'images/home/3.jpg';
import fourthImage from 'images/home/4.jpg';
import fifthImage from 'images/home/5.png';
import sixthImage from 'images/home/6.jpg';

import './index.scss';

const Home = () => {
  return (
    <div className="home">
      <h2>
        Добро пожаловать в информационную систему документооборота ФГБОУ ВО
        “СГУВТ”
      </h2>

      <Carousel autoplay>
        <div>
          <div className="carousel-item">
            <img src={firstImage} alt="firstImage" />
          </div>
        </div>
        <div>
          <div className="carousel-item">
            <img src={secondImage} alt="secondImage" />
          </div>
        </div>
        <div>
          <div className="carousel-item">
            <img src={thirdImage} alt="thirdImage" />
          </div>
        </div>
        <div>
          <div className="carousel-item">
            <img src={fourthImage} alt="fourthImage" />
          </div>
        </div>
        <div>
          <div className="carousel-item">
            <img src={fifthImage} alt="fifthImage" />
          </div>
        </div>
        <div>
          <div className="carousel-item">
            <img src={sixthImage} alt="sixthImage" />
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Home;
