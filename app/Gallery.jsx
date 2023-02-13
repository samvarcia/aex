import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./gallery.module.css";
import { FiDownload, FiArrowLeft, FiTrash2 } from "react-icons/fi";

import "swiper/css";

const Gallery = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const namePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const randomLetters = Math.random().toString(36).substring(7);
    return `AEX${randomNumber}-${randomLetters}.jpg`;
  };

  return (
    <div className={styles.galleryContainer}>
      <div
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "fixed",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Swiper
          navigation={true}
          onInit={(swiper) => {
            setActiveSlide(swiper.realIndex);
            // console.log(swiper.realIndex);
          }}
          onSlideChangeTransitionStart={(swiper) => {
            setActiveSlide(swiper.realIndex);
            // console.log(swiper.realIndex);
          }}
        >
          {props.srcs.map((src, index) => (
            <>
              <SwiperSlide key={index}>
                <img src={src} alt={src} style={{ width: "100%" }} />
              </SwiperSlide>
            </>
          ))}
        </Swiper>
        <div className={styles.galleryMenu}>
          <button
            className={styles.backButton}
            onClick={() => props.closeGallery()}
          >
            <FiArrowLeft style={{ fontSize: "35px" }} />
          </button>
          <a href={props.srcs[activeSlide]} download={namePhoto()}>
            <FiDownload style={{ fontSize: "35px" }} />
          </a>
          <button
            className={styles.backButton}
            onClick={() => props.delete(props.srcs[activeSlide])}
          >
            <FiTrash2 style={{ fontSize: "35px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
