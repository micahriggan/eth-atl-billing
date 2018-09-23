import * as React from "react";
import { Dropdown } from "semantic-ui-react";
import { DropdownProps } from "semantic-ui-react/dist/commonjs/modules/Dropdown/Dropdown";

interface IState {
  selectedRecurrence: string;
}

interface IProps {
  onChange: (data: string) => void;
}
export enum TIMES {
  ANNUAL = "31557600",
  MONTH = "2629800",
  BIWEEK = "1209600",
  WEEK = "604800",
  DAY = "86400",
  HOUR = "3600"
}

export class Recurrence extends React.Component<IProps, IState> {
  public state: IState = {
    selectedRecurrence: TIMES.ANNUAL
  };

  public render() {
    const recurrenceSelected = this.state.selectedRecurrence;
    return this.dropdownRecurrence(recurrenceSelected);
  }

  public onChange = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) => {
    if (data.value) {
      this.setState({ selectedRecurrence: data.value.toString() });
      this.props.onChange(data.value.toString());
    }
  };

  public dropdownRecurrence(recurrenceSelected: string) {
    const recurrenceOptions = [
      {
        text: "Annually",
        value: TIMES.ANNUAL,
        image: {
          avatar: true,
          src: "../../../../images/recurrenceVisuals/icons8-a-26.png",
          style: { height: "18px", verticalAlign: "middle" },
          className: "no-border-radius"
        }
      },
      {
        text: "Monthly",
        value: TIMES.MONTH,
        image: {
          avatar: true,
          src: "../../../../images/recurrenceVisuals/icons8-m-26.png",
          style: { height: "18px", verticalAlign: "middle" },
          className: "no-border-radius"
        }
      },
      {
        text: "Biweekly",
        value: TIMES.BIWEEK,
        image: {
          avatar: true,
          src: "../../../../images/recurrenceVisuals/icons8-b-26.png",
          style: { height: "18px", verticalAlign: "middle" },
          className: "no-border-radius"
        }
      },
      {
        text: "Weekly",
        value: TIMES.WEEK,
        image: {
          avatar: true,
          src: "../../../../images/recurrenceVisuals/icons8-w-26.png",
          style: { height: "18px", verticalAlign: "middle" },
          className: "no-border-radius"
        }
      },
      {
        text: "Daily",
        value: TIMES.DAY,
        image: {
          avatar: true,
          src: "../../../../images/recurrenceVisuals/icons8-d-26.png",
          style: { height: "18px", verticalAlign: "middle" },
          className: "no-border-radius"
        }
      },
      {
        text: "Hourly",
        value: TIMES.HOUR,
        image: {
          avatar: true,
          src: "../../../../images/recurrenceVisuals/icons8-h-26.png",
          style: { height: "18px", verticalAlign: "middle" },
          className: "no-border-radius"
        }
      }
    ];

    return (
      <Dropdown
        placeholder="Select payment frequency"
        fluid={true}
        selection={true}
        options={recurrenceOptions}
        defaultValue={recurrenceSelected}
        onChange={this.onChange}
      />
    );
  }
}
