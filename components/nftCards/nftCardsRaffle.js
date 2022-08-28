import styles from "../styles/NFTCards.module.css";
import Image from "next/image";
import waffle from "../../public/images/waffleLogo.svg";
import syrup1 from "../../public/images/syrup1.svg";
import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { openseaURL } from "../../utils/contracts/contractAddress";
const NFTCardsRaffle = ({ nft, contract }) => {
  const [raffle, setRaffle] = useState(false);
  const [customNumber, setCustomNumber] = useState(false);
  const [customPrice, setCustomPrice] = useState(false);
  const [number, setNumber] = useState(10);
  const [price, setPrice] = useState(0.0001);
  const [nftFormatted, setNftFormatted] = useState(null);
  const [error, setError] = useState("");
  const [fetched, setFetched] = useState(false);
  const [activeRaffle, setActiveRaffle] = useState(false);
  const [alreadyRaffled, setAlreadyRaffled] = useState(false);
  const [pastDeadline, setPastDeadline] = useState(false);

  const getNft = async () => {
    setFetched(true);
    const collection = nft.collection;
    const nftId = nft.nftId.toString();
    console.log("ID", nft.raffleId.toString());
    const raffle = await contract.raffles(nft.raffleId);
    console.log(raffle.winnerId.toNumber(), "RAFFLE");
    const options = {
      method: "GET",
    };

    const data = await (
      await fetch(
        `${openseaURL}/api/v1/asset/${collection}/${nftId}/?include_orders=false`,
        options
      )
    ).json();
    console.log(data);
    const raffleParticipants = await contract.returnParticipants(
      nft.raffleId.toString()
    );

    if (data.collection) {
      setNftFormatted({
        ...raffle,
        image_url: data.image_url,
        collection: { name: data.collection.name },
        name: data.name,
        participants: raffleParticipants,
      });
    } else {
      setNftFormatted(raffle);
    }
  };

  useEffect(() => {
    if (nft && !fetched) getNft();
  }, []);

  useEffect(() => {
    const setAll = async () => {
      setPrice(nft.ticketPrice.toString());

      const active = await contract.raffleInProgress();

      setActiveRaffle(active);
      console.log("NFT", nft);
      setAlreadyRaffled(nftFormatted.raffled);
      const time = new Date();
      if (nft.deadline.toNumber() < time.getTime() / 1000)
        setPastDeadline(true);
    };
    if (nftFormatted) setAll();
  }, [nftFormatted]);

  const drawRaffle = async () => {
    try {
      const tx = await contract.requestRandomWords(nft.raffleId.toNumber());
    } catch (err) {
      console.log(err);
    }
  };

  const sendPrizes = async () => {
    try {
      const tx = await contract.claimWinnings(nftFormatted.raffleId.toString());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {nftFormatted ? (
        <div className={styles.allContainer}>
          <div className={styles.mainContainer}>
            <div className={styles.imageContainer}>
              {nftFormatted.image_url ? (
                <img
                  src={nftFormatted?.image_url}
                  alt="nft image"
                  width={300}
                  maxheight={300}
                />
              ) : (
                <div className={styles.filler}>
                  <Image src={waffle} alt="nft image" width={150} />
                  <p className={styles.nameText}> Can't load image</p>
                </div>
              )}
            </div>
            <div className={styles.contentContainer}>
              <>
                <p className={styles.nameText}>
                  {nftFormatted.collection.name ? (
                    nftFormatted.collection.name
                  ) : (
                    <>
                      {" "}
                      Can't fetch collection
                      <button onClick={() => getNft()}>Refresh data</button>
                    </>
                  )}
                </p>
                <p className={styles.nameText}>
                  {nftFormatted.name ? nftFormatted.name : "Can't fetch name"}
                </p>
                <p className={styles.nameText}>
                  {nftFormatted.ticketPrice ? (
                    <>
                      Price: {nftFormatted.ticketPrice.toString() * 10 ** -18}
                    </>
                  ) : (
                    "Can't fetch price"
                  )}
                </p>
                <p className={styles.nameText}>
                  {nftFormatted.participants && nftFormatted.ticketAmount ? (
                    <>
                      Tickets:{" "}
                      {nftFormatted.ticketAmount.toNumber() -
                        nftFormatted.participants.length}
                      /{nftFormatted.ticketAmount.toNumber()}
                    </>
                  ) : (
                    "Can't fetch participants"
                  )}
                </p>
              </>
            </div>
            <div></div>
            <div className={styles.buttonContainer}>
              {!pastDeadline ? (
                <p className={styles.notifText}>Not Past deadline yet!</p>
              ) : alreadyRaffled ? (
                nftFormatted.winnerId.toNumber() !== 0 ? (
                  <button className={styles.raffleButton} onClick={sendPrizes}>
                    Claim Prizes
                  </button>
                ) : (
                  <p className={styles.notifText}>This was already raffled</p>
                )
              ) : activeRaffle ? (
                <p className={styles.notifText}>One raffle in progress!</p>
              ) : (
                <button
                  className={styles.raffleButton}
                  onClick={() => drawRaffle()}
                >
                  Draw Raffle
                </button>
              )}
            </div>
            {error ? <p className={styles.errorContainer}>{error}</p> : ""}
          </div>
          <div className={styles.syrupContainer}>
            <Image src={syrup1} width={300} height={150} />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NFTCardsRaffle;
