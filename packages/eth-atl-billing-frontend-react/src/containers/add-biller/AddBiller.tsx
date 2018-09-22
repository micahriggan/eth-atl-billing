import * as React from "react";
import { Web3Component } from "../../components/Web3Component";

interface IProps {
  walletAddress: string;
}
interface IState {
  biller: string;
  authorizedAmount: string;
  authorizedFrequency: string;
}
export class AddBillerContainer extends Web3Component<IProps, IState> {
  public state: IState = {
    authorizedAmount: "0",
    authorizedFrequency: (1000 * 60 * 60 * 24 * 30).toString(),
    biller: ""
  };
  constructor(props: IProps) {
    super(props);
    this.authorizeBiller = this.authorizeBiller.bind(this);
    this.handleBillerAddressChange = this.handleBillerAddressChange.bind(this);
    this.handleAuthorizedAmountChange = this.handleAuthorizedAmountChange.bind(this);
    this.handleAuthorizedFrequencyChange = this.handleAuthorizedFrequencyChange.bind(this);
  }

  public handleBillerAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ biller: event.target.value });
  }

  public handleAuthorizedAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ authorizedAmount: event.target.value });
  }

  public handleAuthorizedFrequencyChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ authorizedFrequency: event.target.value });
  }

  public async authorizeBiller() {
    const wallet = await this.getBillableWallet(this.props.walletAddress);
    const accounts = await this.getAccounts();
    await wallet.methods
      .authorize(this.state.biller, this.state.authorizedAmount, this.state.authorizedFrequency)
      .send({ from: accounts[0] });
  }
  public render() {
    return (
      <div>
        <input onChange={this.handleBillerAddressChange} value={this.state.biller} placeholder="Biller Address" />
        <input
          onChange={this.handleAuthorizedAmountChange}
          value={this.state.authorizedAmount}
          placeholder="Bill Amount"
        />
        <input
          onChange={this.handleAuthorizedFrequencyChange}
          value={this.state.authorizedFrequency}
          placeholder="Bill Time Offset (ms)"
        />

        <button onClick={this.authorizeBiller}>Authorize Biller</button>
      </div>
    );
  }
}
