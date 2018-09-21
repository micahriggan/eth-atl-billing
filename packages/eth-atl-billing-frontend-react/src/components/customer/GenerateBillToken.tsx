import * as React from 'react';
import {MenuBar} from './MenuBar';

  export class GenerateBillToken extends React.Component {
  
    public constructor(props: any){
      super(props);
    }
    public render(){
      return (
          <div>
            <MenuBar/>
            <h2>Bill Details</h2>
            <h4>Authorized Address: </h4>
            <input type='text' name='billToken'/>
            <h4>Amount: </h4>
            <input type='text' name='billToken'/>
            <button>Generate Bill Token</button>
          </div>
      );
    }
  }