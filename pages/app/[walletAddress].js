import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import NavBar from "../../components/navBar/navBar";

import ConfirmWindow from "../../components/nftCards/confirmWindow";
import NFTCards from "../../components/nftCards/nftCards";
import { openseaURL } from "../../utils/contracts/contractAddress";
const Wallet = ({ data }) => {
  const router = useRouter();
  const { walletAddress } = router.query;
  const [nfts, setNfts] = useState();
  const [confirmWindow, setConfirmWindow] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState(null);

  useEffect(() => {
    const getNfts = async () => {
      const options = {
        method: "GET",
        /* headers: {
          Accept: "application/json",
          "X-API-KEY": "cea51c7103bf4028a899174652d52464",
        },*/ // for mainnet only
      };

      const data = await (
        await fetch(
          `${openseaURL}/api/v1/assets?owner=${walletAddress}&order_direction=desc&limit=20&include_orders=false`,
          options
        )
      ).json();

      console.log("calling", data);

      setNfts(data);
    };
    if (walletAddress) getNfts();
  }, [walletAddress]);
  return (
    <>
      <div>
        <NavBar />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            backgroundColor: "#1d1d1d",
          }}
        >
          {nfts?.assets?.map((nft, i) => (
            <NFTCards
              nft={nft}
              key={i}
              setConfirmWindow={setConfirmWindow}
              confirmWindow={confirmWindow}
              setSelectedNFT={setSelectedNFT}
            />
          ))}
        </div>
      </div>
      {confirmWindow ? (
        <ConfirmWindow setConfirmWindow={setConfirmWindow} nft={selectedNFT} />
      ) : (
        <></>
      )}
    </>
  );
};
export default Wallet;
