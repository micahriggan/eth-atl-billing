import * as React from "react";

import { Web3Component } from "../Web3Component";
import { Layout } from "./MerchantLayout";

export class MerchantPastBills extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h1>Past Bills</h1>
        <h3>Table of past bills</h3>
      </Layout>
    );
  }
}
