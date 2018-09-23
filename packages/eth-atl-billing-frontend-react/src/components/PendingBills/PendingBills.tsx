import * as React from "react";
import { Web3Component } from "../Web3Component";

import { BaseTable } from "../BaseTable/BaseTable";

export interface IBill {
  index: number;
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
  approveBill: (data: any, index: number) => void;
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
    return <div>{this.paidBillComponent()}</div>;
  }

  private paidBillComponent() {
    if (!this.props.bills) {
      return <div />;
    }

    const unpaidBills = this.props.bills.filter(bill => {
      return bill.paid === false;
    });

    if (unpaidBills.length === 0) {
      return <div />;
    }

    const billTableData = {};

    for (const bill of unpaidBills) {
      billTableData[bill.index] = [bill.createdAt, bill.paid ? "Paid" : "Unpaid", bill.biller, bill.amount];
    }

    const tableProps = {
      headerLabels: ["Date", "Status", "Biller", "Amount"],
      actionRow: true,
      actionHeaderLabel: "Actions",
      actionButtonLabel: "Pay",
      actionButtonIcon: "money",
      actionButtonColor: "green",
      tableData: billTableData,
      actionButtonHandler: this.props.approveBill
    };

    return <BaseTable {...tableProps} />;
  }
}
