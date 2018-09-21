import { createBrowserHistory } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { CreateMerchantWallet } from './components/CreateMerchantWallet';
import { MainPage } from './components/MainPage';
import { MerchantPastBills } from "./components/MerchantPastBills";
import { MerchantFutureBills } from './components/MerchantPendingBills';

import "./App.css";

const customHistory = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact={true} path='/' component={MainPage}/>
          <Route exact={true} path='/merchant/create' component={CreateMerchantWallet}/>
          <Route exact={true} path='/merchant/pending' component={MerchantFutureBills}/>
          <Route exact={true} path='/merchant/past' component={MerchantPastBills}/>
        </Switch>
      </Router>
    );
  }
}

export default App;

