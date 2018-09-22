import * as React from "react";
import { Link } from "react-router-dom";

import { Icon, Menu } from "semantic-ui-react";

export class MenuBar extends React.Component {
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
          <Link to="/customer">
            <Menu.Item name="gamepad" active={activeItem === "gamepad"} onClick={this.handleItemClick}>
              <Icon name="list" />
              Overview
            </Menu.Item>
          </Link>

          <Link to="/customer/deposit">
            <Menu.Item name="video camera" active={activeItem === "video camera"} onClick={this.handleItemClick}>
              <Icon name="arrow circle down" />
              Deposit
            </Menu.Item>
          </Link>

          <Link to="/customer/withdraw">
            <Menu.Item name="video play" active={activeItem === "video play"} onClick={this.handleItemClick}>
              <Icon name="arrow circle up" />
              Withdraw
            </Menu.Item>
          </Link>

          <Link to="/customer/generateToken">
            <Menu.Item name="video play" active={activeItem === "video play"} onClick={this.handleItemClick}>
              <Icon name="money bill alternate outline" />
              Generate Token
            </Menu.Item>
          </Link>
        </Menu.Menu>
      </Menu>
    );
  }
}
