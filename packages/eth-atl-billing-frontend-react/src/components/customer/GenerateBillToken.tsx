import * as React from "react";
import { Web3Component } from "../Web3Component";
import { Layout } from "./CustomerLayout";

export class GenerateBillToken extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h2>Bill Details</h2>
        <h4>Authorized Address: </h4>
        <input type="text" name="billToken" />
        <h4>Amount: </h4>
        <input type="text" name="billToken" />
        <button>Generate Bill Token</button>
      </Layout>
    );
  }
}
