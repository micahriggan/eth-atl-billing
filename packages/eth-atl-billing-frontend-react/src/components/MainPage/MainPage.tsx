import * as React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Grid } from "semantic-ui-react";
import { Web3Component } from "../Web3Component";

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
              <Card.Content>
                  <i className="user circle icon large-user-type" />
                <Card.Header>Customer</Card.Header>
                <Card.Description>I want to manage my bills.</Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                  <Link to= "/customer">Manage Clients</Link>
              </Card.Content>
            </Card>
          </Container>
        </Grid.Column>

        <Grid.Column width={8}>
          <Container textAlign="center">
            <Card>
              <Card.Content>
                  <i className="street view icon large-user-type" />
                <Card.Header>Merchant</Card.Header>
                <Card.Description>I want to bill customers and accept payments.</Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                <Link to="/merchant">Pay Bills</Link>
              </Card.Content>
            </Card>
          </Container>
        </Grid.Column>
      </Grid>
    );
  }
}
