//src/components/Slider.jsx
import React from "react";
import "./../styles/slider.css";
import video from "../assets/video.mp4"; //video

export default function Slider() {
  return (
    <div className="slider">
      <video
        className="slider-video"
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />
    </div>
  );
}
