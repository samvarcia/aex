"use-client";
import { useState, useEffect } from "react";
import styles from "./gallery.module.css";
import { FiDownload, FiArrowLeft, FiTrash2 } from "react-icons/fi";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

export default function gallery(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#" + props.galleryID,
      children: "a",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
      lightbox = null;
    };
  }, []);

  const handleSelectedImage = (src) => {
    setSelectedImage(src);
  };
  const namePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const randomLetters = Math.random().toString(36).substring(7);
    return `AEX${randomNumber}-${randomLetters}.jpg`;
  };
  const deleteFromGallery = () => {
    props.delete(selectedImage);
    setSelectedImage(null);
  };
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.gallery}>
        <div
          className={styles.galleryGrid || "pswp-gallery"}
          id={props.galleryID}
        >
          {props.srcs.map((src, index) => (
            <img
              data-pswp-width={100}
              data-pswp-height={100}
              src={src}
              alt=""
            />
          ))}
        </div>
      </div>
      {/* {selectedImage ? (
          <div className={styles.selectedImageContainer}>
            <img src={selectedImage} alt="" />

          </div>
        ) : (
          <div className={styles.galleryGrid}>
            {props.srcs.map((src) => {
              return (
                <img
                  src={src}
                  onClick={() => handleSelectedImage(src)}
                  key={namePhoto()}
                />
              );
            })}
          </div>
        )} */}
      {selectedImage ? (
        <div className={styles.galleryMenu}>
          <button
            className={styles.backButton}
            onClick={() => setSelectedImage(null)}
          >
            <FiArrowLeft style={{ fontSize: "35px" }} />
          </button>
          <a href={selectedImage} download={namePhoto()}>
            <FiDownload style={{ fontSize: "35px" }} />
          </a>
          <button
            className={styles.backButton}
            onClick={() => deleteFromGallery()}
          >
            <FiTrash2 style={{ fontSize: "35px" }} />
          </button>
        </div>
      ) : (
        <div className={styles.galleryMenu}>
          <button
            className={styles.backButton}
            onClick={() => props.closeGallery()}
          >
            <FiArrowLeft style={{ fontSize: "35px" }} />
          </button>
          <h3>GALLERY</h3>
        </div>
      )}
    </div>
    // <div className={styles.gallery}>
    //   {srcs.length(
    //     srcs.map((src) => {
    //       return <img src={src} key={src} />;
    //     })
    //   )}
    // </div>
  );
}
