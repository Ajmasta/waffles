import styles from "../styles/navbar.module.css";
import waffle from "../../public/images/waffleLogo.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import waffleJson from "../../utils/contracts/waffle.json";
import { contractAddress } from "../../utils/contracts/contractAddress";
import {
  checkNetwork,
  connectWallet,
  initializeProvider,
} from "../../utils/functions/contractFunctions";
import Link from "next/link";
import { walletState } from "../../states/atoms";
import { useRecoilState } from "recoil";

const NavBar = () => {
  //initializing wallet

  const [wallet, setWallet] = useRecoilState(walletState);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
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
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Link href="/app/homescreen">
        <div className={styles.logoContainer}>
          <Image src={waffle} alt="nft image" width={60} height={60} />
        </div>
      </Link>
      <div className={styles.textContainer}>
        <Link href="/app/tickets">
          <p className={styles.text}>Your Tickets</p>
        </Link>
        <Link href="/app/yourraffles">
          <p className={styles.text}>Your Raffles</p>
        </Link>

        {wallet ? (
          <Link href={`/app/${wallet}`}>
            <p className={styles.text}>{wallet.slice(0, 5)}...</p>
          </Link>
        ) : (
          <button
            className={styles.button}
            onClick={() => connectWallet(provider, setWallet)}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default NavBar;
