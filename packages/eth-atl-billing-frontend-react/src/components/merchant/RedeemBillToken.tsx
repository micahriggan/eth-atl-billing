import * as React from 'react';
import {MenuBar} from './MenuBar';

  export class RedeemBillToken extends React.Component {
  
    public constructor(props: any){
      super(props);
    }
    public render(){
      return (
          <div>
            <MenuBar/>
            <h2>Enter Token</h2>
            <input type='text' name='billToken'/>
            <h2>Bill Details</h2>
            <h4>Wallet: </h4>
            <h4>Amount: </h4>
          </div>
      );
    }
  }