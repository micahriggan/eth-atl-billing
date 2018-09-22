import * as React from "react";

import { MenuBar } from "./MenuBar";

export class Deposit extends React.Component {
  public constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <MenuBar />
        <h3>Deposit</h3>
      </div>
    );
  }
}
