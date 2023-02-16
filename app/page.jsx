"use client";
import { useRef, useEffect, useState, useTransition } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Gallery from "./Gallery";
import { FiRefreshCcw } from "react-icons/fi";
import Webcam from "react-webcam";
import AexLogo from "../public/AEXGREENLOGO.svg";
import Loader from "./Loader";
export default function Home() {
  const [loading, setLoading] = useState(true);
  const initialImage = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAQSURBVHgBAQUA+v8AAAAAAAAFAAFkeJU4AAAAAElFTkSuQmCC`;
  const [modal, setModal] = useState(false);
  const [photos, setPhotos] = useState([initialImage]);
  const [color, setColor] = useState("green");
  const videoRef = useRef(null);
  const photoRef = useRef("");
  const stripRef = useRef(null);
  const lastPicRef = useRef(null);
  const galleryCoverRef = useRef(null);
  const triggerRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment");

  const toggleFacingMode = () => {
    setFacingMode(facingMode === "environment" ? "user" : "environment");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!modal) {
      takePhoto();
    }
  }, [modal]);

  // useEffect(() => {
  //   takePhoto();
  // }, []);
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

  const green = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i];
      let green = data[i + 1];
      let blue = data[i + 2];

      // Keep the green channel and set the red and blue channels to 0
      data[i] = red * 0.5;
      data[i + 1] = green * 1.4;
      data[i + 2] = blue * 0.5;
    }
  };
  const blue = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i];
      let green = data[i + 1];
      let blue = data[i + 2];

      // Keep the green channel and set the red and blue channels to 0
      data[i] = red * 0.5;
      data[i + 1] = green * 0.5;
      data[i + 2] = blue * 1.4;
    }
  };
  const red = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i];
      let green = data[i + 1];
      let blue = data[i + 2];

      // Keep the green channel and set the red and blue channels to 0
      data[i] = red * 1.4;
      data[i + 1] = green * 0.5;
      data[i + 2] = blue * 0.5;
    }
  };
  const yellow = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i];
      let green = data[i + 1];
      let blue = data[i + 2];

      // Keep the green channel and set the red and blue channels to 0
      data[i] = red * 1.4;
      data[i + 1] = green * 1.4;
      data[i + 2] = blue * 0.5;
    }
  };
  const tur = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i];
      let green = data[i + 1];
      let blue = data[i + 2];

      // Keep the green channel and set the red and blue channels to 0
      data[i] = red * 1.4;
      data[i + 1] = green * 1.4;
      data[i + 2] = blue * 1.4;
    }
  };
  const blackAndWhite = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      let red = data[i];
      let green = data[i + 1];
      let blue = data[i + 2];

      // Calculate the weighted average of the red, green, and blue channels
      let gray = red * 0.3 + green * 0.59 + blue * 0.11;

      // Set all color channels to the grayscale value
      data[i] = gray;
      data[i + 1] = gray;
      data[i + 2] = gray;
    }
  };

  const paintColor = (color, data) => {
    if (color === "green") {
      console.log("PAINT GREEN" + data);
    }
    if (color === "red") {
      console.log("PAINT RED" + data);
    }
  };
  const changeColor = (newTone) => {
    const newColor = newTone;
    setColor(newColor);
  };
  const paintToCanvas = (tone) => {
    // console.log(color);
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    photo.width = 720;
    photo.height = 720;

    // const renderImage = (ctx, video, photo) => {};

    ctx.drawImage(video.video, 0, 0, photo.width, photo.height);
    const scannedImage = ctx.getImageData(0, 0, photo.width, photo.height);
    const scannedData = scannedImage.data;
    const pixelationFactor = 6;
    // if (tone === "red") {
    //   red(scannedData);
    // }
    // if (tone === "green") {
    //   green(scannedData);
    // }
    switch (tone) {
      case "red":
        red(scannedData);
        break;
      case "green":
        green(scannedData);
        break;
      case "blue":
        blue(scannedData);
        break;
      case "yellow":
        yellow(scannedData);
        break;
      case "white":
        blackAndWhite(scannedData);
        break;
      default:
        green(scannedData);
    }
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
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      paintToCanvas(color);
    }, 200);
    return () => clearInterval(intervalId);
  }, [color]);
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
    facingMode: facingMode,
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <main className={styles.main}>
          <Image
            priority
            src={AexLogo}
            alt="AEX"
            width={150}
            style={{ margin: 20 }}
          />
          <div className={styles.display}>
            <div className={styles.cameraContainer}>
              <div className={styles.camera}>
                {/* <video hidden ref={videoRef} onCanPlay={() => paintToCanvas()} /> */}
                <Webcam
                  onPlaying={() => {
                    paintToCanvas(color);
                  }}
                  ref={videoRef}
                  videoConstraints={videoConstrains}
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
              <FiRefreshCcw style={{ fontSize: "35px", color: "#fff" }} />
            </button>
          </div>
          <div className={styles.colorPicker}>
            <button
              className={styles.green}
              onClick={() => changeColor("green")}
            ></button>
            <button
              className={styles.red}
              onClick={() => changeColor("red")}
            ></button>
            <button
              className={styles.blue}
              onClick={() => changeColor("blue")}
            ></button>
            <button
              className={styles.yellow}
              onClick={() => changeColor("yellow")}
            ></button>
            <button
              className={styles.white}
              onClick={() => changeColor("white")}
            ></button>
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
      )}
    </>
  );
}
