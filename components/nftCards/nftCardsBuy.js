import styles from "../styles/NFTCards.module.css";
import Image from "next/image";
import waffle from "../../public/images/waffleLogo.svg";
import syrup1 from "../../public/images/syrup1.svg";
import { useEffect, useState } from "react";
import { ethers, BigNumber } from "ethers";
import { openseaURL } from "../../utils/contracts/contractAddress";
const NFTCardsBuy = ({ nft, contract, i }) => {
  const [raffle, setRaffle] = useState(false);
  const [customNumber, setCustomNumber] = useState(false);
  const [customPrice, setCustomPrice] = useState(false);
  const [number, setNumber] = useState(1);
  const [price, setPrice] = useState(nft.ticketPrice.toString());
  const [nftFormatted, setNftFormatted] = useState(null);
  const [error, setError] = useState("");
  const [fetched, setFetched] = useState(false);
  const [dataTimeout, setDataTimeout] = useState(null);

  const getNft = async () => {
    setFetched(true);
    const collection = nft.collection;

    console.log(nft, "NFT");
    const nftId = nft.nftId.toString();
    console.log("ID", nftId);

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
    console.log(raffleParticipants, "PARTICIPANTS");
    if (data.image_url) {
      setNftFormatted({
        ...nft,
        image_url: data.image_url,
        collection: { name: data.collection.name },
        name: data.name,
        participants: raffleParticipants,
      });
    } else {
      setNftFormatted(nft);
    }
  };

  useEffect(() => {
    if (nft && !fetched) setTimeout(() => getNft(), 1100 * i);
  }, []);
  const buyTicket = async () => {
    const totalPrice = number * price * 10 ** -18;
    const options =
      totalPrice.toFixed(18) > (1 * 10 ** -10 * number).toFixed(18)
        ? {
            value: ethers.utils.parseEther(String(totalPrice)),
          }
        : {
            value: ethers.utils.parseEther(String(totalPrice.toFixed(18))),
          };
    try {
      const tx = await contract.joinRaffle(
        nft.raffleId.toNumber(),
        number,
        options
      );
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
                      <button onClick={() => getNft()}>Refresh data</button>{" "}
                      Can't fetch collection
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
              <button
                className={styles.raffleButton}
                onClick={() => buyTicket()}
              >
                Buy a Ticket
              </button>
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

export default NFTCardsBuy;
