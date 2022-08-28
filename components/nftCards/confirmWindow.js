import styles from "../styles/confirmWindow.module.css";
import waffle from "../../public/images/waffleLogo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import nftJson from "../../utils/contracts/nft.json";
import { ethers } from "ethers";
import waffleJson from "../../utils/contracts/waffle.json";
import { useRecoilValue, useRecoilState } from "recoil";
import { contractAddress } from "../../utils/contracts/contractAddress";
import {
  checkNetwork,
  connectWallet,
  initializeProvider,
} from "../../utils/functions/contractFunctions";
import { raffleState, walletState } from "../../states/atoms";
import ethLogo from "../../public/images/ethLogo.svg";
import { getTheDate } from "../../utils/functions/utilsFunction";

const ConfirmWindow = ({ setConfirmWindow, nft }) => {
  const [lastSold, setLastSold] = useState("");

  //initializing wallet
  const [wallet, setWallet] = useRecoilState(walletState);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const raffleParams = useRecoilValue(raffleState);
  const [approveContract, setApproveContract] = useState(null);

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
      waffleJson
    );
    initializeProvider(
      setProvider,
      setSigner,
      setApproveContract,
      nft.asset_contract.address,
      nftJson
    );
  }, []);

  // end of wallet initialization
  const askApproval = async () => {
    console.log(nft.asset_contract.address);

    console.log(approveContract);
    try {
      const tx = await approveContract.setApprovalForAll(contractAddress, true);
    } catch (err) {
      console.log(err);
    }
  };

  const checkIfApproved = async () => {
    const check = await approveContract.isApprovedForAll(
      wallet,
      contractAddress
    );
    return check;
  };
  const startRaffle = async () => {
    const approved = await checkIfApproved();
    console.log(
      nft.asset_contract.address,
      ethers.utils.parseEther(String(raffleParams.price)), //ticketPrice
      raffleParams.number, //ticketAmount
      (raffleParams.date / 1000).toFixed(0), //deadline
      nft.token_id,
      1 //min amount to sell (remove?))
    );
    if (approved) {
      try {
        const tx = await contract.startRaffle(
          nft.asset_contract.address,
          ethers.utils.parseEther(String(raffleParams.price)), //ticketPrice
          raffleParams.number, //ticketAmount
          (raffleParams.date / 1000).toFixed(0), //deadline
          nft.token_id,
          1 //min amount to sell (remove?)
        );
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("approve the NFT collection first!");
    }
  };
  return (
    <div className={styles.mainContainer}>
      <div
        className={styles.backgroundContainer}
        onClick={() => setConfirmWindow(false)}
      >
        {" "}
      </div>
      <div className={styles.windowContainer}>
        <div className={styles.logoContainer}>
          <Image src={waffle} alt="nft image" width={170} height={170} />
        </div>
        <div className={styles.topContainer}>
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
          <div className={styles.profitContainer}>
            <p className={styles.raffleTitle}>Raffle Summary</p>
            <p className={styles.raffleText}>{raffleParams.number} Tickets</p>
            <p className={styles.raffleText}>
              {raffleParams.price}{" "}
              <span className={styles.ethLogoContainer}>
                <Image src={ethLogo} width={15} height={15} />
              </span>
              per Ticket
            </p>
            <p className={styles.raffleText}>
              Ends on {new Date(raffleParams.date).getMonth() + 1}/
              {new Date(raffleParams.date).getDate() + 1}/
              {new Date(raffleParams.date).getFullYear()} (MM/DD/YY)
            </p>
            <p className={styles.raffleText}>
              {" "}
              Max profit: {raffleParams.price * raffleParams.number}
              <span className={styles.ethLogoContainer}>
                <Image src={ethLogo} width={15} height={15} />
              </span>
            </p>
          </div>
        </div>

        <div className={styles.stepsContainer}>
          <p className={styles.steps}>
            {" "}
            1. Approve the contract for this NFT collection{" "}
          </p>
          <button onClick={() => askApproval()} className={styles.button}>
            {" "}
            Approve{" "}
          </button>
          <p className={styles.steps}> 2. Verify Raffle parameters</p>
          <p className={styles.steps}>3. Submit raffle</p>
          <button onClick={() => startRaffle()} className={styles.button}>
            Let's get some waffles!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWindow;
