import * as React from "react";
import { Table } from "semantic-ui-react";
import { Web3Component } from "../Web3Component";

export interface IBillRow {
  billEntity: string;
  amount: number;
  frequency: string;
}

export class BillRow extends Web3Component<IBillRow> {
  constructor(props: IBillRow) {
    super(props);
  }
  public render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.billEntity}</Table.Cell>
        <Table.Cell>{this.props.amount}</Table.Cell>
        <Table.Cell>{this.props.frequency}</Table.Cell>
      </Table.Row>
    );
  }
}
