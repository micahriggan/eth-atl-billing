import * as React from "react";

import { MenuBar } from "./MenuBar";

export class Overview extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <MenuBar />
        <h3>Wallet</h3>
        <h4>Amount: </h4>
        <h4>Value: </h4>
      </div>
    );
  }
}
