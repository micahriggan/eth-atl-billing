import * as React from "react";
import { Web3Component } from "../Web3Component";
import { Layout } from "./MerchantLayout";

export class RedeemBillToken extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h2>Enter Token</h2>
        <input type="text" name="billToken" />
        <h2>Bill Details</h2>
        <h4>Wallet: </h4>
        <h4>Amount: </h4>
      </Layout>
    );
  }
}
