import styles from "../styles/NFTCards.module.css";
import Image from "next/image";
import waffle from "../../public/images/waffleLogo.svg";
import syrup1 from "../../public/images/syrup1.svg";
import { useState } from "react";
import ConfirmWindow from "./confirmWindow";
import { raffleState } from "../../states/atoms";
import { useRecoilState } from "recoil";
import { getTheDate } from "../../utils/functions/utilsFunction";
const NFTCards = ({ nft, setConfirmWindow, confirmWindow, setSelectedNFT }) => {
  const [raffle, setRaffle] = useState(false);
  const [customNumber, setCustomNumber] = useState(false);
  const [customPrice, setCustomPrice] = useState(false);
  const [customDate, setCustomDate] = useState(false);
  const [number, setNumber] = useState(0);
  const [price, setPrice] = useState(0);
  const [date, setDate] = useState(0);
  const [error, setError] = useState("");
  const [raffleParams, setRaffleParams] = useRecoilState(raffleState);

  const sendRaffle = () => {
    if (number && price && date) {
      const formattedDate = customDate ? date : getTheDate(date);
      const raffleParams = { number, price, date: formattedDate };
      setSelectedNFT(nft);
      setRaffleParams(raffleParams);

      setConfirmWindow(true);
      setError("");
    } else {
      setError("Make sure to choose all parameters");
    }
  };
  console.log(date);
  return (
    <>
      <div className={styles.allContainer}>
        <div className={styles.mainContainer}>
          <div className={styles.imageContainer}>
            {nft.image_url ? (
              <img
                src={nft?.image_url}
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
            {!raffle ? (
              <>
                <p className={styles.nameText}>
                  {nft.collection.name
                    ? nft.collection.name
                    : "Can't fetch name"}
                </p>
                <p className={styles.nameText}>
                  {nft.name ? nft.name : "Can't fetch name"}
                </p>
              </>
            ) : (
              <div className={styles.inputContainer}>
                <p className={styles.inputText}># of Tickets</p>
                {!customNumber ? (
                  <>
                    <button
                      className={
                        number === 100
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setNumber(100)}
                    >
                      100
                    </button>{" "}
                    <button
                      className={
                        number === 1000
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setNumber(1000)}
                    >
                      1000
                    </button>{" "}
                    <button
                      className={
                        number === 5000
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setNumber(5000)}
                    >
                      5000
                    </button>{" "}
                    <button
                      className={styles.ticketButton}
                      onClick={() => setCustomNumber(true)}
                    >
                      Custom
                    </button>
                  </>
                ) : (
                  <input
                    placeholder="# of Tickets"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                )}
                <p className={styles.inputText}>Ticket Price</p>
                {!customPrice ? (
                  <>
                    <button
                      className={
                        price === 0.01
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setPrice(0.01)}
                    >
                      0.01
                    </button>{" "}
                    <button
                      className={
                        price === 0.001
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setPrice(0.001)}
                    >
                      0.001
                    </button>{" "}
                    <button
                      className={
                        price === 0.0005
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setPrice(0.0005)}
                    >
                      {" "}
                      0.0005
                    </button>{" "}
                    <button
                      className={styles.ticketButton}
                      onClick={() => setCustomPrice(true)}
                    >
                      Custom
                    </button>
                  </>
                ) : (
                  <input
                    type="number"
                    placeholder="Ticket Price"
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                  />
                )}
                <p className={styles.inputText}>Deadline</p>
                {!customDate ? (
                  <>
                    <button
                      className={
                        date === 7
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setDate(7)}
                    >
                      7 Days
                    </button>{" "}
                    <button
                      className={
                        date == 14
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setDate(14)}
                    >
                      14 Days
                    </button>{" "}
                    <button
                      className={
                        date === 30
                          ? styles.activeTicketButton
                          : styles.ticketButton
                      }
                      onClick={() => setDate(30)}
                    >
                      1 Month
                    </button>{" "}
                    <button
                      className={styles.ticketButton}
                      onClick={() => setCustomDate(true)}
                    >
                      Custom
                    </button>
                  </>
                ) : (
                  <input
                    type="date"
                    onChange={(e) =>
                      setDate(new Date(e.target.value).getTime())
                    }
                  />
                )}
              </div>
            )}
          </div>
          <div></div>
          <div className={styles.buttonContainer}>
            {!raffle ? (
              <button
                className={styles.raffleButton}
                onClick={() => setRaffle(!raffle)}
              >
                Start Raffle
              </button>
            ) : (
              <div className={styles.buttonsContainer}>
                <button
                  className={styles.cancelButton}
                  onClick={() => setRaffle(!raffle)}
                >
                  Cancel
                </button>
                <button
                  className={styles.raffleButton}
                  onClick={() => sendRaffle()}
                >
                  {" "}
                  <Image
                    src={waffle}
                    alt="nft image"
                    width={30}
                    height={30}
                  />{" "}
                  Raffle it!{" "}
                </button>
              </div>
            )}
          </div>
          {error ? <p className={styles.errorContainer}>{error}</p> : ""}
        </div>
        <div className={styles.syrupContainer}>
          <Image src={syrup1} width={300} height={150} />
        </div>
      </div>
    </>
  );
};

export default NFTCards;
