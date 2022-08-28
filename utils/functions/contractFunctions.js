import { ethers } from "ethers";

export const initializeProvider = async (
  setProvider,
  setSigner,
  setContract,
  contractAddress,
  contractJson
) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      contractJson.abi,
      signer
    );
    setProvider(provider);
    setSigner(signer);
    setContract(contract);
  } catch (err) {
    console.log("ERROR", err);
  }
};

export const checkNetwork = async (setBadNetwork) => {
  try {
    if (window.ethereum.networkVersion !== "4") {
      setBadNetwork(true);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x4" }], // chainId must be in hexadecimal numbers
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const connectWallet = async (provider, setWallet) => {
  if (provider) {
    const accounts = await provider.send("eth_requestAccounts", []);
    setWallet(accounts[0]);
    provider.provider.on("accountsChanged", (accounts) => {
      console.log("test");
      setWallet(accounts[0]);
    });
  } else {
    alert("Please install metamask!");
  }
};
