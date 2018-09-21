import * as React from "react";
import { Web3Component } from "../components/Web3Component";

export class MainPage extends Web3Component {
  constructor(props: any) {
    super(props);
    this.createWallet = this.createWallet.bind(this);
  }

  public async createWallet() {
    const accounts = await this.getAccounts();
    const account = accounts[0];
    const tx = await this.getWalletFactory()
      .methods.createWallet()
      .send({from: account});
    window.console.log(tx);
  }

  public render() {
    return (
      <div>
        <button onClick={this.createWallet}>Create Wallet </button>
      </div>
    );
  }
}
