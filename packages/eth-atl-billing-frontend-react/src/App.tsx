import { createBrowserHistory } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";

import "./App.css";
import { CustomerDashboard } from "./components/CustomerDashboard/CustomerDashboard";
import { MainPage } from "./components/MainPage/MainPage";
import { MerchantDashboard } from "./components/MerchantDashboard/MerchantDashboard";

const customHistory = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact={true} path="/" component={MainPage} />
          <Route exact={true} path="/merchant" component={MerchantDashboard} />
          <Route exact={true} path="/customer" component={CustomerDashboard} />
        </Switch>
      </Router>
    );
  }
}

export default App;
