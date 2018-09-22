import * as React from "react";
import { Table } from "semantic-ui-react";
import { Web3Component } from "../Web3Component";
import { BillRow, IBillRow } from "./BillRow";

interface IProps {
  billData?: IBillRow[];
}

export class BillTable extends Web3Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public billRows() {
    const { billData } = this.props;
    if (!billData) {
      return;
    }
    const rows = [];
    for (let i = 0; i < billData.length; i = i + 1) {
      rows.push(<BillRow key={i} {...billData[i]} />);
    }
    return rows;
  }
  public render() {
    return (
      <Table celled={true}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Biller</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Frequency</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.billRows()}</Table.Body>
      </Table>
    );
  }
}
