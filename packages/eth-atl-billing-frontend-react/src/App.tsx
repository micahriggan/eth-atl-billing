import { createBrowserHistory } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./App.css";
import { CreateWallet as CreateCustomerWallet } from "./components/customer/CreateWallet";
import { Deposit } from "./components/customer/Deposit";
import { GenerateBillToken } from "./components/customer/GenerateBillToken";
import { Overview as CustomerOverview } from "./components/customer/Overview";
import { Withdraw } from "./components/customer/Withdraw";
import { MainPage } from "./components/MainPage";
import { CreateWallet as CreateMerchantWallet } from "./components/merchant/CreateWallet";
import { Overview as MerchantOverview } from "./components/merchant/Overview";
import { MerchantPastBills } from "./components/merchant/PastBill";
import { MerchantFutureBills } from "./components/merchant/PendingBill";
import { RedeemBillToken } from "./components/merchant/RedeemBillToken";

const customHistory = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact={true} path="/" component={MainPage} />
          <Route exact={true} path="/merchant" component={MerchantOverview} />
          <Route exact={true} path="/merchant/create" component={CreateMerchantWallet} />
          <Route exact={true} path="/merchant/pending" component={MerchantFutureBills} />
          <Route exact={true} path="/merchant/past" component={MerchantPastBills} />
          <Route exact={true} path="/merchant/redeemToken" component={RedeemBillToken} />
          <Route exact={true} path="/customer" component={CustomerOverview} />
          <Route exact={true} path="/customer/create" component={CreateCustomerWallet} />
          <Route exact={true} path="/customer/deposit" component={Deposit} />
          <Route exact={true} path="/customer/withdraw" component={Withdraw} />
          <Route exact={true} path="/customer/generateToken" component={GenerateBillToken} />
        </Switch>
      </Router>
    );
  }
}

export default App;
