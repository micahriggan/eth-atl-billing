import * as React from "react";
import {Card, Container, Grid} from "semantic-ui-react";
import { Web3Component } from "../Web3Component";
import {Link} from "react-router-dom";

export class MainPage extends Web3Component {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <Grid columns={2} className="centered-main-container">
          <div className="centered-container">
              <div className="main-title">BillPay</div>
        <Grid.Column width={8} id="merchantFlowDiv">
          <Container textAlign="center">
            <Card>
              <Card.Content>
                  <i className="user circle icon large-user-type" />
                <Card.Header>Customer</Card.Header>
                <Card.Description>I want to manage my bills.</Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                  <Link to="/customer">
                  <div className="ui animated basic blue button">
                      <div className="visible content">Pay Bills</div>
                      <div className="hidden content">
                          <i className="right arrow icon" />
                      </div>
                  </div>
                  </Link>
              </Card.Content>
            </Card>
          </Container>
        </Grid.Column>

        <Grid.Column width={8} id="customerFlowDiv">
          <Container textAlign="center">
            <Card>
              <Card.Content>
                  <i className="street view icon large-user-type" />
                <Card.Header>Merchant</Card.Header>
                <Card.Description>I want to bill and accept payments.</Card.Description>
              </Card.Content>
              <Card.Content extra={true}>
                  <Link to="/merchant">
                  <div className="ui animated basic blue button">
                      <div className="visible content">Manage Clients</div>
                      <div className="hidden content">
                          <i className="right arrow icon" />
                      </div>
                  </div>
                  </Link>
              </Card.Content>
            </Card>
          </Container>
        </Grid.Column>
          </div>
      </Grid>
    );
  }
}
