import * as React from "react";

import { MenuBar } from "./MenuBar";

export class MerchantFutureBills extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <MenuBar />
        <h1>Pending Bills</h1>
        <h3>Table of pending bills</h3>
      </div>
    );
  }
}
