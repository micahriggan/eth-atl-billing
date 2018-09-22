import * as React from "react";
import { Link } from "react-router-dom";

import { Card, Image } from "semantic-ui-react";

export class MainPage extends React.Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Card>
          <Image src="/images/avatar/large/matthew.png" />
          <Card.Content>
            <Card.Header>Customer</Card.Header>
            <Card.Description>Create a wallet that allows you to make recurring payments</Card.Description>
          </Card.Content>
          <Card.Content extra={true}>
            <Link to="/customer/create">I want a billable wallet</Link>
          </Card.Content>
        </Card>

        <Card>
          <Image src="/images/avatar/large/matthew.png" />
          <Card.Content>
            <Card.Header>Merchant</Card.Header>
            <Card.Description>Accept recurring ethereum payments</Card.Description>
          </Card.Content>
          <Card.Content extra={true}>
            <Link to="/merchant/create">I want to accept recurring payments</Link>
          </Card.Content>
        </Card>
      </div>
    );
  }
}
