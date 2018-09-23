import * as React from "react";
import { Header } from 'semantic-ui-react'
import { IBill, PendingBills } from "../../components/PendingBills/PendingBills";
import { Web3Component } from "../../components/Web3Component";
import { AddBillerContainer } from "../add-biller/AddBiller";
import { BillCreationContainer } from "../bill-creation/BillCreation";

interface IState {
  bills: IBill[];
  walletAddress: string;
}
export class PendingBillContainer extends Web3Component<any, IState> {
  public state: IState = {
    bills: [],
    walletAddress: ""
  };
  constructor(props: any) {
    super(props);
    this.approveBillHander = this.approveBillHander.bind(this);
  }
  public async componentDidMount() {
    const walletAddress = await this.getMyBillableWalletAddress();
    const wallet = await this.getMyWallet();
    this.setState({ walletAddress });
    const bills = [];
    let index = 0;
    for await (const bill of this.web3Iterable(wallet.methods.bills, null)) {
      const pendingBill: IBill = {
        index,
        amount: bill[0],
        biller: bill[1],
        createdAt: bill[2],
        paid: bill[3]
      };
      bills.push(pendingBill);
      index++;
      this.setState({ bills });
    }
  }

  public approveBillHander(data: any) {
    const index = 0;
    this.approveBill(index);
  }

  public async approveBill(billIndex: number) {
    const wallet = await this.getMyWallet();
    const accounts = await this.getAccounts();
    wallet.methods.approve(billIndex).send({ from: accounts[0] });
  }
  public render() {
    return (
      <Header as={'h3'} block={true}>
        <PendingBills bills={this.state.bills} approveBill={this.approveBillHander} />
        <AddBillerContainer walletAddress={this.state.walletAddress} />
        <BillCreationContainer walletAddress={this.state.walletAddress} />
      </Header>
    )
  };
}
