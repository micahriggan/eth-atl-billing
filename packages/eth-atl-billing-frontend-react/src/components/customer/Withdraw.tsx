import * as React from "react";

import { Web3Component } from "../Web3Component";
import { Layout } from "./CustomerLayout";

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
