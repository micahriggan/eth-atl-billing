import * as React from "react";
import { Web3Component } from "../Web3Component";
import { Layout } from "./CustomerLayout";

export class Deposit extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <h3>Deposit</h3>
      </Layout>
    );
  }
}
