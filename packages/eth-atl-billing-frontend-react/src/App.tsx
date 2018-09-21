import { createBrowserHistory } from "history";
import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { MainPage } from "./containers/main";

import "./App.css";
const customHistory = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <Router history={customHistory}>
        <Switch>
          <Route exact={true} path="/" component={MainPage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
