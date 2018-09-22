import * as React from "react";

import { MenuBar } from "./MenuBar";

export class MerchantPastBills extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <MenuBar />
        <h1>Past Bills</h1>
        <h3>Table of past bills</h3>
      </div>
    );
  }
}
