"use client";
import { useRef, useEffect, useState, useTransition } from "react";
import { encode } from "js-base64";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Gallery from "./Gallery";
import Menu from "./Menu";
import { FiRefreshCcw } from "react-icons/fi";
import Webcam from "react-webcam";

export default function Home() {
  const initialImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC`;
  const [modal, setModal] = useState(false);
  const [photos, setPhotos] = useState([initialImage]);
  const videoRef = useRef(null);
  const photoRef = useRef("");
  const stripRef = useRef(null);
  const lastPicRef = useRef(null);
  const galleryCoverRef = useRef(null);
  const triggerRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");

  const toggleFacingMode = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
    getVideo();
  };
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    if (!modal) {
      takePhoto();
    }
  }, [modal]);

  useEffect(() => {
    takePhoto();
  }, []);
  useEffect(() => {
    const savedPhoto = JSON.parse(localStorage.getItem("AEXPHOTO"));
    if (savedPhoto) {
      setPhotos(savedPhoto);
    }
  }, []);
  const photoLocalStorage = (photo) => {
    window.localStorage.setItem("AEXPHOTO", JSON.stringify(photo));
    // console.log(photo)
  };
  useEffect(() => {
    paintToCanvas;
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: facingMode,
          width: { min: 720 },
          height: 900,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.log("error:", err);
      });
  };
  // const green = (data) => {
  //   for (let i = 0; i < data.length; i += 4) {
  //     data[i] = data[i] - 100; // Invert Red
  //     data[i + 1] = data[i + 1] - 100 + 100; // Invert Green
  //     data[i + 2] = data[i + 2] - 100; // Invert Blue
  //     // data[i + 3] = data[i + 3] - 100;
  //   }
  // };
  const green = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] + 120; // Invert Red
      data[i + 1] = data[i + 1] + 200; // Invert Green
      data[i + 2] = data[i + 2] + 80; // Invert Blue
      // data[i + 3] = data[i + 3] + 255; // Invert Blue
    }
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    photo.width = 720;
    photo.height = 720;
    console.log(video.video);
    return setInterval(() => {
      ctx.drawImage(video.video, 0, 0, photo.width, photo.height);

      console.log(ctx);
      const scannedImage = ctx.getImageData(0, 0, photo.width, photo.height);
      const scannedData = scannedImage.data;
      const pixelationFactor = 4;
      // green(scannedData);
      if (pixelationFactor !== 0) {
        for (let y = 0; y < photo.height; y += pixelationFactor) {
          for (let x = 0; x < photo.width; x += pixelationFactor) {
            const pixelIndexPosition = (x + y * photo.width) * 4;
            ctx.fillStyle = `rgba(
              ${scannedData[pixelIndexPosition]},
              ${scannedData[pixelIndexPosition + 1]},
              ${scannedData[pixelIndexPosition + 2]},
              ${scannedData[pixelIndexPosition + 3]}
              )`;
            ctx.fillRect(x, y, pixelationFactor, pixelationFactor);
          }
        }
      }
    }, 100);
  };

  const takePhoto = () => {
    if (triggerRef.current === document.activeElement) {
      let photoShot = photoRef.current;
      const data = photoShot.toDataURL();
      setPhotos([data, ...photos]);
      photoLocalStorage(photos);
    }
  };
  const closePhotoGallery = () => {
    setModal(false);
  };
  const deletePhoto = (exphoto) => {
    const deletedPhoto = photos.filter((photo) => photo !== exphoto);
    setPhotos(deletedPhoto);
    photoLocalStorage(deletedPhoto);
  };
  const videoConstrains = {
    width: 720,
    height: 720,
    aspectRatio: 1,
  };
  return (
    <main className={styles.main}>
      <h1>AEX</h1>
      <div className={styles.display}>
        <div className={styles.cameraContainer}>
          <div className={styles.camera}>
            {/* <video hidden ref={videoRef} onCanPlay={() => paintToCanvas()} /> */}
            <Webcam
              ref={videoRef}
              videoConstraints={videoConstrains}
              onPlay={() => paintToCanvas()}
            />
            <canvas className={styles.facecanvas} ref={photoRef} />
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <div
          className={styles.galleryCover}
          id="empty-div"
          onClick={() => setModal(true)}
          ref={galleryCoverRef}
        >
          <img src={photos[0]} alt="" />
        </div>
        <button
          className={styles.cameratrigger}
          onClick={() => takePhoto()}
          ref={triggerRef}
        ></button>
        <button
          className={styles.cameraswitch}
          onClick={() => toggleFacingMode()}
        >
          <FiRefreshCcw style={{ fontSize: "35px" }} />
        </button>
      </div>
      {modal && (
        <div className={styles.modalcontainer}>
          <div className={styles.modalbackground} />
          <div className={styles.modalcontent}>
            <Gallery
              srcs={photos}
              closeGallery={closePhotoGallery}
              delete={deletePhoto}
            />
          </div>
        </div>
      )}
    </main>
  );
}
