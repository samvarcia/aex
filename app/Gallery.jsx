"use-client";
import { useState } from "react";
import styles from "./gallery.module.css";

export default function gallery({ srcs }) {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectedImage = (src) => {
    console.log("IMAGE SELECTED" + src);
  };
  const namePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const randomLetters = Math.random().toString(36).substring(7);
    return `AEX${randomNumber}-${randomLetters}.jpg`;
  };
  return (
    <div className={styles.gallery}>
      <div className={styles.galleryGrid}>
        {srcs.map((src) => {
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
