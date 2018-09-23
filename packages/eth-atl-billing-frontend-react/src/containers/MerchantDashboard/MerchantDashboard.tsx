import * as React from "react";
import { Web3Component } from "../../components/Web3Component";

import { ITableData } from "../../components/BaseTable/BaseTable";
import { MerchantDashboard } from "../../components/MerchantDashboard/MerchantDashboard";
import { TOKENS } from "../../constants/Eth";

interface IState {
  authorizations: ITableData;
  past: ITableData;
}
export class MerchantDashboardContainer extends Web3Component<any, IState> {
  public state: IState = {
    authorizations: {},
    past: {}
  };
  // TODO: fix any
  public constructor(props: any) {
    super(props);
    this.submitBill = this.submitBill.bind(this);
  }

  public async componentDidMount() {
    this.getAuthorizations();
    this.getPastBills();
  }

  public async getPastBills() {
    const accounts = await this.getAccounts();
    const filter = { biller: accounts[0] };
    this.getWssWalletFactory().getPastEvents("Bill", { fromBlock: 0, filter }, async (err, events) => {
      for (const event of events) {
        const prevPast = this.state.past;
        const wallet = event.returnValues.wallet;
        const billableWallet = this.getBillableWallet(wallet);
        const bill = await billableWallet.methods.bills(event.returnValues.billIndex).call();
        const amount = bill[0];
        const createdAt = Number(bill[2]) * 1000;
        const paid = bill[3] ? "Paid" : "Unpaid";
        const past = Object.assign({}, prevPast, {
          [event.transactionHash]: [new Date(createdAt).toString(), wallet, amount, paid]
        });
        this.setState({ past });
      }
    });
  }
  public async getAuthorizations() {
    const accounts = await this.getAccounts();
    const filter = { biller: accounts[0], authorized: true };
    this.getWssWalletFactory().getPastEvents("BillerState", { fromBlock: 0, filter }, (err, events) => {
      console.log(events);
      for (const event of events) {
        const prevAuthorizations = this.state.authorizations;
        const wallet = event.returnValues.wallet;
        const authorizations = Object.assign({}, prevAuthorizations, {
          [event.transactionHash]: ["", wallet, event.returnValues.amount, "monthly"]
        });
        this.setState({ authorizations });
      }
    });
  }

  // TODO: fix any
  public async submitBill(cbData: any) {
    const { billAmount, data } = cbData;
    const billAddress = data[1];
    const wallet = await this.getBillableWallet(billAddress);
    const accounts = await this.getAccounts();
    wallet.methods.bill(billAmount, TOKENS.ETH).send({ from: accounts[0] });
  }

  public render() {
    return (
      <div>
        <MerchantDashboard
          submitBill={this.submitBill}
          authorizedBillData={this.state.authorizations}
          pastBillData={this.state.past}
        />
      </div>
    );
  }
}
