import * as React from "react";

interface IState {
  someState: string;
}

interface IProps {
  someProps: string;
}

export class ExampleComponent extends React.Component {
  public state: IState;

  public constructor(props: IProps) {
    super({});
    this.state = {
      someState: "something"
    };
  }

  public render() {
    return (
      <div>
        <h1>Example</h1>
      </div>
    );
  }
}
