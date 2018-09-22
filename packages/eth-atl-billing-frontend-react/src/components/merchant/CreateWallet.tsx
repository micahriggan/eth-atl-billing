import * as React from "react";

import { MenuBar } from "./MenuBar";

export class CreateWallet extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <MenuBar />
        <button>Create Merchant Wallet</button>
      </div>
    );
  }
}
