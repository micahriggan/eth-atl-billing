import * as React from "react";
import { Web3Component } from "../Web3Component";

import { BaseTable } from "../BaseTable/BaseTable";

export interface IAuthorization {
  biller: string;
  amount: string;
}

interface IProps {
  authorizations: IAuthorization[];
}
export class CustomerAuthorizedBillers extends Web3Component<IProps> {
  public render() {
    return <div>{this.tableComponent()}</div>;
  }
  public tableComponent() {
    if (!this.props.authorizations || this.props.authorizations.length === 0) {
      return <h3> There are no authorizations </h3>;
    }
    const tableData = {};
    let i = 0;
    for (const auth of this.props.authorizations) {
      tableData[`biller${i}`] = [auth.biller, auth.amount, "Monthly"];
      i++;
    }
    const tableProps = {
      headerLabels: ["Biller", "Amount", "Frequency"],
      tableData
    };
    return <BaseTable {...tableProps} />;
  }
}
