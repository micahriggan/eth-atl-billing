import * as React from "react";
import { IBill, PendingBills } from "../../components/pending-bills/PendingBills";
import { Web3Component } from "../../components/Web3Component";
import { AddBillerContainer } from "../add-biller/AddBiller";
import { BillCreationContainer } from "../bill-creation/BillCreation";

interface IState {
  bills: IBill[];
  walletAddress: string;
}
export class PendingBillsContainer extends Web3Component<any, IState> {
  public state: IState = {
    bills: [],
    walletAddress: ""
  };
  public async componentDidMount() {
    const walletAddress = await this.getMyBillableWalletAddress();
    const wallet = await this.getMyWallet();
    this.setState({ walletAddress });
    const bills = [];
    for await (const bill of this.web3Iterable(wallet.methods.bills, null)) {
      const pendingBill: IBill = {
        amount: bill[0],
        biller: bill[1],
        createdAt: bill[2],
        paid: bill[3]
      };
      bills.push(pendingBill);
      this.setState({ bills });
    }
  }
  public render() {
    return (
      <div>
        <PendingBills bills={this.state.bills} />
        <AddBillerContainer walletAddress={this.state.walletAddress} />
        <BillCreationContainer walletAddress={this.state.walletAddress} />
      </div>
    );
  }
}
