import * as React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { Web3Component } from "../Web3Component";

export class MenuBar extends Web3Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Menu attached="top" compact={true} icon="labeled">
        <Link to="/">
          <Menu.Item header={true}>
            <h1>BillPay</h1>
          </Menu.Item>
        </Link>
      </Menu>
    );
  }
}
