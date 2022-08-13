import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useCallback, useEffect, useState } from "react";

const sliderData = [
  {
    image:
      "https://chat.zalo.me/assets/inapp-welcome-screen-0.19afb7ab96c7506bb92b41134c4e334c.jpg",
    text: "Call groups and work effectively with colleagues",
  },
  {
    image:
      "https://chat.zalo.me/assets/inapp-welcome-screen-02.7f8cab265c34128a01a19f3bcd5f327a.jpg",
    text: "Chat with friends and colleagues",
  },
];

export default function Welcome() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handleNextSlide = useCallback(() => {
    const index = activeSlide + 1 === sliderData.length ? 0 : activeSlide + 1;
    setActiveSlide(index);
  }, [activeSlide]);

  const handlePrevSlide = () => {
    const index = activeSlide - 1 < 0 ? sliderData.length - 1 : activeSlide - 1;
    setActiveSlide(index);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(autoSlide);
    };
  }, [handleNextSlide]);

  return (
    <div className="welcome">
      <div className="welcome-title">
        Welcome to <span className="welcome-title__name">Pink Moon</span>
      </div>
      <p>
        Let's chat with <span className="welcome-title__name">Pink Moon</span>{" "}
        with friends and relatives
      </p>
      <div className="welcome-slider">
        {sliderData.map((item, index) => {
          return (
            <WelComeSliderItem
              key={index}
              image={item.image}
              text={item.text}
              active={index === activeSlide}
            />
          );
        })}
        <div className="welcome-slider__control-left" onClick={handlePrevSlide}>
          <ArrowBackIos />
        </div>
        <div
          className="welcome-slider__control-right"
          onClick={handleNextSlide}
        >
          <ArrowForwardIos />
        </div>
      </div>
    </div>
  );
}

export function WelComeSliderItem({ image, text, active }) {
  return (
    <div className={`welcome-slider__item ${active ? "active" : ""}`}>
      <div className="welcome-slider__item-img">
        <img src={image} alt="slider" />
      </div>
      <div className="welcome-slider__item-text">{text}</div>
    </div>
  );
}
