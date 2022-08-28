import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

export const walletState = atom({
  key: "walletState",
  default: "",
});

export const providerState = atom({
  key: "providerState",
  default: "",
});

export const signerState = atom({
  key: "signerState",
  default: "",
});
export const contractState = atom({
  key: "contractState",
  default: { nft: {}, raffle: {} },
});

export const raffleState = atom({
  key: "raffleState",
  default: { nft: {}, raffle: {} },
});
