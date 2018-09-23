import * as React from "react";
import { Web3Component } from "../Web3Component";

import { BaseTable } from "../BaseTable/BaseTable";

export interface IBill {
  amount: string;
  biller: string;
  createdAt: string;
  paid: boolean;
}

export interface IAuthorization {
  amount: number;
  waitTime: number;
}

export interface BillerProfile {
  lastBilled: number;
  lastPaid: number;
  lastAuthorized: number;
}
interface IProps {
  bills: IBill[];
}
export class PendingBills extends Web3Component<IProps> {
  public static getBillComponent(bill: IBill) {
    // resolve addresses to biller names
    const paidTag = bill.paid ? "[paid]" : "[unpaid]";
    return (
      <div>
        {" "}
        {paidTag} Biller {bill.biller} has submitted a bill for {bill.amount} at {bill.createdAt}{" "}
      </div>
    );
  }

  public render() {
    return <div>{this.baseTableComponent()}</div>;
  }

  private baseTableComponent() {
    if (!this.props.bills) {
      return <div />;
    }

    const billTableData = {};

    for (let i = 0; i < this.props.bills.length; i++) {
      const bill = this.props.bills[i];
      billTableData[`bill${i}`] = [bill.createdAt, bill.paid ? "Paid" : "Unpaid", bill.biller, bill.amount];
    }

    const tableProps = {
      headerLabels: ["Date", "Status", "Biller", "Amount"],
      actionRow: true,
      actionHeaderLabel: "Actions",
      actionButtonLabel: "Pay",
      actionButtonIcon: "money",
      actionButtonColor: "green",
      tableData: billTableData
    };

    return <BaseTable {...tableProps} />;
  }
}
