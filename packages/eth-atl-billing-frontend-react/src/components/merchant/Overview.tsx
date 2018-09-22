import * as React from "react";

import { Web3Component } from "../Web3Component";
import { Layout } from "./MerchantLayout";

export class Overview extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h3>Wallet</h3>
        <h4>Amount: </h4>
        <h4>Value: </h4>
      </Layout>
    );
  }
}
