import * as React from "react";

import { Menu, Segment } from "semantic-ui-react";
import { BaseTable, ITableData } from "../BaseTable/BaseTable";
import { BillCustomerModal } from "../BillCustomerModal/BillCustomerModal";
import { Layout } from "../Layout";
import { Web3Component } from "../Web3Component";

export interface IProps {
  authorizedBillData: ITableData;
  pastBillData: ITableData;
  submitBill: (billData: { billAmount: number; data: any }) => void;
}

interface IState {
  activeItem: string;
  openModal: boolean;
  activeModelData?: Array<string | number>;
}

export class MerchantDashboard extends Web3Component<IProps> {
  public state: IState = { activeItem: "authorizations", openModal: false };
  public constructor(props: IProps) {
    super(props);
    this.onSubmitBill = this.onSubmitBill.bind(this);
  }

  public showModal = (rowData: Array<string | number>) => this.setState({ openModal: true, activeModelData: rowData });
  public hideModel = () => this.setState({ openModal: false, activeModelData: null });

  public handleItemClick = (e: any, value: { name: string }) => this.setState({ activeItem: value.name });

  public render() {
    const { activeItem } = this.state;

    return (
      <Layout>
        <BillCustomerModal
          // submitBill={this.props.submitBill}
          submitBill={this.onSubmitBill}
          close={this.hideModel}
          open={this.state.openModal}
          data={this.state.activeModelData}
        />
        <Menu attached="top" tabular={true}>
          <Menu.Item name="authorizations" active={activeItem === "authorizations"} onClick={this.handleItemClick} />
          <Menu.Item name="past" active={activeItem === "past"} onClick={this.handleItemClick} />
        </Menu>

        <Segment attached="bottom">{this.privateTableSwitcherComponent()}</Segment>
      </Layout>
    );
  }

  public onSubmitBill(data: any) {
    this.setState({ openModal: false });
    this.props.submitBill(data);
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
    if (Object.keys(this.props.authorizedBillData).length === 0) {
      return <h2>You aren't authorized to bill any customers</h2>;
    }
    const tableProps = {
      headerLabels: ["Customer", "Address", "Amount", "Frequency"],
      actionHeaderLabel: "Actions",
      actionRow: true,
      actionButtonLabel: "Bill",
      actionButtonIcon: "money",
      actionButtonColor: "green",
      actionButtonHandler: this.showModal,
      tableData: this.props.authorizedBillData
    };
    return <BaseTable {...tableProps} />;
  }

  private pastTableComponent() {
    if (this.state.activeItem !== "past") {
      return;
    }
    if (Object.keys(this.props.pastBillData).length === 0) {
      return <h2>You don't have any past bills</h2>;
    }
    const tableProps = {
      headerLabels: ["Date", "Customer", "Amount", "Paid"],
      actionRow: false,
      tableData: this.props.pastBillData
    };
    return <BaseTable {...tableProps} />;
  }
}
