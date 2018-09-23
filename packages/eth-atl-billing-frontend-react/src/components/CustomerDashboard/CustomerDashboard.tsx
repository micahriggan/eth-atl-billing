import { PendingBillsContainer } from "../../containers/pending-bills/PendingBills";
import { Layout } from "../Layout";
// import { Redirect } from "react-router";
import * as React from "react";
import { Recurrence } from "../Recurrence/Recurrence";
import { Web3Component } from "../Web3Component";

interface IState {
  walletAddress: string;
  balance: string;
}

export class CustomerDashboard extends Web3Component<any, IState> {
  public state: IState = {
    balance: "0",
    walletAddress: ""
  };

  public constructor(props: any) {
    super(props);
  }

  public async componentDidMount() {
    const walletAddress = await this.getMyBillableWalletAddress();
    this.setState({ walletAddress });
    if (walletAddress) {
      const balance = await this.getWeb3().eth.getBalance(walletAddress);
      this.setState({ balance: balance.toString() });
    }
  }

  public handleChange(recurrenceVal: string) {
    console.log(recurrenceVal);
  }

  public render() {
     // if (this.state.walletAddress === "0x0000000000000000000000000000000000000000") {
     //   return <Redirect to="/customer" />;
     // }

    return (
      <Layout>
        <PendingBillsContainer />
        <h3 className="ethAddr">Wallet {this.state.walletAddress}</h3>
        <h4>Amount: {this.state.balance} </h4>
        <h4>Value: </h4>
        <Recurrence onChange={this.handleChange}/>
      </Layout>
    );
  }
}
