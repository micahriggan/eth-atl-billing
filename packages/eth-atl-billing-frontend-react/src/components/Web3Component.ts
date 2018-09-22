import { BillableWalletTypes, Contracts } from "eth-atl-billing-contracts";
import * as React from "react";
import Web3 = require("web3");
import { TransactionObject } from "web3/eth/types";

declare global {
  interface Window {
    web3: Web3;
  }
}
export class Web3Component<P = {}, S = {}, SS = any> extends React.Component<P, S, SS> {
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

  public async *web3Iterable<X>(fn: (...args: any[]) => TransactionObject<X>, stop: any) {
    let itr = 0;
    let value = await fn(itr).call();
    while (value !== stop) {
      yield value;
      itr++;
      value = await fn(itr).call();
    }
  }

  public getWalletFactory() {
    const web3 = this.getWeb3();
    const contractAddress = process.env.REACT_APP_BILLABLE_WALLET_FACTORY || Contracts.BillableWalletFactory.address;
    return new web3.eth.Contract(
      Contracts.BillableWalletFactory.spec.abi,
      contractAddress
    ) as BillableWalletTypes.Factory;
  }

  public getBillableWallet(address: string) {
    const web3 = this.getWeb3();
    return new web3.eth.Contract(Contracts.BillableWallet.spec.abi, address) as BillableWalletTypes.Wallet;
  }

  public async getMyBillableWalletAddress(): Promise<string> {
    const accounts = await this.getAccounts();
    const factory = this.getWalletFactory();
    const myWallet = await factory.methods.userWallets(accounts[0]).call();
    return myWallet;
  }

  public async getMyWallet() {
    const address = await this.getMyBillableWalletAddress();
    const wallet = this.getBillableWallet(address);
    return wallet;
  }
}
