import * as React from "react";
import { ButtonProps, Table } from "semantic-ui-react";
import { Button } from "semantic-ui-react";

export interface IProps {
  rowData: Array<number | string>;
  actionRow?: boolean;
  actionButtonLabel?: string;
  actionButtonHandler?: (rowData: Array<number | string>) => void;
  actionButtonIcon?: string;
  actionButtonColor?: string;
}

export class Row extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }

  public render() {
    const cells = [];
    if (this.props.actionRow === true) {
      cells.push(this.actionCellComponent());
    }
    for (const data of this.props.rowData) {
      cells.push(<Table.Cell>{data}</Table.Cell>);
    }

    return <Table.Row>{cells}</Table.Row>;
  }

  private actionCellComponent() {
    const actionHandlerFunction = () => {
      return this.props.actionButtonHandler && this.props.actionButtonHandler(this.props.rowData);
    };
    const buttonProps = {
      icon: this.props.actionButtonIcon,
      color: this.props.actionButtonColor || undefined,
      content: this.props.actionButtonLabel,
      onClick: actionHandlerFunction
    };

    return (
      <Table.Cell>
        <Button {...buttonProps as ButtonProps} />
      </Table.Cell>
    );
  }
}
