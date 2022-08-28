import chainlink from "../../public/images/ChainlinkLogo.svg";
import waffle from "../../public/images/waffleLogo.svg";
import Image from "next/image";
import styles from "../styles/FirstPanel.module.css";
import Link from "next/link";

const FirstPanel = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.chainlinkLogo}>
        <Image
          src={chainlink}
          width={"800"}
          height={"800"}
          alt="Chainlink Logo"
        />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.logoContainer}>
          <Image src={waffle} width={"260"} height={"260"} />
        </div>
        <div className={styles.textContainer}>
          <p className={styles.mainTitle}>Waffle</p>
          <p className={styles.secondaryTitle}>
            The decentralized NFT Raffle platform
          </p>
          <p className={styles.tiertiaryTitle}>Powered by Chainlink</p>
        </div>
        <div className={styles.buttonContainer}>
          <Link href="/app/homescreen/">
            <button className={styles.launchButton}>Launch App</button>
          </Link>
          <button className={styles.learnButton}>Learn more</button>
        </div>
      </div>
    </div>
  );
};

export default FirstPanel;
