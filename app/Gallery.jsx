"use-client";
import styles from "./gallery.module.css";

export default function gallery({ srcs }) {
  return (
    <div className={styles.gallery}>
      {srcs.map((src) => {
        // return <img src={src} key={src} />;
        return console.log(src);
      })}
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
