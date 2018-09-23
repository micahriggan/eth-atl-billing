import * as React from "react";
import { Table } from "semantic-ui-react";
import { Header } from "./Header";
import { Row } from "./Row";

export interface ITableData {
  [rowKey: string]: Array<number | string>;
}

export interface IProps {
  headerLabels: string[];
  actionHeaderLabel?: string;
  actionRow?: boolean;
  actionButtonLabel?: string;
  actionButtonHandler?: (rowData: Array<number | string>, obj: any) => void;
  actionButtonIcon?: string;
  actionButtonColor?: string;
  tableData: ITableData;
}

export class BaseTable extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const components = [];

    components.push(<Header {...this.headerProps()} />);

    for (const dataKey of Object.keys(this.props.tableData)) {
      const data = this.props.tableData[dataKey];
      const wrappedHandler = (args: Array<number | string>) =>
        this.props.actionButtonHandler && this.props.actionButtonHandler(args, dataKey);
      const rowProps = {
        rowData: data,
        actionButtonLabel: this.props.actionButtonLabel,
        actionButtonHandler: wrappedHandler,
        actionRow: this.props.actionRow || false,
        actionButtonColor: this.props.actionButtonColor,
        actionButtonIcon: this.props.actionButtonIcon
      };
      components.push(<Row {...rowProps} />);
    }

    return <Table celled={true}>{components}</Table>;
  }

  private headerProps() {
    const headerProps = {
      actionLabel: "",
      actionRow: this.props.actionRow || false,
      labels: this.props.headerLabels
    };
    if (this.props.actionHeaderLabel) {
      headerProps.actionLabel = this.props.actionHeaderLabel;
    }
    return headerProps;
  }
}
