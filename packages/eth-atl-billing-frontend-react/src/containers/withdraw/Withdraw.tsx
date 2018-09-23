import * as React from "react";

/*
 *import { Redirect } from "react-router";
 */
import { Segment } from "semantic-ui-react";
import { Layout } from "../../components/Layout";
import { Web3Component } from "../../components/Web3Component";
import { TOKENS } from "../../constants/Eth";

interface IState {
  to: string;
  amount: string;
  balance: string;
  loading: boolean;
  walletAddress: string;
  token: string;
}
export class WithdrawContainer extends Web3Component<any, IState> {
  public state: IState = {
    amount: "0",
    balance: "0",
    loading: true,
    to: "",
    token: TOKENS.ETH,
    walletAddress: ""
  };

  public constructor(props: any) {
    super(props);
    this.initState = this.initState.bind(this);
    this.send = this.send.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
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
      this.setState({ loading: false });
    }
  }

  public async send() {
    const accounts = await this.getAccounts();
    const wallet = await this.getMyWallet();
    wallet.methods.transfer(this.state.to, this.state.amount, this.state.token).send({ from: accounts[0] });
  }

  public handleValueChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ amount: event.target.value });
  }

  public handleToChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ to: event.target.value });
  }

  public render() {
    return (
      <Layout>
        <Segment loading={this.state.loading}>
          <Segment>
            <h3>Balance: {this.state.balance}</h3>
          </Segment>
          <input placeholder="Amount" onChange={this.handleValueChange} value={this.state.amount} />
          <input placeholder="To" onChange={this.handleToChange} value={this.state.to} />
          <button className="ui button" role="button" onClick={this.send}>
            SEND
          </button>
        </Segment>
      </Layout>
    );
  }
}
