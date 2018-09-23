import * as React from "react";

import { Menu, Segment } from "semantic-ui-react";
import { BaseTable, ITableData } from "../BaseTable/BaseTable";
import { Layout } from "../Layout";

export interface IProps {
  authorizedBillData: ITableData;
  pastBillData: ITableData;
}

interface IState {
  activeItem: string;
}

export class MerchantDashboard extends React.Component<IProps> {
  public state: IState = { activeItem: "authorizations" };
  public constructor(props: IProps) {
    super(props);
  }

  public handleItemClick = (e: any, value: { name: string }) => this.setState({ activeItem: value.name });

  public render() {
    const { activeItem } = this.state;

    return (
      <Layout>
        <Menu attached="top" tabular={true}>
          <Menu.Item name="authorizations" active={activeItem === "authorizations"} onClick={this.handleItemClick} />
          <Menu.Item name="past" active={activeItem === "past"} onClick={this.handleItemClick} />
        </Menu>

        <Segment attached="bottom">{this.privateTableSwitcherComponent()}</Segment>
      </Layout>
    );
  }

  public privateTableSwitcherComponent() {
    if (this.state.activeItem === "authorizations") {
      return this.authorizationTableComponent();
    }
    if (this.state.activeItem === "past") {
      return this.pastTableComponent();
    }
    return;
  }

  private authorizationTableComponent() {
    if (this.state.activeItem !== "authorizations") {
      return;
    }
    const tableProps = {
      headerLabels: ["Customer", "Amount", "Frequency"],
      actionHeaderLabel: "Actions",
      actionRow: true,
      actionButtonLabel: "Bill",
      actionButtonIcon: "money",
      actionButtonColor: "green",
      tableData: this.props.authorizedBillData
    };
    return <BaseTable {...tableProps} />;
  }

  private pastTableComponent() {
    if (this.state.activeItem !== "past") {
      return;
    }
    const tableProps = {
      headerLabels: ["Date", "Customer", "Amount"],
      actionRow: false,
      tableData: this.props.pastBillData
    };
    return <BaseTable {...tableProps} />;
  }
}
