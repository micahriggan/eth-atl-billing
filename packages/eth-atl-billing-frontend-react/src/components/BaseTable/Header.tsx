import * as React from "react";
import { Table } from "semantic-ui-react";

export interface IProps {
  labels: string[];
  actionRow?: boolean;
  actionLabel?: string;
}

export class Header extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const headerCells = [];
    if (this.props.actionRow === true) {
      headerCells.push(this.actionRowHeaderComponent());
    }
    for (const label of this.props.labels) {
      headerCells.push(<Table.HeaderCell>{label}</Table.HeaderCell>);
    }

    return (
      <Table.Header>
        <Table.Row>{headerCells}</Table.Row>
      </Table.Header>
    );
  }

  private actionRowHeaderComponent() {
    if (this.props.actionRow === false) {
      return;
    }
    return <Table.HeaderCell>{this.props.actionLabel}</Table.HeaderCell>;
  }
}
