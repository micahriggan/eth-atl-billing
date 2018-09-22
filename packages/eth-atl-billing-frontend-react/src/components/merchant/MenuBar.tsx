import * as React from "react";
import { Link } from "react-router-dom";

import { Icon, Menu } from "semantic-ui-react";
import { Web3Component } from "../Web3Component";

export class MenuBar extends Web3Component {
  public state: { activeItem?: string } = {};
  public constructor(props: any) {
    super(props);
  }

  public handleItemClick = (e: object, value: { name: string }) => this.setState({ activeItem: value.name });
  public render() {
    const { activeItem } = this.state;
    return (
      <Menu attached="top" compact={true} icon="labeled">
        <Link to="/">
          <Menu.Item header={true}>
            <h1>BillPay</h1>
          </Menu.Item>
        </Link>
        <Menu.Menu position="right">
          <Link to="/merchant">
            <Menu.Item name="gamepad" active={activeItem === "gamepad"} onClick={this.handleItemClick}>
              <Icon name="list" />
              Overview
            </Menu.Item>
          </Link>

          <Link to="/merchant/pending">
            <Menu.Item name="video camera" active={activeItem === "video camera"} onClick={this.handleItemClick}>
              <Icon name="inbox" />
              Pending Bills
            </Menu.Item>
          </Link>

          <Link to="/merchant/past">
            <Menu.Item name="video play" active={activeItem === "video play"} onClick={this.handleItemClick}>
              <Icon name="history" />
              Past Bill
            </Menu.Item>
          </Link>

          <Link to="/merchant/redeemToken">
            <Menu.Item name="video play" active={activeItem === "video play"} onClick={this.handleItemClick}>
              <Icon name="money bill alternate outline" />
              Redeem Bill Token
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}
