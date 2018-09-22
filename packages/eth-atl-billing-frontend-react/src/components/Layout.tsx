import * as React from "react";
import { Container } from 'semantic-ui-react'
import { Web3Component } from "./Web3Component";

export class Layout extends Web3Component {
  public render() {
    return <Container>{this.props.children}</Container>;
  }
}
