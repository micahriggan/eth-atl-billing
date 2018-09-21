import { Contracts } from "eth-atl-billing-contracts";
import * as React from "react";
import Web3 = require("web3");

declare global {
  interface Window {
    web3: Web3;
  }
}
export class Web3Component extends React.Component {
  public web3: Web3;

  public getWeb3() {
    if (window.web3) {
      this.web3 = new Web3(window.web3.currentProvider);
    }
    if (!this.web3) {
      this.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    return this.web3;
  }

  public getAccounts() {
    return this.getWeb3().eth.getAccounts();
  }

  public getWalletFactory() {
    const web3 = this.getWeb3();
    const contractAddress = process.env.REACT_APP_BILLABLE_WALLET_FACTORY || Contracts.BillableWalletFactory.address;
    return new web3.eth.Contract(Contracts.BillableWalletFactory.spec.abi, contractAddress);
  }
}
