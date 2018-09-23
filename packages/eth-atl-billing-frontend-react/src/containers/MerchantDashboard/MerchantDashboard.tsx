import * as React from "react";
import { Web3Component } from "../../components/Web3Component";

import { ITableData } from "../../components/BaseTable/BaseTable";
import { MerchantDashboard } from "../../components/MerchantDashboard/MerchantDashboard";

interface IState {
  authorizations: ITableData;
  past: ITableData;
}
export class MerchantDashboardContainer extends Web3Component<any, IState> {
  // TODO: fix any
  public state: IState = {
    authorizations: {
        contract1: ['Micah', '$10.00', 'monthly']
    },
    past: {
        contract1: ["August 1st, 2018 at 12pm", "Micah", "$9.95" ],
        contract2: ["July 1st, 2018 at 12pm", "Micah", "$9.95" ]
    }
  };
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <MerchantDashboard authorizedBillData={this.state.authorizations} pastBillData={this.state.past} />
      </div>
    );
  }
}
