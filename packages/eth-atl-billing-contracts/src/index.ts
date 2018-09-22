export const Contracts = {
  BillableWalletFactory: {
    spec: require("../blockchain/build/contracts/BillableWalletFactory.json"),
    address: "0x9b11ae1facef338931fcf5e35afb0cd388e94ff7"
  },
  BillableWallet: {
    spec: require("../blockchain/build/contracts/BillableWallet.json"),
    address: ""
  }
};

import { BillableWalletFactory } from "../types/BillableWalletFactory";
import { BillableWallet } from "../types/BillableWallet";

export namespace BillableWalletTypes {
  export type Wallet = BillableWallet;
  export type Factory = BillableWalletFactory;
}
