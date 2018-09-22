import * as React from "react";
import { Web3Component } from "../../components/Web3Component";

interface IProps {
  walletAddress: string;
}
interface IState {
  billAmount: string;
}
export class BillCreationContainer extends Web3Component<IProps, IState> {
  public state: IState = {
    billAmount: "0"
  };

  constructor(props: IProps) {
    super(props);
    this.handleBillAmountChange = this.handleBillAmountChange.bind(this);
    this.createBill = this.createBill.bind(this);
  }

  public handleBillAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ billAmount: event.target.value });
  }

  public async createBill() {
    const wallet = await this.getBillableWallet(this.props.walletAddress);
    const accounts = await this.getAccounts();
    wallet.methods.bill(this.state.billAmount).send({ from: accounts[0] });
  }
  public render() {
    return (
      <div>
        <input onChange={this.handleBillAmountChange} value={this.state.billAmount} placeholder="Bill Amount" />
        <button onClick={this.createBill}>Create Bill</button>
      </div>
    );
  }
}
