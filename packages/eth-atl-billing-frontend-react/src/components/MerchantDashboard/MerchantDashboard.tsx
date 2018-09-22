import * as React from "react";

import { Layout } from "../Layout";
import { Web3Component } from "../Web3Component";

export class MerchantDashboard extends Web3Component {
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
