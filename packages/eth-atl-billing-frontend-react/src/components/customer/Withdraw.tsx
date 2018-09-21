import * as React from 'react';

import {MenuBar} from './MenuBar';

  export class Withdraw extends React.Component {
  
    public constructor(props: any){
      super(props);
    }
    public render(){
      return (
        <div>
          <MenuBar/>
          <h3>Withdraw</h3>
        </div>
      );
    }
  }