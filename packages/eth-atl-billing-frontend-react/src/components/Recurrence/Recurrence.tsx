import * as React from "react";
import {Dropdown} from "semantic-ui-react";

interface IState {
    selectedRecurrence: string;
}

interface IProps {
    onChange: (data: any) => void;
}

export class Recurrence extends React.Component<IProps, IState> {
    public state: IState = {
        selectedRecurrence: "Monthly"
    };

    public render() {
        const recurrenceSelected = this.state.selectedRecurrence;
        return this.dropdownRecurrence(recurrenceSelected);
    }

    public onChange = (data: any) => {
        this.setState({ selectedRecurrence: data.value});
        this.props.onChange(data.value);
    }

    public dropdownRecurrence(recurrenceSelected: string) {
        const recurrenceOptions = [
            {
                text: 'Annually',
                value: '31557600000',
                image: {
                    avatar: true,
                    src: '../../../../images/recurrenceVisuals/icons8-a-26.png',
                    style: {height: "18px", verticalAlign: "middle"},
                    className: "no-border-radius"
                }
            },
            {
                text: 'Monthly',
                value: '2629800000',
                image: {
                    avatar: true,
                    src: '../../../../images/recurrenceVisuals/icons8-m-26.png',
                    style: {height: "18px", verticalAlign: "middle"},
                    className: "no-border-radius"
                }
            },
            {
                text: 'Biweekly',
                value: '1209600000',
                image: {
                    avatar: true,
                    src: '../../../../images/recurrenceVisuals/icons8-b-26.png',
                    style: {height: "18px", verticalAlign: "middle"},
                    className: "no-border-radius"
                }
            },
            {
                text: 'Weekly',
                value: '604800000',
                image: {
                    avatar: true,
                    src: '../../../../images/recurrenceVisuals/icons8-w-26.png',
                    style: {height: "18px", verticalAlign: "middle"},
                    className: "no-border-radius"
                }
            },
            {
                text: 'Daily',
                value: '86400000',
                image: {
                    avatar: true,
                    src: '../../../../images/recurrenceVisuals/icons8-d-26.png',
                    style: {height: "18px", verticalAlign: "middle"},
                    className: "no-border-radius"
                }
            },
            {
                text: 'Hourly',
                value: '3600000',
                image: {
                    avatar: true,
                    src: '../../../../images/recurrenceVisuals/icons8-h-26.png',
                    style: {height: "18px", verticalAlign: "middle"},
                    className: "no-border-radius"
                }
            },
        ];

        return (<Dropdown placeholder='Select payment frequency'
                          fluid={true}
                          selection={true}
                          defaultSelectedLabel={this.state.selectedRecurrence}
                          options={recurrenceOptions}
                          defaultValue={recurrenceSelected}
                          onChange={this.onChange}/>);
    }
}
