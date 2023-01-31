import styles from "./menu.module.css";
import back from "../public/back.svg";
import Image from "next/image";

export default function Menu(props) {
  return (
    <div className={styles.galleryMenu}>
      <button
        className={styles.backButton}
        onClick={() => props.closeGallery()}
      >
        <Image src={back} priority alt="back" />
      </button>
      <h3>GALLERY</h3>
    </div>
  );
}
