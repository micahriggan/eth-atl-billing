import * as React from "react";
import { Web3Component } from "../Web3Component";

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
    const billComponents = this.props.bills.map(PendingBills.getBillComponent);
    return <div>{billComponents}</div>;
  }
}
