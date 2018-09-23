import * as React from "react";
import { IBill } from "../../components/PendingBills/PendingBills";
import { Web3Component } from "../../components/Web3Component";
import { CustomerPaidBills } from "../../components/CustomerPaidBills/CustomerPaidBills";

interface IState {
  bills: IBill[];
  walletAddress: string;
}
export class PaidBillContainer extends Web3Component<any, IState> {
  public state: IState = {
    bills: [],
    walletAddress: ""
  };
  constructor(props: any) {
    super(props);
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

  public render() {
    return (
      <div>
        <CustomerPaidBills bills={this.state.bills} />
      </div>
    );
  }
}
