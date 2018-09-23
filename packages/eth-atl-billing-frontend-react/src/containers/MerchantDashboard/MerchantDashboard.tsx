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
    // past: {
    //   kughiuyui: ["August 1st, 2018 at 12pm", "Micah", "$9.95"],
    //   uihiuhiu: ["July 1st, 2018 at 12pm", "Micah", "$9.95"]
    // }
  };
  // TODO: fix any
  public constructor(props: any) {
    super(props);
    this.submitBill = this.submitBill.bind(this);
  }

  public async componentDidMount() {
    this.getAuthorizations();
  }

  public async getAuthorizations() {
    const accounts = await this.getAccounts();
    const filter = { biller: accounts[0], authorized: true };
    this.getWssWalletFactory().events.BillerState({ fromBlock: 0, filter }, (err, data) => {
      const prevAuthorizations = this.state.authorizations;
      const authorizations = Object.assign({}, prevAuthorizations, {
        [data.returnValues.wallet]: ["", data.returnValues.wallet, data.returnValues.amount, "monthly"]
      });
      this.setState({ authorizations });
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
