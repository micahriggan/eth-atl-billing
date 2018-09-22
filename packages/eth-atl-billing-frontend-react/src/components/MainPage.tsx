import * as React from "react";
import { Link } from "react-router-dom";

import { Card, Container, Grid, Image } from "semantic-ui-react";
import { Web3Component } from "./Web3Component";

export class MainPage extends Web3Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Grid columns={2}>
        <Grid.Column width={8}>
          <Container textAlign="center">
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
          </Container>
        </Grid.Column>

        <Grid.Column width={8}>
          <Container textAlign="center">
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
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}
