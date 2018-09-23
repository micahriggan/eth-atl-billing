import { createBrowserHistory } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./App.css";
import { CustomerDashboard } from "./components/CustomerDashboard/CustomerDashboard";
import { MainPage } from "./components/MainPage/MainPage";
import { DepositContainer } from "./containers/deposit/Deposit";
import { MerchantDashboardContainer } from "./containers/MerchantDashboard/MerchantDashboard";
import { WithdrawContainer } from "./containers/withdraw/Withdraw";

const customHistory = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact={true} path="/" component={MainPage} />
          <Route exact={true} path="/merchant" component={MerchantDashboardContainer} />
          <Route exact={true} path="/customer" component={CustomerDashboard} />
          <Route exact={true} path="/withdraw" component={WithdrawContainer} />
          <Route exact={true} path="/deposit" component={DepositContainer} />
        </Switch>
      </Router>
    );
  }
}

export default App;
