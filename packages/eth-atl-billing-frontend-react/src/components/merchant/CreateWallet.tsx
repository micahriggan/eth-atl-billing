import * as React from "react";

import { Layout } from "./MerchantLayout";

export class CreateWallet extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Layout>
        <button>Create Merchant Wallet</button>
      </Layout>
    );
  }
}
