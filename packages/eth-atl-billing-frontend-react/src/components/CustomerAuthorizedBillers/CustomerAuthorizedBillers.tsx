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
}
export class CustomerAuthorizedBillers extends Web3Component<IProps> {
  public render() {
    return <div>{this.paidBillComponent()}</div>;
  }

  private paidBillComponent() {
    if (!this.props.bills) {
      return <div />;
    }

    const paidBills = this.props.bills.filter(bill => {
      return bill.paid === true;
    });

    if (paidBills.length === 0) {
      return <h3>There are no paid bills</h3>;
    }

    const billTableData = {};

    for (const bill of paidBills) {
      billTableData[bill.index] = [bill.createdAt, bill.paid ? "Paid" : "Unpaid", bill.biller, bill.amount];
    }

    const tableProps = {
      headerLabels: ["Date", "Status", "Biller", "Amount"],
      actionRow: false,
      tableData: billTableData
    };

    return <BaseTable {...tableProps} />;
  }
}
