import * as React from "react";
import { Button, Table } from "semantic-ui-react";
import { Web3Component } from "../../components/Web3Component";
import { TOKENS } from "../../constants/Eth";
import { Recurrence } from "../../components/Recurrence/Recurrence";

interface IProps {
  walletAddress: string;
}
interface IState {
  biller: string;
  authorizedAmount: string;
  authorizedFrequency: string;
}
export class AddBillerContainer extends Web3Component<IProps, IState> {
  public state: IState = {
    authorizedAmount: "0",
    authorizedFrequency: (1000 * 60 * 60 * 24 * 30).toString(),
    biller: ""
  };
  constructor(props: IProps) {
    super(props);
    this.authorizeBiller = this.authorizeBiller.bind(this);
    this.handleBillerAddressChange = this.handleBillerAddressChange.bind(this);
    this.handleAuthorizedAmountChange = this.handleAuthorizedAmountChange.bind(this);
    this.handleAuthorizedFrequencyChange = this.handleAuthorizedFrequencyChange.bind(this);
  }

  public handleBillerAddressChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ biller: event.target.value });
  }

  public handleAuthorizedAmountChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ authorizedAmount: event.target.value });
  }

  public handleAuthorizedFrequencyChange(data: string) {
    console.log(data);
    this.setState({ authorizedFrequency: data });
  }

  public async authorizeBiller() {
    const wallet = await this.getBillableWallet(this.props.walletAddress);
    const accounts = await this.getAccounts();
    await wallet.methods
      .authorize(this.state.biller, this.state.authorizedAmount, this.state.authorizedFrequency, TOKENS.ETH)
      .send({ from: accounts[0] });
  }
  public render() {
    return (
      <Table color={"blue"}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Biller Address</Table.HeaderCell>
            <Table.HeaderCell>Bill Amount</Table.HeaderCell>
            <Table.HeaderCell>Timed Offset</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <input onChange={this.handleBillerAddressChange} value={this.state.biller} />
            </Table.Cell>
            <Table.Cell>
              <input onChange={this.handleAuthorizedAmountChange} value={this.state.authorizedAmount} />
            </Table.Cell>
            <Table.Cell>
              <Recurrence onChange={this.handleAuthorizedFrequencyChange} />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell />
            <Table.Cell>
              <Button primary={true} onClick={this.authorizeBiller}>
                Authorize
              </Button>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  }
}
