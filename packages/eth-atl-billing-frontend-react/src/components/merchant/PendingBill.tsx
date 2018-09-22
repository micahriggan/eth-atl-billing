import * as React from "react";

import { Web3Component } from "../Web3Component";
import { Layout } from "./MerchantLayout";

export class MerchantFutureBills extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h1>Pending Bills</h1>
        <h3>Table of pending bills</h3>
      </Layout>
    );
  }
}
