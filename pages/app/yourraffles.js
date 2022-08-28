import styles from "../../styles/homescreen.module.css";
import { useEffect, useState } from "react";
import { contractAddress } from "../../utils/contracts/contractAddress";
import contractJson from "../../utils/contracts/waffle.json";
import {
  checkNetwork,
  initializeProvider,
} from "../../utils/functions/contractFunctions";
import { ethers } from "ethers";
import NFTCards from "../../components/nftCards/nftCards";
import NFTCardsBuy from "../../components/nftCards/nftCardsBuy";
import NavBar from "../../components/navBar/navBar";
import NFTCardsRaffle from "../../components/nftCards/nftCardsRaffle";

const YourTickets = () => {
  //initializing wallet
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [raffles, setRaffles] = useState([]);

  const [loading, setLoading] = useState(true);
  const [badNetwork, setBadNetwork] = useState(false);

  useEffect(() => {
    const providerListener = new ethers.providers.Web3Provider(
      window.ethereum,
      "any"
    );
    providerListener.on("network", (newNetwork, oldNetwork) => {
      if (newNetwork.chainId === 4) {
        setBadNetwork(false);
      }
      if (oldNetwork) {
        window.location.reload();
      }
    });
    checkNetwork(setBadNetwork);
  }, []);

  useEffect(() => {
    initializeProvider(
      setProvider,
      setSigner,
      setContract,
      contractAddress,
      contractJson
    );
  }, []);
  useEffect(() => {
    const getRaffles = async () => {
      console.log("cacalled");
      let raffles = await contract.returnUserRaffles();

      console.log(raffles);
      setFetched(true);
      if (raffles.length > 4) {
        setRaffles([...raffles.slice(raffles.length - 4, raffles.length)]);
      } else {
        setRaffles(raffles);
      }
    };
    if (provider && !fetched) getRaffles();
  }, [provider]);
  // end of wallet initialization
  return (
    <>
      <NavBar />

      <div className={styles.mainContainer}>
        <p className={styles.title}> Your Raffles</p>
        <div className={styles.rafflesContainer}>
          {raffles.length > 0
            ? raffles.map((raffle, i) => (
                <NFTCardsRaffle
                  key={`raffle${i}`}
                  nft={raffle}
                  contract={contract}
                />
              ))
            : ""}
        </div>
        <div className={styles.buttonContainer}></div>
      </div>
    </>
  );
};

export default YourTickets;
