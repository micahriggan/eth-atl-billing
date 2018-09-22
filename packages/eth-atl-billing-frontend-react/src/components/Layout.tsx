import * as React from "react";
import { Container } from "semantic-ui-react";

export class Layout extends React.Component{
  constructor(props: any) {
    super(props);
  }
  public render() {
    return (
      <Container>
        {this.props.children}
      </Container>
    );
  }
}
