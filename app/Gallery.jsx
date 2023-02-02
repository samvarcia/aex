"use-client";
import { useState } from "react";
import styles from "./gallery.module.css";
import back from "../public/back.svg";
import Image from "next/image";
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
  return (
    <div className={styles.galleryContainer}>
      <div className={styles.gallery}>
        {selectedImage ? (
          <div className={styles.selectedImageContainer}>
            <img src={selectedImage} alt="" />
            <button onClick={() => setSelectedImage(null)}>Close</button>
            <a href={selectedImage} download={namePhoto()}>
              DOWNLOAD
            </a>
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
      <div className={styles.galleryMenu}>
        {selectedImage ? (
          <button
            className={styles.backButton}
            onClick={() => setSelectedImage(null)}
          >
            <Image src={back} priority alt="back" />
          </button>
        ) : (
          <button
            className={styles.backButton}
            onClick={() => props.closeGallery()}
          >
            <Image src={back} priority alt="back" />
          </button>
        )}
        <h3>GALLERY</h3>
      </div>
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
