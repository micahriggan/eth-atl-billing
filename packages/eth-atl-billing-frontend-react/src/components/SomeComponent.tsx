import * as React from 'react';

interface IProp {
    name: string
  }
  
  export class SomeComponent extends React.Component<IProp> {
  
    public constructor(props: {name: string}){
      super(props);
    }
    public render(){
      return (
        <h1>{this.props.name}</h1>
      )
    }
  }