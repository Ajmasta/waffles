import styles from "../styles/SecondPanel.module.css";
const SecondPanel = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.topEllipse}></div>
      <div className={styles.bottomEllipse}></div>
      <div className={styles.contentContainer}>
        <div className={styles.rightText}>
          <p className={styles.mainTitle}>Get More Money</p>
          <p className={styles.descriptionText}>
            Overall, your NFT can sell for more than the floor price.
          </p>
        </div>
        <div className={styles.leftText}>
          {" "}
          <p className={styles.mainTitle}>Pay Little, Win Big</p>
          <p className={styles.descriptionText}>
            Win expensive NFTs with your pocket change
          </p>
        </div>
        <div className={styles.rightText}>
          {" "}
          <p className={styles.mainTitle}>Lifetime Winnings</p>
          <p className={styles.descriptionText}>
            Every ticket gives you lifetime access to a monthly lottery
          </p>
        </div>
        <div className={styles.leftText}>
          {" "}
          <p className={styles.mainTitle}>Increased Liquidity</p>
          <p className={styles.descriptionText}>
            If your NFT is worth a lot, not many people can afford it. But
            almost everyone can afford a ticket.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecondPanel;
