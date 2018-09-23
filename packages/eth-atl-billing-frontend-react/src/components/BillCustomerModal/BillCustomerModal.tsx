import * as React from "react";
import { Button, Input, Label, Modal } from "semantic-ui-react";

interface IState {
  billAmount: number;
}

interface IProp {
  open: boolean;
  close: () => void;
  data?: Array<string | number>;
  submitBill: (billData: { billAmount: number; data: any }) => void;
}

export class BillCustomerModal extends React.Component<IProp, IState> {
  public state: IState = {
    billAmount: 0
  };

  constructor(props: IProp) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.close = this.props.close.bind(this);
    this.onChangeDollarInput = this.onChangeDollarInput.bind(this);
  }

  public close() {
    this.props.close();
  }
  public onSubmit(e: any) {
    return this.props.submitBill({ billAmount: this.state.billAmount, data: this.props.data });
  }

  public onChangeDollarInput(e: any, data: any) {
    this.setState({ billAmount: data.value });
  }

  public render() {
    const { open } = this.props;

    return (
      <div>
        <Modal dimmer="blurring" open={open} onClose={this.close}>
          <Modal.Header>Bill a Customer</Modal.Header>
          <Modal.Content image={true}>
            <Input labelPosition="right" type="text" placeholder="Amount" onChange={this.onChangeDollarInput}>
              <Label basic={true}>$</Label>
              <input />
            </Input>

            {/* <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description> */}
          </Modal.Content>
          <Modal.Actions>
            <Button color="blue" onClick={this.onSubmit}>
              Submit Bill
            </Button>
            <Button color="red" icon="cancel" onClick={this.close}>
              Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}
