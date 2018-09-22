import * as React from "react";

import { Layout } from "../merchant/MerchantLayout";
import { Web3Component } from "../Web3Component";

export class Withdraw extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h3>Withdraw</h3>
      </Layout>
    );
  }
}
