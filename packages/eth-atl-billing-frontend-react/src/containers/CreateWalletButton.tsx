import * as React from "react";
import { Web3Component } from "../components/Web3Component";

interface IProps {
  onClick: (tx: Promise<any>) => {};
}
export class CreateWalletButton extends Web3Component<IProps> {
  constructor(props: any) {
    super(props);
    this.createWallet = this.createWallet.bind(this);
  }

  public async createWallet() {
    const accounts = await this.getAccounts();
    const account = accounts[0];
    const tx = this.getWalletFactory()
      .methods.createWallet()
      .send({ from: account });
    this.props.onClick(tx);
  }

  public render() {
    return (
      <button className="ui button" role="button" onClick={this.createWallet}>
        Create Wallet
      </button>
    );
  }
}
