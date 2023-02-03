"use-client";
import { useState } from "react";
import styles from "./gallery.module.css";
import back from "../public/back.svg";
import Image from "next/image";
import { FiDownload, FiArrowLeft, FiTrash2} from "react-icons/fi";

export default function gallery(props) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectedImage = (src) => {
    setSelectedImage(src);
  };
  const namePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const randomLetters = Math.random().toString(36).substring(7);
    return `AEX${randomNumber}-${randomLetters}.jpg`;
  };
  const deleteFromGallery = () => {
    props.delete(selectedImage)
    setSelectedImage(null)
  }
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.gallery}>
        {selectedImage ? (
          <div className={styles.selectedImageContainer}>
            <img src={selectedImage} alt="" />
            {/* <button onClick={() => setSelectedImage(null)}>Close</button>
            <a href={selectedImage} download={namePhoto()}>
              DOWNLOAD
            </a> */}
          </div>
        ) : (
          <div className={styles.galleryGrid}>
            {props.srcs.map((src) => {
              return (
                <img
                  src={src}
                  // alt={namePhoto()}
                  onClick={() => handleSelectedImage(src)}
                  key={namePhoto()}
                />
              );
            })}
          </div>
        )}
      </div>
      {selectedImage ? (
        <div className={styles.galleryMenu}>
          <button
            className={styles.backButton}
            onClick={() => setSelectedImage(null)}
          >
            <FiArrowLeft style={{fontSize: '35px'}}/>
          </button>
          <a href={selectedImage} download={namePhoto()}>
            <FiDownload style={{fontSize: '35px'}}/>
          </a>
          <button className={styles.backButton} onClick={() => deleteFromGallery()}>
            <FiTrash2 style={{fontSize: '35px'}}/>
          </button>
        </div>
      ) : (
        <div className={styles.galleryMenu}>
          <button
            className={styles.backButton}
            onClick={() => props.closeGallery()}
          >
            <FiArrowLeft style={{fontSize: '35px'}}/>
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
