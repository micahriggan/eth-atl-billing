import * as React from "react";
import { Web3Component } from "../../components/Web3Component";
import {
  IAuthorization,
  CustomerAuthorizedBillers
} from "../../components/CustomerAuthorizedBillers/CustomerAuthorizedBillers";

interface IState {
  authorizations: IAuthorization[];
}
export class CustomerAuthorizedBillersContainer extends Web3Component<any, IState> {
  public state: IState = {
    authorizations: []
  };
  constructor(props: any) {
    super(props);
  }
  public async componentDidMount() {
    this.getAuthorizedBillers();
  }

  public async getAuthorizedBillers() {
    const accounts = await this.getAccounts();
    const filter = { wallet: accounts[0], authorized: true };
    this.getWssWalletFactory().getPastEvents("BillerState", { fromBlock: 0, filter }, (err, events) => {
      console.log(events);
      const newAuthorizations = JSON.parse(JSON.stringify(this.state.authorizations));
      for (const event of events) {
        newAuthorizations.push({
          biller: event.returnValues.biller,
          amount: event.returnValues.amount
        });
      }
      this.setState({ authorizations: newAuthorizations });
      console.log("my state", this.state);
    });
  }

  public render() {
    return <CustomerAuthorizedBillers authorizations={this.state.authorizations} />;
  }
}
