import { Grid, Header, Menu, Segment } from "semantic-ui-react";
import { TOKENS } from "../../constants/Eth";
import { CreateWalletButton } from "../../containers/CreateWalletButton";
import { PendingBillsContainer } from "../../containers/pending-bills/PendingBills";
import { Layout } from "../Layout";
import { Redirect } from "react-router";
import * as React from "react";
import { Web3Component } from "../Web3Component";

interface IState {
  walletAddress: string;
  balance: string;
  loading: boolean;
  section: string;
}

export class CustomerDashboard extends Web3Component<any, IState> {
  public state: IState = {
    balance: "0",
    loading: true,
    section: "",
    walletAddress: ""
  };

  public constructor(props: any) {
    super(props);
    this.setSection = this.setSection.bind(this);
    this.initState = this.initState.bind(this);
    this.handleWalletCreation = this.handleWalletCreation.bind(this);
  }

  public async componentDidMount() {
    this.initState();
  }

  public async initState() {
    const walletAddress = await this.getMyBillableWalletAddress();
    this.setState({ walletAddress, loading: true });
    if (walletAddress !== TOKENS.ETH) {
      const balance = await this.getWeb3().eth.getBalance(walletAddress);
      this.setState({ balance: balance.toString(), loading: false });
    } else {
      this.setState({ loading: false, section: "NO_WALLET" });
    }
  }

  public getListSection(section: string) {
    switch (section) {
      case "BILLS":
        return this.getBillsSection();
        break;
      case "PAID":
        return this.getBillsSection();
        break;
      case "REQUESTS":
        return this.getBillsSection();
        break;
      case "NO_WALLET":
        return this.getCreateWalletSection();
        break;
      case "DEPOSIT":
        return this.getDepositRedirect();
        break;
      case "WITHDRAW":
        return this.getWithdrawRedirect();
        break;
      default:
        return this.getBillsSection();
        break;
    }
  }

  public getDepositRedirect() {
    return <Redirect to="/deposit" />;
  }
  public getWithdrawRedirect() {
    return <Redirect to="/withdraw" />;
  }

  public getBillsSection() {
    return <PendingBillsContainer />;
  }

  public async handleWalletCreation(tx: Promise<any>) {
    this.setState({ loading: true });
    await tx;
    setTimeout(() => {
      this.initState();
    }, 1000);
  }
  public getCreateWalletSection() {
    return <CreateWalletButton onClick={this.handleWalletCreation} />;
  }

  public setSection(section: string) {
    this.setState({ section });
  }

  public render() {
    const listSection = this.getListSection(this.state.section);
    const setSection = (section: string) => () => this.setSection(section);
    return (
      <Layout>
        <Segment loading={this.state.loading}>
          <Segment>
            <Grid centered={true} columns={4}>
              <Grid.Row>
                  <Header className="dashboard-header-label">Wallet Address:&nbsp;</Header>
                <Header className="wallet-address-dashboard no-margin-top">&nbsp;{this.state.walletAddress}</Header>
              </Grid.Row>

              <Grid.Column>
                <Header id="balanceHeader" size="huge" className="container-header-text">Current Balance </Header>
              </Grid.Column>
                <Grid.Row>
                    <Header id="balanceNum">{this.state.balance}</Header>&nbsp;ETH
                </Grid.Row>
                <Grid.Row centered={true} columns={8}>
                <Grid.Column>
                  <button className="ui button" role="button" onClick={setSection("DEPOSIT")}>
                    DEPOSIT
                  </button>
                </Grid.Column>
                <Grid.Column>
                  <button id="withdraw" className="ui button" role="button" onClick={setSection("WITHDRAW")}>
                    WITHDRAW
                  </button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment>

          <Menu pointing={true} secondary={true}>
            <Menu.Item name="BILLS" active={this.state.section === "BILLS"} onClick={setSection("BILLS")} />
            <Menu.Item name="PAID" active={this.state.section === "PAID"} onClick={setSection("PAID")} />
            <Menu.Item name="REQUESTS" active={this.state.section === "REQUESTS"} onClick={setSection("REQUESTS")} />
          </Menu>

          <Segment>{listSection}</Segment>
        </Segment>
      </Layout>
    );
  }
}
