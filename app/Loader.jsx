import styles from "./loader.module.css";
import Image from "next/image";
import aexLoader from "../public/aex.gif";
import aexInspo from "../public/AEXInspiration.png";
const Loader = () => {
  return (
    <div className={styles.loader}>
      <Image priority src={aexLoader} alt="AEX BY SAMVARCIA" width={400} />
      <Image src={aexInspo} alt="AEX Inspo" />
    </div>
  );
};

export default Loader;
