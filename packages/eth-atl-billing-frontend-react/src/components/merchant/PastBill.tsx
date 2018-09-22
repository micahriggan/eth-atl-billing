import * as React from "react";

import { BillTable } from "../BillTable/BillTable";
import { Web3Component } from "../Web3Component";
import { Layout } from "./MerchantLayout";

export class MerchantPastBills extends Web3Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    const billData = [
      { billEntity: "test", amount: 1, frequency: "monthly" },
      { billEntity: "test1", amount: 3, frequency: "monthly" },
      { billEntity: "test2", amount: 4, frequency: "monthly" }
    ];
    return (
      <Layout>
        <h1>Past Bills</h1>
        <BillTable billData={billData} />
      </Layout>
    );
  }
}
