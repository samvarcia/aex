import styles from "./loader.module.css";
import Image from "next/image";
import aexLoader from "../public/aex.gif";

const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image priority src={aexLoader} alt="AEX BY SAMVARCIA" width={400} />
    </div>
  );
};

export default Loader;
