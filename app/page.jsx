"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);
  const lastPicRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          facingMode: "environment",
          width: 500,
          height: 625,
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
  const green = (data) => {
    for (let i = 0; i < data.length; i += 4) {
      data[i] = data[i] - 100; // Invert Red
      data[i + 1] = data[i + 1] - 100 + 100; // Invert Green
      data[i + 2] = data[i + 2] - 100; // Invert Blue
      // data[i + 3] = data[i + 3];
    }
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    const width = 500;
    const height = 625;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, photo.width, photo.height);
      const scannedImage = ctx.getImageData(0, 0, photo.width, photo.height);
      const scannedData = scannedImage.data;
      const pixelationFactor = 6;
      green(scannedData);
      for (let y = 0; y < photo.height; y += pixelationFactor) {
        for (let x = 0; x < photo.width; x += pixelationFactor) {
          // extracting the position of the sample pixel
          const pixelIndexPosition = (x + y * photo.width) * 4;
          // drawing a square replacing the current pixels
          ctx.fillStyle = `rgba(
            ${scannedData[pixelIndexPosition]},
            ${scannedData[pixelIndexPosition + 1]},
            ${scannedData[pixelIndexPosition + 2]},
            ${scannedData[pixelIndexPosition + 3]}
            )`;
          ctx.fillRect(x, y, pixelationFactor, pixelationFactor);
        }
      }
    }, 200);
  };
  const namePhoto = () => {
    const randomNumber = Math.floor(Math.random() * 100000);
    const randomLetters = Math.random().toString(36).substring(7);
    return `AEX${randomNumber}-${randomLetters}.jpg`;
  };
  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;
    let lastPic = lastPicRef.current;
    let photoName = namePhoto();

    const data = photo.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = data;
    link.setAttribute("download", `${photoName}`);
    link.innerHTML = `<img classname="photo" src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
    console.log(strip.firstChild);
  };

  return (
    <main className={styles.main}>
      <h1>AEX</h1>
      <div className={styles.display}>
        <div>
          <video hidden ref={videoRef} onCanPlay={() => paintToCanvas()} />
          <canvas className={styles.facecanvas} ref={photoRef} />
        </div>
        <div className={styles.actions}>
          <button className={styles.cameraswitch}>SWITCH</button>
          <button
            className={styles.cameratrigger}
            onClick={() => takePhoto()}
          ></button>
          {modalIsOpen ? (
            <div className={styles.modalcontainer}>
              <div
                className={styles.modalbackground}
                onClick={() => setModalIsOpen(false)}
              />
              <div className={styles.modalcontent}>
                <div id="strip"></div>
              </div>
            </div>
          ) : (
            <div
              className={styles.galleryCover}
              id="empty-div"
              onClick={() => setModalIsOpen(true)}
            ></div>
          )}
        </div>
        <div className="lastpic" ref={lastPicRef}></div>
      </div>
    </main>
  );
}
