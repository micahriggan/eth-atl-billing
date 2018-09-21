import * as React from 'react';
import {Web3Component} from '../Web3Component';

import {MenuBar} from './MenuBar';

  export class CreateWallet extends Web3Component {
  
    public constructor(props: any){
      super(props);
    }
    
    public async createWallet() {
        const accounts = await this.getAccounts();
        const account = accounts[0];
        const tx = await this.getWalletFactory()
          .methods.createWallet()
          .send({from: account});
        window.console.log(tx);
      }

    public render(){
      return (
        <div>
          <MenuBar/>
          <button onClick={this.createWallet}>Create Customer Wallet</button>
        </div>
      );
    }
  }