import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./gallery.module.css";
import { FiDownload, FiArrowLeft, FiTrash2 } from "react-icons/fi";

import "swiper/css";

const Gallery = (props) => {
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
        }}
      >
        <Swiper navigation={true}>
          {props.srcs.map((src, index) => (
            <SwiperSlide>
              <img src={src} alt={src} style={{ width: "100%" }} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className={styles.galleryMenu}>
        <button className={styles.backButton}>
          <FiArrowLeft style={{ fontSize: "35px" }} />
        </button>
        <a href="">
          <FiDownload style={{ fontSize: "35px" }} />
        </a>
        <button className={styles.backButton}>
          <FiTrash2 style={{ fontSize: "35px" }} />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
