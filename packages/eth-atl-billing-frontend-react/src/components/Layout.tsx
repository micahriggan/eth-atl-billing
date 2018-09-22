import * as React from "react";
import { Container } from "semantic-ui-react";
import { MenuBar } from "./MenuBar/MenuBar";

export class Layout extends React.Component {
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <div>
        <MenuBar />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}
